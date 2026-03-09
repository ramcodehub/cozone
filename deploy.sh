#!/bin/bash

LOG_FILE="../deploy-log.txt"

echo "======================================" > "$LOG_FILE"
echo "Starting Deployment: $(date)" >> "$LOG_FILE"
echo "======================================" >> "$LOG_FILE"

# 1. Install frontend dependencies
echo "Installing frontend dependencies..." | tee -a "$LOG_FILE"
cd frontend
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not found in PATH on Plesk." | tee -a "$LOG_FILE"
    echo "Current PATH: $PATH" | tee -a "$LOG_FILE"
    exit 1
fi

echo "Running npm install..." | tee -a "$LOG_FILE"
npm install >> "$LOG_FILE" 2>&1

# 2. Build frontend
echo "Building frontend..." | tee -a "$LOG_FILE"
npm run build >> "$LOG_FILE" 2>&1

# 3. Copy build output to root
echo "Copying built frontend to root..." | tee -a "$LOG_FILE"
# We copy everything inside dist (including hidden files like .htaccess) to root
cp -r dist/. ../ >> "$LOG_FILE" 2>&1

echo "Deployment completed successfully! $(date)" | tee -a "$LOG_FILE"
