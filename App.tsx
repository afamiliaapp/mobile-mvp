import React, { useEffect, useContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Authlayout from '../mobile-mvp/navigation/Authlayout';
import MainLayout from '../mobile-mvp/navigation/Mainlayout';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const RootStack = createNativeStackNavigator();

/* 🔥 Separate component so we can use useContext */
const AppNavigator = () => {
  const { theme } = useContext(ThemeContext);

  const navigationTheme = theme.mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main"
      >
        <RootStack.Screen name="Auth" component={Authlayout} />
        <RootStack.Screen name="Main" component={MainLayout} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
