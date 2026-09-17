'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('azzan-theme');
    const light = saved === 'light';
    setIsLight(light);
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    document.documentElement.dataset.theme = nextIsLight ? 'light' : 'dark';
    window.localStorage.setItem('azzan-theme', nextIsLight ? 'light' : 'dark');
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <span className="theme-icon" aria-hidden="true">{isLight ? '☾' : '☼'}</span>
      <span className="theme-label">{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}
