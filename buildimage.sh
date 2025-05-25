#!/bin/bash
set -a  # export all variables
source .env
set +a

docker build \
  --build-arg VITE_AWS_REGION=$VITE_AWS_REGION \
  --build-arg VITE_AWS_USER_POOL_ID=$VITE_AWS_USER_POOL_ID \
  --build-arg VITE_AWS_USER_POOL_CLIENT_ID=$VITE_AWS_USER_POOL_CLIENT_ID \
  --build-arg VITE_DOCUMENTDB_URI="$VITE_DOCUMENTDB_URI" \
  --build-arg VITE_DOCUMENTDB_DBNAME=$VITE_DOCUMENTDB_DBNAME \
  --build-arg VITE_BACKEND_URL=$VITE_BACKEND_URL \
  --build-arg VITE_GOOGLE_GEMINI_API_KEY=$VITE_GOOGLE_GEMINI_API_KEY \
  -t educonnect-app .
