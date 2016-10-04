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
	bucketPublic = "https://storage-download.googleapis.com/%s/%s/%s.mp3"
	bucketFolder = "audios"
)

func createAudioFile(w http.ResponseWriter, r *http.Request) {

	start := time.Now()

	word := r.FormValue("w")
	fname := fmt.Sprintf("%s.mp3", word)
	// Check if already uploaded?
	err := generateAudioFile(word, fname)
	if err != nil {
		log.Printf("Can't create audio file %s", err)
		http.Error(w, "no audio", 500)
		return
	}

	err = uploadAudio(fname)
	if err != nil {
		log.Printf("Can't store audio file %s", err)
		http.Error(w, "can't store audio file", 500)
		return
	}

	err = updateDB(word, fname)
	if err != nil {
		log.Printf("can't update db %s", err)
		http.Error(w, "cant update db", 500)
		return
	}

	err = removeLocalMedia(fname)
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
func uploadAudio(filename string) error {

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
		bucketFolder + "/" + filename).NewWriter(ctx)
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
func updateDB(word, file string) error {
	db := &FireDB{
		url: firebaseDB,
		key: firebaseKEY,
	}
	urlfile := urlForFile(file)
	err := db.UpdateAudioWord(word, urlfile)
	return err
}

func removeLocalMedia(filename string) error {
	return os.Remove(filename)
}

// Create audio file on filesystem
func generateAudioFile(word, output string) error {
	var err error
	cmd := exec.Command(*audioCmd, word, output)
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

func (db *FireDB) urlForWord(w string) string {
	return fmt.Sprintf("%s/words/%s.json?auth=%s", db.url, w, db.key)
}

// UpdateAudioWord updateds store with an audio
func (db *FireDB) UpdateAudioWord(word, audio string) error {

	// build url
	url := db.urlForWord(word)
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
	defer response.Body.Close()
	if err != nil {
		return err
	}
	return nil
}
