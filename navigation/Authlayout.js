import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../screens/Onboarding';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import SignupTwo from '../screens/SignupTwo';
import OtpVerification from '../screens/OtpVerification';
import SuccessScreen from '../screens/SuccessScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ForgotPassword2 from '../screens/ForgotPassword2';
import SuccessScreen2 from '../screens/SuccessScreen2';

const Stack = createNativeStackNavigator();

export default function Authlayout({ onSignIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="Signin">
        {props => <Signin {...props} onSignIn={onSignIn} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupTwo" component={SignupTwo} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
      <Stack.Screen name="SuccessScreen2" component={SuccessScreen2} />
    </Stack.Navigator>
  );
}
