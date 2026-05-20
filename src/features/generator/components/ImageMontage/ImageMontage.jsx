import { useState, useRef } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { Layout, Palette, Maximize, Trash2, Download, Plus, Grid3X3 } from 'lucide-react';
import styles from './ImageMontage.module.css';

const MAX_DIMENSION_LIMIT = 2500;

export const ImageMontage = () => {
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState(2);
  const [gap, setGap] = useState(10);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [fittingMode, setFittingMode] = useState('cover'); // 'cover' or 'contain'
  const [maxDim, setMaxDim] = useState(1200);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages(prev => {
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter(img => img.id !== id);
    });
  };

  const generateImage = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      // 1. Load all images and get their natural dimensions
      const loadedImages = await Promise.all(images.map(img => {
        return new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve({ img: image, w: image.width, h: image.height });
          image.src = img.preview;
        });
      }));

      const numImages = loadedImages.length;
      const cols = columns;
      const rows = Math.ceil(numImages / cols);

      // 2. Calculate aspect ratio of a single cell
      // For simplicity, we'll assume square cells for the overall layout calculation, 
      // but let the user's maxDim define the actual scale.
      const cellWidth = 500; // arbitrary base unit
      const cellHeight = 500; 

      const totalW = (cols * cellWidth) + ((cols + 1) * gap);
      const totalH = (rows * cellHeight) + ((rows + 1) * gap);

      // 3. Scale to maxDim
      const scale = maxDim / Math.max(totalW, totalH);
      const canvasW = totalW * scale;
      const canvasH = totalH * scale;
      const finalCellW = cellWidth * scale;
      const finalCellH = cellHeight * scale;
      const finalGap = gap * scale;

      const canvas = document.createElement('canvas');
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext('2d');

      // 4. Draw Background
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // 5. Draw Images
      loadedImages.forEach((item, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = finalGap + (col * (finalCellW + finalGap));
        const y = finalGap + (row * (finalCellH + finalGap));

        if (fittingMode === 'cover') {
          // Center crop
          const imgAspect = item.w / item.h;
          const cellAspect = finalCellW / finalCellH;
          let drawW, drawH, sx, sy;

          if (imgAspect > cellAspect) {
            drawH = item.h;
            drawW = item.h * cellAspect;
            sx = (item.w - drawW) / 2;
            sy = 0;
          } else {
            drawW = item.w;
            drawH = item.w / cellAspect;
            sx = 0;
            sy = (item.h - drawH) / 2;
          }
          ctx.drawImage(item.img, sx, sy, drawW, drawH, x, y, finalCellW, finalCellH);
        } else {
          // Contain (fit with padding)
          const imgAspect = item.w / item.h;
          const cellAspect = finalCellW / finalCellH;
          let drawW, drawH, dx, dy;

          if (imgAspect > cellAspect) {
            drawW = finalCellW;
            drawH = finalCellW / imgAspect;
            dx = x;
            dy = y + (finalCellH - drawH) / 2;
          } else {
            drawH = finalCellH;
            drawW = finalCellH * imgAspect;
            dx = x + (finalCellW - drawW) / 2;
            dy = y;
          }
          ctx.drawImage(item.img, dx, dy, drawW, drawH);
        }
      });

      // 6. Download
      const link = document.createElement('a');
      link.download = `montage-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

    } catch (err) {
      console.error(err);
      alert('Erro ao gerar a montagem.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <GlassCard className="p-6">
          <h3 className={styles.sectionTitle}><Layout size={18} /> Layout do Grid</h3>
          
          <div className={styles.controlGroup}>
            <label>Colunas: {columns}</label>
            <input 
              type="range" min="1" max="5" 
              value={columns} 
              onChange={(e) => setColumns(parseInt(e.target.value))} 
            />
            <div className={styles.buttonGroup}>
              <button className={columns === 2 ? styles.activeButton : ''} onClick={() => setColumns(2)}>2x2</button>
              <button className={columns === 3 ? styles.activeButton : ''} onClick={() => setColumns(3)}>3x3</button>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Espaçamento (Gap): {gap}px</label>
            <input 
              type="range" min="0" max="50" 
              value={gap} 
              onChange={(e) => setGap(parseInt(e.target.value))} 
            />
          </div>

          <h3 className={styles.sectionTitle}><Palette size={18} /> Estilo das Bordas</h3>
          <div className={styles.controlGroup}>
            <div className={styles.colorPickerContainer}>
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
              <input type="text" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className={styles.colorInput} />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Modo de Encaixe</label>
            <div className={styles.buttonGroup}>
              <button 
                className={fittingMode === 'cover' ? styles.activeButton : ''} 
                onClick={() => setFittingMode('cover')}
              >
                Preencher (Cover)
              </button>
              <button 
                className={fittingMode === 'contain' ? styles.activeButton : ''} 
                onClick={() => setFittingMode('contain')}
              >
                Ajustar (Contain)
              </button>
            </div>
          </div>

          <h3 className={styles.sectionTitle}><Maximize size={18} /> Exportação</h3>
          <div className={styles.controlGroup}>
            <label>Lado Maior: {maxDim}px (Max {MAX_DIMENSION_LIMIT}px)</label>
            <input 
              type="range" min="500" max={MAX_DIMENSION_LIMIT} step="100"
              value={maxDim} 
              onChange={(e) => setMaxDim(parseInt(e.target.value))} 
            />
          </div>

          <button 
            className={styles.generateButton} 
            onClick={generateImage}
            disabled={images.length === 0 || isGenerating}
          >
            <Download size={18} style={{ marginRight: '8px' }} />
            {isGenerating ? 'Gerando...' : 'Baixar Montagem'}
          </button>
        </GlassCard>
      </div>

      <div className={styles.workspaceColumn}>
        <div className={styles.dropzone} onClick={() => fileInputRef.current.click()}>
          <input 
            type="file" multiple accept="image/*" 
            ref={fileInputRef} onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          <div className={styles.dropzoneContent}>
            <span className={styles.dropzoneIcon}>🖼️</span>
            <p>Clique ou arraste as fotos da montagem</p>
            <span>O grid se ajusta automaticamente</span>
          </div>
        </div>

        <div className={styles.previewArea}>
          {images.length > 0 ? (
            <div 
              className={styles.canvasWrapper}
              style={{ 
                backgroundColor: borderColor,
                padding: `${gap}px`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`,
                aspectRatio: `${columns} / ${Math.ceil(images.length / columns)}`,
                width: '100%',
                maxHeight: '600px'
              }}
            >
              {images.map((img) => (
                <div 
                  key={img.id} 
                  className={`${styles.gridItem} ${fittingMode === 'cover' ? styles.cover : styles.contain}`}
                >
                  <img src={img.preview} alt="preview" />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Grid3X3 size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
              <p>Adicione fotos para visualizar a montagem</p>
            </div>
          )}
        </div>

        <div className={styles.filmstripContainer}>
          <Reorder.Group 
            axis="x" 
            values={images} 
            onReorder={setImages}
            className={styles.filmstrip}
          >
            <AnimatePresence>
              {images.map((img) => (
                <Reorder.Item 
                  key={img.id} 
                  value={img}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={styles.thumbItem}
                >
                  <img src={img.preview} alt="thumb" />
                  <button className={styles.removeBtn} onClick={() => removeImage(img.id)}>
                    <Trash2 size={10} />
                  </button>
                </Reorder.Item>
              ))}
            </AnimatePresence>
            {images.length > 0 && (
              <button 
                className={styles.addMoreBtn}
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '80px', height: '80px', borderRadius: '8px', 
                  border: '2px dashed rgba(255,255,255,0.1)', background: 'transparent',
                  color: 'white', cursor: 'pointer', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Plus size={24} />
              </button>
            )}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};

export default ImageMontage;
