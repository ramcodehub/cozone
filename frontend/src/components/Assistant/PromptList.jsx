import { motion as Motion } from 'framer-motion';

/**
 * Hardened PromptList Component
 */
const PromptList = ({ prompts, onPromptClick }) => {
  // Defensive array check
  const safePrompts = Array.isArray(prompts) ? prompts : [];

  const handlePromptClick = (p) => {
    if (typeof onPromptClick === 'function') {
      const text = typeof p === 'string' ? p : (p?.text || "");
      onPromptClick(text);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 max-h-60 overflow-y-auto pr-2">
      {safePrompts.map((prompt, index) => {
        if (!prompt) return null;
        
        const safeId = prompt.id || `prompt-${index}-${Math.random()}`;
        const safeText = prompt.text || "View Option";

        return (
          <Motion.button
            key={safeId}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-left hover:bg-white/20 transition-all duration-300 text-white"
            onClick={() => handlePromptClick(prompt)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-sm">{safeText}</span>
          </Motion.button>
        );
      })}
    </div>
  );
};

export default PromptList;