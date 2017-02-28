# hasli.io



## Building Hasli.io 

The easiest way to build Hasli.io is to use [Docker](https://www.docker.com).  First download and install Docker which is natively supported on Mac, Windows, and Linux.

### Steps to build
1. cd into the Hasli.io root directory and build the Hasli.io build environment container. 

  `cd /path/to/repo && docker build -t hasli.io/build .`

2. After the build environment image is created, cd into `hasli.io/web` directory and build the runtime container.  We'll use the Docker.dev file for developing on Hasli.io as the other Dockerfile is used for production.

  `cd web && docker build -t hasli.io/ui-dev -f Dockerfile.dev`

3. Once both images have been created you can run the hasli.io/ui-dev image to build and deploy the application. You'll want to be sure to mount the entire repository into the container as it will execute the gradle build process for getting everything setup and all of the dependencies requires resolved.

  `docker run -p 32770:8080 -v /path/to/hasli.io/:/usr/src/ hasli.io/ui-dev`
  
  After starting the container and if everything built correctly, hasli.io will be deployed to [http://localhost:32770/dev/](http://localhost:32770/dev/). You can change the port mapping to any available port on your system as long as it maps to port 8080 inside the container.
  

### Watching changes with Gulp
To watch any changes made and automatically deploy the changes, we use `gulp`.  Change directory into `hasli.io/web/web-ui` and run `gulp`.  This will automatically build and watch for changes to markup, styles, code etc. and redeploy the changes.

### Stopping and removing containers

  `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`
  
