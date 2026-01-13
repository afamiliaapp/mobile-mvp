import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

// Light mode colors
const lightTheme = {
  background: '#FFFFFF',
  titleText: '#1B1C1E', // titles
  text: '#6C7278', // regular text
  placeholder: '#999999', // placeholder text
  border: '#E2E8F9', // input/border
  icon: '#1B1C1E', // icons
  button: '#2563EB', // primary buttons
  buttonText: '#FFFFFF', // button text
  // regular text
};

// Dark mode colors
const darkTheme = {
  background: '#020617',
  titleText: '#FFFFFF',
  text: '#FFFFFF',
  placeholder: '#9CA3AF',
  border: '#64748B',
  icon: '#FFFFFF',
  button: '#2563EB',
  buttonText: '#FFFFFF',
};

export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();

  const [themeMode, setThemeMode] = useState('system');
  const [theme, setTheme] = useState(
    systemScheme === 'dark' ? darkTheme : lightTheme,
  );

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');

  const applyTheme = mode => {
    if (mode === 'light') setTheme(lightTheme);
    if (mode === 'dark') setTheme(darkTheme);
    if (mode === 'system') {
      setTheme(systemScheme === 'dark' ? darkTheme : lightTheme);
    }
  };

  const changeTheme = mode => {
    setThemeMode(mode);
    applyTheme(mode);
  };

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
      }
    });

    return () => sub.remove();
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        isDark,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
