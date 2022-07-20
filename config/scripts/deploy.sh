#!/bin/bash
docker-compose pull api
docker-compose up --build
docker-compose exec -T nginx nginx -s reload 