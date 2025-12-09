import { useState } from 'react';
import styles from './FloatingCall.module.css';
import callIcon from '../../assets/logos/telephone.png';

const FloatingCall = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  // Phone number for direct calling
  const phoneNumber = "tel:+919577577888";

  const handleCallClick = () => {
    window.location.href = phoneNumber;
  };

  return (
    <div className={styles.floatingContainer}>
      <button
        className={`${styles.floatingButton} ${styles.callButton}`}
        onClick={handleCallClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        aria-label="Call us"
      >
        <img 
          src={callIcon} 
          alt="Call" 
          className={styles.buttonIcon}
        />
        
        {isTooltipVisible && (
          <span className={styles.tooltip}>Call for quotation</span>
        )}
      </button>
    </div>
  );
};

export default FloatingCall;