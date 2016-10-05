package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"sync"

	"github.com/rs/cors"
)

var (
	port        = flag.String("port", ":8080", "Listen address")
	audioCmd    = flag.String("audiocmd", "./read.sh", "Path to audio command")
	wcache      *TranslateCache
	projectID   string
	firebaseKEY string
	firebaseDB  string
)

// Translate is a translated word from apertium
type Translate struct {
	Catala     string `json:"catala"`
	Castellano string `json:"castellano"`
	English    string `json:"english"`
}

// TranslateCache for storing already translated words
type TranslateCache struct {
	words map[string]*Translate
	sync.Mutex
}

func main() {

	flag.Parse()

	// gcloud project id
	projectID = os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		log.Fatal("Can't find project id")
	}
	firebaseKEY = os.Getenv("FIREBASE_KEY")
	firebaseDB = os.Getenv("FIREBASE_DB")
	if firebaseKEY == "" || firebaseDB == "" {
		log.Fatal("Need a key for firebaseinteracting")
	}

	mux := http.NewServeMux()
	mux.Handle("/translate", http.HandlerFunc(translate))
	mux.Handle("/audio", http.HandlerFunc(createAudioFile))

	wcache = &TranslateCache{
		words: make(map[string]*Translate),
	}

	// Instantiate cache words mutex
	log.Printf("Service http started at %s", *port)

	handler := cors.Default().Handler(mux)

	if err := http.ListenAndServe(*port, handler); err != nil {
		log.Fatal(err)
	}

}

func translate(w http.ResponseWriter, r *http.Request) {
	var word *Translate
	paraula := r.FormValue("w")
	if paraula == "" {
		fmt.Fprint(w, "[Error] provide a word")
		return
	}

	wcache.Lock()
	if val, ok := wcache.words[paraula]; ok {
		word = val
		wcache.Unlock()
		handleResponseTranslate(w, word)
		return
	}
	wcache.Unlock()

	word = &Translate{
		Catala: paraula,
	}
	word.Castellano = apertiumTranslate("ca-es", word.Catala)
	word.English = apertiumTranslate("ca-en", word.Catala)
	wcache.Lock()
	wcache.words[paraula] = word
	wcache.Unlock()
	handleResponseTranslate(w, word)
}

func handleResponseTranslate(w http.ResponseWriter, word *Translate) {
	b, err := json.Marshal(word)
	if err != nil {
		log.Printf("Error marshaling word, %s", err)
		http.Error(w, err.Error(), 500)
		return
	}
	w.Write(b)
}

func apertiumTranslate(lang, word string) string {

	cmd := exec.Command("apertium", lang)
	cmd.Stdin = strings.NewReader(word)
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		log.Printf("Error translating %s, lang %s, %s", word, lang, err)
		return ""
	}
	return out.String()
}
