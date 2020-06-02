#!/bin/sh

dockerize -wait tcp://owlify_pg:5432 -wait tcp://owlify_influx:8086 -timeout 300s

yarn typeorm migration:run

pm2-runtime ts-node -- -r tsconfig-paths/register --files ./src/shared/infra/http/server.ts
