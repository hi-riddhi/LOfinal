import { motion } from 'framer-motion'

export default function InsightsSummaryCard({ gradient }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      animate={{ y: [0, -6, 0], rotate: [0, 0.3, 0] }}
      transition={{
        duration: 0.6,
        y: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        rotate: { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
      }}
    >
      <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
        {/* Subtle overlays to match style */}
        <div className="absolute inset-0 bg-white/10 rounded-3xl" />
        <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/15 rounded-full blur-lg" />

        {/* Title centered */}
        <div className="relative z-10 text-center mb-6">
          <h4 className="text-white font-semibold text-xl">Share and done!</h4>
        </div>

        {/* Center white summary box */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full max-w-xl bg-white/95 text-black rounded-xl border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-5">
            <div className="text-[11px] tracking-wide uppercase text-black/50 mb-2">Form Summary</div>

            <div className="mb-4">
              <div className="font-semibold text-black mb-1">Overall Sentiment:</div>
              <p className="text-black/70 text-sm leading-relaxed">
                Customer experience is largely positive, with most respondents expressing satisfaction and willingness to recommend.
                Comments highlight smooth checkout, thoughtful packaging, and product quality.
              </p>
            </div>

            <div className="h-px bg-black/10 my-3" />

            <div>
              <div className="font-semibold text-black mb-1">How Customers Found Us:</div>
              <p className="text-black/70 text-sm leading-relaxed">
                Instagram was mentioned twice (ad + story), making it the leading source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
