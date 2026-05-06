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
 * Insert contact message
 * @param {Object} contactData - Contact message data
 * @returns {Promise<Object>} Inserted data
 */
export const insertContactMessage = async (contactData) => {
  try {
    const { data, error } = await supabase
      .from('cozone_contact_messages')
      .insert([contactData])
      .select();

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error('Error inserting contact message:', error);
    throw error;
  }
};

/**
 * Insert service enquiry
 * @param {Object} enquiryData - Service enquiry data
 * @returns {Promise<Object>} Inserted data
 */
export const insertServiceEnquiry = async (enquiryData) => {
  try {
    const { data, error } = await supabase
      .from('cozone_enquiries')
      .insert([enquiryData])
      .select();

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error('Error inserting service enquiry:', error);
    throw error;
  }
};

/**
 * Get recent contact messages
 * @param {number} limit - Number of recent messages to retrieve (default: 10)
 * @returns {Promise<Array>} Recent contact messages
 */
export const getRecentContactMessages = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('cozone_contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error getting recent contact messages:', error);
    throw error;
  }
};

/**
 * Get recent service enquiries
 * @param {number} limit - Number of recent enquiries to retrieve (default: 10)
 * @returns {Promise<Array>} Recent service enquiries
 */
export const getRecentServiceEnquiries = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('cozone_enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error getting recent service enquiries:', error);
    throw error;
  }
};