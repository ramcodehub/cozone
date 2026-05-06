import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

global.WebSocket = ws;

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[Chatbot Logs] WARNING: Supabase credentials missing. Logging will be disabled.');
}

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
      global: { fetch: (...args) => fetch(...args) },
      realtime: { websocket: ws }
    })
  : null;

/**
 * Startup Validation: Verify Supabase connection and table structure
 */
export const validateLoggingSystem = async () => {
  if (!supabase) return;
  
  try {
    const { data, error } = await supabase
      .from('cozone_chatbot_logs')
      .select('id')
      .limit(1);

    if (error) {
      if (error.message.includes('model_used')) {
          console.warn('[Chatbot Logs] SCHEMA MISMATCH: Please run the SQL migration in db/migrations/002_update_chatbot_logs.sql');
      } else {
          console.warn(`[Chatbot Logs] CONNECTION ISSUE: ${error.message}`);
      }
    } else {
      console.log('[Chatbot Logs] Supabase logging system initialized successfully');
    }
  } catch (err) {
    console.warn('[Chatbot Logs] Initialization failed:', err.message);
  }
};

/**
 * Insert production-ready chatbot analytics log
 * @param {Object} logData - Analytics data
 * @returns {Promise<void>} - Never throws
 */
export const insertChatbotLog = async (logData) => {
  if (!supabase) return;

  try {
    const payload = {
      session_id: logData.session_id,
      user_message: logData.user_message || logData.user_query, // Backward compatibility
      ai_response: logData.ai_response || logData.bot_response, // Backward compatibility
      model_used: logData.model_used,
      provider: logData.provider || 'openrouter',
      response_time_ms: logData.response_time_ms || logData.processing_time_ms,
      status: logData.status || 'success',
      error_message: logData.error_message,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('cozone_chatbot_logs')
      .insert([payload]);

    if (error) {
      console.warn(`[Chatbot Logs] Insert failed: ${error.message}`);
    } else {
      // console.log('[Chatbot Logs] Interaction stored successfully');
    }
  } catch (error) {
    // CRITICAL: Never let logging failure crash the AI service
    console.warn('[Chatbot Logs] Silent error during log insertion:', error.message);
  }
};

/**
 * Legacy support or other knowledge functions can remain below...
 */
export const searchKnowledgeByKeywords = async (keywords) => {
    if (!supabase) return [];
    try {
        let query = supabase.from('cozone_chatbot_knowledge').select('*');
        if (keywords && keywords.length > 0) {
            keywords.forEach((keyword) => {
                query = query.or(`keywords.cs.{${keyword}}`);
            });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error searching knowledge:', error);
        return [];
    }
};