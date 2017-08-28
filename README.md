# API Documentation


This directory holds the HTML, CSS JQuery/JS and Markdown as well as Docker configuration files responsible for hosting or building the EEN API Documentation


# Prerequisites


The Environments depend on the following to be installed:

  - `docker`
  - `docker-compose`


# Running the Development Environment


```shell
# one time rename to implement the override file holding the development env config
mv docker-compose.override.yml.dev docker-compose.override.yml

# only needed here if docker-compose has not been correctly stopped, use after each `docker-compose up`
docker-compose down

# builds and executes the docker image
docker-compose up
```

*NOTE: Middleman was not designed to run on virtual clients or within docker and might sometimes display irregular behavior*


# Running the Production Environment


```shell
# only needed here if docker-compose has not been correctly stopped, use after each `docker-compose up`
docker-compose down

# builds and executes the docker image, this will show output in current window
docker-compose up

    # this will run in detach mode, use in place of `docker-compose up`
    docker-compose up -d

# list containers
docker ps

# shell into the container
docker exec -it <container> /bash

# fetch the logs from the container
docker logs -f <container>
```
