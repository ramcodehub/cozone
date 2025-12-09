import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { searchKnowledgeByKeywords, insertChatbotLog } from './chatbotService.js';

dotenv.config();

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-flash-latest'; // Using the latest flash model available

/**
 * Process AI request using Google Gemini API
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation history
 * @returns {string} - AI response
 */
export const processAIRequest = async (message, conversationHistory = []) => {
  try {
    // System prompt for the AI assistant
    const systemPrompt = `You are CoZone AI Assistant, a friendly and professional virtual guide for CoZone Co-Working Spaces.  
Your responsibilities:
- Explain workspace options clearly
- Provide pricing ranges and plan guidance
- Recommend spaces based on user needs
- Provide operating hours, amenities, services
- Help users book a visit or contact support
- Never hallucinate information not part of CoZone
- Keep replies short, helpful, and conversational.

CoZone offers:
- Dedicated Desks: Individual workspaces with personal storage
- Private Cabins: Fully enclosed offices for teams of 2-20 people
- Conference Rooms: Bookable meeting spaces with advanced AV equipment
- Day Passes: Flexible access for occasional visitors
- Virtual Offices: Business address and mail handling services
- Custom Built Office Spaces: Tailored solutions for larger enterprises

Pricing (approximate):
- Dedicated Desk: ₹4,999/month
- Private Cabin (4-person): ₹19,999/month
- Conference Room (per hour): ₹1,500
- Day Pass: ₹1,299/day
- Virtual Office: ₹2,999/month

Location: 123 Business Avenue, Tech Park, Bangalore - 560103
Hours: Monday-Friday 8:00 AM - 8:00 PM, Saturday-Sunday 9:00 AM - 6:00 PM

Amenities include: High-speed WiFi, Printing/Scanning, Coffee/Tea, Meeting Rooms, Event Space, 24/7 Access`;

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Prepare history for Gemini
    const history = [];
    
    // Add system prompt as first interaction
    history.push({
      role: "user",
      parts: [{ text: systemPrompt }]
    });
    
    history.push({
      role: "model",
      parts: [{ text: "Understood. I am ready to assist as the CoZone AI Assistant." }]
    });

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
        maxOutputTokens: 1000,
        temperature: 0.7
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
    console.error('Error in processAIRequest:', error);
    throw new Error('Failed to process AI request');
  }
};