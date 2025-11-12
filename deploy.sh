#!/bin/bash

SERVICE_NAME=$1

NVM_DIR=${NVM_DIR:-$HOME/.nvm}

wait_stack_creation_completed() {
  STACK_NAME=$1
  echo "Waiting for $STACK_NAME to be completed"
  STATUS=$(aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME")
  if [[ ${STATUS} -ne 0 ]]; then

    echo "Creation has failed $STATUS"
    exit ${STATUS}
  fi
}

wait_stack_update_completed() {
  STACK_NAME=$1
  echo "Waiting for $STACK_NAME to be completed"
  STATUS=$(aws cloudformation wait stack-update-complete --stack-name "$STACK_NAME")
  if [[ ${STATUS} -ne 0 ]]; then

    echo "Creation has failed $STATUS"
    exit ${STATUS}
  fi
}

build_app() {
  $NVM_DIR/nvm.sh install 25
  $NVM_DIR/nvm.sh use 25
  npm ci
  npm run build || exit 1
}

STACK_EXISTS=$(aws cloudformation describe-stacks --stack-name "$SERVICE_NAME" || echo "create")
if [ "$STACK_EXISTS" == "create" ]; then
  aws cloudformation create-stack --stack-name "$SERVICE_NAME" --template-body file://cfn/spa.cfn.yaml --parameters ParameterKey=SpaName,ParameterValue=$SERVICE_NAME
  wait_stack_creation_completed "$SERVICE_NAME"
else
  WAIT_FOR_UPDATE=$(aws cloudformation update-stack --stack-name "$SERVICE_NAME" --template-body file://cfn/spa.cfn.yaml --parameters ParameterKey=SpaName,UsePreviousValue=true || echo "no updates")
  if [ "$WAIT_FOR_UPDATE" != "no updates" ]; then
    wait_stack_update_completed "$SERVICE_NAME"
  fi
fi

build_app
S3_BUCKET=$(aws cloudformation describe-stacks --stack-name "$SERVICE_NAME" --output text  --query 'Stacks[0].Outputs[?OutputKey==`S3Bucket`].OutputValue')
aws s3 sync dist s3://${S3_BUCKET} --delete
DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name "$SERVICE_NAME" --output text  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue')
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
SITE_URL=$(aws cloudformation describe-stacks --stack-name "$SERVICE_NAME" --output text  --query 'Stacks[0].Outputs[?OutputKey==`SiteUrl`].OutputValue')

echo "============================================"
echo "Visit: https://$SITE_URL"
echo "============================================"

