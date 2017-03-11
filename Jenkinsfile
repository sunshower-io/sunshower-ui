#!/usr/bin/env groovy

// Build Variables
def majorVersion = "1"
def minorVersion = "0"
def buildNumber
def buildSuffix = "Final"
def version = "$majorVersion.$minorVersion"
def registry = "10.0.4.51:5000"
def hasliImage = "hasli.io/ui"
def agentVersion = "latest"
def agentImage = "$registry/hasli/agent:$agentVersion"
def runSystemTests = false

// Gradle Tasks
def bomTask
def gradleTasks = []

// Dependencies
def wildflyVersion = '1.0.15.Final'
def versionString = "$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
// TODO: enable integrationTests by default
if (env.BRANCH_NAME == "master") {
    buildNumber = env.BUILD_NUMBER
    bomTask = "releaseBom -Pversion=$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
    gradleTasks = [
            "installEnvironment",
            "clean",
            "build",
            "artifactoryPublish",
            "-Pversion=$majorVersion.$minorVersion.$buildNumber.$buildSuffix"
    ]
} else {
    buildNumber = "${env.BUILD_NUMBER}.${convertBranchName(env.BRANCH_NAME)}"
    bomTask = "installBillOfMaterials"
    gradleTasks = [
            "installEnvironment",
            "clean",
            "build",
            "-x test"
    ]

    // TODO: enable system-tests for PRs or on demand
    //if (runSystemTests || env.BRANCH_NAME =~ /^pr-/) {
    //    gradleTasks.push("systemTest")
    //}
}

node('docker-registry') {


    properties([
            parameters([
                    stringParam(
                            name: 'HASLI_SCHEMATA_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-schemata/master')}.Final",
                            description: 'Hasli Schemata Version'
                    ),

                    stringParam(
                            name: 'HASLI_PERSIST_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-persist/master')}.Final",
                            description: 'Hasli PERSIST Version'
                    ),


                    stringParam(
                            name: 'HASLI_TEST_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-test/master')}.Final",
                            description: 'Hasli test Version'
                    ),

                    stringParam(
                            name: 'HASLI_COMMON_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-common/master')}.Final",
                            description: 'Hasli common Version'
                    ),

                    stringParam(
                            name: 'HASLI_API_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-api/master')}.Final",
                            description: 'Hasli test Version'
                    ),


                    stringParam(
                            name: 'HASLI_HAL_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-hal/master')}.Final",
                            description: 'Hasli HAL Version'
                    ),

                    stringParam(
                            name: 'HASLI_SERVICE_VERSION',
                            defaultValue: "1.0.${valueOf('Hasli/hasli-service/master')}.Final",
                            description: 'Hasli service Version'
                    )
            ])
    ])



    stage('Checkout') {
        checkout scm
        props = []
        props.add("-Phasli-schemata.version=${params.HASLI_SCHEMATA_VERSION}")
        props.add("-Phasli-persist.version=${params.HASLI_PERSIST_VERSION}")
        props.add("-Phasli-test.version=${params.HASLI_TEST_VERSION}")
        props.add("-Phasli-api.version=${params.HASLI_API_VERSION}")
        props.add("-Phasli-service.version=${params.HASLI_SERVICE_VERSION}")
        props.add("-Phasli-common.version=${params.HASLI_COMMON_VERSION}")
        props.add("-Phasli-hal.version=${params.HASLI_HAL_VERSION}")

        timeout(time: 60, unit: 'MINUTES') {
            stage('Build Container') {
                sh "docker build -t hasli.io/build:$version.$buildNumber ."
                sh "chmod +x gradlew"
            }

            stage('Gradle Build / Test') {
                try {
                    dockerRun(
                            "hasli.io/build:$version.$buildNumber",
                            "$version.$buildNumber",
                            "-v `pwd`:/usr/src/ -v ~/.gradle/gradle.properties:/root/.gradle/gradle.properties -v ~/.jspm:/root/.jspm",
                            "sh -c '/usr/src/gradlew ${bomTask} ${props.join(' ')} && /usr/src/gradlew ${gradleTasks.join(" ")} ${props.join(' ')}'",
                            true)
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
                        sh "sed -i.bak 's/^HASLI_NAME=.*/HASLI_NAME=$name-wildfly/' ./web/.env"
                        sh "sed -i.bak 's/^HASLI_VERSION=.*/HASLI_VERSION=$version.$buildNumber/' ./web/.env"
                        sh "sed -i.bak 's/^HASLI_IMAGE=.*/HASLI_IMAGE=hasli.io\\/ui/' ./web/.env"
                        sh "sed -i.bak 's/^AGENT_NAME=.*/AGENT_NAME=$name-agent/' ./web/.env"

                        sh "docker pull $agentImage"
                        sh "docker build --build-arg WILDFLY_VERSION=$wildflyVersion -t $hasliImage:$version.$buildNumber ./web/"
                        sh "cd web && docker-compose -f docker-compose-staging.yml -p $name up -d"
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
                    sh "docker build --build-arg WILDFLY_VERSION=$wildflyVersion --build-arg HASLI_VERSION=$majorVersion.$minorVersion.$buildNumber.$buildSuffix -t $hasliImage:$version.$buildNumber ./web/"
                    sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:$version.$buildNumber"
                    sh "docker tag $hasliImage:$version.$buildNumber $registry/$hasliImage:latest"
                    sh "docker push $registry/$hasliImage:$version.$buildNumber"
                    sh "docker push $registry/$hasliImage:latest"
                }

            }

        }
    }


    stage('update-versions') {
        if(env.BRANCH_NAME == 'master') {
            timeout(time: 60, unit: 'MINUTES') {

                sh "./gradlew uMV -Pprojects=" +
                        "hasli-schemata.version:${params.HASLI_SCHEMATA_VERSION}" +
                        ",hasli-test.version:${params.HASLI_TEST_VERSION}" +
                        ",hasli-common.version:${params.HASLI_COMMON_VERSION}" +
                        ",hasli-api.version:${params.HASLI_API_VERSION}" +
                        ",hasli-service.version:${params.HASLI_SERVICE_VERSION}" +
                        ",hasli-hal.version:${params.HASLI_HAL_VERSION}" +
                        ",hasli-persist.version:${params.HASLI_PERSIST_VERSION}"
                withCredentials([[
                                         $class          : 'UsernamePasswordMultiBinding',
                                         credentialsId   : '7064ef40-7456-45ec-a543-32e5c68cca91',
                                         usernameVariable: 'GIT_USERNAME',
                                         passwordVariable: 'GIT_PASSWORD']]) {

                    sh "git tag -a release-${versionString} -m 'Updating upstream versions'"

                    sh("git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/hasli-projects/hasli-hal --tags")

                }
            }
        }
    }

}

if (env.BRANCH_NAME == "master") {
    node('webserver') {
        stage('Deploy to Production') {
            checkout scm

            try {
                sh "docker stop \$(docker ps -a -q) && docker rm \$(docker ps -a -q)"
            } catch (Exception e) {
            }

            sh "docker pull $registry/$hasliImage:latest"
            sh "docker pull $agentImage"

            sh "cd web && docker-compose up -d"
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
