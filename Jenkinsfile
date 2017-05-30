#!groovy

def version    = "1.0.${env.BUILD_NUMBER}"
def hasliImage = "hasli/ui"

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
                echo "TODO: Fix gulp test stuff"
                sh "docker-compose run --rm gulp-test"
            }

            stage('Integration') {
                echo "TODO: Implement integration tests"
            }

            if (env.BRANCH_NAME =~ /(?i)^pr-/ || env.BRANCH_NAME == "master") {

                stage('Build UI') {
                    sh "docker-compose run --rm build-war"
                    sh "docker-compose build ui"
                }

                if (env.BRANCH_NAME =~ /(?i)^pr-/) {
                    def name = convertBranchName(env.BRANCH_NAME)
                    stage('Staging') {
                        sh "docker-compose -f docker-compose-staging.yml -p $name up -d"
                        publishStagedInfo(name)
                    }

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

                stage('Production') {
                    sh "scp -i ~/.ssh/aws-docker-swarm.pem docker-compose-stack.yml docker@52.53.220.216:/home/docker/docker-compose-stack.yml"
                    sh "ssh -i ~/.ssh/aws-docker-swarm.pem docker@52.53.220.216 'docker stack deploy -c docker-compose-stack.yml hasli --with-registry-auth'"
                }
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


def publishStagedInfo(String name) {
    def https = sh returnStdout: true, script: "docker-compose -f docker-compose-staging.yml -p $name port proxy 443"
    echo "Name: $name, Output: $https"
    def port = "$https".split(":")[1]

    def pr = env.BRANCH_NAME.split("-")[1].trim()
    def pat = readFile('/root/.pat').trim()

    String githubComment = "${JOB_NAME}, build [#${env.BUILD_NUMBER}](${env.BUILD_URL}) - Staged deployment can be viewed at: [https://10.0.4.51:$port](https://10.0.4.51:$port"
    String slackNotification = "${JOB_NAME}, build #${env.BUILD_NUMBER} ${env.BUILD_URL} - Staged deployment can be viewed at: https://10.0.4.51:$port"

    sh "curl -H \"Content-Type: application/json\" -u hasli-bot:$pat -X POST -d '{\"body\": \"$githubComment)\"}' https://api.github.com/repos/hasli-projects/hasli-ui/issues/$pr/comments"
    slackSend (color: 'good', message: slackNotification)
}


def convertBranchName(String name) {
    return name.replaceAll('/', '_')
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
