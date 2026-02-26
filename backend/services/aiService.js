import { aiConfig } from '../config/aiConfig.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { searchKnowledgeByKeywords, insertChatbotLog } from './chatbotService.js';

dotenv.config();

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.AI_MODEL || aiConfig.defaultModel;

// Validate required environment variables
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not configured in environment variables');
  throw new Error('GEMINI_API_KEY is not configured. Please check your environment variables.');
}

if (!MODEL_NAME) {
  console.error('AI_MODEL is not configured in environment variables');
  throw new Error('AI_MODEL is not configured. Please check your environment variables.');
}

/**
 * Process AI request using Google Gemini API with retry logic
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation history
 * @returns {string} - AI response
 */
export const processAIRequest = async (message, conversationHistory = []) => {
  // Retry configuration
  const MAX_RETRIES = 3;
  const RETRY_DELAYS = [1000, 2000, 4000]; // Increased exponential backoff delays in ms

  // System prompt for the AI assistant pulled from aiConfig
  const systemPrompt = aiConfig.systemPrompt;

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Function to make the API call with retry logic
  const makeAPICall = async (retryCount = 0) => {
    try {
      // Initialize Google Generative AI
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: systemPrompt
      });

      // Prepare history for Gemini
      const history = [];

      // Add conversation history
      conversationHistory.forEach(item => {
        history.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }]
        });
      });

      // Start chat with history
      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: aiConfig.maxTokens,
          temperature: aiConfig.defaultTemperature
        }
      });

      // Send message and get response
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const aiResponse = response.text();

      // Log the interaction
      try {
        await insertChatbotLog({
          user_query: message,
          bot_response: aiResponse,
          response_source: 'gemini'
        });
      } catch (logError) {
        console.error('Failed to log chatbot interaction:', logError);
      }

      return aiResponse.trim();
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error);

      // Check if we should retry based on error type
      const shouldRetry =
        retryCount < MAX_RETRIES &&
        (error.message.includes('429') || // Rate limit
          error.message.includes('500') || // Server error
          error.message.includes('network') || // Network error
          error.message.includes('fetch') || // Fetch error
          error.message.includes('timeout')); // Timeout

      if (shouldRetry) {
        // Wait for the specified delay before retrying
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[retryCount]));
        return makeAPICall(retryCount + 1);
      } else {
        // If all retries exhausted, throw a user-friendly error
        if (error.message.includes('429')) {
          throw new Error(aiConfig.rateLimitMessage);
        } else {
          throw error;
        }
      }
    }
  };

  try {
    return await makeAPICall();
  } catch (error) {
    console.error('All retry attempts failed:', error);
    if (error.message.includes('429')) {
      throw new Error(aiConfig.rateLimitMessage);
    }
    // Log the specific error for debugging
    console.error('AI Service Error Details:', {
      message: error.message,
      stack: error.stack,
      modelName: MODEL_NAME,
      apiKeyPresent: !!GEMINI_API_KEY,
      apiKeyLength: GEMINI_API_KEY ? GEMINI_API_KEY.length : 0
    });

    // More specific error messages based on error type
    if (error.message && error.message.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Google Gemini API key. Please check your API configuration.');
    } else if (error.message && error.message.includes('MODEL_NOT_FOUND')) {
      throw new Error(`AI model '${MODEL_NAME}' not found. Please check your model configuration.`);
    } else if (error.message && error.message.includes('location is not supported')) {
      throw new Error('Google Gemini service is not available in your region.');
    } else {
      throw new Error(aiConfig.serviceFailureMessage);
    }
  }
};