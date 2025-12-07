import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide(); // 👈 VERY IMPORTANT
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
