import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log("Listing models...");
    // The SDK might not have a direct listModels, but we can try to fetch it via the base URL
    // Actually, let's just try gemini-1.5-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-pro");
  } catch (err) {
    console.error("Error with gemini-1.5-pro:", err.message);
  }
}

listModels();
