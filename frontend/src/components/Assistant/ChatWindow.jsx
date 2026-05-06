import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InitialScreen from './InitialScreen';
import { createMessage, normalizeMessages } from '../../utils/chatMessage';
// @ts-ignore
import styles from './Assistant.module.css';
// @ts-ignore
import aiAssistantIcon from '../../assets/logos/aiassistant.png';

/**
 * ChatWindow Component - Fully Refactored for Absolute Stability
 */
const ChatWindow = ({ onClose, chatWindowWrapperRef }) => {
  // Initialize with a safe welcome message
  const [messages, setMessages] = useState([
    createMessage({
      role: "assistant",
      text: "Hi! Welcome to CoZone. How can I help you today?"
    })
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `sess_${Date.now()}`;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (manualText = null) => {
    const rawInput = manualText || inputValue;
    const cleanInput = (typeof rawInput === 'string' ? rawInput : "").trim();
    
    if (!cleanInput || isLoading) return;

    // 1. Create and add user message
    const userMessage = createMessage({
      role: "user",
      text: cleanInput
    });

    setMessages(prev => normalizeMessages([...prev, userMessage]));
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const isDev = window.location.hostname === 'localhost';
      const api = isDev ? 'http://localhost:5005/api/ai' : 'https://cozone.onrender.com/api/ai';

      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanInput, sessionId: sessionIdRef.current })
      });

      if (!response.ok) throw new Error("Server communication failed");

      const data = await response.json();

      // 2. Normalize AI response
      const assistantMessage = createMessage({
        role: "assistant",
        text: typeof data?.reply === 'string' ? data.reply : (data?.message || "Sorry, I couldn't process that.")
      });

      setMessages(prev => normalizeMessages([...prev, assistantMessage]));

    } catch (err) {
      console.error("[AI Assistant Error]:", err);
      const errorMessage = createMessage({
        role: "assistant",
        text: "I'm having trouble connecting right now. Please try again later."
      });
      setMessages(prev => normalizeMessages([...prev, errorMessage]));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (p) => {
    const txt = typeof p === 'string' ? p : (p?.text || "");
    if (txt) {
      setInputValue(txt);
      setTimeout(() => handleSend(txt), 50);
    }
  };

  const handleRefresh = () => {
    setMessages([
      createMessage({
        role: "assistant",
        text: "Hi! Welcome to CoZone. How can I help you today?"
      })
    ]);
    setInputValue('');
    setIsLoading(false);
  };

  // Safe rendering pipeline
  const safeMessages = normalizeMessages(messages);

  return (
    <div className={`${styles.chatWindow} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.botAvatar}><img src={aiAssistantIcon} alt="AI" /></div>
          <div>
            <h3 className={styles.headerTitle}>CoZone AI Assistant</h3>
            <p className={styles.headerSubtitle}>Ready to assist you</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleRefresh} className={styles.refreshButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className={styles.fullscreenButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {safeMessages.length <= 1 && !isLoading && !inputValue ? (
          <InitialScreen onExampleClick={handlePromptSelect} onCategoryClick={(c) => { setSelectedCategory(c); setShowPromptModal(true); }} />
        ) : (
          <>
            {safeMessages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            
            {/* Loading Indicator as a specialized message */}
            {isLoading && (
              <MessageBubble message={createMessage({ role: 'assistant', text: '', loading: true })} />
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {showPromptModal && (
        <div className={styles.promptModalList}>
          <button onClick={() => setShowPromptModal(false)} className={styles.backButton}>← Back</button>
          <div className={styles.minimalPromptList}>
            {selectedCategory?.prompts?.map((p) => (
              <button key={p?.id || Math.random()} onClick={() => { handlePromptSelect(p?.text); setShowPromptModal(false); }} className={styles.minimalPromptButton}>
                {p?.text || "Option"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask anything about CoZone..."
            rows={1}
            disabled={isLoading}
          />
          <button onClick={() => handleSend()} className={styles.sendButton} disabled={isLoading || !inputValue.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;