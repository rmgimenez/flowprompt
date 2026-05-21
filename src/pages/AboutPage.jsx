import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import About from '../features/generator/components/About/About';

export default function AboutPage() {
  return (
    <div className="content-grid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="p-8">
          <About />
        </GlassCard>
      </motion.div>
    </div>
  );
}
