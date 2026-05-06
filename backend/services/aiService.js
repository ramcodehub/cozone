import OpenAI from "openai";
import dotenv from "dotenv";
import { aiConfig } from "../config/aiConfig.js";
import { insertChatbotLog } from "./chatbotService.js";

dotenv.config();

/**
 * Production-ready OpenRouter AI Service with Enhanced Failover & Analytics
 */

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Active & Stable Model Priority List
const AI_MODELS = [
  process.env.AI_MODEL || "openai/gpt-3.5-turbo",
  "meta-llama/llama-3.1-8b-instruct:free",
  "nousresearch/hermes-2-pro-llama-3-8b:free",
  "openchat/openchat-7b:free"
];

// Initialize OpenAI client for OpenRouter
const openai = OPENROUTER_API_KEY ? new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://cozone.in",
    "X-Title": "CoZone AI Assistant",
  },
}) : null;

/**
 * Process AI request using OpenRouter with Smart Failover and Rate Limit Handling
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation history
 * @param {string} sessionId - Unique session ID for logging
 * @returns {Promise<string>} - AI response
 */
export const processAIRequest = async (message, conversationHistory = [], sessionId = null) => {
  if (!message) throw new Error("Message is required");
  if (!openai) throw new Error("OpenRouter API key is not configured");

  const startTime = Date.now();
  const systemPrompt = "You are CoZone AI Assistant helping users with coworking spaces, memberships, meeting rooms, office bookings, workspace support and business services. Be concise, professional and helpful.";

  console.log(`[AI Request] Processing request for session: ${sessionId || 'anonymous'}`);

  // Failover Logic: Try models in the chain
  for (let i = 0; i < AI_MODELS.length; i++) {
    const currentModel = AI_MODELS[i];
    const attemptStartTime = Date.now();
    const isFallback = i > 0;

    try {
      console.log(`[AI Request] Trying model (${i + 1}/${AI_MODELS.length}): ${currentModel}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory.map((item) => ({
          role: item.role === "user" ? "user" : "assistant",
          content: item.content,
        })),
        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create(
        {
          model: currentModel,
          messages: messages,
          temperature: 0.7,
          max_tokens: 200,
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      const aiResponse = completion.choices[0]?.message?.content;
      if (!aiResponse) throw new Error("Received empty response from AI provider");

      const totalDuration = Date.now() - startTime;
      console.log(`[AI Success] Response generated using ${currentModel} in ${totalDuration}ms`);

      // ---------------- ANALYTICS LOGGING ----------------
      insertChatbotLog({
        session_id: sessionId,
        user_message: message,
        ai_response: aiResponse,
        model_used: currentModel,
        provider: "openrouter",
        response_time_ms: totalDuration,
        status: isFallback ? "fallback" : "success"
      }).catch((err) => console.warn("[Chatbot Logs] Background log failed:", err.message));
      // ----------------------------------------------------

      return aiResponse.trim();

    } catch (error) {
      const attemptDuration = Date.now() - attemptStartTime;
      const statusCode = error.status || error.response?.status;
      
      console.error(`[AI Error] ${currentModel} failed: ${error.message} (Status: ${statusCode})`);

      const isRateLimited = statusCode === 429;
      const isUnavailable = statusCode === 404 || statusCode === 502 || statusCode === 504;
      const isRetryableError = statusCode === 500 || statusCode === 503 || error.name === "AbortError";
      const isFatal = statusCode === 401 || statusCode === 403;

      if (isFatal) {
        // Log fatal error before breaking
        insertChatbotLog({
            session_id: sessionId,
            user_message: message,
            status: "failed",
            error_message: `Fatal: ${error.message}`,
            model_used: currentModel
        }).catch(() => {});
        break;
      }

      if (isRateLimited) {
        console.warn(`[AI Fallback] Rate limit reached for ${currentModel}, switching model...`);
      } else if (isUnavailable) {
        console.warn(`[AI Fallback] Endpoint unavailable for ${currentModel}, switching model...`);
      }

      if (i < AI_MODELS.length - 1) {
        if (isRetryableError) await new Promise(r => setTimeout(r, 1000));
        continue;
      }

      // Log final exhaustion
      insertChatbotLog({
        session_id: sessionId,
        user_message: message,
        status: "failed",
        error_message: "All models exhausted",
        response_time_ms: Date.now() - startTime
      }).catch(() => {});
    }
  }

  throw new Error("Our AI assistant is temporarily busy. Please contact CoZone support directly.");
};