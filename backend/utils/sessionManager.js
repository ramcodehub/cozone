/**
 * Session Manager for AI Assistant
 * Manages conversation history per session
 */

class SessionManager {
  constructor() {
    // In-memory storage for sessions
    // In production, this should be replaced with a proper database or caching solution
    this.sessions = new Map();
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  }

  /**
   * Create a new session or get existing one
   * @param {string} sessionId - Unique session identifier
   * @returns {Object} Session object
   */
  getSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        conversationHistory: [],
        createdAt: Date.now(),
        lastAccessed: Date.now()
      });
    }

    const session = this.sessions.get(sessionId);
    session.lastAccessed = Date.now();
    
    // Clean up expired sessions
    this.cleanupExpiredSessions();
    
    return session;
  }

  /**
   * Add a message to session history
   * @param {string} sessionId - Session identifier
   * @param {Object} message - Message object with role and content
   */
  addMessageToSession(sessionId, message) {
    const session = this.getSession(sessionId);
    session.conversationHistory.push(message);
    
    // Limit history to last 10 messages to manage context length
    if (session.conversationHistory.length > 10) {
      session.conversationHistory = session.conversationHistory.slice(-10);
    }
    
    session.lastAccessed = Date.now();
  }

  /**
   * Get conversation history for a session
   * @param {string} sessionId - Session identifier
   * @returns {Array} Conversation history
   */
  getConversationHistory(sessionId) {
    const session = this.getSession(sessionId);
    return session.conversationHistory;
  }

  /**
   * Clear session history
   * @param {string} sessionId - Session identifier
   */
  clearSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  /**
   * Clean up expired sessions
   */
  cleanupExpiredSessions() {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastAccessed > this.sessionTimeout) {
        this.sessions.delete(sessionId);
      }
    }
  }

  /**
   * Get total number of active sessions
   * @returns {number} Active session count
   */
  getActiveSessionCount() {
    this.cleanupExpiredSessions();
    return this.sessions.size;
  }
}

// Export singleton instance
export default new SessionManager();