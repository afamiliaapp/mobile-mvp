import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backArrow}
    >
      <Ionicons name="arrow-back" size={18} color="#2C247A" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    marginVertical: 5, // subtle shadow on Android
  },
});

export default BackButton;
