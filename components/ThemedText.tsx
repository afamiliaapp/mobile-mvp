import React, { useContext } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

type ThemedTextProps = TextProps & {
  variant?: 'title' | 'body'; // optional variant
};

export default function ThemedText({
  variant = 'body',
  style,
  ...props
}: ThemedTextProps) {
  const { theme } = useContext(ThemeContext);

  const color = variant === 'title' ? theme.titleText : theme.text;

  return <Text style={[{ color }, style]} {...props} />;
}
