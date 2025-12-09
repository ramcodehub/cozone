import express from 'express';
import { handleAIRequest } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai - Handle AI assistant requests
router.post('/', handleAIRequest);

export default router;