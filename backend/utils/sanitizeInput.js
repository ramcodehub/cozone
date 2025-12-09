/**
 * Sanitize user input to prevent injection attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially harmful characters
  let sanitized = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove javascript: links
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
};