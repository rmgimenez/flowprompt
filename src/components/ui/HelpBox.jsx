import React from 'react';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const HelpBox = ({ text }) => {
  if (!text) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="help-box"
    >
      <div className="help-box-icon">
        <Info size={20} />
      </div>
      <div className="help-box-content">
        <span className="help-box-label">Guia Rápido</span>
        <p className="help-box-text">{text}</p>
      </div>
    </motion.div>
  );
};
