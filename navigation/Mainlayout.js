import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import Calendar from '../screens/Calendar';
import Menu from '../screens/Menu';
import NavigationBar from '../components/NavigationBar';
import Notificationpage from '../screens/Notificationpage';

const Stack = createNativeStackNavigator();

/* Layout wrapper so navbar has navigation context */
function ScreenWithNav({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

/* Helper to wrap screens */
const withNav = Screen => props =>
  (
    <ScreenWithNav>
      <Screen {...props} />
    </ScreenWithNav>
  );

export default function MainLayout() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen name="Dashboard" component={withNav(Dashboard)} />
      <Stack.Screen name="Calendar" component={withNav(Calendar)} />
      <Stack.Screen name="Chat" component={withNav(Chat)} />
      <Stack.Screen name="Profile" component={withNav(Profile)} />
      <Stack.Screen name="Menu" component={withNav(Menu)} />
      <Stack.Screen
        name="Notificationpage"
        component={withNav(Notificationpage)}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
