#!/bin/bash


# Deploy a vm container machine on google cloud

GKE_ZONE=europe-west1-d
GKE_PROJECT=tempo-1250
GKE_MACHINE_TYPE=f1-micro

INSTANCE_NAME=apijocs
SERVICE=apijoc
IMAGE=eu.gcr.io/tempo-1250/jocs:latest
PARAMS="-e GOOGLE_CLOUD_PROJECT=784309713365 -e FIREBASE_KEY=oq2rsGPkGRRtU6uuuEsWFVxv3gbLOolF55tkj4tz -e FIREBASE_DB=https://jocs-cc8cc.firebaseio.com -p 80:8080"


# Create cloudinit config
cat > /tmp/cloudinit << EOF
#cloud-config


users:
- name: cloudservice
  uid: 2000

write_files:
- path: /etc/systemd/system/cloudservice.service
  permissions: 0644
  owner: root
  content: |
    [Unit]
    Description=Execute container
    After=docker.service
    Requires=docker.service

    [Service]
    Environment="HOME=/home/cloudservice"
    ExecStartPre=-/usr/share/google/dockercfg_update.sh
    ExecStartPre=/usr/bin/docker pull $IMAGE
    ExecStart=/usr/bin/docker run --rm -u 2000 $PARAMS --name=$SERVICE $IMAGE
    ExecStop=/usr/bin/docker stop $SERVICE
    ExecStopPost=/usr/bin/docker rm $SERVICE

runcmd:
- sudo usermod -a -G docker cloudservice
- systemctl daemon-reload
- systemctl enable /etc/systemd/system/cloudservice.service
- systemctl start cloudservice.service
EOF


echo "Creating vm machine"
gcloud compute instances create "$INSTANCE_NAME" \
    --project "$GKE_PROJECT" \
    --image-family gci-dev \
    --image-project google-containers \
    --zone "$GKE_ZONE" \
    --machine-type "$GKE_MACHINE_TYPE" \
    --tags=http-webserver \
    --metadata-from-file user-data=/tmp/cloudinit \
    --scopes default="https://www.googleapis.com/auth/compute","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/devstorage.read_write","https://www.googleapis.com/auth/monitoring"

echo "Creating firewall rules"
gcloud compute --project "$GKE_PROJECT" \
  firewall-rules create \
  "defaul-allow-http"  --allow tcp:80 \
  --network "default" \
  --target-tags="http-webserver" \
  --source-ranges=0.0.0.0/0

# gcloud compute --project "tempo-1250" firewall-rules create "default-allow-http" --allow tcp:80 --network "default" --source-ranges "0.0.0.0/0" --target-tags "http-server"
