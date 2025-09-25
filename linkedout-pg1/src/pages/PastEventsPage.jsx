import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CommunityHeader from '../components/community/CommunityHeader.jsx';
import CommunityFooter from '../components/community/CommunityFooter.jsx';
import CommunityImageCarousel from '../components/community/CommunityImageCarousel.jsx';
import CommunityGlobalBackground from '../components/community/CommunityGlobalBackground.jsx';

const events = [
  {
    title: 'LinkedOut Live #1',
    venue: 'Thoughtworks, Gurugram',
    links: [
      { label: 'Official LinkedIn post', href: '#' },
      { label: 'Post-event YouTube video', href: '#' },
    ],
    images: ['/lo2/past events/DSC_0684.JPG',
            '/lo2/past events/DSC_0804.JPG', 
            '/lo2/past events/DSC_0906.JPG',
            '/lo2/past events/DSC_0959-EDIT.jpg'],
  },
  {
    title: 'LinkedOut Live #2',
    venue: 'Opstree Global, Noida',
    links: [
      { label: 'Official LinkedIn post', href: '#' },
      { label: 'Aftermovie', href: '#' },
    ],
    images: [''],
  },
];

function PastEventsCard({ event, index, z }) {
  const slides = event.images;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ amount: 0.8, once: true }}
      style={{ zIndex: z }}
      className="rounded-3xl bg-black/30 border border-yellow-400/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:border-yellow-400/30 transition-colors duration-300"
    >
      <div className="w-full md:w-1/2">
        <div className="rounded-2xl overflow-hidden border border-yellow-400/20 bg-black/30 aspect-[16/10] hover:border-yellow-400/40 transition-colors duration-300">
          <CommunityImageCarousel images={slides} />
        </div>
      </div>
      <div className="w-full md:w-1/2 text-white">
        <h3 className="text-3xl md:text-4xl font-bold mb-5">
          {event.title}
        </h3>
        <ul className="space-y-3 text-neutral-300 text-xl md:text-2xl list-disc pl-6">
          <li>List of speakers and talks</li>
          <li>Venue: {event.venue}</li>
          {event.links.map((l, i) => (
            <li key={i}><a className="text-yellow-400 hover:underline" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function PastEventsPage() {
  const cardRef = useRef(null);

  return (
    <div className="min-h-screen text-white bg-black relative">
      <CommunityGlobalBackground />
      <div className="relative z-10">
        <CommunityHeader />

      <main className="container mx-auto px-4 pt-24 pb-24">
        <motion.header 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center relative"
        >
          {/* Background accent removed for cleaner look */}
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 relative z-10"
          >
            <span className="text-yellow-400">LinkedOut</span>{' '}
            <span className="text-white">Live</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative z-10"
          >
            Discover the highlights from our incredible journey of connecting LinkedIn content creators worldwide through engaging events and transformative sessions.
          </motion.p>
        </motion.header>

        {/* Sticky deck: cards occupy the same area; current card is on top, previous cards scale slightly down */}
        <div className="relative">
          {events.map((event, i) => (
            <section key={i} className="relative h-[160vh]">
              {/* Trigger space for each card */}
              <div className="sticky top-16 md:top-24 h-[80vh] flex items-center">
                <div ref={i === 0 ? cardRef : undefined} className="mx-auto max-w-6xl w-full">
                  <div className="relative">
                    {/* Animated background highlight */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-6 rounded-[40px] bg-yellow-400/20 blur-2xl"
                      animate={{ opacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <PastEventsCard event={event} index={i} z={100 + i} />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

        <CommunityFooter />
      </div>
    </div>
  );
}
