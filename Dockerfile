FROM openjdk:8-jdk

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && \
    rm -rf /var/lib/apt/lists/*

# Install and setup Maven
ARG MAVEN_VERSION=3.3.9
ARG USER_HOME_DIR="/root"

RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
  && curl -fsSL http://apache.osuosl.org/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz \
    | tar -xzC /usr/share/maven --strip-components=1 \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

ENV MAVEN_HOME /usr/share/maven
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"
ENV M2_HOME "/usr/share/maven"

VOLUME "$USER_HOME_DIR/.m2"

# Install Node.js
ARG NODE_VERSION="4.6.0"

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get install -y nodejs

WORKDIR /usr/src

cmd ["/bin/bash"]
