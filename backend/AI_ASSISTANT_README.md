# CoZone AI Assistant Implementation (OpenRouter)

This document provides instructions for setting up and running the AI Assistant for the CoZone website using OpenRouter.

## Backend Setup

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install openai
```

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# AI Assistant Configuration
AI_PROVIDER=openrouter
AI_MODEL=meta-llama/llama-3.3-70b-instruct:free
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 3. API Keys

1. Visit [OpenRouter](https://openrouter.ai/)
2. Create an account and generate an API key
3. Add it to your `.env` file as `OPENROUTER_API_KEY`

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

## API Endpoints

- `POST /api/ai` - Handle AI assistant requests

### Request Format
```json
{
  "message": "Hello",
  "sessionId": "session-123"
}
```

### Success Response
```json
{
  "success": true,
  "reply": "Hi! How can I help you today?"
}
```