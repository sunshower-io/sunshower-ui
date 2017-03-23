# hasli-ui



## Building

The easiest way to build and deploy hasli-ui is to use [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/).  

### Note

Until we get an official Docker registry setup you'll have to manually build [hasli-web](https://github.com/hasli-projects/hasli-web) using a similar process so that the images are available locally on your system

### Steps to build 
1. cd into the hasli-ui directory and build all of the containers using Gradle. 

    `./gradlew buildImages`
    
    This will build 3 images, `hasli-ui/ui`, `hasli-ui/ui-dev`, and `hasli-ui/build-env`.  

2. cd into the resources directory and run docker-compose (at this point if you haven't built the hasli-ui images, do so now)

    `docker-compose -f docker-compose-dev.yml up -d`
    
3. Tail the logs to ensure everything is building properly
    
    `docker-compose -f docker-compose-dev.yml logs -f`
    
This will spin up three containers:
    
    1. proxy
    2. hasli-ui
    3. hasli-ui
    
By default it will only expose the proxy container ports on your system (defaults to port 32770 for http and 32771 for https). The proxy container is responsible for handling all requests.    

 
If everything built without errors, you can pull up a browser and navigate to: [http://localhost:32770/dev/](http://localhost:32770/dev/)

### Watching changes with Gulp

To watch any changes made and automatically deploy the changes, we use `gulp`.  If you have npm and gulp installed locally on your system, you can just cd into `hasli-ui/web-ui` and run `gulp`.  This will automatically build and watch for changes to markup, styles, code etc. and redeploy the changes.

If you don't have npm or gulp installed locally, you can run it from the running container.

1. `docker exec -it hasli-ui /bin/bash`
2. `cd /usr/src/web-ui`
3. `gulp`

That will run gulp inside the container so no dependencies are required locally on your system.

### Stopping and removing containers

`docker-compose -f docker-compose-dev.yml down`
  
  
