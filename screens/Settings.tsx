import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import SettingsBar from '../components/SettingsBar';
import BackButton from '../components/BackButton';

export default function Settings() {
  const [switches, setSwitches] = useState({
    financeAccess: false,
    guestPhotos: false,
    guestMemories: false,
  });

  return (
    <View style={styles.container}>
      <SettingsBar />
      <BackButton />

      <ScrollView style={styles.settingsbox}>
        <Text style={styles.titletxt}>Privacy & Permissions</Text>
        <View style={styles.settingsbox2}>
          <Text style={styles.titletxt2}>Finance Access</Text>
          <View style={styles.settingsbox3}>
            <Text style={styles.subtitletxt}>
              Allow children to view family expenses & budgets
            </Text>

            <Switch
              value={switches.financeAccess}
              onValueChange={value =>
                setSwitches(prev => ({ ...prev, financeAccess: value }))
              }
            />
          </View>
        </View>

        <View style={styles.settingsbox2}>
          <Text style={styles.titletxt2}>Photos & Memories Access</Text>
          <View style={styles.settingsbox3}>
            <Text style={styles.subtitletxt}>Allow guests to view photos</Text>

            <Switch
              value={switches.guestPhotos}
              onValueChange={value =>
                setSwitches(prev => ({ ...prev, guestPhotos: value }))
              }
            />
          </View>

          <View style={styles.settingsbox3}>
            <Text style={styles.subtitletxt}>
              Allow relatives to upload photos
            </Text>

            <Switch
              value={switches.guestMemories}
              onValueChange={value =>
                setSwitches(prev => ({ ...prev, guestMemories: value }))
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },

  settingsbox: {
    height: '100%',
  },
  titletxt: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1B1C1E',
    marginVertical: 15,
  },

  settingsbox2: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#E2E8F9',
  },

  titletxt2: {
    color: '#1B1C1E',
    fontSize: 14,
    fontWeight: 500,
    marginVertical: 10,
  },

  settingsbox3: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitletxt: {
    fontSize: 12,
    fontWeight: 500,
    color: '#6C7278',
    marginVertical: 15,
  },
});
