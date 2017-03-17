# hasli-web



## Building

The easiest way to build and deploy hasli-web is to use [Docker](https://www.docker.com).  First download and install Docker which is natively supported on Mac, Windows, and Linux.

### Steps to build
1. cd into the hasli-web root directory and build the build environment container. 

    `docker build -t hasli-web/build-env -f resources/Dockerfile.build .`

2. After the build environment image is created, we'll use the Docker.dev file for developing.

    `docker build -t hasli-web/web-dev -f resources/Dockerfile.dev .`

3. Once the dev image has been created you can run the hasli-web/web-dev image to build and deploy the application. You'll want to be sure to mount the entire repository into the container as it will execute the gradle build process for getting everything setup and all of the dependencies resolved.

    ```docker run -v ~/.gradle/caches:/root/.gradle/caches -v `pwd`:/usr/src/ -p 32770:8080 hasli-web/web-dev```
  
  After starting the container and if everything built correctly, hasli.io will be deployed to [http://localhost:32770](http://localhost:32770). You can change the port mapping to any available port on your system as long as it maps to port 8080 inside the container. The ui won't work without also running the hasli-web services.
  
### Watching changes with Gulp
To watch any changes made and automatically deploy the changes, we use `gulp`.  Change directory into `hasli.io/web/web-ui` and run `gulp`.  This will automatically build and watch for changes to markup, styles, code etc. and redeploy the changes.


### Docker compose

We use docker-compose to run both the hasli-ui project (front-end stuff) with hasli-web (services). Follow the steps in hasli-ui for getting the images created. Once you have both `hasli-ui/ui-dev:latest` and `hasli-web/web-dev:latest` you can run:

`docker-compose -f resources/docker-compose-dev.yml up -d --build`
    
This will spin up both containers and link everything up. After everything is started you will be able to access the ui from [http://localhost:32770](http://localhost:32770). You can change the port mapping to any available port on your system as long as it maps to port 8080 inside the container.

### Stopping and removing containers

  `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`
  
