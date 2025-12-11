import { useState } from 'react';
import { CATEGORIES, MORE_CATEGORIES } from '../../data/promptCategories';
import styles from './Assistant.module.css';

const InitialScreen = ({ onExampleClick, onCategoryClick }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  // Show only first 3 categories initially
  const initialCategories = CATEGORIES.slice(0, 3);

  // Render category grid for main view
  const renderCategoryGrid = () => (
    <div className={styles.promptGrid}>
      {initialCategories.map((category) => (
        <button
          key={category.id}
          className={styles.promptButton}
          onClick={() => onCategoryClick ? onCategoryClick(category) : onExampleClick(`Show me ${category.title.toLowerCase()} options`)}
          aria-label={`Select category: ${category.title}`}
        >
          <span className={styles.categoryIcon}>{category.icon}</span>
          <span className={styles.categoryTitle}>{category.title}</span>
        </button>
      ))}
      <button
        className={`${styles.promptButton} ${styles.moreButton}`}
        onClick={toggleMore}
        aria-label={showMore ? "Show less categories" : "Show more categories"}
      >
        {showMore ? 'Show Less' : '+ More'}
      </button>
      {showMore && [
        ...CATEGORIES.slice(3), // Remaining categories from CATEGORIES
        ...MORE_CATEGORIES
      ].map((category) => (
        <button
          key={category.id}
          className={styles.promptButton}
          onClick={() => onCategoryClick ? onCategoryClick(category) : onExampleClick(`Show me ${category.title.toLowerCase()} options`)}
          aria-label={`Select category: ${category.title}`}
        >
          <span className={styles.categoryIcon}>{category.icon}</span>
          <span className={styles.categoryTitle}>{category.title}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.legacyInitialScreen}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>CoZone AI Assistant</h2>
        <p className={styles.welcomeSubtitle}>Click any category as type and ask in search box</p>
      </div>
      
      <div className={styles.categoriesSection}>
        {/* <h3 className={styles.sectionTitle}>Popular Categories</h3> */}
        {renderCategoryGrid()}
      </div>
    </div>
  );
};

export default InitialScreen;