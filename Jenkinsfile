#!/usr/bin/env groovy

def majorVersion   = "1"
def minorVersion   = "0"
def buildNumber    = ""
def buildSuffix    = "Final"
def version        = "$majorVersion.$minorVersion"
def registry       = "10.0.4.51:5000"
def hasliImage     = "hasli/ui"
def runSystemTests = false
def gradleTasks    = []
def notifySlack    = false

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
} else if (env.BRANCH_NAME =~ /(?i)^pr-/) {
    buildNumber = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
    gradleTasks = [
            "clean",
            "installEnvironment",
            "build",
            "copyWar"
    ]
} else {
    gradleTasks = ["clean", "installEnvironment", "build"]
    buildNumber = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
}

try {
    node('docker-registry') {

        if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {
            notifySlack = true
            notifyBuild('STARTED')
        }

        stage('Checkout') {
            checkout scm
        }

        timeout(time: 60, unit: 'MINUTES') {

            stage('Build Env Container') {
                sh "docker build -t hasli/ui-build-env:$version -f resources/Dockerfile.build ./resources/"
            }

            stage('Gradle Build Tasks') {
                dockerRun(
                        "hasli/ui-build-env:$version",
                        "$version.$buildNumber",
                        "-v `pwd`:/usr/src/ -v ~/.gradle/wrapper:/root/.gradle/wrapper -v ~/.gradle/gradle.properties:/root/.gradle/gradle.properties -v ~/.jspm:/root/.jspm",
                        "sh -c '/usr/src/gradlew ${gradleTasks.join(" ")}'",
                        true
                )
            }

            if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {
                def staging = env.BRANCH_NAME != "master"
                def name = staging ? "staging-$version.$buildNumber" : "${version}.${buildNumber}"

                if (staging) {

                    stage('Build UI Container') {
                        sh "docker build -t $hasliImage:$version.$buildNumber -f resources/Dockerfile.prod ./resources/"
                    }

                    stage('Publish container to registry') {
                        sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:$version.$buildNumber"
                        sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:latest"
                        sh "docker push $registry/$hasliImage:$version.$buildNumber"
                        sh "docker push $registry/$hasliImage:latest"
                    }

                    stage('Deploy to Staging') {
                        sh "sed -i.bak 's/^UI_NAME=.*/UI_NAME=$name/' ./resources/.env"
                        sh "sed -i.bak 's/^UI_VERSION=.*/UI_VERSION=$version.$buildNumber/' ./resources/.env"
                        sh "sed -i.bak 's/^UI_IMAGE=.*/UI_IMAGE=hasli\\/ui/' ./resources/.env"

                        sh "cd resources && docker-compose -f docker-compose-staging.yml -p $name up -d"

                    }

                    notifyGithub(name)
                }
            }

        }
    }

    if (env.BRANCH_NAME == "master") {
        node('webserver') {
            stage('Deploy to Production') {
                checkout scm
                sh "cd resources && docker-compose -f docker-compose-prod.yml pull && docker-compose -f docker-compose-prod.yml up -d"
            }
        }
    }

    currentBuild.result = "SUCCESS"

} catch (Exception e) {
    error "Failed: ${e}"
    currentBuild.result = "FAILED"
} finally {
    if (notifySlack && env.BRANCH_NAME != "master") {
        notifyBuild(currentBuild.result)
    }
}


def notifyGithub(String name) {
    def portMapping = sh returnStdout: true, script: "docker port proxy-$name"
    portMapping = portMapping.trim()

    def https = getMappedPort(portMapping, 443)
    def http = getMappedPort(portMapping, 80)

    def pr = env.BRANCH_NAME.split("-")[1].trim()
    def pat = readFile('/root/.pat').trim()

    String githubComment = "${JOB_NAME}, build [#${env.BUILD_NUMBER}](${env.BUILD_URL}) - Staged deployment can be viewed at: [10.0.4.51:$http](http://10.0.4.51:$http"
    String slackNotification = "${JOB_NAME}, build #${env.BUILD_NUMBER} ${env.BUILD_URL} - Staged deployment can be viewed at: http://10.0.4.51:$http"

    sh "curl -H \"Content-Type: application/json\" -u hasli-bot:$pat -X POST -d '{\"body\": \"$githubComment)\"}' https://api.github.com/repos/hasli-projects/hasli-ui/issues/$pr/comments"
    slackSend (color: 'good', message: slackNotification)

    echo "Port Mapping: $portMapping"
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


def getMappedPort(String portMapping, int port) {
    List<String> ports = portMapping.trim().split(/\n/)

    for (int i = 0; i < ports.size(); i++) {
        if (ports[i] =~ /$port/)
            return ports[i].split(/->/)[1].trim().split(/:/)[1]
    }

    return ""
}

def notifyBuild(String buildStatus) {
    echo "currentBuild.result=$buildStatus"

    if (buildStatus == null || buildStatus == "") {
        buildStatus = 'FAILED'
    }

    def subject = "${buildStatus}: Job '${env.JOB_NAME}, build #${env.BUILD_NUMBER}'"
    def summary = "${subject} (${env.BUILD_URL})"

    if (buildStatus == 'STARTED') {
        color = 'warning'
    } else if (buildStatus == 'SUCCESS') {
        color = 'good'
    } else {
        color = 'danger'
    }

    slackSend (color: color, message: summary)
}
