import { motion } from 'framer-motion';
import ImageStacker from '../features/generator/components/ImageStacker/ImageStacker';

export default function ImageStackerPage() {
  return (
    <div className="content-grid custom-full-width">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ImageStacker />
      </motion.div>
    </div>
  );
}
