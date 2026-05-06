import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createMessage } from '../../utils/chatMessage';
import styles from './Assistant.module.css';

/**
 * Hardened MessageBubble Component
 * Uses centralized createMessage factory for absolute property safety.
 */
const MessageBubble = ({ message: rawMessage }) => {
  // 1. Immediate Normalization
  const message = createMessage(rawMessage || {});
  
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Safe Text Reference
  const safeText = message.text || "";
  const isBot = message.role === 'assistant';

  // 3. Reset animation for new messages
  useEffect(() => {
    // If it's a typing bot message, reset animation
    if (isBot && !message.loading && displayedText === '' && currentIndex === 0) {
      // Logic for starting animation if needed
    } else if (!isBot || !message.loading) {
      setDisplayedText(safeText);
    }
  }, [message.id, isBot, message.loading, safeText]);

  // 4. Typing animation with strict boundary checks
  useEffect(() => {
    if (isBot && !message.loading && currentIndex < (safeText || "").length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => (typeof prev === 'string' ? prev : "") + (safeText[currentIndex] || ""));
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isBot, message.loading, safeText]);

  // 5. Safe Time Formatting
  const formatTime = (ts) => {
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // If loading, render typing indicator inside bubble
  if (message.loading) {
    return (
      <div className={`${styles.messageBubble} ${styles.botMessage}`}>
        <div className={styles.messageContent}>
          <div className={styles.typingIndicator}>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.messageBubble} ${isBot ? styles.botMessage : styles.userMessage}`}>
      <div className={styles.messageContent}>
        <div className={styles.messageText}>
          {isBot ? (
            <ReactMarkdown 
              components={{
                strong: ({...props}) => <strong {...props} />,
                ol: ({...props}) => <ol {...props} className={styles.markdownList} />,
                li: ({...props}) => <li {...props} className={styles.markdownListItem} />
              }}
            >
              {displayedText || ""}
            </ReactMarkdown>
          ) : (
            displayedText || ""
          )}
          {isBot && currentIndex < (safeText || "").length && (
            <span className={styles.cursor}>|</span>
          )}
        </div>
        <span className={styles.messageTime}>{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;