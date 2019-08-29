# API Documentation


This directory holds the HTML, CSS JQuery/JS and Markdown as well as Docker configuration files responsible for hosting or building the EEN API Documentation


# Dependencies

The Environment(s) depends on the following to be installed:

  - [docker](https://docs.docker.com/engine/installation/)
  - [docker-compose](https://docs.docker.com/compose/install)

## Post installation

### Linux

By default docker.service is root only, this can be resolved by adding the user to the docker group

``` bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Please read the [documentation](https://docs.docker.com/engine/installation/linux/linux-postinstall) for further troubleshooting

# Running the Development Environment


```shell
# one time rename to implement the override file holding the development env config
mv docker-compose.override.yml.dev docker-compose.override.yml

# only needed here if docker-compose has not been correctly stopped, use after each `docker-compose up`
docker-compose down

# build the docker image
docker-compose build

# execute the docker image
docker-compose up
```

Routing a URL to this container is required in order to access through browser.  Add an entry
such as `apidocs.dev.eagleeyenetworks.com` to the localhost aliasing entry in /etc/hosts.  A
typical entry might look like the following:
`127.0.0.1       localhost login.dev.eagleeyenetworks.com c001.dev.eagleeyenetworks.com eenadmin.dev.eagleeyenetworks.com apidocs.dev.eagleeyenetworks.com`

The API docs can now be accessed through a browser at port 4567.  For example, if a local
host alias of `apidocs.dev.eagleeyenetworks.com` was used, then docs can be accessed at
`http://apidocs.dev.eagleeyenetworks.com:4567/`.

*NOTE: Middleman was not designed to run on virtual clients or within docker and might sometimes display irregular behavior*


# Running the Production Environment


```shell
# only needed here if docker-compose has not been correctly stopped, use after each `docker-compose up`
docker-compose down

# build the docker image
docker-compose build

# execute the docker image, this will show output in current window
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
