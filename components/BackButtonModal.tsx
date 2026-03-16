import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButtonModal = ({ closeModal }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={closeModal}>
      <Ionicons name="chevron-back" size={18} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderWidth: 0.5,
  },
});

export default BackButtonModal;
