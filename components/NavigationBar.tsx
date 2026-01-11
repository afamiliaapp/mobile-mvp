import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

export default function NavigationBar() {
  const navigation = useNavigation();
  const { theme, isDark } = useContext(ThemeContext);

  // Get current screen name
  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const isActive = (route: string) => route === currentRouteName;

  /* 🎨 Theme-based colors */
  const activeColor = isDark ? '#93C5FD' : '#2C247A';
  const inactiveColor = isDark ? '#64748B' : '#999';
  const barBackground = theme.background;
  const centerButtonBg = activeColor;

  return (
    <View style={[styles.container, { backgroundColor: barBackground }]}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Dashboard' as never)}
      >
        <Image
          source={require('../assets/home-05.png')}
          style={[
            styles.icon,
            { tintColor: isActive('Dashboard') ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Dashboard') ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* CALENDAR */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Calendar' as never)}
      >
        <Image
          source={require('../assets/calendar-04.png')}
          style={[
            styles.icon,
            { tintColor: isActive('Calendar') ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Calendar') ? activeColor : inactiveColor },
          ]}
        >
          Calendar
        </Text>
      </TouchableOpacity>

      {/* CENTER BUTTON */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Menu' as never)}
      >
        <View
          style={[styles.centerButton, { backgroundColor: centerButtonBg }]}
        >
          <Image
            source={require('../assets/grid-view.png')}
            style={styles.centerIcon}
          />
        </View>
      </TouchableOpacity>

      {/* CHAT */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Chat' as never)}
      >
        <Image
          source={require('../assets/bubble-chat.png')}
          style={[
            styles.icon,
            { tintColor: isActive('Chat') ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Chat') ? activeColor : inactiveColor },
          ]}
        >
          Chat
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Profile' as never)}
      >
        <Image
          source={require('../assets/user-circle.png')}
          style={[
            styles.icon,
            { tintColor: isActive('Profile') ? activeColor : inactiveColor },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Profile') ? activeColor : inactiveColor },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menubox: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menutext: {
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },

  icon: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },

  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});
