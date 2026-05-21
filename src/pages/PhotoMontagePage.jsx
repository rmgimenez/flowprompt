import { motion } from 'framer-motion';
import ImageMontage from '../features/generator/components/ImageMontage/ImageMontage';

export default function PhotoMontagePage() {
  return (
    <div className="content-grid custom-full-width">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ImageMontage />
      </motion.div>
    </div>
  );
}
