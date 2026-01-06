import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function EnableQuietHours() {
  return (
    <View style={styles.settingsbox3}>
      <Text style={styles.subtitletxt}>Enable Quiet Hours</Text>

      <Image
        style={styles.editImg}
        source={require('../assets/pencil-edit-01 (2).png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

  editImg: {
    height: 22,
    width: 22,
    marginRight: 12,
  },
});
