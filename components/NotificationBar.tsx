import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import ThemedText from './ThemedText';
import { AuthContext } from '../App';

export default function NotificationBar() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { profile } = useContext(AuthContext);

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const day = days[now.getDay()];
    const date = now.getDate();
    return `${day} ${date}`;
  };
  return (
    <View style={styles.continer}>
      <View style={styles.notimagebox}>
        {profile.image ? (
          <Image source={{ uri: profile.image }} style={styles.notimage} />
        ) : (
          <View style={[styles.notimage, { backgroundColor: '#FFE7CC' }]} />
        )}
      </View>
      <View style={styles.namebox}>
        <ThemedText variant="title" style={styles.name}>
          Hello {profile.name}
        </ThemedText>
        <ThemedText style={styles.date}>{getFormattedDate()}</ThemedText>
      </View>

      <View style={[styles.belliconbox, { borderColor: theme.border }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notificationpage')}
        >
          <Image
            source={require('../assets/notificationbell.png')}
            style={[styles.bellicon, { tintColor: theme.icon }]} // dynamic icon color
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
