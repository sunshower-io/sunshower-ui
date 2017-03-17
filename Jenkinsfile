#!/usr/bin/env groovy

def majorVersion   = "1"
def minorVersion   = "0"
def buildNumber    = ""
def buildSuffix    = "Final"
def version        = "$majorVersion.$minorVersion"
def registry       = "10.0.4.51:5000"
def hasliImage     = "hasli-ui/ui"
def runSystemTests = false
def gradleTasks    = []

if (env.BRANCH_NAME == "master") {
    buildNumber = env.BUILD_NUMBER
    buildSuffix = "Final"
    gradleTasks = [
            "clean",
            "installEnvironment",
            "build",
            "artifactoryPublish",
            "-Pversion=$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
    ]
} else {
    if (buildSuffix == "FEATURE" && env.BRANCH_NAME.contains(buildNumber)) {
        gradleTasks = [
                "clean",
                "installEnvironment",
                "build",
                "artifactoryPublish",
                "-Pversion=$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
        ]
    } else {
        gradleTasks = ["clean", "installEnvironment", "build"]
        buildNumber = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
    }
}

node('docker-registry') {

    stage('Checkout') {
        checkout scm
    }

    timeout(time: 60, unit: 'MINUTES') {
        stage('Build Container') {
            sh "docker build -t hasli-ui/build-env:$version.$buildNumber -f resources/Dockerfile.build ."
        }

        stage('Gradle Build / Test') {
            try {
                dockerRun(
                        "hasli-ui/build-env:$version.$buildNumber",
                        "$version.$buildNumber",
                        "-v `pwd`:/usr/src/ -v ~/.gradle/caches:/root/.gradle/caches -v ~/.gradle/gradle.properties:/root/.gradle/gradle.properties -v ~/.jspm:/root/.jspm",
                        "sh -c '/usr/src/gradlew ${gradleTasks.join(" ")}'",
                        true
                )
            } catch (Exception e) {
                error "Failed: ${e}"
            } finally {
                junit allowEmptyResults: true, keepLongStdio: true, testResults: '**/build/test-results/**/*.xml'
            }
        }

        if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {
            def staging = env.BRANCH_NAME != "master"
            def name = staging ? "staging-$version.$buildNumber" : "${version}.${buildNumber}"

            if (staging) {

                stage('Deploy to Staging') {
                    sh "sed -i.bak 's/^HASLI_NAME=.*/HASLI_NAME=$name-wildfly/' ./resources/.env"
                    sh "sed -i.bak 's/^HASLI_VERSION=.*/HASLI_VERSION=$version.$buildNumber/' ./resources/.env"
                    sh "sed -i.bak 's/^HASLI_IMAGE=.*/HASLI_IMAGE=hasli-ui\\/ui/' ./resources/.env"
                    sh "sed -i.bak 's/^HASLI_PORTS=.*/HASLI_PORTS=8080' ./resources/.env"

                    sh "docker build --build-arg WILDFLY_VERSION=$wildflyVersion -t $hasliImage:$version.$buildNumber -f resources/Dockerfile.prod ."
                    sh "cd resources && docker-compose -f docker-compose.yml -p $name up -d"
                }

                stage('Deployment Summary') {
                    def portMapping = sh returnStdout: true, script: "docker inspect --format='{{range \$p, \$conf := .NetworkSettings.Ports}} {{\$p}} -> {{(index \$conf 0).HostPort}} {{end}}' $name-wildfly"
                    portMapping = portMapping.trim()
                    def port = portMapping.split(/\s->\s/)[1]
                    def pr = env.BRANCH_NAME.split("-")[1].trim()
                    def pat = readFile('/root/.pat').trim()

                    sh "curl -H \"Content-Type: application/json\" -u dlish:$pat -X POST -d '{\"body\": \"${JOB_NAME}, build [#${env.BUILD_NUMBER}](${env.BUILD_URL}) - Deployment can be viewed at: [10.0.4.51:$port](http://10.0.4.51:$port/hasli/web/)\"}' https://api.github.com/repos/hasli-projects/hasli.io/issues/$pr/comments"

                    echo "Port Mapping: $portMapping"
                }
            } else {
                sh "docker build --build-arg WILDFLY_VERSION=$wildflyVersion --build-arg HASLI_VERSION=$majorVersion.$minorVersion.$buildNumber.$buildSuffix -t $hasliImage:$version.$buildNumber ."
                sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:$version.$buildNumber"
                sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:latest"
                sh "docker push $registry/$hasliImage:$version.$buildNumber"
                sh "docker push $registry/$hasliImage:latest"
            }

        }

    }
}

if (env.BRANCH_NAME == "master") {
    node('webserver') {
        stage('Deploy to Production') {
            checkout scm
            sh "docker pull $registry/$hasliImage:latest"
            sh "cd resources && docker-compose up -d --no-deps --build hasli-ui"
        }
    }
}

def dockerRun(String image, String name, String args, String cmd, boolean rm) {
    try {
        sh "docker run --name=$name $args $image $cmd"
    } catch (Exception e) {
        error "Failed: ${e}"
        throw (e)
    } finally {
        if (rm) {
            sh "docker rm $name"
        }
    }
}


def convertBranchName(String name) {
    return name.replaceAll('/', '_')
}


def valueOf(path) {
    Jenkins
            .instance
            .getItemByFullName(path)
            .getNextBuildNumber() - 1
}
