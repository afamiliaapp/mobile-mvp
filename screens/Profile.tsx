import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProfileBar from '../components/ProfileBar';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile() {
  const navigation = useNavigation();

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
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileEdithPage')}
          >
            <Image
              source={require('../assets/pencil-edit-01.png')}
              style={styles.editicon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileListBox1}>
        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Family')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/peer-to-peer-02.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Family</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/setting-07.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Settings</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Subscription')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/credit-card-validation.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Subscription Plan</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Rewards')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/champion.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Rewards</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Legal')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/agreement-03.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Legal & Compliance</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Help')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/customer-service-01.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>Help & Support</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileListbox2}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Info')}
        >
          <View style={styles.profileListbox3}>
            <Image
              source={require('../assets/mobile-protection.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext}>App info</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        <View style={styles.profileListbox2a}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Logout')}
            style={styles.profileListbox3}
          >
            <Image
              source={require('../assets/logout-square-01.png')}
              style={styles.profilelistIcon}
            />

            <Text style={styles.profilelistIcontext2}>Logout</Text>
          </TouchableOpacity>
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
    backgroundColor: '#F2F8F9',
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
  profileListBox1: {
    height: '68%',

    marginTop: 30,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 15,
  },
  profileListbox2: {
    flex: 0,
    height: 45,
    borderBottomWidth: 0.8,
    borderColor: '#E2E8F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  profileListbox3: {
    width: '40%',
    height: 24,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profilelistIcon: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  profilelistIcontext: {
    color: '#999999',
    fontSize: 15,
    fontWeight: 500,
  },

  profileListbox2a: {
    flex: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  profilelistIcontext2: {
    color: '#FF1744',
    fontSize: 15,
    fontWeight: 500,
  },
});
