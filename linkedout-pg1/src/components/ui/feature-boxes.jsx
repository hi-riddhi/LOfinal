import { motion } from 'framer-motion';
import { Button } from './button';
import { Zap, Target, BarChart3 } from 'lucide-react';

const featureBoxes = [
  {
    id: 1,
    title: "3 simple modes to help you brainstorm, add, or refine content with AI",
    description: "Suggest, Insert, and Rewrite modes to enhance your content creation process",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-yellow-400/80 via-amber-500/80 to-yellow-600/80",
    stats: [
      { value: "3", label: "AI Modes" },
      { value: "2.3s", label: "Avg Speed" },
      { value: "95%", label: "Accuracy" },
      { value: "∞", label: "Ideas" }
    ]
  },
  {
    id: 2,
    title: "AI-powered content generation per prompt and per platform",
    description: "Tailored content for LinkedIn, Twitter, Instagram, and more with your unique voice",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-amber-300/80 via-yellow-500/80 to-amber-600/80",
    stats: [
      { value: "4+", label: "Platforms" },
      { value: "89%", label: "Voice Match" },
      { value: "2.1K", label: "Posts Created" },
      { value: "4.8", label: "User Rating" }
    ]
  },
  {
    id: 3,
    title: "Live analytics — engagement, reach, performance & more",
    description: "Real-time insights to optimize your content strategy and maximize impact",
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-orange-500/80 via-yellow-500/80 to-amber-500/80",
    stats: [
      { value: "756", label: "Total Posts" },
      { value: "26", label: "Avg Likes" },
      { value: "83%", label: "Engagement" },
      { value: "4min", label: "Read Time" }
    ]
  }
];

export default function FeatureBoxes() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Intelligence that saves you time
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            AI that works behind the scenes, so you don't have to. From one click form generation to AI summaries. Available for free plan, because your time is precious.
          </p>
        </motion.div>

        {/* Feature Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureBoxes.map((box, index) => (
            <motion.div
              key={box.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                y: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.3 }
              }}
            >
              {/* Main Card */}
              <div className={`relative h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br ${box.gradient} shadow-2xl border border-white/10`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/15 rounded-full blur-lg" />
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {box.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-4 leading-tight">
                    {box.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm mb-6 flex-grow">
                    {box.description}
                  </p>

                  {/* Stats Grid */}
                  {box.stats && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {box.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 + statIndex * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        >
                          <motion.div
                            className="text-lg font-bold text-white mb-1"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: [0.9, 1, 0.9]
                            }}
                            transition={{ 
                              duration: 2 + statIndex * 0.3,
                              repeat: Infinity,
                              delay: statIndex * 0.2
                            }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-white/70 text-xs font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 rounded-xl"
                    >
                      Try Now
                    </Button>
                  </motion.div>
                </div>

                {/* Animated Progress Bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/60 to-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />
                </motion.div>

                {/* Floating Particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 30}%`
                    }}
                    animate={{
                      y: [-8, 8, -8],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA removed as requested */}
      </div>
    </section>
  );
}
