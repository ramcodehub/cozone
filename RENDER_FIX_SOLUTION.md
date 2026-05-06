# Render Deployment Fix for CoZone Backend

## Issue Analysis

The error you're encountering is:
```
Error: Cannot find module './common'
Require stack:
- /opt/render/project/src/backend/node_modules/debug/src/node.js
...
```

This is a common issue that occurs due to:
1. Node.js version incompatibility
2. Corrupted node_modules cache
3. Missing build scripts

## Solution

### 1. Add Environment Variables in Render Dashboard

Go to your Render service settings and add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_VERSION` | `18.17.0` | Ensures compatibility with dependencies |
| `GEMINI_API_KEY` | `your_actual_gemini_api_key` | **Required** for AI functionality |
| `PORT` | `10000` | Render's default port |

### 2. Update Your package.json

Add these scripts to your backend/package.json:

```json
{
  "name": "cozone-backend",
  "version": "1.0.0",
  "description": "Backend for CoZone AI assistant",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm install",
    "clean-install": "rm -rf node_modules package-lock.json && npm install"
  },
  "engines": {
    "node": "18.17.0"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@supabase/supabase-js": "^2.87.0",
    "axios": "^1.13.2",
    "body-parser": "^2.2.1",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "express-rate-limit": "^8.2.1",
    "node-fetch": "^3.3.2",
    "nodemailer": "^7.0.11"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

### 3. Add a render.yaml file to your backend directory

Create a file named `render.yaml` in the backend directory:

```yaml
services:
  - type: web
    name: cozone-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18.17.0
```

### 4. Update Your Render Service Configuration

In your Render service settings, make these changes:

1. **Build Command**: `npm run clean-install`
2. **Start Command**: `npm start`
3. **Environment Variables**:
   - `NODE_VERSION`: `18.17.0`
   - `GEMINI_API_KEY`: `your_actual_gemini_api_key`
   - `PORT`: `10000`

### 5. Clear Cache and Redeploy

1. In Render Dashboard, go to your service
2. Click "Manual Deploy"
3. Select "Clear build cache & deploy"

### 6. Alternative Solution: Use Docker

If the above doesn't work, create a Dockerfile in your backend directory:

```dockerfile
FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10000

CMD ["npm", "start"]
```

Then in Render:
1. Change Runtime to "Docker"
2. Build Command: Leave empty
3. Start Command: Leave empty

## Prevention Tips

1. Always specify Node.js version in environment variables
2. Regularly update dependencies
3. Test locally before deploying
4. Use the same Node.js version locally and in production

## Debugging Steps

If issues persist:

1. Check logs in Render Dashboard
2. Verify all environment variables are set
3. Ensure GEMINI_API_KEY is valid
4. Test locally with `npm start`
5. Check that server.js exists and is properly formatted

This should resolve the MODULE_NOT_FOUND error and get your CoZone backend running on Render.