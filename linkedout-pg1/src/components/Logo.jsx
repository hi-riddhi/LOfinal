import { useEffect, useState } from 'react';

export default function Logo({ style }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('lo_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const logoSrc = theme === 'dark' 
    ? '/src/assetsnew/night logo.jpeg'
    : '/src/assetsnew/creators adda logo final (1).jpg';

  return (
    <img 
      src={logoSrc}
      style={{
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        objectFit: 'cover',
        ...style
      }} 
      alt="LinkedOut" 
    />
  );
}