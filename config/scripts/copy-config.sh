if [ $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "master" ]
then
   scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r ./config/** $USERNAME@$HOST_PROD:/home/nodetank/
else
   scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r ./config/** $USERNAME@$HOST_DEV:/home/nodetank/
fi