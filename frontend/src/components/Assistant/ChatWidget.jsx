import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import styles from './Assistant.module.css';
import aiAssistantIcon from '../../assets/logos/aiassistant.webp';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Toggle chat window open/close
  const toggleChat = () => {
    if (isMinimized) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
    }
  };

  // Close chat window completely
  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  // Handle ESC key to close chat
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeChat();
      }
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
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <Motion.button
            className={styles.chatButton}
            onClick={toggleChat}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ y: -5 }} // Move up slightly instead of scaling
            whileTap={{ scale: 0.95 }} // Slight scale down on tap
            aria-label="Open chat assistant"
          >
            <img 
              src={aiAssistantIcon} 
              alt="AI Assistant" 
              className={styles.chatButtonIcon}
            />
          </Motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            className={styles.chatWindowWrapper}
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.3 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <ChatWindow 
              isOpen={isOpen} 
              isMinimized={isMinimized}
              onClose={closeChat}
              onMinimize={toggleChat}
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;