import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
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
            source={require('./assets/onboardinIMG1.jpg')}
            style={styles.profileImage1}
            resizeMode="cover"
          />
          <Image
            source={require('./assets/AfamiliaLogdddoDesign1.png')}
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
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center', // numbers
    position: 'relative',
  },

  box: {
    height: 32,
    width: 335,
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
    width: 327,
    backgroundColor: '#fff',
    transform: [{ rotate: '-5deg' }],
    position: 'relative',
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
    width: 327,
    height: 450,
    borderRadius: 50,
  },

  lastBox: {
    height: 293,
    width: 341,
    position: 'absolute',
    top: '65%',
    left: 50,
    backgroundColor: '#fff',
    paddingVertical: 24,
  },
  text: {
    flex: 1,
    flexDirection: 'column',

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
