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
# We copy everything inside dist (including hidden files like .htaccess) to root
cp -r dist/. ../

echo "Deployment completed successfully!"
