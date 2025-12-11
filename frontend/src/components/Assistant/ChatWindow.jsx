import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InitialScreen from './InitialScreen';
import styles from './Assistant.module.css';
import aiAssistantIcon from '../../assets/logos/aiassistant.png';

const ChatWindow = ({ onClose, chatWindowWrapperRef }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // For prompt modal
  const [showPromptModal, setShowPromptModal] = useState(false); // For prompt modal
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const sessionIdRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Initialize session ID
  useEffect(() => {
    // Generate a unique session ID if not already present
    if (!sessionIdRef.current) {
      sessionIdRef.current = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  }, []);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser');
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError('Speech recognition failed. Please try typing your message.');
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    };
    
    initSpeechRecognition();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Toggle voice input
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser. Please ask anything about Cozone.');
      return;
    }
    
    setError(null);
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setError('Failed to start voice input. Please try typing your message.');
      }
    }
  };

  // Handle prompt selection from InitialScreen
  const handlePromptSelect = (prompt) => {
    setInputValue(prompt);
    // Trigger send after a short delay to allow state update
    setTimeout(() => {
      handleSend(prompt);
    }, 10);
  };

  // Handle closing the prompt modal
  const handleCloseModal = () => {
    setShowPromptModal(false);
    setSelectedCategory(null);
  };

  // Handle prompt click in modal
  const handlePromptClick = (promptText) => {
    handlePromptSelect(promptText);
    handleCloseModal();
  };

  // Handle sending a message
  const handleSend = async (customMessage = null) => {
    const messageToSend = customMessage || inputValue;
    if (messageToSend.trim() === '' || isLoading) return;

    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use local backend URL during development, deployed URL in production
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const backendUrl = isDevelopment 
        ? 'http://localhost:5000/api/ai' 
        : 'https://cozone-backend.onrender.com/api/ai';

      // Call backend API
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: sessionIdRef.current
        })
      });

      const data = await response.json();

      if (data.success) {
        // Add bot response with typing animation
        const botMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          isTyping: true // Enable typing animation
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Add error message with typing animation
        const errorMessage = {
          id: messages.length + 2,
          text: data.message || "I'm receiving too many requests right now. Please try again in a moment.",
          sender: 'bot',
          timestamp: new Date(),
          isTyping: true // Enable typing animation for error messages
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message with typing animation
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm receiving too many requests right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true // Enable typing animation for error messages
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    
    // Apply styles directly to DOM elements for reliable fullscreen behavior
    if (chatWindowRef.current && chatWindowWrapperRef && chatWindowWrapperRef.current) {
      if (newFullscreenState) {
        // Enter fullscreen
        chatWindowWrapperRef.current.style.position = 'fixed';
        chatWindowWrapperRef.current.style.top = '0';
        chatWindowWrapperRef.current.style.left = '0';
        chatWindowWrapperRef.current.style.width = '100vw';
        chatWindowWrapperRef.current.style.height = '100vh';
        chatWindowWrapperRef.current.style.maxHeight = '100vh';
        chatWindowWrapperRef.current.style.bottom = 'auto';
        chatWindowWrapperRef.current.style.right = 'auto';
        chatWindowWrapperRef.current.style.zIndex = '10000';
        
        chatWindowRef.current.style.position = 'fixed';
        chatWindowRef.current.style.top = '0';
        chatWindowRef.current.style.left = '0';
        chatWindowRef.current.style.width = '100vw';
        chatWindowRef.current.style.height = '100vh';
        chatWindowRef.current.style.maxHeight = '100vh';
        chatWindowRef.current.style.borderRadius = '0';
        chatWindowRef.current.style.zIndex = '10000';
      } else {
        // Exit fullscreen - reset to original styles
        chatWindowWrapperRef.current.style.position = '';
        chatWindowWrapperRef.current.style.top = '';
        chatWindowWrapperRef.current.style.left = '';
        chatWindowWrapperRef.current.style.width = '';
        chatWindowWrapperRef.current.style.height = '';
        chatWindowWrapperRef.current.style.maxHeight = '';
        chatWindowWrapperRef.current.style.bottom = '';
        chatWindowWrapperRef.current.style.right = '';
        chatWindowWrapperRef.current.style.zIndex = '';
        
        chatWindowRef.current.style.position = '';
        chatWindowRef.current.style.top = '';
        chatWindowRef.current.style.left = '';
        chatWindowRef.current.style.width = '';
        chatWindowRef.current.style.height = '';
        chatWindowRef.current.style.maxHeight = '';
        chatWindowRef.current.style.borderRadius = '';
        chatWindowRef.current.style.zIndex = '';
      }
    }
  };

  // Refresh chat - clear messages and show initial screen
  const handleRefresh = () => {
    setMessages([]);
    setInputValue('');
    setError(null);
    setIsLoading(false);
    
    // Add a test message to demonstrate markdown formatting
    // This will be removed in production
    /*
    const testMessage = {
      id: 1,
      text: "**Dedicated Desks** are perfect for individuals who need a consistent workspace. Here are the benefits:\n\n1. Personal storage space\n2. Ergonomic chair and desk\n3. 24/7 access to the facility\n4. High-speed internet and printing services",
      sender: 'bot',
      timestamp: new Date(),
      isTyping: false
    };
    setTimeout(() => {
      setMessages([testMessage]);
    }, 500);
    */
  };

  // Handle category click in InitialScreen
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowPromptModal(true);
  };

  return (
    <div 
      ref={chatWindowRef}
      className={`${styles.chatWindow} ${isFullscreen ? styles.fullscreen : ''}`}
    >
      {/* Chat header */}
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
          {/* Refresh button */}
          <button 
            className={styles.refreshButton} 
            onClick={handleRefresh}
            aria-label="Refresh chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 16h5v5"/>
            </svg>
          </button>
          
          {/* Fullscreen/Minimize button */}
          <button 
            className={styles.fullscreenButton} 
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              // Minimize icon when in fullscreen
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            ) : (
              // Expand icon when not in fullscreen
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            )}
          </button>
          
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
          <button onClick={clearError} className={styles.clearErrorButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Chat messages or InitialScreen */}
      <div className={styles.messagesContainer}>
        {messages.length === 0 && !isLoading ? (
          <InitialScreen onExampleClick={handlePromptSelect} onCategoryClick={handleCategoryClick} />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
              />
            ))}
          
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Prompt Modal */}
      {showPromptModal && (
        <>
          <div className={styles.promptModalActions}>
            <button 
              className={styles.backButton} 
              onClick={handleCloseModal}
              aria-label="Back to categories"
            >
              ← Back
            </button>
          </div>
          <div className={styles.promptModalList}>
            <div className={styles.minimalPromptList}>
              {selectedCategory?.prompts.map((prompt, index) => (
                <div key={prompt.id} className={styles.promptItemWrapper}>
                  <button 
                    className={styles.minimalPromptButton}
                    onClick={() => handlePromptClick(prompt.text)}
                  >
                    {prompt.text}
                  </button>
                  {index !== selectedCategory.prompts.length - 1 && (
                    <div className={styles.promptDivider}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Chat input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about Cozone..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
            onClick={toggleVoiceInput}
            disabled={isLoading}
            aria-label={isListening ? "Stop listening" : "Voice input"}
          >
            {isListening ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12" rx="2" ry="2"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            )}
          </button>
          <button 
            className={styles.sendButton}
            onClick={() => handleSend()}
            disabled={isLoading || inputValue.trim() === ''}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;