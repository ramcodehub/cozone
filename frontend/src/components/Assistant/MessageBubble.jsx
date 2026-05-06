import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { normalizeMessage } from './messageUtils';
import styles from './Assistant.module.css';

/**
 * MessageBubble Component - Hardened for Production
 */
const MessageBubble = ({ message: rawMessage }) => {
  // Normalize the message object immediately upon receiving it
  const message = normalizeMessage(rawMessage);
  
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Safe helper to format time
  const formatTime = (date) => {
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Safe text reference
  const safeText = message.text;

  // Reset animation for new messages
  useEffect(() => {
    if (message.sender === 'bot' && message.isTyping) {
      setDisplayedText('');
      setCurrentIndex(0);
    } else {
      setDisplayedText(safeText);
    }
  }, [message.id, message.sender, message.isTyping, safeText]);

  // Typing effect logic
  useEffect(() => {
    if (message.sender === 'bot' && message.isTyping && currentIndex < safeText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => (typeof prev === 'string' ? prev : "") + (safeText[currentIndex] || ""));
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message.isTyping, message.sender, safeText]);

  return (
    <div className={`${styles.messageBubble} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
      <div className={styles.messageContent}>
        <div className={styles.messageText}>
          {message.sender === 'bot' ? (
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
          {message.sender === 'bot' && message.isTyping && currentIndex < safeText.length && (
            <span className={styles.cursor}>|</span>
          )}
        </div>
        <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;