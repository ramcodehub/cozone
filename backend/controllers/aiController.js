import { processAIRequest } from "../services/aiService.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import sessionManager from "../utils/sessionManager.js";

/**
 * Production-ready AI Controller for OpenRouter
 */
export const handleAIRequest = async (req, res) => {
  const requestStartTime = Date.now();
  
  try {
    const { message, sessionId } = req.body;

    // 1. Validation
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Valid message is required"
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }

    // 2. Sanitize and prepare
    const sanitizedMessage = sanitizeInput(message.trim());
    const conversationHistory = sessionManager.getConversationHistory(sessionId) || [];

    console.log(`[AI Controller] New request from session: ${sessionId}`);

    // 3. Process with AI Service
    const aiResponse = await processAIRequest(sanitizedMessage, conversationHistory, sessionId);

    // 4. Update session history
    sessionManager.addMessageToSession(sessionId, {
      role: "user",
      content: sanitizedMessage
    });

    sessionManager.addMessageToSession(sessionId, {
      role: "assistant",
      content: aiResponse
    });

    const duration = Date.now() - requestStartTime;
    console.log(`[AI Controller] Completed successfully in ${duration}ms`);

    // 5. Success Response
    return res.status(200).json({
      success: true,
      reply: aiResponse
    });

  } catch (error) {
    const duration = Date.now() - requestStartTime;
    console.error(`[AI Controller Error] Failed after ${duration}ms:`, error.message);

    // 6. Error Response (Never leak stack traces)
    let statusCode = 500;
    if (error.message.includes("busy") || error.message.includes("timed out")) {
      statusCode = 503; // Service Unavailable
    } else if (error.message.includes("required")) {
      statusCode = 400;
    }

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to process request"
    });
  }
};