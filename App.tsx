import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from './screens/Onboarding';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import SignupTwo from './screens/SignupTwo';
import OtpVerification from './screens/OtpVerification';
import SuccessScreen from './screens/SuccessScreen';
import ForgotPassword from './screens/ForgotPassword';
import ForgotPassword2 from './screens/ForgotPassword2';
import SuccessScreen2 from './screens/SuccessScreen2';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide(); // 👈 VERY IMPORTANT
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SuccessScreen2"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupTwo" component={SignupTwo} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
        <Stack.Screen name="SuccessScreen2" component={SuccessScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
