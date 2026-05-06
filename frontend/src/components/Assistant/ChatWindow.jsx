import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InitialScreen from './InitialScreen';
import { createMessage, normalizeMessages } from '../../utils/chatMessage';
// @ts-ignore
import styles from './Assistant.module.css';
// @ts-ignore
import aiAssistantIcon from '../../assets/logos/aiassistant.png';

/**
 * Instrumented ChatWindow for Deep Debugging
 */
const ChatWindow = ({ onClose, chatWindowWrapperRef }) => {
  // Trace Initial State
  const initialMsg = createMessage({
    role: "assistant",
    text: "Hi! Welcome to CoZone. How can I help you today?"
  });
  
  const [messages, setMessages] = useState([initialMsg]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `sess_${Date.now()}`;
    }
    console.log("[DEBUG] Session Initialized:", sessionIdRef.current);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (manualText = null) => {
    const rawInput = manualText || inputValue;
    const cleanInput = (typeof rawInput === 'string' ? rawInput : "").trim();
    
    if (!cleanInput || isLoading) return;

    // 1. Trace User Message Creation
    const userMessage = createMessage({
      role: "user",
      text: cleanInput
    });
    
    console.log("[DEBUG] [SET MESSAGES] User Message:", userMessage);

    setMessages(prev => {
      const next = normalizeMessages([...prev, userMessage]);
      console.log("[DEBUG] [STATE UPDATE] New messages array:", next);
      return next;
    });

    setInputValue('');
    setIsLoading(true);

    try {
      const isDev = window.location.hostname === 'localhost';
      const api = isDev ? 'http://localhost:5005/api/ai' : 'https://cozone.onrender.com/api/ai';

      console.log("[DEBUG] [FETCH START] Endpoint:", api);

      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanInput, sessionId: sessionIdRef.current })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("[DEBUG] [AI RAW RESPONSE]", data);

      // 2. Trace AI Response Creation
      const assistantMessage = createMessage({
        role: "assistant",
        text: typeof data?.reply === 'string' ? data.reply : (data?.message || "Sorry, I couldn't process that.")
      });

      console.log("[DEBUG] [AI NORMALIZED MESSAGE]", assistantMessage);

      setMessages(prev => {
        const next = normalizeMessages([...prev, assistantMessage]);
        console.log("[DEBUG] [STATE UPDATE] Added AI response:", next);
        return next;
      });

    } catch (err) {
      console.error("[DEBUG] [AI FETCH ERROR]", err);
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
    console.log("[DEBUG] Prompt Selected:", txt);
    if (txt) {
      setInputValue(txt);
      setTimeout(() => handleSend(txt), 50);
    }
  };

  const handleRefresh = () => {
    console.log("[DEBUG] Chat Refreshed");
    setMessages([initialMsg]);
    setInputValue('');
    setIsLoading(false);
  };

  // Trace Rendering Pipeline
  const safeMessages = normalizeMessages(messages);
  console.log("[DEBUG] [RENDER MESSAGES]", safeMessages);

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
            {safeMessages.map((m, idx) => {
              console.log(`[DEBUG] [RENDER MESSAGE ${idx}]`, m);
              return <MessageBubble key={m.id} message={m} />;
            })}
            
            {/* Trace Loading Placeholder */}
            {isLoading && (
              <MessageBubble 
                message={createMessage({ 
                  role: 'assistant', 
                  text: '', 
                  loading: true 
                })} 
              />
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