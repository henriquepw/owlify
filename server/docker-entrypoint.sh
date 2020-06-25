#!/bin/sh

dockerize -wait tcp://owlify_pg:5432 -wait tcp://owlify_influx:8086 -timeout 300s

yarn typeorm migration:run

yarn build

pm2-runtime ./dist/shared/infra/http/server.js
