import { processAIRequest } from '../services/aiService.js';
import { sanitizeInput } from '../utils/sanitizeInput.js';
import sessionManager from '../utils/sessionManager.js';
import { searchKnowledgeByCategory, searchKnowledgeByKeywords } from '../services/chatbotService.js';

/**
 * Handle AI assistant requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const handleAIRequest = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Sanitize input
    const sanitizedMessage = sanitizeInput(message);
    
    // Get conversation history from session
    const conversationHistory = sessionManager.getConversationHistory(sessionId);
    
    // Process AI request
    const aiResponse = await processAIRequest(sanitizedMessage, conversationHistory);
    
    // Save conversation to session
    sessionManager.addMessageToSession(sessionId, {
      role: 'user',
      content: sanitizedMessage
    });
    
    sessionManager.addMessageToSession(sessionId, {
      role: 'assistant',
      content: aiResponse
    });
    
    // Return success response
    return res.status(200).json({
      success: true,
      response: aiResponse,
      sessionId: sessionId
    });
  } catch (error) {
    console.error('Error in handleAIRequest:', error);
    
    // Handle rate limit error specifically
    if (error.message.includes("too many requests") || error.code === 'ERR_TOO_MANY_REQUESTS') {
      return res.status(429).json({
        success: false,
        message: "I'm receiving too many requests right now. Please try again in a moment."
      });
    }
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again later."
    });
  }
};