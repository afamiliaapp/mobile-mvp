import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function AppContainer({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});
