# CoZone AI Assistant Implementation

This document provides instructions for setting up and running the AI Assistant for the CoZone website.

## Backend Setup

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install axios
```

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# AI Assistant Configuration
AI_PROVIDER=gemini # or 'openai'
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=models/gemini-1.5-flash # Using the stable 1.5 flash model with higher quota
```

### 3. API Keys

#### For Gemini:
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

#### For OpenAI:
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add it to your `.env` file as `OPENAI_API_KEY`

## Running the Application

### Backend

Start the backend server:

```bash
cd backend
npm run dev
```

### Frontend

Start the frontend development server:

```bash
cd frontend
npm run dev
```

## File Structure

```
backend/
├── config/
│   └── aiConfig.js
├── controllers/
│   └── aiController.js
├── routes/
│   └── aiRoutes.js
├── services/
│   └── aiService.js
├── utils/
│   └── sanitizeInput.js
├── .env.example               # Environment template
└── server.js (updated)

frontend/
├── src/
│   ├── components/
│   │   └── Assistant/
│   │       ├── Assistant.module.css
│   │       ├── ChatWidget.jsx
│   │       ├── ChatWindow.jsx
│   │       └── MessageBubble.jsx
│   └── App.jsx (updated)
```

## API Endpoints

- `POST /api/ai` - Handle AI assistant requests