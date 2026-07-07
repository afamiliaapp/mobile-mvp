import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ProfileBar from '../components/ProfileBar';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppContainer from '../components/AppContainer';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useContext } from 'react'; // 👈 add useContext
import { AuthContext } from '../App'; //

const { width } = Dimensions.get('window');

const scale = size => (width / 375) * size;

export default function Profile() {
  const navigation = useNavigation();

  const { logout, profile } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    logout();
  };

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ProfileBar />
          <View style={styles.profilebox}>
            <View style={styles.profilebox2}>
              {profile.image ? (
                <Image
                  source={{ uri: profile.image }}
                  style={styles.profileimage}
                />
              ) : (
                <View
                  style={[styles.profileimage, { backgroundColor: '#FFE7CC' }]}
                />
              )}

              <View>
                <Text style={styles.nametitle}>{profile.name}</Text>
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
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/peer-to-peer-02.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>Family</Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Settings')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/setting-07.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>Settings</Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Subscription')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/credit-card-validation.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>
                    Subscription Plan
                  </Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Rewards')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/champion.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>Rewards</Text>
                </View>
                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Legal')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/agreement-03.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>
                    Legal & Compliance
                  </Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Help')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/customer-service-01.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>Help & Support</Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileListbox2}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Info')}
            >
              <View style={styles.profileListbox3}>
                <View style={styles.profileListbox4}>
                  <Image
                    source={require('../assets/mobile-protection.png')}
                    style={styles.profilelistIcon}
                  />

                  <Text style={styles.profilelistIcontext}>App info</Text>
                </View>

                <View style={styles.profileListbox5}>
                  <Ionicons name="chevron-forward" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.profileListbox2a}>
              <TouchableOpacity
                onPress={handleLogout}
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
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    fontWeight: '600',
  },
  progresstitle: {
    fontSize: 10,
    fontWeight: '400',
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
    marginTop: 30,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 15,
  },
  profileListbox2: {
    flex: 0,

    width: '100%',
    borderBottomWidth: 0.8,
    borderColor: '#E2E8F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 13,
  },
  profileListbox3: {
    width: '100%',

    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileListbox4: {
    width: '90%',

    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileListbox5: {
    width: '10%',
    height: 24,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  profilelistIcon: {
    height: 20,
    width: 20,
    marginRight: 12,
  },

  profilelistIcontext: {
    color: '#999999',
    fontSize: 15,
    fontWeight: '500',
  },

  profileListbox2a: {
    flex: 0,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  profilelistIcontext2: {
    color: '#FF1744',
    fontSize: 15,
    fontWeight: '500',
  },

  profilelistIconbox: {
    width: '20%',
  },
});
