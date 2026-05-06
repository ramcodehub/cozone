import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Assistant.module.css';

const MessageBubble = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Typing animation effect for bot messages
  useEffect(() => {
    if (message.sender === 'bot' && message.isTyping) {
      // Reset for new typing animation
      setDisplayedText('');
      setCurrentIndex(0);
    } else if (message.sender === 'bot' && !message.isTyping) {
      // Show full text immediately if not typing
      setDisplayedText(message.text);
    } else if (message.sender === 'user') {
      // Show user messages immediately
      setDisplayedText(message.text);
    }
  }, [message]);

  // Typing animation effect
  useEffect(() => {
    if (message.sender === 'bot' && message.isTyping && currentIndex < message.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + message.text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust typing speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message]);

  return (
    <div className={`${styles.messageBubble} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
      {/* Removed bot avatar/icon */}
      
      <div className={styles.messageContent}>
        <div className={styles.messageText}>
          {message.sender === 'bot' ? (
            <ReactMarkdown components={{
              strong: ({...props}) => <strong {...props} />,
              ol: ({...props}) => <ol {...props} className={styles.markdownList} />,
              li: ({...props}) => <li {...props} className={styles.markdownListItem} />
            }}>
              {displayedText}
            </ReactMarkdown>
          ) : (
            displayedText
          )}
          {message.sender === 'bot' && message.isTyping && (
            <span className={styles.cursor}>|</span>
          )}
        </div>
        <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
      </div>
      
      {/* Removed user avatar/icon */}
    </div>
  );
};

export default MessageBubble;