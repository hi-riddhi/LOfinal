import { motion } from 'framer-motion';

function CommunityFooter() {
  return (
    <footer className="relative text-neutral-400 py-12 border-t border-white/10 overflow-hidden">
      {/* Global background handles visuals */}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Linked</span>
              <span className="text-white">Out</span>
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-8 max-w-md mx-auto"
          >
            Empowering LinkedIn content creators worldwide through community, innovation, and collaboration.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 text-sm"
          >
            <span>&copy; 2025 LinkedOut.</span>
            <span className="text-yellow-400">•</span>
            <span>All rights reserved.</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export default CommunityFooter;
