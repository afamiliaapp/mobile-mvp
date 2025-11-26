import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Onboarding = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.box_line}></View>
          <View style={styles.box_skip}>
            <Text style={styles.skip}>Skiper</Text>
          </View>
        </View>
        {/**IMAGE SECTION */}

        <View style={styles.Image}>
          <Image
            source={require('../assets/onboardinIMG1.jpg')}
            style={styles.profileImage1}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/AfamiliaLogdddoDesign1.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.lastBox}>
          <View style={styles.text}>
            <Text style={styles.textup}>
              {' '}
              A home for your family, in your pocket
            </Text>
            <Text style={styles.textdown}>
              {' '}
              Keep schedules, memories, and connections all in one safe place.
            </Text>
          </View>
        </View>

        <View style={styles.pagination}>
          <View style={styles.pageinationbutton}>
            <Ionicons name="chevron-back" size={18} color="#fff" />
          </View>
          <View style={styles.pageinationbutton}>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 48,

    alignItems: 'center', // numbers
    position: 'relative',
  },

  pagination: {
    height: 32,
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 160,
    paddingHorizontal: 30,
  },

  pageinationbutton: {
    height: 32,
    width: 32, // match height for a square background
    backgroundColor: '#2C247A',
    padding: 6, // adjust to center icon
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 32,
    width: '90%',
    flex: 0,
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // numbers
  },
  box_line: {
    height: 4,
    width: 50,
    backgroundColor: '#2C247A', // numbers
  },

  box_skip: {
    height: 32,
    width: 69,
    backgroundColor: '#fff',
    borderBlockColor: '#E2E8F9',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },

  skip: { fontSize: 14 },

  Image: {
    height: 450,
    width: '100%',
    backgroundColor: '#fff',
    transform: [{ rotate: '-5deg' }],
    position: 'relative',
    marginLeft: 10,
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    borderWidth: 0.1,
    borderColor: '#999999',
  },

  profileImage: {
    width: 65,
    height: 64,
    borderRadius: 50,
    position: 'absolute',
    top: '40%', // percentages are strings
    left: '30%',
  },
  profileImage1: {
    width: '100%',
    height: 450,
    borderRadius: 50,
  },

  lastBox: {
    height: 293,
    width: '100%',
    position: 'absolute',
    top: '65%',
    left: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 50,

    height: 102,
  },
  textup: {
    fontSize: 24,
    fontWeight: 'semibold',
    marginVertical: 10,
  },
  textdown: {
    fontSize: 14,
    color: '#999999',
  },
});
