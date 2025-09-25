import { useEffect, useRef } from 'react';

export default function CommunityScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    function onScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? (doc.scrollTop / total) : 0;
      el.style.transform = `scaleX(${progress})`;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div
        ref={ref}
        className="origin-left h-[3px] bg-yellow-400/90 shadow-[0_0_12px_rgba(250,204,21,0.7)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
