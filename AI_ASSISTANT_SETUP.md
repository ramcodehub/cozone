# CoZone AI Assistant Setup Guide

This guide provides step-by-step instructions for setting up, configuring, and deploying the CoZone AI Assistant powered by Google Gemini 1.5 Flash.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Configuration](#configuration)
4. [Running Locally](#running-locally)
5. [Deployment](#deployment)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before setting up the AI Assistant, ensure you have:

1. **Node.js** (v14 or higher)
2. **npm** (v6 or higher)
3. **Google Gemini API Key** - Obtain from [Google AI Studio](https://aistudio.google.com/)

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Install the Google Generative AI SDK:

```bash
npm install @google/generative-ai
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (if using)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Email Configuration (if using)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

You can copy the `.env.example` file as a template:

```bash
cp .env.example .env
```

Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

## Running Locally

### 1. Start the Backend Server

From the `backend` directory:

```bash
npm run dev
```

This will start the server on `http://localhost:5000`.

### 2. Start the Frontend Application

From the `frontend` directory:

```bash
npm run dev
```

This will start the frontend on `http://localhost:5173`.

The AI Assistant will be available as a floating chat widget in the bottom-right corner of the page.

## Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to:
   ```
   cd frontend && npm install && npm run build
   ```
4. Set the start command to:
   ```
   cd backend && npm install && npm start
   ```
5. Add environment variables in the Render dashboard:
   - `GEMINI_API_KEY`
   - `PORT` (set to 10000 for Render)
   - Other environment variables as needed

### Deploying to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Configure the service with these settings:
   - Root directory: `./`
   - Build command: `cd frontend && npm install && npm run build`
   - Start command: `cd backend && npm install && npm start`
4. Add environment variables in the Railway dashboard:
   - `GEMINI_API_KEY`
   - `PORT` (Railway will auto-assign if not specified)
   - Other environment variables as needed

## API Endpoints

### POST /api/ai

Handles AI assistant requests.

**Request Body:**
```json
{
  "message": "User's message",
  "sessionId": "unique_session_identifier"
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI assistant's response",
  "sessionId": "unique_session_identifier"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Troubleshooting

### Common Issues

1. **"GEMINI_API_KEY is not configured"**
   - Ensure the `.env` file exists in the backend directory
   - Verify the `GEMINI_API_KEY` variable is set with your actual API key

2. **"Failed to process AI request"**
   - Check your internet connection
   - Verify your API key is valid and has quota
   - Check the backend logs for detailed error messages

3. **Chat widget not appearing**
   - Ensure the `ChatWidget` component is imported and included in `App.jsx`
   - Check the browser console for JavaScript errors

4. **CORS errors**
   - Verify the CORS configuration in `server.js` includes your frontend URL

### Logs and Debugging

Check backend logs for detailed error information:

```bash
# In the backend directory
npm start
# Or for development
npm run dev
```

Check browser console for frontend errors:

1. Open Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages

## Updating the AI Model

To update the AI model:

1. Edit `backend/services/aiService.js`
2. Change the `MODEL_NAME` constant:
   ```javascript
   const MODEL_NAME = 'models/gemini-1.5-flash'; // Current model with full path
   ```

Supported models:
- `models/gemini-1.5-flash` (default, fastest, highest free quota)
- `models/gemini-1.5-pro` (more capable, slower)
- `models/gemini-1.0-pro` (older model)

## Customizing the Assistant

### System Prompt

To customize the AI assistant's behavior, edit the system prompt in `backend/services/aiService.js`:

```javascript
const systemPrompt = `Your custom system prompt here`;
```

### Styling

To customize the assistant's appearance:
1. Edit `frontend/src/components/Assistant/Assistant.module.css`
2. Modify the CSS variables in `frontend/src/styles/variables.css`

### Positioning

To change the widget position, edit `frontend/src/components/Assistant/Assistant.module.css`:

```css
.chatWidgetContainer {
  position: fixed;
  bottom: 20px;
  right: 90px; /* Adjust these values */
}
```

## Session Management

The assistant maintains conversation history per session using an in-memory session manager. Sessions expire after 30 minutes of inactivity.

For production deployments, consider implementing persistent session storage using:
- Redis
- Database storage
- Cloud caching solutions

Modify `backend/utils/sessionManager.js` to implement alternative storage solutions.