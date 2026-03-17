import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={16} color="#999999" />

      <TextInput
        placeholder="Search chat..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    gap: 8,
    marginTop: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },
});
