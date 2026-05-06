import { useState } from 'react';
import { CATEGORIES, MORE_CATEGORIES } from '../../data/promptCategories';
import styles from './Assistant.module.css';

const LegacyInitialScreen = ({ onPromptSelect }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handlePromptClick = (promptText) => {
    onPromptSelect(promptText);
  };

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  // Render category grid for main view
  const renderCategoryGrid = (categories) => (
    <div className={styles.promptGrid}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={styles.promptButton}
          onClick={() => handleCategoryClick(category)}
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
        {showMore ? 'Show Less' : 'More Categories'}
      </button>
      {showMore && MORE_CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={styles.promptButton}
          onClick={() => handleCategoryClick(category)}
          aria-label={`Select category: ${category.title}`}
        >
          <span className={styles.categoryIcon}>{category.icon}</span>
          <span className={styles.categoryTitle}>{category.title}</span>
        </button>
      ))}
    </div>
  );

  // Render prompt list for category view
  const renderPromptList = () => (
    <div className={styles.promptListOverlay}>
      <div className={styles.promptListHeader}>
        <button 
          className={styles.backButton} 
          onClick={handleBackClick}
          aria-label="Back to categories"
        >
          ← Back
        </button>
        <h3 className={styles.selectedCategoryTitle} aria-label={`Selected category: ${selectedCategory?.title}`}>
          <span className={styles.categoryIcon}>{selectedCategory?.icon}</span>
          {selectedCategory?.title}
        </h3>
      </div>
      <div className={styles.promptList}>
        {selectedCategory?.prompts.map((prompt) => (
          <button
            key={prompt.id}
            className={styles.promptListItem}
            onClick={() => handlePromptClick(prompt.text)}
            aria-label={`Select prompt: ${prompt.text}`}
          >
            {prompt.text}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.legacyInitialScreen}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>CoZone AI Assistant</h2>
        <p className={styles.welcomeSubtitle}>How can we help you today?</p>
      </div>
      
      <div className={styles.categoriesSection}>
        <h3 className={styles.sectionTitle}>Popular Categories</h3>
        {renderCategoryGrid(CATEGORIES)}
      </div>
      
      {selectedCategory && renderPromptList()}
    </div>
  );
};

export default LegacyInitialScreen;