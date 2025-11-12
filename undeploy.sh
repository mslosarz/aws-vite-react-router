#!/bin/bash

SERVICE_NAME=$1

S3_BUCKET=$(aws cloudformation describe-stacks --stack-name "$SERVICE_NAME" --output text  --query 'Stacks[0].Outputs[?OutputKey==`S3Bucket`].OutputValue')
echo "Cleaning... ${S3_BUCKET}"

aws s3api list-object-versions --bucket "${S3_BUCKET}" \
     --output json --query 'Versions[].[Key, VersionId]' \
     | jq -r '.[] | "--key '\''" + .[0] + "'\'' --version-id " + .[1]' \
     | xargs -L1 aws s3api delete-object --bucket "${S3_BUCKET}"
aws cloudformation delete-stack --stack-name "$SERVICE_NAME"
echo "Waiting for ${SERVICE_NAME} to be removed"
STATUS=$(aws cloudformation wait stack-delete-complete --stack-name "SERVICE_NAME")
echo "Stack ${SERVICE_NAME} removed with status ${STATUS}"


