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
AI_MODEL=gemini-pro # or 'gpt-3.5-turbo', 'gpt-4', etc.
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
├── .env.example
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

## Features Implemented

1. Floating chat widget positioned above WhatsApp button
2. Full chat panel with:
   - Chat history
   - Typing indicator
   - Bot avatar and CoZone branding
   - Smooth animations (Framer Motion)
   - Responsive mobile UI
3. Backend with:
   - AI service supporting both Gemini and OpenAI
   - Input/output sanitization
   - Conversation memory per session
   - Error handling and fallback messages
4. Configurable settings for:
   - Assistant name
   - API key
   - System prompt
   - Temperature & model

## Optional Improvements

1. **Voice Input**: Add speech-to-text functionality using the Web Speech API
2. **Dark Mode**: Implement theme switching based on user preference
3. **Memory Persistence**: Store conversation history in localStorage or a database
4. **Analytics**: Track user interactions for improvement insights
5. **Multilingual Support**: Add language selection for international users

## Troubleshooting

### CORS Issues
Ensure the backend CORS configuration allows requests from the frontend origin (http://localhost:5173).

### API Key Errors
Verify that your API keys are correctly set in the `.env` file and have the necessary permissions.

### Connection Issues
Check that both frontend and backend servers are running on their respective ports (5173 for frontend, 5000 for backend).