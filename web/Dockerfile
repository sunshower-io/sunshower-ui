FROM openjdk:8-jdk

ARG HASLI_VERSION=1.00.000.000-SNAPSHOT
ARG WILDFLY_VERSION=10.1.0.Final

RUN apt-get update && apt-get -y upgrade && apt-get install -y \
	unzip \
	git \
	wget \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir /opt/wildfly \
    && cd /opt/wildfly \
    && wget -q http://repo.hasli.io/artifactory/packages/hasli/wildfly/release/latest/hasli-wildfly-$WILDFLY_VERSION.zip \
    && unzip hasli-wildfly-$WILDFLY_VERSION.zip \
    && mv hasli-wildfly*/* /opt/wildfly/ \
    && rm -rf hasli-wildfly*

ENV JBOSS_HOME /opt/wildfly

ADD ./hasli.io/build/libs/hasli.io-$HASLI_VERSION.ear /opt/wildfly/standalone/deployments/

EXPOSE 8080

WORKDIR /opt/

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]
