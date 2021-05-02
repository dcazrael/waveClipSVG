import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const storageKey = 'theme';

  let localStorageTheme = JSON.parse(localStorage.getItem(storageKey));

  if (localStorageTheme === null) {
    const prefersDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
    localStorageTheme = prefersDarkMode ? 'dark' : 'light';
    localStorage.setItem(storageKey, JSON.stringify(localStorageTheme));
  }

  const [theme, setTheme] = useState(localStorageTheme);
  const colorTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(
    () => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem(storageKey, JSON.stringify(theme));
    },
    [theme],
    colorTheme
  );
  return [colorTheme, setTheme];
};

export default useDarkMode;
