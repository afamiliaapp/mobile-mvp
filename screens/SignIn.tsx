import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                />
              </View>

              <View style={styles.inputbox2}>
                <Text style={styles.inputtext}>Password</Text>

                <View
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    style={{
                      flex: 1,
                    }}
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
                <Text>Forgot Password ?</Text>
              </View>
            </View>
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

  inputbox3: {
    flex: 0,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
