#!/usr/bin/env groovy

def majorVersion   = "1"
def minorVersion   = "0"
def buildNumber    
def buildSuffix    = "Final"
def version        = "$majorVersion.$minorVersion"
def registry       = "10.0.4.51:5000"
def hasliImage     = "hasli.io/ui"
def agentVersion   = "latest"
def agentImage     = "$registry/hasli/agent:$agentVersion"
def runSystemTests = false
def bomTask      
def gradleTasks    = []

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

    stage('Checkout') {
        checkout scm
    }

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
					"sh -c '/usr/src/gradlew ${bomTask} && /usr/src/gradlew ${gradleTasks.join(" ")}'",
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
                    sh "docker build -t $hasliImage:$version.$buildNumber ./web/"
                    sh "cd web && docker-compose -f docker-compose-staging.yml up -d"
                }

                stage('Deployment Summary') {
                    def portMapping = sh returnStdout: true, script: "docker inspect --format='{{range \$p, \$conf := .NetworkSettings.Ports}} {{\$p}} -> {{(index \$conf 0).HostPort}} {{end}}' $name-wildfly"
                    portMapping = portMapping.trim()
                    def port = portMapping.split(/\s->\s/)[1]    
                    def pr = env.BRANCH_NAME.split("-")[1].trim()
                    def pat = readFile('/root/.pat').trim()

                    sh "curl -H \"Content-Type: application/json\" -u dlish:$pat -X POST -d '{\"body\": \"BUILD: ${JOB_NAME}:${env.BUILD_NUMBER} - Deployment can be viewed at 10.0.4.51:$port - Port Mapping: $portMapping\"}' https://api.github.com/repos/hasli-projects/hasli.io/issues/$pr/comments"

                    echo "Port Mapping: $portMapping"
                }
            } else {
                sh "docker build --build-arg HASLI_VERSION=$majorVersion.$minorVersion.$buildNumber.$buildSuffix -t $hasliImage:$version.$buildNumber ./web/ --no-cache"
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

            try {
                sh "docker stop \$(docker ps -a -q) && docker rm \$(docker ps -a -q)"
            } catch (Exception e) { }

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
