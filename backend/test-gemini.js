import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  
  try {
    console.log("Sending test request...");
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("Error:", err.message);
    if (err.response) {
        console.error("Details:", JSON.stringify(err.response, null, 2));
    }
  }
}

test();
