import React, { useContext } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemedTextInput(props: TextInputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TextInput
      {...props}
      style={[styles.input, { color: theme.text }, props.style]}
      placeholderTextColor={theme.text + '99'} // slightly transparent placeholder
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E2E8F9', // optional: can be overridden by theme
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
