#!/bin/sh
# Gabungkan gambar langkah jadi satu lembar per materi: sh tests/sheets.sh OUT
OUT=$1
for d in "$OUT"/*/; do
  id=$(basename "$d"); [ "$id" = pages ] && continue
  n=$(ls "$d" | wc -l)
  ffmpeg -v error -y -pattern_type glob -i "$d/*.png" -vf "scale=300:-2,tile=6x$(( (n+5)/6 )):padding=6:color=gray" -frames:v 1 "$OUT/sheet_$id.png"
done
