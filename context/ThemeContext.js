import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#1B1C1E',
  border: '#E2E8F9',
};

const darkTheme = {
  mode: 'dark',
  background: '#0F1115',
  text: '#FFFFFF',
  border: '#2A2D34',
};

export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();

  const [themeMode, setThemeMode] = useState('system'); // light | dark | system
  const [theme, setTheme] = useState(
    systemScheme === 'dark' ? darkTheme : lightTheme,
  );

  // Listen for system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
      }
    });

    return () => listener.remove();
  }, [themeMode]);

  // Manual theme switch
  const changeTheme = mode => {
    setThemeMode(mode);

    if (mode === 'light') setTheme(lightTheme);
    if (mode === 'dark') setTheme(darkTheme);
    if (mode === 'system') {
      setTheme(systemScheme === 'dark' ? darkTheme : lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
