import React from 'react';
import { Play, Image, Camera, Sparkles, Info, Wand2 } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';

const Sidebar = ({ currentModeId, onModeChange }) => {
  const menuItems = [
    { id: 'video-new', label: 'Vídeo Novo', icon: Play },
    { id: 'video-from-img', label: 'Vídeo de Imagem', icon: Image },
    { id: 'photo-new', label: 'Foto Nova', icon: Camera },
    { id: 'photo-transform', label: 'Transformar Foto', icon: Sparkles },
    { id: 'divider', isDivider: true },
    { id: 'about', label: 'Sobre a Ferramenta', icon: Info },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Wand2 className={styles.logoIcon} size={32} />
        <span className={styles.logoText}>Flow Prompt</span>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item, index) => {
          if (item.isDivider) {
            return <hr key={`divider-${index}`} className={styles.divider} />;
          }

          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={clsx(styles.navLink, currentModeId === item.id && styles.active)}
              onClick={() => onModeChange(item.id)}
            >
              <Icon size={20} className={styles.icon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.helpCard}>
          <p className={styles.helpText}>Baseado no guia oficial do Google Flow.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
