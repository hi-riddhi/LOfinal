import CommunityImageCarousel from './CommunityImageCarousel.jsx';
import { motion } from 'framer-motion';

function CommunitySpeakerSessions() {
  const slides = [
   '/lo2/speaker session/DSC_0904.JPG', 
  '/lo2/speaker session/DSC_0944.JPG', 
  '/lo2/speaker session/DSC_0972.JPG', 
  '/lo2/speaker session/DSC_7070.JPG'
  ];

  const features = [
    { icon: "🏢", text: "Corporate Training" },
    { icon: "💻", text: "Hackathon Sessions" },
    { icon: "🎯", text: "Custom Workshops" },
    { icon: "🚀", text: "Growth Strategies" }
  ];

  return (
    <section id="sss" className="relative text-white py-24 overflow-hidden">
      {/* Global background handles visuals */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col items-start"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight"
            >
              Speaker{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Sessions</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-lg"
            >
              Transform your organization with specialized workshops led by our expert speakers and industry professionals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  <span className="text-lg font-medium text-gray-300 group-hover:text-yellow-400 transition-colors duration-300">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(250,204,21,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-transparent border-2 border-yellow-400/70 text-yellow-400 px-8 py-4 rounded-2xl text-xl font-semibold hover:bg-yellow-400/10 transition-all duration-300 group w-full max-w-md"
            >
              <span className="relative z-10">Invite Us (Form)</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full aspect-video max-w-2xl rounded-2xl overflow-hidden border border-yellow-400/30 shadow-2xl">
                <CommunityImageCarousel images={slides} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySpeakerSessions;
