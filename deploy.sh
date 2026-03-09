#!/bin/bash

echo "Starting Deployment..."

# 1. Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install

# 2. Build frontend
echo "Building frontend..."
npm run build

# 3. Copy build output to root
echo "Copying built frontend to root..."
# The build output is in frontend/dist
# We copy context of dist directly into root
cp -r dist/* ../

echo "Deployment completed successfully!"
