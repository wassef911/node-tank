#!/bin/bash
# this runs inside the api:3001 
/opt/wait-for-it.sh database:5432 -- yarn run migration:run
yarn run start:prod