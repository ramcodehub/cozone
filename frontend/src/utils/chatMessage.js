/**
 * Centralized Message Factory for AI Assistant
 * Guarantees every message object has a valid, non-undefined structure.
 */
export const createMessage = ({
  id,
  role = "assistant",
  text = "",
  loading = false,
  createdAt,
}) => {
  // Use crypto.randomUUID if available, otherwise fallback to timestamp+random
  const safeId = id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  
  return {
    id: safeId,
    role: String(role),
    text: typeof text === "string" ? text : (text ? String(text) : ""),
    loading: Boolean(loading),
    createdAt: createdAt || Date.now(),
  };
};

/**
 * Validates and normalizes an entire array of messages
 */
export const normalizeMessages = (messages) => {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(msg => msg && typeof msg === 'object')
    .map(msg => createMessage(msg));
};
