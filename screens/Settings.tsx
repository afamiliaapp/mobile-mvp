import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import SettingsBar from '../components/SettingsBar';
import BackButton from '../components/BackButton';
import EnableQuietHours from '../components/EnableQuietHours';
import Themesettings from '../components/Themesettings';
import AppContainer from '../components/AppContainer';
import { ThemeContext } from '../context/ThemeContext';
import ThemedText from '../components/ThemedText';

export default function Settings() {
  const [switches, setSwitches] = useState({
    financeAccess: false,
    guestPhotos: false,
    guestMemories: false,
    childrenChores: false,
    parentApproval: false,
    showBirthdays: false,
    showRelationships: false,
    pushNotification: false,
    emailNotification: false,
  });
  const { theme } = useContext(ThemeContext);

  return (
    <AppContainer>
      <View style={styles.container}>
        <SettingsBar />
        <BackButton />

        <ScrollView style={styles.settingsbox}>
          <ThemedText variant="title" style={styles.titletxt}>
            Privacy & Permissions
          </ThemedText>

          {/**Finance Access */}

          <View style={styles.settingsbox2}>
            <ThemedText style={styles.titletxt2}>Finance Access</ThemedText>
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

          {/**Photos & Memories Access */}

          <View style={styles.settingsbox2}>
            <ThemedText variant="title" style={styles.titletxt2}>
              Photos & Memories Access
            </ThemedText>
            <View style={styles.settingsbox3}>
              <ThemedText style={styles.subtitletxt}>
                Allow guests to view photos
              </ThemedText>

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

          {/**Chores Access */}

          <View style={styles.settingsbox2}>
            <Text style={styles.titletxt2}>Chores Access</Text>
            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>
                Children can mark chores as completed
              </Text>

              <Switch
                value={switches.childrenChores}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, childrenChores: value }))
                }
              />
            </View>

            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>
                Parents must approve before awarding points
              </Text>

              <Switch
                value={switches.parentApproval}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, parentApproval: value }))
                }
              />
            </View>
          </View>

          {/**Data Visibility */}

          <View style={styles.settingsbox2}>
            <Text style={styles.titletxt2}>Data Visibility</Text>
            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>
                Show birthdays to all members
              </Text>

              <Switch
                value={switches.showBirthdays}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, showBirthdays: value }))
                }
              />
            </View>

            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>
                Show relationships in Family Tree
              </Text>

              <Switch
                value={switches.showRelationships}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, showRelationships: value }))
                }
              />
            </View>
          </View>

          {/**Notifications */}

          <View style={styles.settingsbox2}>
            <Text style={styles.titletxt2}>Notifications</Text>
            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>Push notifications</Text>

              <Switch
                value={switches.pushNotification}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, pushNotification: value }))
                }
              />
            </View>

            <View style={styles.settingsbox3}>
              <Text style={styles.subtitletxt}>Email</Text>

              <Switch
                value={switches.emailNotification}
                onValueChange={value =>
                  setSwitches(prev => ({ ...prev, emailNotification: value }))
                }
              />
            </View>

            <EnableQuietHours />
          </View>

          {/**Data Visibility */}

          <Themesettings />
        </ScrollView>
      </View>
    </AppContainer>
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

    marginVertical: 15,
  },

  settingsbox2: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#E2E8F9',
  },

  titletxt2: {
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

  themetxt: {
    color: '#6C7278',
    fontSize: 12,
    marginTop: 20,
  },

  themebox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,

    marginTop: 5,
  },

  themeitem: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    borderColor: '#E2E8F9',
  },

  themeimg: {
    height: 18,
    width: 18,
  },

  themeitem2: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
    borderColor: '#E2E8F9',
  },
});
