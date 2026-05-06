import express from "express";
import rateLimit from "express-rate-limit";
import { handleAIRequest } from "../controllers/aiController.js";

const router = express.Router();

/**
 * AI Rate Limiter: 30 requests per 15 minutes
 */
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/ai - Handle AI assistant requests with rate limiting
router.post("/", aiLimiter, handleAIRequest);

export default router;