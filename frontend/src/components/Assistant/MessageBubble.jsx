import { useState, useEffect } from 'react';
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
      {message.sender === 'bot' && (
        <div className={styles.botAvatarSmall}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          </svg>
        </div>
      )}
      
      <div className={styles.messageContent}>
        <p className={styles.messageText}>
          {displayedText}
          {message.sender === 'bot' && message.isTyping && (
            <span className={styles.cursor}>|</span>
          )}
        </p>
        <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
      </div>
      
      {message.sender === 'user' && (
        <div className={styles.userAvatar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;