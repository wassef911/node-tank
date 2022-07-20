FROM node:14.19.1-alpine

RUN apk update && apk add bash

RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++

COPY package*.json /tmp/

RUN npm install -g yarn --force

RUN yarn global add @nestjs/cli typescript ts-node

RUN cd /tmp && yarn --prod --network-timeout 1000000000 --ignore-scripts --frozen-lockfile

COPY . /app/
RUN cp -a /tmp/node_modules /app/

COPY ./config/scripts/wait-for-it.sh /opt/wait-for-it.sh
COPY ./config/scripts/startup.sh /opt/startup.sh

WORKDIR /app
RUN npm run build

CMD ["/bin/bash", "/opt/startup.sh"]
