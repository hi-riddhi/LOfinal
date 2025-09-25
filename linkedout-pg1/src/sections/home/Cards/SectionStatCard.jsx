import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const NuraformShowcaseCard = React.lazy(() => import('@/components/ui/NuraformShowcaseCard'));
const InsightsSummaryCard = React.lazy(() => import('@/components/ui/InsightsSummaryCard'));

// Renders a single statistics card in the "Nuraform-style Cards" section
export default function SectionStatCard({ card, index, carouselImages }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      {/* Text Content */}
      <div className={`flex ${index % 2 === 1 ? 'justify-end' : 'justify-start'} items-center`}>
        <div className="max-w-lg">
          <motion.h3 
            className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {card.title}
          </motion.h3>
          <motion.p 
            className="text-white/70 text-lg mb-6"
            initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {card.desc}
          </motion.p>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
              Try Now
            </Button>
            <button className="text-white/70 hover:text-white text-sm flex items-center gap-1">
              Learn more 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right-side visual: either a dedicated component or an animated gradient card */}
      {index === 0 ? (
        <Suspense fallback={null}>
          <InsightsSummaryCard gradient={card.gradient} />
        </Suspense>
      ) : index === 2 ? (
        <Suspense fallback={null}>
          <NuraformShowcaseCard images={carouselImages} />
        </Suspense>
      ) : (
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -6, 0], rotate: [0, 0.4, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            y: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.2 },
            rotate: { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
          }}
        >
          <div className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/10 rounded-3xl" />
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/15 rounded-full blur-lg" />
            <div className="relative z-10 mb-6">
              <h4 className="text-white font-bold text-xl mb-2">Live Stats</h4>
              <p className="text-white/80 text-sm">Real-time performance metrics</p>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {card.stats.map((stat, statIndex) => (
                <motion.div
                  key={statIndex}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + statIndex * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <motion.div
                    className="text-2xl font-bold text-white mb-1"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2 + statIndex * 0.5, repeat: Infinity, delay: statIndex * 0.3 }}
                  >
                    {stat}
                  </motion.div>
                  <div className="text-white/70 text-xs font-medium">{card.labels[statIndex]}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="relative z-10 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-white/80 text-sm mb-2">Overall Performance</div>
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-white h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
              </div>
            </motion.div>
            {[...Array(6)].map((_, particleIndex) => (
              <motion.div
                key={particleIndex}
                className="absolute w-2 h-2 bg-white/40 rounded-full"
                style={{ left: `${20 + particleIndex * 15}%`, top: `${30 + (particleIndex % 3) * 20}%` }}
                animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 3 + particleIndex * 0.5, repeat: Infinity, delay: particleIndex * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
