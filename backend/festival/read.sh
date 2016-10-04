#!/bin/bash

OUTPUT=$2

[[ -z $OUTPUT ]] && OUTPUT=output.mp3

TEXT=$(echo $1 | iconv -f utf-8 -t ISO-8859-15//TRANSLIT//IGNORE)

shift;
shift;

echo $TEXT | text2wave -eval "(voice_upc_ca_ona_hts)" $@ | lame - $OUTPUT
