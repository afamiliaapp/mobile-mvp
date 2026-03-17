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
import ProfileEdithPage from '../screens/ProfileEdithPage';
import Family from '../screens/Family';
import Settings from '../screens/Settings';
import Subscription from '../screens/Subscription';
import Rewards from '../screens/Rewards';
import Legal from '../screens/Legal';
import Help from '../screens/Help';
import Info from '../screens/Info';
import Logout from '../screens/Logout';
import SupportChat from '../screens/SupportChat';

const Stack = createNativeStackNavigator();

/* Layout wrapper so navbar has navigation context */
function ScreenWithNav({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
      <NavigationBar />
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
      <Stack.Screen
        name="ProfileEdithPage"
        component={withNav(ProfileEdithPage)}
      />

      <Stack.Screen name="Family" component={withNav(Family)} />
      <Stack.Screen name="Settings" component={withNav(Settings)} />
      <Stack.Screen name="Subscription" component={withNav(Subscription)} />
      <Stack.Screen name="Rewards" component={withNav(Rewards)} />
      <Stack.Screen name="Legal" component={withNav(Legal)} />
      <Stack.Screen name="Help" component={withNav(Help)} />
      <Stack.Screen name="Info" component={withNav(Info)} />
      <Stack.Screen name="Logout" component={withNav(Logout)} />
      <Stack.Screen name="SupportChat" component={SupportChat} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  container: {
    flex: 0,
    height: '85%',

    backgroundColor: 'green',
  },
  content: {
    flex: 1,
    backgroundColor: '#0c4af3e5',
  },
});
