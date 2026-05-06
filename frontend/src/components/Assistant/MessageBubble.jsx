import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createMessage } from '../../utils/chatMessage';
import styles from './Assistant.module.css';

/**
 * Instrumented MessageBubble for Deep Debugging
 */
const MessageBubble = ({ message: rawMessage }) => {
  // Trace Component Mount
  console.log("[DEBUG] [MessageBubble Mount] Raw input:", rawMessage);

  // 1. Trace Normalization
  const message = createMessage(rawMessage || {});
  console.log("[DEBUG] [MessageBubble Post-Normalization]:", message);
  
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Trace safe properties
  const safeText = message.text || "";
  const isBot = message.role === 'assistant';

  // [DEBUG] Check Length
  console.log("[DEBUG] [LENGTH CHECK] safeText length:", safeText.length);

  useEffect(() => {
    if (!isBot || message.loading) {
      setDisplayedText(safeText);
    }
  }, [message.id, isBot, message.loading, safeText]);

  // 3. Trace Typing Animation
  useEffect(() => {
    if (isBot && !message.loading) {
      const textLen = (safeText || "").length;
      if (currentIndex < textLen) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => {
            const nextChar = safeText[currentIndex];
            if (nextChar === undefined) {
              console.warn("[DEBUG] [ANIMATION WARNING] Found undefined char at index", currentIndex);
            }
            return (prev || "") + (nextChar || "");
          });
          setCurrentIndex(prev => prev + 1);
        }, 15);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, isBot, message.loading, safeText]);

  const formatTime = (ts) => {
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  if (message.loading) {
    console.log("[DEBUG] Rendering loading indicator bubble");
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

  try {
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
                {String(displayedText || "")}
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
  } catch (renderErr) {
    console.error("[DEBUG] [MessageBubble RENDER ERROR]", renderErr);
    return <div>Render failed.</div>;
  }
};

export default MessageBubble;