import { motion } from 'framer-motion';

function CommunitySection() {
  const collaborators = [
    '/sponsors/geek-room.png',
    '/sponsors/github.jpeg',
    '/sponsors/homey.png',
    '/sponsors/market-mafiaa.png',
    '/sponsors/osata.jpeg',
    '/sponsors/pathway.webp',
    '/sponsors/physics-wallah.png',
    '/sponsors/predator.png'
  ];
  
  const announcements = [
    { title: "New Corporate Training Module Launched!", date: "Sep 05, 2025", link: "#" },
    { title: "Announcing Our Fall Hackathon Series", date: "Aug 28, 2025", link: "#" },
    { title: "Community Guidelines Update", date: "Aug 15, 2025", link: "#" },
  ];

  const contactInfo = [
    {
      icon: <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>,
      text: "+91 123 456 7890"
    },
    {
      icon: <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
      text: "thelinkedoutofficial@gmail.com"
    },
    {
      icon: <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
      text: "New Delhi, India"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/thelinkedout",
      icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/linkedoutofficial",
      icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 6.826c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    },
    {
      name: "Twitter",
      href: "https://x.com/linkedout_off",
      icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    }
  ];

  return (
    <section className="relative text-white py-24 overflow-hidden">
      {/* Global background handles visuals */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Brand Collaborations & Contact */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col justify-between"
          >
            {/* Sponsors Section */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                Our <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Sponsors</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 mb-8 text-lg"
              >
                Proud to collaborate with industry leaders and innovators.
              </motion.p>
              
              <div className="relative w-full overflow-hidden h-20 mb-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                {/* Edge fades for cleaner marquee */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
                <div className="flex absolute top-0 left-0 space-x-12 whitespace-nowrap animate-marquee items-center h-full px-6 will-change-transform">
                  {collaborators.map((logo, index) => (
                    <img 
                      key={`a-${index}`} 
                      src={logo} 
                      alt={`Brand ${index+1}`} 
                      className="h-12 object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
                    />
                  ))}
                  {collaborators.map((logo, index) => (
                    <img 
                      key={`b-${index}`} 
                      src={logo} 
                      alt={`Brand ${index+1}`} 
                      className="h-12 object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-auto">
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Contact</span> Us
              </motion.h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group"
                  >
                    <div className="text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{contact.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Newsletter & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col justify-between"
          >
            {/* Newsletter Section */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-[28px] bg-white/5 backdrop-blur-sm"></div>
              {/* Aurora bordered newsletter card */}
              <div className="relative rounded-[24px] overflow-hidden">
                <div className="relative z-10 p-8 rounded-[24px] border border-white/15 shadow-2xl bg-white/5 backdrop-blur-sm">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Newsletter</span>
                </motion.h3>
                <div className="space-y-4">
                  {announcements.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.a 
                        href={item.link} 
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="block p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group"
                      >
                        <p className="font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2">{item.title}</p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.date}</p>
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mt-6">
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                Our <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Socials</span>
              </motion.h3>
              <div className="flex items-center gap-6 flex-wrap">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      boxShadow: "0 10px 30px rgba(250,204,21,0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300 group"
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;
