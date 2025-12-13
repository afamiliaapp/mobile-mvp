import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpVerification() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>OTP verification</Text>
          <Text style={styles.subtitle}>Verify your account</Text>
          <View style={styles.slideline}></View>
        </View>

        <View style={styles.otpbox}>
          <Text style={styles.otptext}>
            Let's Please enter the verification code we sent to your mobile
            (+234 545*****)or email (almal*****@example.com).
          </Text>

          <View style={styles.otpPinBox}>
            <View style={styles.otpPin}></View>
            <View style={styles.otpPin}></View>
            <View style={styles.otpPin}></View>
            <View style={styles.otpPin}></View>
          </View>
          <View>
            <Text style={styles.otpcodetxt}>
              Resend Code(0:02s) Didn't receive the code?{' '}
              <Text style={styles.otpResendtxt}>Click to Resend</Text>
            </Text>
          </View>

          <View style={styles.continuebtn}>
            <Text style={styles.continuebtntext}>Continue</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 40,
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
  otpbox: {
    height: 228,

    marginTop: 60,
  },
  otptext: {
    fontSize: 12,
    color: '#6C7278',
    lineHeight: 20,
  },
  otpPinBox: {
    height: 48,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  otpPin: {
    height: 48,
    width: 53,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDF1F3',
  },
  otpcodetxt: {
    fontSize: 12,
    color: '#6C7278',
    textAlign: 'center',
    marginTop: 20,
  },
  otpResendtxt: {
    color: '#2C247A',
  },

  continuebtn: {
    height: 48,
    backgroundColor: '#2C247A',
    borderRadius: 10,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  continuebtntext: {
    fontSize: 16,
    color: '#fff',
  },
});
