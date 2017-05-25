#!groovy

def majorVersion   = "1"
def minorVersion   = "0"
def version        = "$majorVersion.$minorVersion.${env.BUILD_NUMBER}"
def hasliImage     = "hasli/ui"


try {
    node('docker-registry') {

        notifySlack('STARTED')

        withEnv([
                "COMPOSE_FILE=common-services.yml"
        ]) {

            stage('Pull') {
                checkout scm
            }

            stage('Build Env Container') {
                sh "docker-compose build build-env"
            }

            stage('Gulp Test') {
                sh "docker-compose run --rm gulp-test"
            }

            stage('Integration') {
                echo "TODO: Implement integration tests"
            }

            if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {

                stage('Build UI') {
                    sh "docker-compose run --rm build-war"
                    sh "sed -i.bak 's/^UI_VERSION=.*/UI_VERSION=$version/' ./resources/.env"
                    sh "docker-compose build ui"
                }

                if (env.BRANCH_NAME =~ /(?i)^pr-/) {
                    stage('Staging') {
                        sh "docker-compose -f docker-compose-staging.yml -p ${convertBranchName(env.BRANCH_NAME)} staging"
                    }

                    notifyGithub(name)
                }
            }

            if (env.BRANCH_NAME == "master") {
                stage('Publish') {
                    sh "docker tag $hasliImage $hasliImage:$version"

                    sh "docker push $hasliImage:$version"
                    sh "docker push $hasliImage"

                    sh "docker rmi $hasliImage:$version"
                    sh "docker rmi $hasliImage"
                }
            }
        }
    }


    if (env.BRANCH_NAME == "master") {
        node('manager') {
            stage('Production') {
                checkout scm
                sh "docker service update --image hasli/ui ui"
            }
        }
    }

    currentBuild.result = "SUCCESS"

} catch (Exception e) {
    error "Failed: ${e}"
    currentBuild.result = "FAILED"
} finally {
    notifySlack(currentBuild.result)
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

def notifySlack(String buildStatus) {
    if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {
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

        slackSend(color: color, message: summary)
    }
}
