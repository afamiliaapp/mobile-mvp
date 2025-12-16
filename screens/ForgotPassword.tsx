import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Forgot password</Text>
          <Text style={styles.subtitle}>Forgot your password</Text>
          <BackButton />
          <View style={styles.slideline}></View>
        </View>
        <View style={styles.inputbox1}>
          {' '}
          <Text style={styles.inputtext1}>Email</Text>{' '}
          <TextInput
            placeholder="Enter email"
            style={{
              height: 46,
              borderWidth: 1,
              borderColor: '#E2E8F9',
              borderRadius: 10,
              paddingHorizontal: 14,
            }}
          />{' '}
        </View>

        <View style={styles.backbtn}>
          <TouchableOpacity
            onPress={() => Navigation.navigate('')}
            style={styles.backbtnTouchable}
          >
            <Text style={styles.backbtntext}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signinbox}>
          <Text style={styles.signintxt}>Remember Password?</Text>{' '}
          <TouchableOpacity onPress={() => Navigation.navigate('Signin')}>
            <Text style={styles.signintxt2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 24,
    width: '100%',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },

  titlebox: {
    height: 90,
  },
  title: {
    color: '#1B1C1E',
    fontSize: 32,
    fontWeight: 700,
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 5,
  },
  slideline: {
    width: 50,
    height: 4,
    backgroundColor: '#2C247A',
    marginTop: 10,
    borderRadius: 20,
  },
  inputbox1: {
    marginTop: 100,
  },
  inputtext1: {
    marginBottom: 10,
    fontSize: 12,
    color: '#6C7278',
  },
  backbtn: {
    height: 48,
    marginTop: 10,

    width: '100%',
  },

  backbtntext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
  },
  backbtnTouchable: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: '#2C247A',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  signinbox: {
    flex: 0,
    flexDirection: 'row',
    top: '55%',
    justifyContent: 'center',
  },
  signintxt: {
    fontSize: 12,
    color: '#6C7278',
  },
  signintxt2: {
    fontSize: 12,
    color: '#2C247A',
  },
});
