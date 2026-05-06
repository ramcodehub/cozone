import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InitialScreen from './InitialScreen';
// @ts-ignore
import styles from './Assistant.module.css';
// @ts-ignore
import aiAssistantIcon from '../../assets/logos/aiassistant.png';

/**
 * ChatWindow Component - Handles the chat interface and API communication
 */
const ChatWindow = ({ onClose, chatWindowWrapperRef }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const sessionIdRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Initialize session ID
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window['webkitSpeechRecognition'];
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    };

    initSpeechRecognition();
    return () => recognitionRef.current?.stop();
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported. Please type your message.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setError('Voice input failed. Please type your message.');
      }
    }
  };

  const handlePromptSelect = (prompt) => {
    setInputValue(prompt);
    setTimeout(() => handleSend(prompt), 10);
  };

  const handleSend = async (customMessage = null) => {
    const messageToSend = (customMessage || inputValue || "").trim();
    if (!messageToSend || isLoading) return;

    setError(null);

    // 1. Add User Message
    const userMessage = {
      id: Date.now(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const backendUrl = isDevelopment
        ? 'http://localhost:5005/api/ai'
        : 'https://cozone.onrender.com/api/ai';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: sessionIdRef.current
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log("[AI API Response Debug]:", data);

      // 2. Map Backend Response Safely
      // Normalize 'reply' from OpenRouter or 'message' from errors
      const aiText = data?.reply || data?.message || "I'm sorry, I couldn't process that. Please try again.";

      const botMessage = {
        id: Date.now() + 1,
        text: aiText,
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('AI Request Error:', err);
      const errorMessage = {
        id: Date.now() + 2,
        text: "I'm having trouble connecting to my brain right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    if (chatWindowWrapperRef?.current) {
      chatWindowWrapperRef.current.style.zIndex = newState ? '10000' : '';
    }
  };

  const handleRefresh = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className={`${styles.chatWindow} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.botAvatar}>
            <img src={aiAssistantIcon} alt="AI Assistant" />
          </div>
          <div>
            <h3 className={styles.headerTitle}>CoZone AI Assistant</h3>
            <p className={styles.headerSubtitle}>Ask anything about CoZone</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleRefresh} className={styles.refreshButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
          </button>
          <button onClick={toggleFullscreen} className={styles.fullscreenButton}>
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
            )}
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 && !isLoading ? (
          <InitialScreen onExampleClick={handlePromptSelect} onCategoryClick={(c) => { setSelectedCategory(c); setShowPromptModal(true); }} />
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.botMessage}`}>
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {showPromptModal && (
        <div className={styles.promptModalList}>
          <button onClick={() => setShowPromptModal(false)} className={styles.backButton}>← Back</button>
          <div className={styles.minimalPromptList}>
            {selectedCategory?.prompts.map((p) => (
              <button key={p.id} onClick={() => { handlePromptSelect(p.text); setShowPromptModal(false); }} className={styles.minimalPromptButton}>
                {p.text}
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
            onKeyDown={handleKeyPress}
            placeholder="Ask anything about Cozone..."
            rows={1}
            disabled={isLoading}
          />
          <button onClick={toggleVoiceInput} className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`} disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </button>
          <button onClick={() => handleSend()} className={styles.sendButton} disabled={isLoading || !inputValue.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;