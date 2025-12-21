import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function TodaysSchedule() {
  return (
    <View style={styles.schedulebox}>
      <Text style={styles.scheduletitle}>TodaysSchedule</Text>
      <View style={styles.schedulebox2}>
        <View style={styles.schedulebox3}>
          <Text style={styles.schedulebox3title}>Business meeting</Text>
          <Text style={styles.schedulebox3text1}>Call project manager </Text>
          <View style={styles.scheduledatebox}>
            <Text style={styles.scheduletimetext}>04:00 PM </Text>
            <Text style={styles.scheduletimetext}>| 29 Feb 2025 | </Text>
            <Text style={styles.scheduletimelabel}>Work </Text>
          </View>
        </View>
        <View style={styles.schedulebox4}>
          <View style={styles.scheduleviewbtn}>
            <Text style={styles.scheduleviewtxt}>View</Text>
            <View>
              <Icon name="chevron-right" size={12} color="#999999" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.schedulebox5}>
        <View style={styles.scheduleviewbtn2}>
          <Text style={styles.scheduleviewtxt2}>Show more</Text>
          <View>
            <Icon name="chevron-down" size={12} color="#999999" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  schedulebox: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: 171,
  },
  scheduletitle: {
    color: '#1B1C1E',
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 20,
  },
  schedulebox2: {
    height: 95,
    borderTopColor: '#E2E8F9',
    borderTopWidth: 1,
    flex: 0,
    flexDirection: 'row',
  },
  schedulebox3: {
    width: '75%',
    marginTop: 12,
  },
  schedulebox3title: {
    color: '#1B1C1E',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
  },
  schedulebox3text1: {
    color: '#999999',
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 4,
  },
  scheduledatebox: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  scheduletimetext: {
    fontSize: 12,
    fontWeight: 500,
    color: '#6C7278',
  },
  scheduletimelabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#FFB800',
  },

  schedulebox4: {
    width: '25%',

    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleviewbtn: {
    flex: 0,
    flexDirection: 'row',
    height: 22,
    width: 60,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scheduleviewtxt: {
    fontSize: 10,
    color: '#1B1C1E',
    fontWeight: 400,
    marginRight: 4,
  },
  schedulebox5: {
    width: '100%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleviewbtn2: {
    flex: 0,
    flexDirection: 'row',
    height: 22,
    width: 88,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scheduleviewtxt2: {
    fontSize: 10,
    color: '#1B1C1E',
    fontWeight: 400,
  },
});
