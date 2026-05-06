/**
 * Message Normalizer Utility
 * Ensures every message object has a consistent and safe structure for rendering.
 */
export const normalizeMessage = (message = {}) => {
  if (!message || typeof message !== 'object') {
    return {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      sender: 'bot',
      timestamp: new Date(),
      isTyping: false
    };
  }

  return {
    id: message.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    text: typeof message.text === 'string' ? message.text : (message.text ? String(message.text) : ""),
    sender: message.sender || 'bot',
    timestamp: message.timestamp instanceof Date ? message.timestamp : new Date(),
    isTyping: !!message.isTyping,
    ...message // Preserve other properties like 'loading' if they exist
  };
};

/**
 * Validate Message Array
 * Filters out invalid entries and normalizes everything
 */
export const normalizeMessageArray = (messages) => {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(Boolean)
    .map(msg => normalizeMessage(msg));
};
