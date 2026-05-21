import { motion } from 'framer-motion';

export function ToolPageLayout({ children }) {
  return (
    <div className="content-grid custom-full-width">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
