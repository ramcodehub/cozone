# CoZone Deployment Guide

This guide provides detailed instructions for deploying the CoZone project with:
- Frontend on GoDaddy hosting
- Backend on Render

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment (Render)](#backend-deployment-render)
  - [Step 1: Prepare Environment Variables](#step-1-prepare-environment-variables)
  - [Step 2: Create Render Account](#step-2-create-render-account)
  - [Step 3: Deploy to Render](#step-3-deploy-to-render)
  - [Step 4: Configure Environment Variables on Render](#step-4-configure-environment-variables-on-render)
- [Frontend Deployment (GoDaddy)](#frontend-deployment-godaddy)
  - [Step 1: Build the Frontend](#step-1-build-the-frontend)
  - [Step 2: Configure API Endpoint](#step-2-configure-api-endpoint)
  - [Step 3: Upload Files to GoDaddy](#step-3-upload-files-to-godaddy)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deployment, ensure you have:

1. **Backend Requirements:**
   - Google AI Studio API key for Gemini
   - (Optional) Supabase account for enhanced features
   - Render account

2. **Frontend Requirements:**
   - GoDaddy hosting account with cPanel access
   - Node.js installed locally (for building)
   - FTP client (e.g., FileZilla)

3. **General Requirements:**
   - Git installed
   - Code editor
   - Terminal/command prompt

## Backend Deployment (Render)

### Step 1: Prepare Environment Variables

Before deploying, collect the following information:

1. **Google Generative AI API Key:**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create an API key for Gemini

2. **(Optional) Supabase Credentials:**
   - Project URL
   - Service Role Key

### Step 2: Create Render Account

1. Visit [Render](https://render.com)
2. Sign up for a free account or log in if you already have one
3. Verify your email address

### Step 3: Deploy to Render

Option 1: Connect GitHub Repository (Recommended)

1. From your Render dashboard, click "New Web Service"
2. Connect your GitHub account when prompted
3. Select the repository containing the CoZone backend
4. Configure the service:
   - Name: `cozone-backend`
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
   - Plan: Free (or select a paid plan for production)
5. Click "Create Web Service"

Option 2: Manual Deployment

1. From your Render dashboard, click "New Web Service"
2. Select "Public Git repository"
3. Enter the repository URL: `https://github.com/ramcodehub/cozone.git`
4. Set the root directory to `backend`
5. Configure the service:
   - Name: `cozone-backend`
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
   - Plan: Free (or select a paid plan for production)
6. Click "Create Web Service"

### Step 4: Configure Environment Variables on Render

1. After deployment starts, go to the service page
2. Click on "Environment" in the sidebar
3. Add the following environment variables:
   ```
   GEMINI_API_KEY=your_google_ai_studio_api_key
   PORT=10000
   SUPABASE_URL=your_supabase_project_url (optional)
   SUPABASE_SERVICE_KEY=your_supabase_service_key (optional)
   NODE_VERSION=18.17.0
   ```
4. Click "Save Changes"
5. Render will automatically redeploy with the new environment variables

Note the URL provided by Render (e.g., `https://cozone-backend.onrender.com`) as you'll need it for frontend configuration.

## Frontend Deployment (GoDaddy)

### Step 1: Build the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the production version:
   ```bash
   npm run build
   ```

4. This creates a `dist` folder with all the production files needed for deployment.

### Step 2: Configure API Endpoint

Before uploading, update the API endpoint in your frontend code:

1. Locate the API configuration file (typically in `src/config/api.js` or similar)
2. Update the backend URL to point to your Render deployment:
   ```javascript
   // Example configuration
   const API_BASE_URL = 'https://your-render-app-name.onrender.com';
   ```

3. Rebuild the frontend:
   ```bash
   npm run build
   ```

### Step 3: Upload Files to GoDaddy

1. **Access GoDaddy Hosting:**
   - Log in to your GoDaddy account
   - Navigate to "My Products" > "Web Hosting"
   - Select your hosting plan and click "Manage"

2. **Access File Manager or Use FTP:**
   Option A: File Manager
   - In cPanel, find and open "File Manager"
   - Navigate to `public_html` or your desired subdirectory
   
   Option B: FTP
   - Use an FTP client like FileZilla
   - Connect using your GoDaddy FTP credentials
   - Navigate to the root directory (usually `public_html`)

3. **Upload Files:**
   - Upload all contents from the `frontend/dist` folder to your hosting directory
   - Make sure to upload all files and folders, including:
     - `index.html`
     - `assets` folder
     - All JavaScript and CSS files
     - Any images or media files

4. **Verify Upload:**
   - Ensure all files are uploaded successfully
   - Check that the file permissions are correct (typically 644 for files, 755 for directories)

## Post-Deployment Verification

1. **Test Backend:**
   - Visit your Render backend URL: `https://your-app-name.onrender.com`
   - You should see a message indicating the server is running
   - Test the AI endpoint: `https://your-app-name.onrender.com/api/ai` (should return an error message about missing parameters, which is expected)

2. **Test Frontend:**
   - Visit your GoDaddy-hosted domain
   - Verify that the website loads correctly
   - Test the AI assistant functionality
   - Check that all links and navigation work properly

3. **Test Integration:**
   - Open the AI chat widget
   - Send a test message
   - Verify that you receive a response from the backend

## Troubleshooting

### Common Backend Issues:

1. **Environment Variables Not Set:**
   - Check that all required environment variables are configured in Render
   - Verify API keys are correct

2. **Application Crashes:**
   - Check Render logs for error messages
   - Ensure dependencies are correctly installed

3. **CORS Errors:**
   - Confirm that CORS is properly configured in the backend
   - Check that the frontend domain is whitelisted

### Common Frontend Issues:

1. **Blank Page or Files Not Loading:**
   - Verify all files were uploaded to the correct directory
   - Check file permissions
   - Ensure the `index.html` file is in the root directory

2. **API Connection Issues:**
   - Confirm the backend URL is correctly configured in the frontend
   - Check that the Render backend is running
   - Verify there are no CORS issues

3. **Slow Loading Times:**
   - Optimize images and assets
   - Consider using a CDN for static assets

### Need Help?

If you encounter issues during deployment:

1. Check the [Render Documentation](https://render.com/docs)
2. Review the [GoDaddy Hosting Help Center](https://www.godaddy.com/help)
3. Submit an issue on the GitHub repository
4. Contact support for your respective platforms

---

This deployment guide should help you successfully host your CoZone application with the frontend on GoDaddy and the backend on Render. Both platforms offer reliable hosting solutions that will make your application accessible to users worldwide.