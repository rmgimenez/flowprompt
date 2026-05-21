import { motion } from 'framer-motion';
import TikTokCollections from '../features/generator/components/TikTokCollections/TikTokCollections';

export default function TikTokCollectionsPage() {
  return (
    <div className="content-grid custom-full-width">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TikTokCollections />
      </motion.div>
    </div>
  );
}
