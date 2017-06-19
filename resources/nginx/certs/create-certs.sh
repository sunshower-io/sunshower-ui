#!/bin/bash

openssl req -x509 -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout sunshower.io.key \
    -out sunshower.io.pem

openssl req -new \
    -key sunshower.io.key \
    -out sunshower.io.csr

openssl x509 -req -days 365 \
    -in sunshower.io.csr \
    -signkey sunshower.io.key \
    -out sunshower.io.crt

openssl pkcs12 -export \
    -in sunshower.io.crt \
    -inkey sunshower.io.key \
    -chain -CAfile sunshower.io.crt \
    -name "sunshower.io" \
    -out sunshower.io.p12

keytool -importkeystore \
    -destkeystore sunshower.io.jks \
    -srckeystore sunshower.io.p12 \
    -srcstoretype PKCS12
