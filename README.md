# sunshower-ui



## Building

The recommended way to build and deploy sunshower-ui is to use [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/).  



### Steps to build for developing on sunshower-ui
1. cd into the sunshower-ui respository and run: 

    `docker-compose -f common-services.yml build build-env`
    
2. For now you need to authenticate your system with Dockerhub as the other images required are currently in private repositories:

    `docker login`

3. Now you can build the project and stand up the additional services required by running:
    
    `docker-compose -f docker-compose-dev.yml -p dev up -d`
    
You can tail the build process by running `docker-compose -f docker-compose-dev.yml -p dev logs -f` which will tail the logs of all services. If you just want to see the build output run `docker-compose -f docker-compose-dev.yml -p dev logs -f ui`
    
If everything successfully built, you should have a running environment ready for development. This will spin up four services:
    
    1. proxy
    2. ui
    3. web-services
    4. db
    
You can view the service statuses by running `docker-compose -f docker-compose-dev.yml -p dev ps`. The ui service loads the sunshower-ui src and executes `npm install && jspm install -y && gulp` for you, which is all that is required to spin up the ui.  Any changes at this point made to the src will be picked up and loaded automatically with gulp.
 
If everything built without errors, you can pull up a browser and navigate to: [http://localhost:32770/](http://localhost:32770/)

### Running production like builds locally (useful for testing the bundling process)

1. First you need to build the war which will bundle the ui:

    `docker-compose -f common-services.yml run --rm build-war`
    
2. Now build the production Docker image which adds the war and runs it:

    `docker-compose -f common-services.yml build ui`

3. Run a prod like deployment:

    `docker-compose -p prod-like up -d`
     
This will spin up a prod like environment with the proxy listenting on ports 80 and  443. All traffic gets redirected over to https.

### Stopping and removing containers

`docker-compose -f docker-compose-dev.yml -p <dev|prod-like> down`
  
  
