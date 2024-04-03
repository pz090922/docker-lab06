#!/bin/bash

urls=("http://localhost" "http://localhost:3001" "http://localhost:3001/test")

for url in "${urls[@]}"; do
  status=$(curl --write-out '%{http_code}' --silent --output /dev/null $url)

  if [ $status -eq 200 ]
  then
    echo "Działa: $url"
  else
    echo $status
  fi
done
