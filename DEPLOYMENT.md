# Continuous Deployment on Plesk

This guide details how to setup automated deployments for the CoZone project on Plesk using Git auto-deployment. 

## Workflow Overview
Our production stack acts like this: The static built React files will end up living right in the root frontend directory (`httpdocs` on Plesk), whereas the backend lives in `/backend`.

### Deployment Steps
1. **Push code to GitHub**: When you make changes, commit and push them to the `main` branch.
2. **Plesk pulls repository**: The Plesk Git extension will detect your changes via webhook and pull the latest code.
3. **Run deploy.sh**: After Plesk pulls, it will execute the `/deploy.sh` post-deployment script we setup. (Be sure to mark this as your 'Additional deployment actions' command in Plesk: `bash deploy.sh`).
4. **Built frontend files appear in httpdocs**: The script installs frontend dependencies, builds the optimized React files using Vite, and copies those root files (`index.html`, `assets/`, etc) into the document root.
5. **Backend runs from /backend**: Keep the Node.js API separately running using `node backend/server.js`, managing traffic on ports matching up with the new `/api/` convention paths. The Plesk Passenger environment could alternatively manage the Node process.

## Environment Variables
- Create your `.env` securely by copying the example into `/backend/.env` with production keys via the Plesk File Manager before executing backend commands for the first time.

## Caching and React Router
The comprehensive `.htaccess` in the root of the project seamlessly maps all frontend URL requests that would otherwise 404 directly up to `index.html`. It incorporates all required best-practice file compression and client-side browser caching policies natively.
