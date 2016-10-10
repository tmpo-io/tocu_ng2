#!/bin/bash

OUTPUT=$2

[[ -z $OUTPUT ]] && OUTPUT=output.mp3

TEXT=$(echo $1 | iconv -f utf-8 -t ISO-8859-15//TRANSLIT//IGNORE)

shift;
shift;

#echo $TEXT | text2wave -eval "(voice_upc_ca_ona_hts)" $@ | lame --nores - $OUTPUT
echo $TEXT | text2wave -eval "(voice_upc_ca_ona_hts)" $@ > $OUTPUT.raw

ffmpeg -i $OUTPUT.raw -vn -ar 44100 -ac 2 -ab 128k -f mp3 $OUTPUT
