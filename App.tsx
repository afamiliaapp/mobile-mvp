import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Authlayout from '../mobile-mvp/navigation/Authlayout';
import MainLayout from '../mobile-mvp/navigation/Mainlayout';
const RootStack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide(); // 👈 VERY IMPORTANT
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main"
      >
        {/* NO NAV BAR */}
        <RootStack.Screen name="Auth" component={Authlayout} />

        {/* WITH NAV BAR */}
        <RootStack.Screen name="Main" component={MainLayout} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
