#!/bin/sh

dockerize -wait tcp://owlify_pg:5432 -wait tcp://owlify_influx:8086 -timeout 300s

yarn dev
