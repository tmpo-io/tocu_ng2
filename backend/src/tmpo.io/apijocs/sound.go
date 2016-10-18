package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/net/context"
)

const (
	bucket       = "jocs"
	bucketPublic = "https://storage-download.googleapis.com/%s/%s/%s"
	bucketFolder = "audios"
	// path = `%s/words`
)

func createAudioFile(w http.ResponseWriter, r *http.Request) {

	start := time.Now()

	word := r.FormValue("w")
	userID := r.FormValue("uid")
	wordUID := r.FormValue("wid")

	fpath := fmt.Sprintf("/tmp/%s_%s.mp3", userID, wordUID)
	fname := fmt.Sprintf("%s_%s.mp3", userID, wordUID)
	// Check if already uploaded?
	err := generateAudioFile(word, fpath)
	if err != nil {
		log.Printf("Can't create audio file %s", err)
		http.Error(w, "no audio", 500)
		return
	}

	err = uploadAudio(fpath, fname)
	if err != nil {
		log.Printf("Can't store audio file %s", err)
		http.Error(w, "can't store audio file", 500)
		return
	}

	err = updateDB(userID, wordUID, fname)
	if err != nil {
		log.Printf("can't update db %s", err)
		http.Error(w, "cant update db", 500)
		return
	}

	err = removeLocalMedia(fpath)
	if err != nil {
		log.Printf("Can't delete local file")
	}

	endt := time.Since(start)

	b, _ := json.Marshal(map[string]string{
		"result":  "ok",
		"process": endt.String(),
		"audio":   urlForFile(word),
	})

	w.Write(b)

}

// Upload to gcloud
func uploadAudio(filename, audio string) error {

	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return err
	}
	f, err := os.Open(filename)
	if err != nil {
		return err
	}
	defer f.Close()
	wc := client.Bucket(bucket).Object(
		bucketFolder + "/" + audio).NewWriter(ctx)
	if _, err = io.Copy(wc, f); err != nil {
		return err
	}
	if err := wc.Close(); err != nil {
		return err
	}
	// [END upload_file]
	return nil
}

func urlForFile(file string) string {
	return fmt.Sprintf(bucketPublic, bucket, bucketFolder, url.QueryEscape(file))
}

// Update firebase db for word
func updateDB(userID, wordUID, file string) error {
	db := &FireDB{
		url: firebaseDB,
		key: firebaseKEY,
	}
	urlfile := urlForFile(file)
	err := db.UpdateAudioWord(userID, wordUID, urlfile)
	return err
}

func removeLocalMedia(filename string) error {
	return os.Remove(filename)
}

// Create audio file on filesystem
func generateAudioFile(word, output string) error {
	var err error
	safeWord := fmt.Sprintf("\"%s\"", word)
	cmd := exec.Command(*audioCmd, safeWord, output)
	cmd.Stderr = os.Stderr
	// cmd.Stdout = os.Stdout
	err = cmd.Run()
	return err
}

// FireDB datastore
type FireDB struct {
	url string
	key string
}

// builds the internal url for firebase db, like:
// https://urldb/words/<word>.json
// to patch its content with new audio file...
// const path = `users/${this.auth.id}/words`

func (db *FireDB) urlForWord(userID, wordUID string) string {
	return fmt.Sprintf("%s/users/%s/words/%s.json?auth=%s", db.url, userID, wordUID, db.key)
}

// UpdateAudioWord updateds store with an audio
func (db *FireDB) UpdateAudioWord(userID, wordUID, audio string) error {

	// build url
	url := db.urlForWord(userID, wordUID)
	log.Printf("Url %s\n", url)
	obj := map[string]string{
		"audio": audio,
	}
	b, err := json.Marshal(obj)
	if err != nil {
		return err
	}
	client := &http.Client{}
	request, err := http.NewRequest("PATCH", url, bytes.NewBuffer(b))
	if err != nil {
		return err
	}
	response, err := client.Do(request)
	// io.Copy(os.Stdout, response.Body)
	defer response.Body.Close()
	if err != nil {
		return err
	}
	return nil
}
