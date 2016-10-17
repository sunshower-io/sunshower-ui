#!/usr/bin/env groovy

def MAJOR_VERSION = "1"
def MINOR_VERSION = "0"
def BUILD
def VERSION       = "$MAJOR_VERSION.$MINOR_VERSION"
def registry      = "10.0.4.51:5000"


def runIntegrationTests = false
def runSystemTests      = false

if (env.BRANCH_NAME == "master") {
    BUILD = env.BUILD_NUMBER
} else {
    BUILD = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
}


node('docker-registry') {

    stage 'Checkout source'
    checkout scm

    timeout(time: 60, unit: 'MINUTES') {
        stage 'Build Container'
        sh "docker build -t hasli.io/build:$VERSION.$BUILD ."
        sh "chmod +x gradlew"

        stage 'Gradle build'
        sh "docker run --name=$VERSION.$BUILD -v `pwd:/usr/src/` hasli.io/build:$VERSION.$BUILD /usr/src/gradlew installBillOfMaterials clean build"
        sh "docker rm $VERSION.$BUILD"
    }
}

def convertBranchName(String name) {
    return name.replaceAll('/', '_')
}
