import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function CommunityHero() {
  const navigate = useNavigate();

  return (
    <section className="relative text-white min-h-[90vh] overflow-hidden pt-24 md:pt-28">
      <div className="container mx-auto h-full relative z-10">
        <div className="flex items-center gap-8 md:gap-12 min-h-[70vh] lg:min-h-[80vh] flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 flex flex-col items-start px-6 md:px-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm text-yellow-300"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              The home for LinkedIn creators
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight"
            >
              <motion.span
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Linked
              </motion.span>
              <span className="text-white">Out</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 text-gray-300 leading-relaxed"
            >
              World's largest community for <span className="text-yellow-400 font-semibold">LinkedIn content creators</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <motion.button
                onClick={() => window.open('https://forms.gle/ocQ3hBPhRiVrfo9L9', '_blank')}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(250,204,21,0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl group transition-all duration-300"
              >
                <span className="relative z-10 whitespace-nowrap">Join Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                onClick={() => navigate('/past-events')}
                whileHover={{ scale: 1.05, borderColor: "rgb(250 204 21)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-transparent text-yellow-400 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300 group"
              >
                <span className="relative z-10 whitespace-nowrap">Explore Past Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated octopus character */}
      <motion.div
        className="absolute right-10 lg:right-20 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: ["-15px", "15px"],
          rotate: [-2, 2],
        }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 1, delay: 1 },
          y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatType: "reverse" },
          rotate: { repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "reverse" },
        }}
        style={{ right: '8%', top: '20%' }}
      >
        {/* Octopus Image */}
        <img 
          src="/lo2/octopus.png" 
          alt="LinkedOut Octopus Mascot"
          className="w-[clamp(300px,40vw,520px)] h-auto drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]"
        />
      </motion.div>
    </section>
  );
}

export default CommunityHero;
