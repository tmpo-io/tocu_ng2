#!/bin/bash

export GOOGLE_CLOUD_PROJECT=784309713365
export FIREBASE_KEY=oq2rsGPkGRRtU6uuuEsWFVxv3gbLOolF55tkj4tz
export FIREBASE_DB=https://jocs-cc8cc.firebaseio.com

go run main.go sound.go clipart.go $@
