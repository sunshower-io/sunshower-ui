#!/usr/bin/env groovy

def MAJOR_VERSION  = "1"
def MINOR_VERSION  = "0"
def BUILD
def VERSION        = "$MAJOR_VERSION.$MINOR_VERSION"
def registry       = "10.0.4.51:5000"
def runSystemTests = false

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
        try {
            sh "docker run --name=$VERSION.$BUILD -v `pwd`:/usr/src/ hasli.io/build:$VERSION.$BUILD /usr/src/gradlew installBillOfMaterials installEnvironment clean build"
        } catch (Exception e) {
            error "Failed: ${e}"
            throw (e)
        } finally {
            junit allowEmptyResults: true, keepLongStdio: true, testResults: '**/build/test-results/*.xml'
            sh "docker rm $VERSION.$BUILD"
        }
    }
}

def convertBranchName(String name) {
    return name.replaceAll('/', '_')
}
