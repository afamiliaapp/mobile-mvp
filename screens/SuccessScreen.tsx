import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SuccessScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image
            source={require('../assets/Star 22.png')}
            style={{
              width: '100%',
              height: 200,
              position: 'absolute',
              top: 0,
            }}
            resizeMode="cover"
          />
        </View>

        <View style={styles.successbox}>
          <View style={styles.successbox2}>
            <Image
              source={require('../assets/Sticker.png')}
              style={{
                width: 100,
                height: 100,

                top: 0,
              }}
              resizeMode="cover"
            />

            <Text style={styles.successtext}>Success</Text>
            <Text style={styles.successtext1}>Your family space is ready</Text>
            <View style={styles.backbtn}>
              <TouchableOpacity
                onPress={() => Navigation.navigate('Signin')}
                style={styles.backbtnTouchable}
              >
                <Text style={styles.backbtntext}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 0,
    position: 'relative',
  },
  successbox: {
    width: '100%',
    height: 243,
    top: '35%',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successbox2: {
    alignItems: 'center',

    width: '100%',
  },
  successtext: {
    color: '#1B1C1E',
    fontSize: 32,
    fontWeight: 700,
    marginVertical: 10,
  },

  successtext1: {
    color: '#999999',
    fontSize: 12,
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
    marginTop: 10,
  },
});
