#!/usr/bin/env groovy

def majorVersion   = "1"
def minorVersion   = "0"
def buildNumber    
def buildSuffix    = "Final"
def version        = "$majorVersion.$minorVersion"
def registry       = "10.0.4.51:5000"
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
        "build"
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
                    sh "docker build -t hasli.io/ui:$version.$buildNumber ./web/"
                    dockerRun(
                            "hasli.io/ui:$version.$buildNumber",
                            name,
                            "-d -P",
                            "",
                            false)
                }

                stage('Deployment Summary') {
                    sh "printf 'IP Address: ' && docker inspect -f '{{.NetworkSettings.IPAddress}}' $name"
                    sh "printf 'Ports: ' && docker inspect --format='{{range \$p, \$conf := .NetworkSettings.Ports}} {{\$p}} -> {{(index \$conf 0).HostPort}} {{end}}' $name"
                }
            } else {
                sh "docker build --build-arg HASLI_VERSION=$majorVersion.$minorVersion.$buildNumber.$buildSuffix -t hasli.io/ui:$version.$buildNumber ./web/ --no-cache"
                sh "docker tag hasli.io/ui:$version.$buildNumber $registry/hasli.io/ui:$version.$buildNumber"
                sh "docker tag hasli.io/ui:$version.$buildNumber $registry/hasli.io/ui:latest"
                sh "docker push $registry/hasli.io/ui:$version.$buildNumber"
                sh "docker push $registry/hasli.io/ui:latest"
            }

        }

    }

}

if (env.BRANCH_NAME == "master") {
    node('webserver') {
        stage('Deploy to Production') {
            try {
                sh "docker ps --filter status=running --format '{{.ID}}' | xargs docker stop"
            } catch (Exception e) { }

            sh "docker pull $registry/hasli.io/ui:$version.$buildNumber"

            dockerRun(
                    "$registry/hasli.io/ui:$version.$buildNumber",
                    "hasli.io.$version.$buildNumber",
                    "-d -p 8080:8080",
                    "",
                    false)
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