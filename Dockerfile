FROM java:8u111-jre-alpine

EXPOSE 8443
ENV KEYSTORE_PASSWORD=changeme123!!!

CMD java -jar web-site.war \
    --server.ssl.key-store-password=${KEYSTORE_PASSWORD} \
    --server.ssl.key-password=${KEYSTORE_PASSWORD} \
    --server.ssl.key-store-path=file:/keys/server.jks \
    --server.ssl.key-store=file:/keys/server.jks



COPY ./web-site/build/libs/web-site*.war /web-site.war
