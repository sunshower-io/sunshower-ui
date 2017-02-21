FROM openjdk:8-jdk

ARG HASLI_VERSION=1.00.000.000-SNAPSHOT

RUN apt-get update && apt-get -y upgrade && apt-get install -y \
	unzip \
	git \
	wget \
  && rm -rf /var/lib/apt/lists/*


ARG WILDFLY_VERSION=1.0.20.Final

RUN mkdir /opt/wildfly \
    && cd /opt/wildfly \
    && wget -q http://repo.hasli.io/artifactory/libs-release-local/io/hasli/wildfly/wildfly-dist/$WILDFLY_VERSION/wildfly-dist-$WILDFLY_VERSION.zip \
    && unzip wildfly-dist-$WILDFLY_VERSION.zip \
    && mv hasli-wildfly*/* /opt/wildfly/ \
    && rm -rf hasli-wildfly*

ENV JBOSS_HOME /opt/wildfly

ADD ./hasli.io/build/libs/hasli.io-$HASLI_VERSION.ear /opt/wildfly/standalone/deployments/

EXPOSE 8080

WORKDIR /opt/

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]
