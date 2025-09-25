import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeadline() {
  return (
    <motion.h1 
      className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Mobile: keep natural wrapping; Desktop: force 3 lines */}
      <span className="md:hidden">Stunning, AI-Powered&nbsp;Content in Seconds.</span>
      <span className="hidden md:block">
        <span className="block">Stunning,</span>
        <span className="block whitespace-nowrap">AI‑Powered Content</span>
        <span className="block">in Seconds.</span>
      </span>
    </motion.h1>
  );
}
