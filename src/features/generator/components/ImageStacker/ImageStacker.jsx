import React, { useState, useRef, useCallback } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../../../components/ui/GlassCard';
import styles from './ImageStacker.module.css';

const MAX_RECOMMENDED = 10;
const CANVAS_WIDTH = 1000;

export const ImageStacker = () => {
  const [images, setImages] = useState([]);
  const [gap, setGap] = useState(10);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [format, setFormat] = useState('image/png');
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
    // Reset input
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      // Clean up the URL
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const generateImage = async () => {
    if (images.length < 2) {
      alert('Por favor, selecione pelo menos 2 imagens.');
      return;
    }

    setIsGenerating(true);

    try {
      // Load all images and calculate total height
      const loadedImages = await Promise.all(images.map(img => {
        return new Promise((resolve) => {
          const image = new Image();
          image.onload = () => {
            const ratio = CANVAS_WIDTH / image.width;
            const h = image.height * ratio;
            resolve({ img: image, height: h });
          };
          image.src = img.preview;
        });
      }));

      const totalHeight = loadedImages.reduce((acc, curr) => acc + curr.height, 0) + (gap * (images.length - 1));

      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = totalHeight;
      const ctx = canvas.getContext('2d');

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw images
      let currentY = 0;
      loadedImages.forEach((item, index) => {
        ctx.drawImage(item.img, 0, currentY, CANVAS_WIDTH, item.height);
        currentY += item.height + gap;
      });

      // Download
      const link = document.createElement('a');
      link.download = `pinterest-stack-${Date.now()}.${format === 'image/png' ? 'png' : 'jpg'}`;
      link.href = canvas.toDataURL(format, 0.9);
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Ocorreu um erro ao processar as imagens.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <GlassCard className="p-6">
          <h3 className={styles.sectionTitle}>Configurações</h3>
          
          <div className={styles.controlGroup}>
            <label>Espaçamento entre fotos: {gap}px</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={gap} 
              onChange={(e) => setGap(parseInt(e.target.value))} 
            />
          </div>

          <div className={styles.controlGroup}>
            <label>Cor de Fundo</label>
            <div className={styles.colorPickerContainer}>
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
              />
              <input 
                type="text" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
                className={styles.colorInput}
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Formato de Saída</label>
            <div className={styles.buttonGroup}>
              <button 
                className={format === 'image/png' ? styles.activeButton : ''} 
                onClick={() => setFormat('image/png')}
              >
                PNG
              </button>
              <button 
                className={format === 'image/jpeg' ? styles.activeButton : ''} 
                onClick={() => setFormat('image/jpeg')}
              >
                JPG
              </button>
            </div>
          </div>

          <button 
            className={styles.generateButton} 
            onClick={generateImage}
            disabled={images.length < 2 || isGenerating}
          >
            {isGenerating ? 'Processando...' : 'Baixar Imagem Final'}
          </button>
        </GlassCard>

        {images.length > MAX_RECOMMENDED && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.warningBox}
          >
            ⚠️ Recomendamos o uso de no máximo {MAX_RECOMMENDED} fotos para manter a qualidade e compatibilidade do Pinterest.
          </motion.div>
        )}
      </div>

      <div className={styles.workspaceColumn}>
        <div 
          className={styles.dropzone}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className={styles.dropzoneContent}>
            <span className={styles.dropzoneIcon}>📸</span>
            <p>Clique ou arraste fotos aqui</p>
            <span>Suporta múltiplos arquivos</span>
          </div>
        </div>

        <Reorder.Group 
          axis="y" 
          values={images} 
          onReorder={setImages}
          className={styles.imageList}
        >
          <AnimatePresence>
            {images.map((img) => (
              <Reorder.Item 
                key={img.id} 
                value={img}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={styles.imageItem}
              >
                <div className={styles.dragHandle}>
                  <div className={styles.dots}></div>
                </div>
                <div className={styles.imagePreview}>
                  <img src={img.preview} alt="preview" />
                </div>
                <div className={styles.imageInfo}>
                  <span>{img.file.name}</span>
                  <small>{(img.file.size / 1024).toFixed(1)} KB</small>
                </div>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeImage(img.id)}
                >
                  ✕
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {images.length === 0 && (
          <div className={styles.emptyState}>
            Sua pilha está vazia. Adicione fotos para começar.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageStacker;
