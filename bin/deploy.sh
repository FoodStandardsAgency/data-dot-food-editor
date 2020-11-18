#!/usr/bin/env bash

# This script builds a data.food editor deployment and pushes it to
# an S3 bucket as either dev, staging, or production

DEV_ENV=dev
STAGING_ENV=staging
PROD_ENV=production

TARGET=${TARGET:-$DEV_ENV}
DIST_FILE=data-dot-food-editor.tgz

echo "${DEV_ENV} ${STAGING_ENV} ${PROD_ENV}" | grep -w -q ${TARGET}
if [ $? -ne 0 ]; then
  echo "${TARGET} is not a recognised deployment target"
  exit 1
fi

echo "Deploying data.food editor to ${TARGET} environment"

rm -rf dist/*
NODE_ENV=production PUBLIC_PATH=. yarn build

if [ $? -ne 0 ]; then
  echo "Build step failed. Please check the output and try again"
  exit 1
fi

# Copy additional files
cp public/htaccess dist/.htaccess
cp -R static dist

tar  -C dist -czf ${DIST_FILE} .

echo Distribution archive created. Copying to S3.

AWS_PROFILE=${AWS_PROFILE:-fsa}

aws --profile ${AWS_PROFILE} s3 cp ${DIST_FILE} \
  s3://fsa-dms-deploy/software/data-dot-food/${TARGET}/${DIST_FILE}

if [ $? -ne 0 ]; then
  echo "AWS S3 copy step failed. Please check your AWS credentials and try again"
  exit 1
else
  echo "Done."
fi
