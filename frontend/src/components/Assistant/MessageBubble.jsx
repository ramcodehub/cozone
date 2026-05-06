import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Assistant.module.css';

/**
 * MessageBubble Component - Renders individual chat messages with typing animation support
 */
const MessageBubble = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Safe helper to format time
  const formatTime = (date) => {
    try {
      const d = date instanceof Date ? date : new Date(date);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Safe helper to get message text
  const messageText = message?.text || "";

  // Reset/Initialize displayed text when message object changes
  useEffect(() => {
    if (message?.sender === 'bot' && message?.isTyping) {
      setDisplayedText('');
      setCurrentIndex(0);
    } else {
      setDisplayedText(messageText);
    }
  }, [message, messageText]);

  // Typing animation effect logic
  useEffect(() => {
    if (message?.sender === 'bot' && message?.isTyping && currentIndex < messageText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + messageText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15); // Slightly faster typing for better UX

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message, messageText]);

  // Safety: If message is missing, don't render anything that could crash
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
              {displayedText || ""}
            </ReactMarkdown>
          ) : (
            displayedText || ""
          )}
          {message.sender === 'bot' && message.isTyping && currentIndex < messageText.length && (
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