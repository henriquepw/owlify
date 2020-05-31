#!/bin/sh

dockerize -wait tcp://owlify_pg:5432 -wait tcp://owlify_influx:8086 -timeout 300s

yarn typeorm migration:run

if [ "$1" == "production" ];
then
  yarn build
  yarn start
  yarn pm2 monit
else
  yarn dev
fi
