import { Zap } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';

export function ModeItem({ item, currentModeId, onModeChange, onClose, hasTemplates }) {
  const Icon = item.icon;
  const isActive = currentModeId === item.id;

  return (
    <button
      className={clsx(styles.navLink, isActive && styles.active)}
      onClick={() => {
        onModeChange(item.id);
        if (onClose) onClose();
      }}
    >
      <Icon size={20} className={styles.icon} />
      <span className={styles.linkLabel}>{item.label}</span>
      {hasTemplates && (
        <span className={styles.templateBadge} title="Templates disponíveis">
          <Zap size={10} />
        </span>
      )}
    </button>
  );
}
