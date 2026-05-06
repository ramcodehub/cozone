import { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import ErrorBoundary from './ErrorBoundary';
import styles from './Assistant.module.css';
import aiAssistantIcon from '../../assets/logos/aiassistant.png';

/**
 * ChatWidget Component - Main entry point for the AI Assistant floating button and window
 */
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const chatWindowWrapperRef = useRef(null);

  const toggleChat = () => {
    if (isMinimized) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeChat();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div className={styles.chatWidgetContainer}>
      <AnimatePresence>
        {!isOpen && (
          <Motion.button
            className={styles.chatButton}
            onClick={toggleChat}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat assistant"
          >
            <div className={styles.chatButtonIconContainer}>
              <img src={aiAssistantIcon} alt="AI Assistant" className={styles.chatButtonIcon} />
            </div>
          </Motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            ref={chatWindowWrapperRef}
            className={styles.chatWindowWrapper}
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.3 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <ErrorBoundary>
              <ChatWindow 
                onClose={closeChat}
                chatWindowWrapperRef={chatWindowWrapperRef}
              />
            </ErrorBoundary>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;