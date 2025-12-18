import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formbox}>
          <View style={styles.Textbox}>
            <Text style={styles.Title}>Sign in to your account</Text>
            <Text style={styles.Subtitle}>
              Enter the necessary details to sign in
            </Text>
          </View>

          {/** FORM FIELD */}

          <View style={styles.Formfield}>
            <View style={styles.Forminputbox}>
              <View style={styles.inputbox}>
                <Text style={styles.inputtext}>Email</Text>
                <TextInput
                  placeholder="Enter Email"
                  style={{
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                />
              </View>

              <View style={styles.inputbox2}>
                <Text style={styles.inputtext}>Password</Text>

                <View style={styles.input2form}>
                  <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    style={styles.input2password}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={22}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputbox3}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.inputbox3txt}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.SignInButtonbox}>
              <View style={styles.SignInButton}>
                <Text style={styles.SignInButtonText}>Sign In</Text>
              </View>

              <View style={styles.border}>
                <View style={styles.borderline}></View>
                <Text style={styles.borderText}>Or</Text>
                <View style={styles.borderline}></View>
              </View>

              <View style={styles.GoogleSignin}>
                <Image
                  source={require('../assets/SignIngoogle.png')}
                  style={{ width: 18, height: 18 }}
                />
                <Text style={styles.GoogleSigninText}>
                  Continue with Google
                </Text>
              </View>
            </View>
          </View>

          {/** SIGN UP */}

          <View style={styles.signupbox}>
            <Text style={styles.signup1}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signup2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 48,
  },

  formbox: {
    height: 489,
    width: '100%',
  },

  Textbox: {
    height: 74,
  },

  Title: {
    color: '#1B1C1E',
    fontSize: 32,
    fontWeight: 700,
  },
  Subtitle: {
    fontSize: 14,
    color: '#999999',
    fontWeight: 500,
    marginTop: 10,
  },
  Formfield: {
    height: 365,

    marginTop: 55,
  },

  Forminputbox: {
    height: 187,
  },
  inputbox: {
    height: 69,
  },
  inputbox2: {
    height: 69,
    marginTop: 20,
  },
  inputtext: {
    fontSize: 12,
    color: '#6C7278',
    marginBottom: 5,
  },
  input2form: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input2password: { flex: 1, height: 60 },

  inputbox3: {
    flex: 0,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  SignInButtonbox: {
    height: 150,
    width: '100%',

    marginTop: 40,
  },

  SignInButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#2C247A',

    borderRadius: 10,
    borderWidth: 0,
    alignItems: 'center',
    flex: 0,
    justifyContent: 'center',
  },

  SignInButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  border: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },

  borderline: {
    borderWidth: 0.5,
    borderColor: '#999999',
    height: 0.5,
    width: '45%',
  },

  borderText: {
    color: '#6C7278',
    fontSize: 12,
  },

  GoogleSignin: {
    height: 48,
    width: '100%',
    flexDirection: 'row',

    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999999',
    alignItems: 'center',
    flex: 0,
    justifyContent: 'center',
    marginTop: 30,
  },

  GoogleSigninText: {
    fontSize: 14,
    color: '#1B1C1E',
    marginLeft: 10,
    fontWeight: 600,
  },

  signupbox: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: '65%',
  },

  signup1: {
    fontSize: 12,
    color: '#6C7278',
  },
  signup2: {
    fontSize: 12,
    color: '#2C247A',
    marginLeft: 5,
    fontWeight: 600,
  },
  inputbox3txt: {
    color: '#999999',
    fontSize: 12,
    marginTop: 10,
  },
});
