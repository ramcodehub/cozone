import { useState } from 'react';
import { CATEGORIES, MORE_CATEGORIES } from '../../data/promptCategories';
import styles from './Assistant.module.css';

/**
 * InitialScreen Component - Ultra-Hardened version
 */
const InitialScreen = ({ onExampleClick, onCategoryClick }) => {
  const [showMore, setShowMore] = useState(false);

  // Safe callback handlers
  const handleExample = (prompt) => {
    if (typeof onExampleClick === 'function') {
      const text = typeof prompt === 'string' ? prompt : (prompt?.text || "");
      onExampleClick(text);
    }
  };

  const handleCategory = (category) => {
    if (typeof onCategoryClick === 'function') {
      onCategoryClick(category);
    } else {
      handleExample(`Show me ${category?.title || 'options'}`);
    }
  };

  // Safe category data
  const safeCategories = Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const safeMoreCategories = Array.isArray(MORE_CATEGORIES) ? MORE_CATEGORIES : [];
  const initialCategories = safeCategories.slice(0, 3);

  return (
    <div className={styles.legacyInitialScreen}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>CoZone AI Assistant</h2>
        <p className={styles.welcomeSubtitle}>Click a category or ask anything below</p>
      </div>
      
      <div className={styles.categoriesSection}>
        <div className={styles.promptGrid}>
          {initialCategories.map((category) => (
            <button
              key={category?.id || Math.random()}
              className={styles.promptButton}
              onClick={() => handleCategory(category)}
            >
              <span className={styles.categoryIcon}>{category?.icon || '🏢'}</span>
              <span className={styles.categoryTitle}>{category?.title || 'Category'}</span>
            </button>
          ))}
          
          <button
            className={`${styles.promptButton} ${styles.moreButton}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : '+ More'}
          </button>

          {showMore && [
            ...safeCategories.slice(3),
            ...safeMoreCategories
          ].map((category) => (
            <button
              key={category?.id || Math.random()}
              className={styles.promptButton}
              onClick={() => handleCategory(category)}
            >
              <span className={styles.categoryIcon}>{category?.icon || '🏢'}</span>
              <span className={styles.categoryTitle}>{category?.title || 'Category'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialScreen;