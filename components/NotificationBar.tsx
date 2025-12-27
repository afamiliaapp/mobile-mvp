import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function NotificationBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.continer}>
      <View style={styles.notimagebox}>
        <Image
          source={require('../assets/notifyImage.png')}
          style={styles.notimage}
        />
      </View>
      <View style={styles.namebox}>
        <Text style={styles.name}>Hello Sandra</Text>
        <Text style={styles.date}>Tues 29</Text>
      </View>

      <View style={styles.belliconbox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notificationpage')}
        >
          <Image
            source={require('../assets/notificationbell.png')}
            style={styles.bellicon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    height: 32,

    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  notimagebox: {
    height: 32,
    width: 32,
    borderRadius: 400,
    backgroundColor: '#FFE7CC',
    borderColor: '#F500204D',
  },
  notimage: {
    height: 32,
    width: 32,
    borderRadius: 400,
  },
  namebox: {
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    color: '#1B1C1E',
    fontWeight: 500,
  },
  date: {
    fontSize: 12,
    color: '#999999',
    fontWeight: 500,
  },
  belliconbox: {
    height: 32,
    width: 32,
    borderColor: '#E2E8F9',
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bellicon: {
    height: 18,
    width: 18,
  },
});
