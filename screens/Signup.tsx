import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Create your family space</Text>
          <View style={styles.slideline}></View>
        </View>

        <View style={styles.formbox}>
          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>Full name</Text>

            <TextInput
              placeholder="Enter full name"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />
          </View>
          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>Email</Text>

            <TextInput
              placeholder="Enter Email"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 30,
    paddingHorizontal: 24,
    width: '100%',
    backgroundColor: '#fff',
  },

  titlebox: {
    height: 90,
  },

  title: {
    fontSize: 32,
    color: '#1B1C1E',
    fontWeight: 700,
  },

  subtitle: {
    color: '#999999',
    fontWeight: 500,
    marginTop: 10,
  },

  slideline: {
    width: 50,
    height: 4,
    backgroundColor: '#2C247A',
    marginTop: 10,
    borderRadius: 20,
  },

  //FORM STYLING

  formbox: {
    height: 538,
    backgroundColor: 'pink',
    marginTop: 40,
  },

  inputbox1: {
    height: 69,
    marginBottom: 20,
  },
  inputtext1: {
    marginBottom: 5,
  },
});
