import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Assistant.module.css';

/**
 * MessageBubble Component - Renders individual chat messages with ultra-defensive logic
 */
const MessageBubble = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 1. Defensively calculate the text to display
  // Ensuring it is ALWAYS a string to prevent .length or indexing crashes
  const rawText = message?.text;
  const safeText = typeof rawText === 'string' ? rawText : (rawText ? String(rawText) : "");

  const formatTime = (date) => {
    try {
      const d = date instanceof Date ? date : new Date(date);
      return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Reset animation when message changes
  useEffect(() => {
    if (message?.sender === 'bot' && message?.isTyping) {
      setDisplayedText('');
      setCurrentIndex(0);
    } else {
      setDisplayedText(safeText);
    }
  }, [message, safeText]);

  // Typing animation with boundary checks
  useEffect(() => {
    if (message?.sender === 'bot' && message?.isTyping) {
      // Only proceed if we haven't finished typing the current string
      if (currentIndex < safeText.length) {
        const timeout = setTimeout(() => {
          // Append next character safely
          setDisplayedText(prev => (typeof prev === 'string' ? prev : "") + (safeText[currentIndex] || ""));
          setCurrentIndex(prev => prev + 1);
        }, 15);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, message, safeText]);

  // If message object is completely missing, render nothing
  if (!message || typeof message !== 'object') return null;

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
        <span className={styles.messageTime}>
          {formatTime(message.timestamp || new Date())}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;