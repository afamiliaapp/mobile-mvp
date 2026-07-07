import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import AppContainer from './AppContainer';
import { ThemeContext } from '../context/ThemeContext';

export default function ChatBar() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); // access current theme
  return (
    <View style={styles.continer}>
      <View>
        <ThemedText variant="title" style={styles.title}>
          Chat
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    flex: 0,
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
