FROM node:lts-alpine

WORKDIR /home/api

RUN apk add --no-cache openssl
RUN apk add --no-cache --upgrade bash

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package.json yarn.lock ./

RUN yarn

RUN npm install -g pm2
RUN npm install -g ts-node

USER node

COPY --chown=node:node . .

EXPOSE 3333

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
