import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function NavigationBar() {
  const navigation = useNavigation();

  // Get current screen name
  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const isActive = route => route === currentRouteName;

  return (
    <View style={styles.container}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Image
          source={require('../assets/home-05.png')}
          style={[
            styles.icon,
            { tintColor: isActive('Home') ? '#2C247A' : '#999' },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Home') ? '#2C247A' : '#999' },
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
            { tintColor: isActive('Calendar') ? '#2C247A' : '#999' },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Calendar') ? '#2C247A' : '#999' },
          ]}
        >
          Calendar
        </Text>
      </TouchableOpacity>

      {/* CENTER BUTTON */}
      <TouchableOpacity
        style={styles.menubox}
        onPress={() => navigation.navigate('Create')}
      >
        <View style={styles.menubox2a}>
          <Image
            source={require('../assets/grid-view.png')}
            style={{ width: 24, height: 24 }}
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
            { tintColor: isActive('Chat') ? '#2C247A' : '#999' },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Chat') ? '#2C247A' : '#999' },
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
            { tintColor: isActive('Profile') ? '#2C247A' : '#999' },
          ]}
        />
        <Text
          style={[
            styles.menutext,
            { color: isActive('Profile') ? '#2C247A' : '#999' },
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
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',

    paddingHorizontal: 24,
    borderRadius: 12,
  },

  menubox: {
    width: 75,

    alignItems: 'center',
    justifyContent: 'center',
  },

  menutext: {
    color: '#2C247A',
    fontWeight: 600,
    fontSize: 12,
  },

  menubox2: {
    width: 75,
    height: 96,
  },
  menubox2a: {
    width: 52,
    height: 52,
    backgroundColor: '#2C247A',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
