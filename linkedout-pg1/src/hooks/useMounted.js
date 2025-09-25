import { useEffect, useState } from 'react';

// Hydration-safe mounted state. Returns true after first client render.
export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
