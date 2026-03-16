import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const isTablet = width >= 768;

// Better scaling
const scale = size => {
  const baseWidth = isTablet ? 768 : 375;
  return (width / baseWidth) * size;
};

export default function NavigationBar() {
  const navigation = useNavigation();
  const { theme, isDark } = useContext(ThemeContext);

  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const isActive = route => route === currentRouteName;

  const activeColor = isDark ? '#93C5FD' : '#2C247A';
  const inactiveColor = isDark ? '#64748B' : '#999';
  const barBackground = theme.background;

  return (
    <View style={[styles.container, { backgroundColor: barBackground }]}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Dashboard')}
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
        onPress={() => navigation.navigate('Calendar')}
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
        onPress={() => navigation.navigate('Menu')}
      >
        <View style={styles.centerButton}>
          <Image
            source={require('../assets/grid-view.png')}
            style={styles.centerIcon}
          />
        </View>
      </TouchableOpacity>

      {/* CHAT */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Chat')}
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
        onPress={() => navigation.navigate('Profile')}
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
    height: isTablet ? scale(70) : scale(90),
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'space-between',

    bottom: isTablet ? 0 : 0,
    left: isTablet ? 0 : 0,
    right: isTablet ? 0 : 0,
    elevation: 10,
  },

  menubox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menutext: {
    fontWeight: '600',
    fontSize: isTablet ? scale(14) : scale(11),
    marginTop: scale(4),
  },

  icon: {
    width: isTablet ? scale(22) : scale(22),
    height: isTablet ? scale(22) : scale(22),
    marginBottom: scale(2),
  },

  centerButton: {
    width: isTablet ? scale(52) : scale(52),
    height: isTablet ? scale(52) : scale(52),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C247A',
  },

  centerIcon: {
    width: isTablet ? scale(20) : scale(24),
    height: isTablet ? scale(20) : scale(24),
    tintColor: '#fff',
  },
});
