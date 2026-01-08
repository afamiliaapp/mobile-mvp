import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Themesettings() {
  const { theme, themeMode, changeTheme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.background }}>
      <View style={styles.settingsbox2}>
        <Text style={[styles.titletxt2, { color: theme.text }]}>
          System Default
        </Text>

        <Text style={styles.themetxt}>Theme</Text>

        <View style={styles.themebox}>
          {/* LIGHT */}
          <TouchableOpacity
            style={[styles.themeitem, themeMode === 'light' && styles.active]}
            onPress={() => changeTheme('light')}
          >
            <Image source={require('../assets/sun-03.png')} />
            <Text>Light</Text>
          </TouchableOpacity>

          {/* DARK */}
          <TouchableOpacity
            style={[styles.themeitem, themeMode === 'dark' && styles.active]}
            onPress={() => changeTheme('dark')}
          >
            <Image source={require('../assets/moon-02.png')} />
            <Text>Dark</Text>
          </TouchableOpacity>

          {/* SYSTEM */}
          <TouchableOpacity
            style={[styles.themeitem2, themeMode === 'system' && styles.active]}
            onPress={() => changeTheme('system')}
          >
            <Image source={require('../assets/smart-phone-02.png')} />
            <Text>System</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsbox2: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#E2E8F9',
  },

  titletxt2: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
  },

  themetxt: {
    color: '#6C7278',
    fontSize: 12,
    marginTop: 20,
  },

  themebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  themeitem: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E2E8F9',
  },

  themeitem2: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E2E8F9',
  },

  active: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
});
