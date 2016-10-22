

VERSION = r03
REPO = eu.gcr.io/tempo-1250/jocs

build:
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o api tmpo.io/apijocs

docker:
	docker build -t $(REPO):latest .
	docker tag $(REPO):latest $(REPO):$(VERSION)

push:
	gcloud --project tempo-1250 docker push $(REPO):latest
	gcloud --project tempo-1250 docker push $(REPO):$(VERSION)

run:
	gcloud docker pull $(REPO):latest
	docker run --rm -p 8080:8080  $(REPO):latest
