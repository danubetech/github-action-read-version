FROM node:lts-alpine3.13

LABEL "com.github.actions.name"="Read Version"
LABEL "com.github.actions.description"="Github action to read configuration file and set version as env variable"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="blue"
LABEL "version"="1.0.0"
LABEL "repository"="https://github.com/danubetech/github-action-read-version"
LABEL "maintainer"="Bernhard Fuchs <bernhard.fuchs@danubetech.com>"

RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /github-action-read-version/

COPY app/package.json .
RUN npm install

COPY app/index.js .

CMD node index.js