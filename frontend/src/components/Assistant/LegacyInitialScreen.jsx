import { useState } from 'react';
import { CATEGORIES, MORE_CATEGORIES } from '../../data/promptCategories';
import styles from './Assistant.module.css';

/**
 * LegacyInitialScreen - Hardened version
 */
const LegacyInitialScreen = ({ onPromptSelect }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const safeOnPromptSelect = (txt) => {
    if (typeof onPromptSelect === 'function') {
      onPromptSelect(String(txt || ""));
    }
  };

  const safeCategories = Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const safeMoreCategories = Array.isArray(MORE_CATEGORIES) ? MORE_CATEGORIES : [];

  const renderCategoryGrid = (categories) => (
    <div className={styles.promptGrid}>
      {categories.map((category) => (
        <button
          key={category?.id || Math.random()}
          className={styles.promptButton}
          onClick={() => setSelectedCategory(category)}
        >
          <span className={styles.categoryIcon}>{category?.icon || '🏢'}</span>
          <span className={styles.categoryTitle}>{category?.title || 'Category'}</span>
        </button>
      ))}
      <button
        className={`${styles.promptButton} ${styles.moreButton}`}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show Less' : 'More Categories'}
      </button>
      {showMore && safeMoreCategories.map((category) => (
        <button
          key={category?.id || Math.random()}
          className={styles.promptButton}
          onClick={() => setSelectedCategory(category)}
        >
          <span className={styles.categoryIcon}>{category?.icon || '🏢'}</span>
          <span className={styles.categoryTitle}>{category?.title || 'Category'}</span>
        </button>
      ))}
    </div>
  );

  const renderPromptList = () => (
    <div className={styles.promptListOverlay}>
      <div className={styles.promptListHeader}>
        <button className={styles.backButton} onClick={() => setSelectedCategory(null)}>← Back</button>
        <h3 className={styles.selectedCategoryTitle}>
          <span className={styles.categoryIcon}>{selectedCategory?.icon}</span>
          {selectedCategory?.title}
        </h3>
      </div>
      <div className={styles.promptList}>
        {(selectedCategory?.prompts || []).map((prompt) => (
          <button
            key={prompt?.id || Math.random()}
            className={styles.promptListItem}
            onClick={() => safeOnPromptSelect(prompt?.text)}
          >
            {prompt?.text || "Option"}
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
        {renderCategoryGrid(safeCategories)}
      </div>
      {selectedCategory && renderPromptList()}
    </div>
  );
};

export default LegacyInitialScreen;