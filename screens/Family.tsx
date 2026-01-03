import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FamilyManagementBar from '../components/FamilyManagementBar';
import BackButton from '../components/BackButton';

export default function Family() {
  return (
    <View style={styles.container}>
      <FamilyManagementBar />
      <BackButton />

      <View style={styles.famname}>
        <Text style={styles.famnametxt}>Family Circle name</Text>
        <TextInput style={styles.input} placeholder="Enter text" />
      </View>

      <Text style={styles.memberlisttitle}>Member list</Text>

      <View style={styles.memberlistbox}>
        <View style={styles.memberlistbox2}>
          <View style={styles.memberlistbox3}>
            <View style={styles.imagebox}>
              <Image
                style={styles.image}
                source={require('../assets/avata.png')}
              />

              <View>
                <Text style={styles.membertitle}>Ifeoma Orji</Text>
                <Text style={styles.memberdate}>
                  Mother | Added 29th Feb 2025
                </Text>
              </View>
            </View>

            <View style={styles.imagebox2}>
              <Image
                style={styles.image2}
                source={require('../assets/pencil-edit-01 (1).png')}
              />
              <Image
                style={styles.image2}
                source={require('../assets/delete-02.png')}
              />
            </View>
          </View>
        </View>

        <View style={styles.addmemberbox}>
          <Image
            style={styles.addmemberimg}
            source={require('../assets/add-01.png')}
          />

          <Text style={styles.addmembertxt}>Add/Invite Member</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },

  famname: {
    marginTop: 40,
  },
  famnametxt: {
    color: '#6C7278',
    fontSize: 12,
    fontWeight: 500,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },

  memberlistbox: {
    borderRadius: 10,
    borderColor: '#E2E8F9',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    height: 220,
    flex: 0,
    flexDirection: 'column',
  },

  memberlisttitle: {
    color: '#6C7278',
    fontSize: 12,
    fontWeight: 500,
    marginTop: 20,
  },
  memberlistbox2: {
    height: 180,
  },
  memberlistbox3: {
    height: 30,
    borderBlockColor: '#E2E8F9',
    borderBottomWidth: 1,

    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imagebox: {
    height: 30,
    width: 200,

    flex: 0,
    flexDirection: 'row',
  },
  image: {
    height: 27,
    width: 27,
    borderRadius: 10,
    marginRight: 10,
  },
  membertitle: {
    fontSize: 10,
    color: '#1B1C1E',
  },
  memberdate: {
    fontSize: 8,
    color: '#999999',
  },
  imagebox2: {
    width: 50,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 27,
    alignItems: 'center',
  },
  image2: {
    height: 14,
    width: 14,
  },
  addmemberbox: {
    height: 20,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },

  addmemberimg: {
    height: 14,
    width: 14,
    marginRight: 4,
  },
  addmembertxt: {
    fontSize: 12,
    color: '#999999',
    fontWeight: 500,
  },
});
