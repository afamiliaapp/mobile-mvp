import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppContainer from './AppContainer';
import ThemedText from './ThemedText';
import { ThemeContext } from '../context/ThemeContext';

export default function FamilyManagementBar() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); // access current theme

  return (
    <AppContainer>
      <View style={styles.container}>
        {/* Title */}
        <ThemedText variant="title" style={styles.title}>
          Family Management
        </ThemedText>

        {/* Bell Icon */}
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
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  belliconbox: {
    height: 32,
    width: 32,
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
