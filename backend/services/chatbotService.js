import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL and Service Key are required in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
});

/**
 * Insert chatbot knowledge entry
 * @param {Object} knowledgeData - Knowledge base entry data
 * @returns {Promise<Object>} Inserted data
 */
export const insertKnowledgeEntry = async (knowledgeData) => {
  try {
    const { data, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .insert([knowledgeData])
      .select();

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error('Error inserting knowledge entry:', error);
    throw error;
  }
};

/**
 * Search knowledge base by category
 * @param {string} category - Category to search for
 * @returns {Promise<Array>} Matching knowledge entries
 */
export const searchKnowledgeByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .select('*')
      .eq('category', category);

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error searching knowledge by category:', error);
    throw error;
  }
};

/**
 * Search knowledge base by keywords
 * @param {Array} keywords - Keywords to search for
 * @returns {Promise<Array>} Matching knowledge entries
 */
export const searchKnowledgeByKeywords = async (keywords) => {
  try {
    let query = supabase
      .from('cozone_chatbot_knowledge')
      .select('*');

    // If keywords provided, search for any matching keywords
    if (keywords && keywords.length > 0) {
      keywords.forEach((keyword, index) => {
        if (index === 0) {
          query = query.or(`keywords.cs.{${keyword}}`);
        } else {
          query = query.or(`keywords.cs.{${keyword}}`);
        }
      });
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error searching knowledge by keywords:', error);
    throw error;
  }
};

/**
 * Insert chatbot log entry
 * @param {Object} logData - Log entry data
 * @returns {Promise<Object>} Inserted data
 */
export const insertChatbotLog = async (logData) => {
  try {
    const { data, error } = await supabase
      .from('cozone_chatbot_logs')
      .insert([logData])
      .select();

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error('Error inserting chatbot log:', error);
    throw error;
  }
};

/**
 * Get recent chatbot logs
 * @param {number} limit - Number of recent logs to retrieve (default: 10)
 * @returns {Promise<Array>} Recent log entries
 */
export const getRecentLogs = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('cozone_chatbot_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error getting recent logs:', error);
    throw error;
  }
};