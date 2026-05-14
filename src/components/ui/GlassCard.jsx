import React from 'react';
import styles from './GlassCard.module.css';
import { clsx } from 'clsx';

export const GlassCard = ({ children, className, ...props }) => {
  return (
    <div 
      className={clsx(styles.glassCard, className)}
      {...props}
    >
      {children}
    </div>
  );
};
