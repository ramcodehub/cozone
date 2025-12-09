import { motion as Motion } from 'framer-motion';

const PromptList = ({ prompts, onPromptClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 max-h-60 overflow-y-auto pr-2">
      {prompts.map((prompt, index) => (
        <Motion.button
          key={prompt.id}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-left hover:bg-white/20 transition-all duration-300 text-white"
          onClick={() => onPromptClick(prompt.text)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <span className="text-sm">{prompt.text}</span>
        </Motion.button>
      ))}
    </div>
  );
};

export default PromptList;