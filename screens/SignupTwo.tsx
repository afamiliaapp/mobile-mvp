import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from '../components/Breadcrumb';
import BackButton from '../components/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupTwo() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Create your family space</Text>
          <BackButton />
          <View style={styles.slideline}></View>
        </View>

        <View style={styles.inputbox}>
          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>How many are in your family?</Text>

            <View style={styles.dropdownContainer}>
              <TextInput
                placeholder="Choose a number"
                style={styles.dropdownInput}
              />

              <Ionicons
                name="chevron-down"
                size={20}
                color="#888"
                style={styles.dropdownIcon}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffff',
    paddingHorizontal: 24,
    paddingVertical: 30,
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

  inputbox: {
    height: 557,
    backgroundColor: 'blue',
    marginTop: 90,
  },
  inputtext1: {
    marginBottom: 5,
  },
  dropdownContainer: {
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  dropdownInput: {
    flex: 1,
    fontSize: 16,
  },

  dropdownIcon: {
    marginLeft: 10,
  },
});
