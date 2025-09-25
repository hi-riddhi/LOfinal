import CommunityImageCarousel from './CommunityImageCarousel.jsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function CommunityPastEvents() {
  const navigate = useNavigate();
  
  // Using placeholder images for now - you can replace with actual event images
  const slides = [
    '/lo2/past events/DSC_0684.JPG',
    '/lo2/past events/DSC_0804.JPG', 
    '/lo2/past events/DSC_0906.JPG',
    '/lo2/past events/DSC_0959-EDIT.jpg'
  ];

  return (
    <section className="relative text-white py-24 overflow-hidden">
      {/* Global background handles visuals */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full aspect-video max-w-2xl lg:ml-auto rounded-2xl overflow-hidden border border-yellow-400/30 shadow-[0_20px_60px_rgba(250,204,21,0.15)] bg-white/5 backdrop-blur-xl">
                <CommunityImageCarousel images={slides} />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col items-start"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Past</span>{' '}
              <span className="text-white">Events</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 lg:mb-12 leading-relaxed max-w-xl"
            >
              Discover the highlights from our incredible journey of connecting LinkedIn content creators worldwide through engaging events and sessions.
            </motion.p>
            
            <motion.button
              onClick={() => navigate('/past-events')}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(250,204,21,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-transparent border-2 border-yellow-400/70 text-yellow-400 px-8 py-4 rounded-2xl text-xl font-semibold hover:bg-yellow-400/10 transition-all duration-300 group"
            >
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CommunityPastEvents;
