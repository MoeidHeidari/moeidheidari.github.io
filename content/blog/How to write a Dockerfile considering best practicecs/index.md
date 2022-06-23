---
title: How to write a Dockerfile considering best practicecs
date: 2022-06-24 17:42:00
author: Moeid Heidari
tags: ["Docker", "Docker-file","Best practicecs","Multi-stage-docker"]
---

## Introduction

In this article we will go through a list of best practices to write a Dockerfile to containerize your projects regardless to the technology and programming language used.

Firstly lets see why we need to containerize our projects and why we should use docker or in one word why we do need Dockerization (Containerization + Docker).

As for Portability we can deploy our containerized application to any other systems where we can find a container engine system installed without being worry about the dependencies and required tools the application depends on. When we prefer containers to virtual machines actually we loook to have a quicker to start, faster to create, and a system with much smaller footprints. These properties of a container system means that it bring a higher performance. We can also be confident about the Agility and responsiveness of your software development process while using containers. When we talk about Isolation again containerization takes our attention as it Isolates what ever required to run the application as a block box. It is also scalable as it is possible to create an unlimitted number of instantiations without any conflict with each other. Overall these properties of a containerized application helps us to make a container orchestration system dream come true in the future.

Docker as an open platform for developing, shipping, and running applications has almost all the features we expect from a container engine. It is an OS-level virtualization and it has a much smaller footprints compared virtual machines which are a copy of the whole OS kernel. It means docker would use the same kernel on your machine and just makes the application layer for us.

To deploy our applications as a docker container we need to write a Dockerfile for the project containing all the configuration to fetch, build and run all the dependencies of our project.

Below you can see a Dockerfile example which is the most simple one.

```Dockerfile
FROM ubuntu:18.04

COPY . /app

RUN make /app

CMD python /app/app.py
```

First line fetches the operating system required for our environment. COPY copies the source code of our project in to the docker image we want to build. Following that we use RUN to execute a command and in this example it makes the application. CMD runs a command line code, it can be used to execute the service from an entrypoint.

When we run an Image and generate a container based on, we actually add a new layer (Container layer) on top of the undelying layers.All changes made to the running container, such as writing new files, modifying existing files, and deleting files, are written to this writable container layer.

## Dockerfile best practices

Most probably you have different environment in your software development jurney.(Development, Staging, Pre-production, Production,... etc). By taking it to the consideration we don't to copy all the files in our project to a docker container while we just want to run it on a specific environment.

Use Multi-stage build in your Dockerfile to just copy the necessasry artifacts to an environment. For example if you are shipping to a production environment lots of build-time dependencies and files are redundant and not needed for running your application. With this multi-stage build these resources can be used just when the runtime environment contains only what's required and necessary. In another word multi-stage builds ar a promissing way to get rid of what is called overweight and security threats.

Example Of a Dockerfile for multi-stage builds

```Dockerfile
FROM node:12.19.0-alpine3.9 AS development

ARG NODE_ENV=deevelopment
ENV NODE_ENV=${NODE_ENV}
ARG NODE_PORT=8085
ENV NODE_PORT=${NODE_PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG NODE_PORT=8085
ENV NODE_PORT=${NODE_PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
```

## Dont write the container as root user

It is a common mistake to run a docker container as rooot user unless wou are in a very force situation that is even very rare to happen. Thus it is better to include the user instruction to change the defaault UID to a non-root user.

Additionnally the execution environment may block ccontainers as a root user. To run a docker container as a non-root user we need to go through a ccouple of steps inside the Dockerfile. At first we need to make sure that th user specified in the 'User' instruction exists inside the container and then we need to provide the file system permission at the place where the process will be reading or writting from/to the file.

Example

```dockerfile
RUN adduser -D {user_name} && shown -R {user_name} /{data_directory}
# COPY application files here
USER {user_name}
ENTYPOINT ["/app"]
```

At first container will start as root user and then it will change to the standard user that we recently created.

full docker file example

