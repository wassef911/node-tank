#!/bin/bash
apk add openssh-client
eval $(ssh-agent -s)
echo "$SSH_DEV_PRIVATE_KEY" | tr -d '\r' | ssh-add -
mkdir -p ~/.ssh
chmod 700 ~/.ssh