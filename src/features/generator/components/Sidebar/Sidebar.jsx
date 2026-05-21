import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Play, Image, Camera, Sparkles, Info, Wand2, 
  History, Star, LayoutGrid, Copy, RotateCcw, Check,
  Layers, X, Folders, Film, Palette, Wrench, Zap
} from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';
import { MODES } from '../../constants/modes';
import { TEMPLATES } from '../../constants/templates';
import { useGeneratorContext } from '../../../../contexts/useGeneratorContext';

const MODE_CATEGORIES = [
  {
    id: 'video',
    label: 'Vídeo',
    icon: Film,
    color: '#3d5afe',
    items: [
      { id: 'video-from-frames', label: 'Interpolação (2 Frames)', icon: Wand2 },
      { id: 'video-new', label: 'Vídeo Novo', icon: Play },
      { id: 'video-from-img', label: 'Vídeo de Imagem', icon: Image },
    ]
  },
  {
    id: 'photo',
    label: 'Foto',
    icon: Palette,
    color: '#00c853',
    items: [
      { id: 'photo-new', label: 'Foto Nova', icon: Camera },
      { id: 'photo-transform', label: 'Transformar Foto', icon: Sparkles },
    ]
  },
  {
    id: 'tools',
    label: 'Ferramentas',
    icon: Wrench,
    color: '#ff6d00',
    items: [
      { id: 'tiktok-collections', label: 'Coleção TikTok', icon: Folders },
      { id: 'image-stacker', label: 'Empilhador Pinterest', icon: Layers },
      { id: 'photo-montage', label: 'Montagem de Fotos', icon: LayoutGrid },
    ]
  },
];

const FOOTER_ITEMS = [
  { id: 'about', label: 'Sobre a Ferramenta', icon: Info },
];

const SavedItem = ({ item, onToggleFavorite, onLoadItem, onClose }) => {
  const mode = MODES[item.modeId] || { title: 'Desconhecido' };
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.savedItem}>
      <div className={styles.savedHeader}>
        <span className={styles.savedMode}>{mode.title}</span>
        <div className={styles.savedActions}>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(item); }} 
            className={clsx(styles.actionBtn, item.isFavorite && styles.isFavorite)}
          >
            <Star size={14} fill={item.isFavorite ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCopy} className={styles.actionBtn}>
            {copied ? <Check size={14} className={styles.successIcon} /> : <Copy size={14} />}
          </button>
          <button 
            onClick={() => { 
              onLoadItem(item); 
              if (onClose) onClose(); 
            }} 
            className={styles.actionBtn} 
            title="Restaurar Campos"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <p className={styles.savedPrompt}>{item.prompt}</p>
      <span className={styles.savedTime}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

const ModeItem = ({ item, currentModeId, onModeChange, onClose, hasTemplates }) => {
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
};

const Sidebar = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentModeId = location.pathname.replace('/', '') || 'tiktok-collections';
  const { history = [], favorites = [], toggleFavorite, loadSavedItem } = useGeneratorContext();

  const [activeTab, setActiveTab] = useState('modes');
  const [collapsedCategories, setCollapsedCategories] = useState({ video: true, photo: true });

  const toggleCategory = (categoryId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleModeChange = (id) => {
    navigate(`/${id}`);
  };

  const handleLoadSavedItem = (item) => {
    loadSavedItem(item);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <aside className={clsx(styles.sidebar, isOpen && styles.sidebarOpen)}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu">
          <X size={20} />
        </button>

        <div className={styles.logo}>
          <Wand2 className={styles.logoIcon} size={32} />
          <span className={styles.logoText}>Flow Prompt</span>
        </div>

      <div className={styles.tabContainer}>
        <button 
          className={clsx(styles.tabBtn, activeTab === 'modes' && styles.activeTab)}
          onClick={() => setActiveTab('modes')}
          title="Modelos"
        >
          <LayoutGrid size={20} />
        </button>
        <button 
          className={clsx(styles.tabBtn, activeTab === 'history' && styles.activeTab)}
          onClick={() => setActiveTab('history')}
          title="Histórico"
        >
          <History size={20} />
          {history.length > 0 && <span className={styles.badge}>{history.length}</span>}
        </button>
        <button 
          className={clsx(styles.tabBtn, activeTab === 'favorites' && styles.activeTab)}
          onClick={() => setActiveTab('favorites')}
          title="Favoritos"
        >
          <Star size={20} />
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </button>
      </div>

      <div className={styles.scrollArea}>
        {activeTab === 'modes' && (
          <nav className={styles.nav}>
            {MODE_CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              const isCollapsed = collapsedCategories[category.id];

              return (
                <div key={category.id} className={styles.categoryGroup}>
                  <button
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(category.id)}
                    style={{ '--category-color': category.color }}
                  >
                    <div className={styles.categoryHeaderLeft}>
                      <CategoryIcon size={14} className={styles.categoryIcon} />
                      <span className={styles.categoryLabel}>{category.label}</span>
                    </div>
                    <span className={clsx(styles.categoryToggle, isCollapsed && styles.categoryToggleCollapsed)}>
                      ▾
                    </span>
                  </button>

                  <div className={clsx(styles.categoryItems, isCollapsed && styles.categoryItemsCollapsed)}>
                    {category.items.map((item) => (
                      <ModeItem
                        key={item.id}
                        item={item}
                        currentModeId={currentModeId}
                        onModeChange={handleModeChange}
                        onClose={onClose}
                        hasTemplates={!!TEMPLATES[item.id]}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            <div className={styles.divider} />

            {FOOTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={clsx(styles.navLink, currentModeId === item.id && styles.active)}
                  onClick={() => {
                    handleModeChange(item.id);
                    if (onClose) onClose();
                  }}
                >
                  <Icon size={20} className={styles.icon} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {activeTab === 'history' && (
          <div className={styles.savedList}>
            <h3 className={styles.sectionTitle}>Histórico Recente</h3>
            {history.length === 0 ? (
              <p className={styles.emptyState}>Nenhum prompt gerado ainda.</p>
            ) : (
              history.map(item => (
                <SavedItem 
                  key={item.id} 
                  item={item} 
                  onToggleFavorite={toggleFavorite} 
                  onLoadItem={handleLoadSavedItem} 
                  onClose={onClose}
                />
              ))
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className={styles.savedList}>
            <h3 className={styles.sectionTitle}>Meus Favoritos</h3>
            {favorites.length === 0 ? (
              <p className={styles.emptyState}>Você ainda não favoritou nenhum prompt.</p>
            ) : (
              favorites.map(item => (
                <SavedItem 
                  key={item.id} 
                  item={item} 
                  onToggleFavorite={toggleFavorite} 
                  onLoadItem={handleLoadSavedItem} 
                  onClose={onClose}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.helpCard}>
          <p className={styles.helpText}>Baseado no guia oficial do Google Flow.</p>
          <div className={styles.shortcutHint}>
            <span>Navegar modos</span>
            <span className={styles.shortcutKey}>1-9</span>
          </div>
          <div className={styles.shortcutHint}>
            <span>Copiar prompt</span>
            <span className={styles.shortcutKey}>Ctrl+C</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
