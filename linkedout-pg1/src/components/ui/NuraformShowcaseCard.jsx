import { motion } from 'framer-motion'

// Local FrostCard component to render each frosted form block
function FrostCard({ title, hint, rightIconsCount = 3, showAskBar = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-4 md:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-white/70 mb-1">{hint}</div>
          <div className="text-white/95 font-semibold">{title}</div>
        </div>

        {/* Right-side icons placeholders */}
        <div className="flex items-center gap-2 opacity-80">
          {Array.from({ length: rightIconsCount }).map((_, i) => (
            <span key={i} className="inline-block h-8 w-8 rounded-lg border border-white/40 bg-white/30" />
          ))}
        </div>
      </div>

      {showAskBar && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-full bg-white/60 text-black/70 px-4 py-2 text-sm">Ask AI Anything...</div>
          <button
            className="grid place-items-center h-9 w-9 rounded-full bg-[#FF7A00] text-white shadow-md hover:scale-105 transition-transform"
            aria-label="Play"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  )
}

/**
 * Nuraform-style showcase card: pink gradient panel with circular images and a central pill.
 * - Uses the provided images (first 6 will be used) rendered as masked circles.
 */
export default function NuraformShowcaseCard({ images }) {
  
  return (
    <motion.div
      className="relative w-full rounded-3xl overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Panel background */}
      <div className="relative rounded-3xl p-6 md:p-8"
        style={{
          background: 'radial-gradient(120% 120% at 20% 20%, rgba(255,255,255,0.20) 0%, rgba(255,235,150,0.65) 35%, rgba(255,193,7,0.85) 100%)'
        }}
      >
        {/* Subtle overlay and shadow */}
        <div className="absolute inset-0 rounded-3xl bg-white/10" />

        {/* Content container */}
        <div className="relative aspect-[16/9]">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 text-white/95 text-lg md:text-xl font-semibold"
          >
            Describe and done!
          </motion.h3>

          {/* Stacked frosted cards */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[min(720px,92%)] space-y-4">
            <FrostCard title="What is your name?" hint="Name" rightIconsCount={3} />
            <FrostCard title="What are your interests ?" hint="Interest" rightIconsCount={4} />
            <FrostCard title="Can you tell us your email?" hint="Email" rightIconsCount={3} showAskBar />
          </div>

          

          
        </div>
      </div>
    </motion.div>
  )
}
