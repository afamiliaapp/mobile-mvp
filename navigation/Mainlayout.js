import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import Calendar from '../screens/Calendar';
import NavigationBar from '../components/NavigationBar';

const Stack = createNativeStackNavigator();

export default function MainLayout() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Stack Navigator takes all space above navbar */}
        <View style={styles.content}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Dashboard"
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Calendar" component={Calendar} />
          </Stack.Navigator>
        </View>

        {/* Bottom navigation bar */}
        <View style={styles.navbarWrapper}>
          <NavigationBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: '100%',
    backgroundColor: '#fff',

    justifyContent: 'flex-end', // keeps navbar at the bottom
  },
  content: {
    flex: 1,

    // fills the space above navbar
  },
});
