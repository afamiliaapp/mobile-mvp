import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileBar from '../components/ProfileBar';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ProfileBar />
      <View style={styles.profilebox}>
        <View style={styles.profilebox2}>
          <Image
            source={require('../assets/notifyImage.png')}
            style={styles.profileimage}
          />

          <View>
            <Text style={styles.nametitle}>Sandra Johnson</Text>
            <Text style={styles.progresstitle}>Progress Indicator</Text>
            <View style={styles.progressbar} />
          </View>

          <View style={styles.verifybox}>
            <Text style={styles.verifytext}>Verified</Text>
          </View>
        </View>

        <View>
          <Image
            source={require('../assets/pencil-edit-01.png')}
            style={styles.editicon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: '100%',
  },

  profilebox: {
    height: 82,
    backgroundColor: '#2C247A',
    marginTop: 20,
    borderRadius: 15,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profilebox2: {
    height: 72,
    width: '70%',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileimage: {
    height: 40,
    width: 40,
    borderRadius: 500,
    backgroundColor: '#FFE7CC',
  },
  nametitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
  },
  progresstitle: {
    fontSize: 10,
    fontWeight: 400,
    color: '#FFFFFF',
    marginVertical: 5,
  },
  progressbar: {
    height: 7,
    width: 104,
    backgroundColor: '#F9F5FF',
    borderRadius: 3,
  },

  verifybox: {
    backgroundColor: '#F9F5FF',
    height: 20,
    width: 50,
    justifyContent: 'center',
    borderRadius: 4,

    flex: 0,
    alignItems: 'center',
  },

  verifytext: {
    color: '#1B1C1E',
    fontSize: 10,
  },

  editicon: {
    height: 18,
    width: 18,
  },
});
