import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import ThemedText from './ThemedText';

export default function SupportBar() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.continer}>
      <View>
        <ThemedText variant="title" style={styles.title}>
          Help & support
        </ThemedText>
      </View>

      <View style={[styles.belliconbox, { borderColor: theme.border }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notificationpage')}
        >
          <Image
            source={require('../assets/notificationbell.png')}
            style={[styles.bellicon, { tintColor: theme.icon }]} // dynamic icon color
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    height: 42,

    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
  },

  belliconbox: {
    height: 32,
    width: 32,
    borderColor: '#E2E8F9',
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bellicon: {
    height: 18,
    width: 18,
  },
});
