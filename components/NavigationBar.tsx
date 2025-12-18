import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function NavigationBar() {
  return (
    <View style={styles.container}>
      <View style={styles.menubox}>
        <Image
          source={require('../assets/home-05.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.menutext}>Home</Text>
      </View>
      <View style={styles.menubox}>
        <Image
          source={require('../assets/calendar-04.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.menutext}>Calendar</Text>
      </View>
      <View style={styles.menubox}>
        <View style={styles.menubox2a}>
          <Image
            source={require('../assets/grid-view.png')}
            style={{ width: 24, height: 24 }}
          />
        </View>
      </View>
      <View style={styles.menubox}>
        <Image
          source={require('../assets/bubble-chat.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.menutext}>Chat</Text>
      </View>
      <View style={styles.menubox}>
        <Image
          source={require('../assets/user-circle.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.menutext}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    top: '87%',
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
