#!/usr/bin/env groovy

def majorVersion   = "1"
def minorVersion   = "0"
def buildNumber
def buildSuffix    = "Final"
def version        = "$MAJOR_VERSION.$MINOR_VERSION"
def registry       = "10.0.4.51:5000"
def runSystemTests = false
def gradleTasks    = []

// TODO: enable integrationTests by default
if (env.BRANCH_NAME == "master") {
    buildNumber = env.BUILD_NUMBER
    gradleTasks = [
        "releaseBom",
        "installEnvironment",
        "clean",
        "build",
        "artifactoryPublish",
        "-Pversion=$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
    ]
} else {
    buildNumber = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
    gradleTasks = [
        "installBillOfMaterials",
        "installEnvironment",
        "clean",
        "build"
    ]

    // TODO: enable system-tests for PRs or on demand
    //if (runSystemTests || env.BRANCH_NAME =~ /^pr-/) {
    //    gradleTasks.push("systemTest")
    //}
}

node('docker-registry') {

    stage 'Checkout'
    checkout scm

    timeout(time: 60, unit: 'MINUTES') {
        stage 'Build Container'
        sh "docker build -t hasli.io/build:$version.$buildNumber ."
        sh "chmod +x gradlew"

        stage 'Gradle Build / Test'
        try {
            sh "docker run --name=$version.$buildNumber -v `pwd`:/usr/src/ hasli.io/build:$version.$buildNumber /usr/src/gradlew ${gradleTasks.join(" ")}"
        } catch (Exception e) {
            error "Failed: ${e}"
            throw (e)
        } finally {
            junit allowEmptyResults: true, keepLongStdio: true, testResults: '**/build/test-results/**/*.xml'
            sh "docker rm $version.$buildNumber"
        }
    }
}

def convertBranchName(String name) {
    return name.replaceAll('/', '_')
}
