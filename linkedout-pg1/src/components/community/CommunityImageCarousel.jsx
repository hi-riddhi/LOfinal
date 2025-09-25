import { useState, useEffect, useRef } from 'react';

function CommunityImageCarousel({ images = [], autoPlayInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoPlayInterval, images.length]);

  if (!images || images.length === 0) {
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="flex transition-transform ease-in-out duration-700 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center absolute inset-0"
              style={{
                backgroundColor: '#f3f4f6', // fallback color
                minHeight: '100%',
                minWidth: '100%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Manual Controls (Left/Right Arrows) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-yellow-400/80 hover:text-black transition-all duration-300 border border-white/20 hover:border-yellow-400 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-yellow-400/80 hover:text-black transition-all duration-300 border border-white/20 hover:border-yellow-400 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CommunityImageCarousel;
