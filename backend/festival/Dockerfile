FROM ubuntu:16.04

MAINTAINER jordi collell <j@tmpo.io>


RUN apt-get update && \
  apt-get install -y software-properties-common && \
  add-apt-repository -y ppa:zeehio/festcat && \
  apt-get update && \
  apt-get install -y festival festival-ca festcat-utils \
    festvox-ca-ona-hts lame && \
  apt-get install -y apertium apertium-ca-en apertium-ca-es


COPY read.sh read.sh
COPY api /api

#text2wave -o bondia.wav   -eval '(voice_upc_ca_ona_hts)' bon_dia.txt
EXPOSE 8080
ENTRYPOINT ["/api"]


#VOLUME ["/output"]
