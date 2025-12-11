# Frontend Deployment to GoDaddy

This guide provides step-by-step instructions for building and deploying the CoZone frontend to GoDaddy hosting.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Building the Frontend](#building-the-frontend)
- [Deployment to GoDaddy](#deployment-to-godaddy)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before building and deploying, ensure you have:

1. **Node.js** (v16 or higher) installed locally
2. **npm** package manager
3. **FTP client** (e.g., FileZilla) or access to GoDaddy's file manager
4. **GoDaddy hosting account** with cPanel access

## Building the Frontend

### Step 1: Install Dependencies

Navigate to the frontend directory and install all required dependencies:

```bash
cd frontend
npm install
```

### Step 2: Configure API Endpoint (Important)

Before building, you need to ensure the frontend is configured to communicate with your deployed backend.

The current vite.config.js is configured to proxy API requests to `https://cozone-backend.onrender.com`. However, for production deployment, you'll need to either:

1. **Option 1: Update the backend URL in your code**
   - Locate API configuration files in `src/` directory
   - Update any hardcoded backend URLs to point to your Render backend URL

2. **Option 2: Use environment variables**
   - Create a `.env.production` file in the frontend directory:
   ```
   VITE_API_BASE_URL=https://cozone.onrender.com
   ```

### Step 3: Build the Production Version

Run the build command to create optimized production files:

```bash
npm run build
```

This will generate a `dist` folder containing all the production-ready files.

### Step 4: Verify Build Output

Check the contents of the `dist` folder:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [other asset files]
└── [other files]
```

## Deployment to GoDaddy

### Step 1: Access GoDaddy Hosting

1. Log in to your GoDaddy account
2. Navigate to "My Products" > "Web Hosting"
3. Select your hosting plan and click "Manage"

### Step 2: Choose Deployment Method

You have two options for uploading files:

#### Option A: File Manager (Browser-based)

1. In cPanel, find and open "File Manager"
2. Navigate to `public_html` directory (or your desired subdirectory)
3. Upload all contents from the `dist` folder

#### Option B: FTP (Recommended for faster uploads)

1. Use an FTP client like FileZilla
2. Get your FTP credentials from GoDaddy:
   - Host: Your FTP hostname (e.g., ftp.yourdomain.com)
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)
3. Connect to your GoDaddy hosting
4. Navigate to the root directory (usually `public_html`)
5. Upload all contents from the `dist` folder

### Step 3: Upload Files

Important: Upload the **contents** of the `dist` folder, not the folder itself.

1. Navigate to your local `frontend/dist` directory
2. Select and upload all files and folders:
   - `index.html` (must be in the root)
   - `assets` folder
   - All other generated files

### Step 4: Set File Permissions

Ensure proper file permissions:
- Files: 644
- Directories: 755

Most FTP clients and file managers handle this automatically.

## Post-Deployment Verification

### Step 1: Check Website Accessibility

1. Visit your domain (e.g., `http://yourdomain.com`)
2. Verify that the homepage loads correctly
3. Check that all navigation links work
4. Test responsive design on different devices

### Step 2: Test Backend Integration

1. Open the AI chat widget
2. Send a test message
3. Verify that you receive a response from the backend
4. Test contact forms if available

### Step 3: Verify Asset Loading

1. Check that all images load properly
2. Verify CSS styling is applied
3. Confirm JavaScript functionality works
4. Test all interactive elements

## Troubleshooting

### Common Issues and Solutions

#### 1. Blank Page or Files Not Loading
- **Cause**: Incorrect file upload location
- **Solution**: Ensure `index.html` is in the root directory (`public_html`)

#### 2. CSS/JavaScript Not Loading
- **Cause**: Incorrect file paths or permissions
- **Solution**: 
  - Verify all files are uploaded
  - Check file permissions (644 for files, 755 for directories)
  - Clear browser cache

#### 3. API Connection Issues
- **Cause**: Backend URL misconfiguration
- **Solution**: 
  - Verify the backend URL in your code points to your Render deployment
  - Check browser console for CORS errors
  - Ensure your Render backend allows requests from your domain

#### 4. Mixed Content Errors (HTTPS)
- **Cause**: Loading HTTP resources on HTTPS site
- **Solution**: 
  - Ensure all resources use HTTPS
  - Update any hardcoded HTTP URLs to HTTPS

#### 5. Slow Loading Times
- **Cause**: Large asset files or inefficient hosting
- **Solution**: 
  - Optimize images before building
  - Consider using a CDN for static assets
  - Enable Gzip compression in cPanel

### GoDaddy-Specific Issues

#### File Manager Upload Problems
- Use FTP instead for large uploads
- Upload files in batches if experiencing timeouts

#### .htaccess Configuration
If you encounter routing issues (especially with React Router), create an `.htaccess` file in your root directory:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## Optimization Tips

1. **Pre-deployment**:
   - Minify images before building
   - Remove unused dependencies
   - Audit bundle size with tools like `npm run build -- --stats`

2. **Post-deployment**:
   - Enable caching in cPanel
   - Use GoDaddy's CDN if available
   - Monitor site performance with tools like Google PageSpeed Insights

## Need Help?

If you encounter issues during deployment:

1. Check GoDaddy's hosting documentation
2. Review the build process and ensure all steps were followed
3. Verify your Render backend is functioning correctly
4. Contact GoDaddy support for hosting-specific issues

---

By following these steps, you should have your CoZone frontend successfully deployed to GoDaddy hosting and integrated with your Render backend.