FROM java:8u111-jre-alpine

EXPOSE 8443
ENV KEYSTORE_PASSWORD=mzlapQ123
CMD [ "java", "-jar", "web-site.war", "--server.ssl.key-store-password=mzlapQ123", "--server.ssl.key-store-path=file:/keys/keystore.jks", "--server.ssl.key-store=file:/keys/keystore.jks" ]


COPY ./web-site/build/libs/web-site*.war /web-site.war
