import { useState } from 'react';
import styles from './FloatingWhatsApp.module.css';
import whatsappIcon from '../../assets/logos/whatsup.png';

const FloatingWhatsApp = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  // WhatsApp number with pre-filled message for quotations
  const phoneNumber = "919577577888";
  const defaultMessage = "Hello, I'm interested in your construction services. Could you please provide more information?";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className={styles.floatingContainer}>
      <button
        className={`${styles.floatingButton} ${styles.whatsappButton}`}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        aria-label="Chat with us on WhatsApp"
      >
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className={styles.buttonIcon}
        />
        
        {isTooltipVisible && (
          <span className={styles.tooltip}>Get a quotation</span>
        )}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;