```dockerfile
FROM node:fermium-alpine AS environment


ARG MS_HOME=/app
ENV MS_HOME="${MS_HOME}"

ENV MS_SCRIPTS="${MS_HOME}/scripts"

ENV USER_NAME=node USER_UID=1000 GROUP_NAME=node GROUP_UID=1000

WORKDIR "${MS_HOME}"

# Build
FROM environment AS develop

COPY ["./package.json", "./package-lock.json", "${MS_HOME}/"]

FROM develop AS builder
COPY . "${MS_HOME}"


RUN PATH="$(npm bin)":${PATH} \
  && npm ci \
  && npm run test:ci \
  && npm run test:e2e \
  && npm run-script build \
  # Clean up dependencies for production image
  && npm install --frozen-lockfile  --production && npm cache clean --force

# Serve
FROM environment AS prod


COPY ["./scripts/docker-entrypoint.sh", "/usr/local/bin/entrypoint"]
COPY ["./scripts/bootstrap.sh", "/usr/local/bin/bootstrap"]
COPY --from=builder "${MS_HOME}/node_modules" "${MS_HOME}/node_modules"
COPY --from=builder "${MS_HOME}/dist" "${MS_HOME}/dist"

RUN  \
  apk --update add --no-cache tini bash \
  && deluser --remove-home node \
  && addgroup -g ${GROUP_UID} -S ${GROUP_NAME} \
  && adduser -D -S -s /sbin/nologin -u ${USER_UID} -G ${GROUP_NAME} "${USER_NAME}" \
  && chown -R "${USER_NAME}:${GROUP_NAME}" "${MS_HOME}/" \
  && chmod a+x \
    "/usr/local/bin/entrypoint" \
    "/usr/local/bin/bootstrap" \
  && rm -rf \    
    "/usr/local/lib/node_modules" \
    "/usr/local/bin/npm" \
    "/usr/local/bin/docker-entrypoint.sh"
USER "${USER_NAME}"


EXPOSE 8085

ENTRYPOINT [ "/sbin/tini", "--", "/usr/local/bin/entrypoint" ]

```

### Attach root user to the executable file but not writable

It is best practice if you bind all the executables inside a docker file to the root user (make root as the owner of the executables) but it shouldn't be world-writable.

This technique doesn't let the executing user to modify the binaries or scripts that can cause lots of security issues and open the door for the attackers. This operation effectively enforcecs the container immutability which does not update the code automatically at runtime.In this way, you can prevent your running application from being accidentally or maliciously modified.

Example

```dockerfile
...
WORKDIR $APP_HOME
COPY --chown=user:user app-files/ /app
USER app
ENTRYPOINT /app/app-entrypoint.sh
```

### Keep the image as minimal as possible

It is a best practice if you avoid adding unnecessary file,, packages, or exposing unecessary ports to reduce the attack surface. As you export your system more you will make the image mainainence harder and you expose your system more particulary the resources and components which are not in your control.

### Avoid confidential data leaks

When dealing with containers be careful about your confidential data.

Never put any credential or secret inside the Dockerfile instructions (Hardcoded inside the Dockerfile). Becareful about the files that get copied inside a docker container. They can be accessible from the previous layer even if you delete them in later instructions inside the Dockerfile. To have access to credentiaal information you can bind them to an external environment variable, then you can fill them using a secure mechanism such as Docker secret or Kubernetes secrets. It is also recommended to use a configuration file and bind moun it in docker or easily mount them from a Kubernetes Configmap or secret.

### build dockerignore and context

Lets take a look at the following instruction to build a docker image

```bash
docker build -t {image_name} .
```

Using '.' is a suicide. using it as a context is dangerous as you are copying everything including credentials and unnecessary files into the container such as configuration files, credentials, backups, lock files, temporary files, sources, subfolders, dotfiles,etc.

If we have such an instruction inside our Dockerfile

```dockerfile
COPY . /app
```

this will copy **EVERYTHING** inside the build context including Dockerfile itself also. It is a best practice if create a sub-directory and have anything which is required to be copied to the container in this sub-directory.

```bash
docker build -t {image_name} sub-directory/
```

It will be more beautiful if you create a .dockerignore file and explicitly exclude unnecessary files and directories.

To be continued....

tell me what else we can apply as best practice?