import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Assistant.module.css';

/**
 * MessageBubble Component - Crash-Proof Version
 */
const MessageBubble = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Double-Layer Safe Text Extraction
  const getSafeText = (msg) => {
    try {
      const raw = msg?.text;
      if (typeof raw === 'string') return raw;
      if (raw === null || raw === undefined) return "";
      return String(raw);
    } catch (e) {
      return "";
    }
  };

  const safeTextValue = getSafeText(message);

  // 2. Safe Time Formatting
  const getSafeTime = (timestamp) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "";
    }
  };

  const safeTime = getSafeTime(message?.timestamp || new Date());

  // 3. Animation Logic with Error Catching
  useEffect(() => {
    try {
      if (message?.sender === 'bot' && message?.isTyping) {
        setDisplayedText('');
        setCurrentIndex(0);
      } else {
        setDisplayedText(safeTextValue);
      }
    } catch (err) {
      console.error("[MessageBubble Logic Error]:", err);
    }
  }, [message, safeTextValue]);

  useEffect(() => {
    try {
      if (message?.sender === 'bot' && message?.isTyping) {
        const textLen = (safeTextValue || "").length;
        if (currentIndex < textLen) {
          const timeout = setTimeout(() => {
            setDisplayedText(prev => {
              const safePrev = typeof prev === 'string' ? prev : "";
              const nextChar = safeTextValue[currentIndex] || "";
              return safePrev + nextChar;
            });
            setCurrentIndex(prev => prev + 1);
          }, 15);
          return () => clearTimeout(timeout);
        }
      }
    } catch (err) {
      console.error("[MessageBubble Animation Error]:", err);
    }
  }, [currentIndex, message, safeTextValue]);

  // 4. Ultimate Safety Return
  try {
    if (!message) return null;

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
                {String(displayedText || "")}
              </ReactMarkdown>
            ) : (
              String(displayedText || "")
            )}
            {message.sender === 'bot' && message.isTyping && currentIndex < (safeTextValue || "").length && (
              <span className={styles.cursor}>|</span>
            )}
          </div>
          <span className={styles.messageTime}>{safeTime}</span>
        </div>
      </div>
    );
  } catch (renderError) {
    console.error("[MessageBubble Render Crash]:", renderError);
    return (
      <div className={styles.botMessage}>
        <div className={styles.messageContent}>
          <p>Message rendering failed.</p>
        </div>
      </div>
    );
  }
};

export default MessageBubble;