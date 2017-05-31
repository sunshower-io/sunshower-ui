#!/bin/bash

openssl req -x509 -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout hasli.io.key \
    -out hasli.io.pem

openssl req -new \
    -key hasli.io.key \
    -out hasli.io.csr

openssl x509 -req -days 365 \
    -in hasli.io.csr \
    -signkey hasli.io.key \
    -out hasli.io.crt

openssl pkcs12 -export \
    -in hasli.io.crt \
    -inkey hasli.io.key \
    -chain -CAfile hasli.io.crt \
    -name "hasli.io" \
    -out hasli.io.p12

keytool -importkeystore \
    -destkeystore hasli.io.jks \
    -srckeystore hasli.io.p12 \
    -srcstoretype PKCS12
