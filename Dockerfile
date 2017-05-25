FROM java:8u111-jre-alpine

EXPOSE 8443

CMD ["java", "-jar", "web-site.war"]

COPY ./libs/web-site*.war /web-site.war
