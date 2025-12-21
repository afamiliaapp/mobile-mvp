import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotificationBar from '../components/NotificationBar';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <NotificationBar />

      <View style={styles.statbox}>
        <Text style={styles.statlabel}>Statistics</Text>
        {/**FIRST ROW */}
        <View style={styles.activitybox}>
          <View style={styles.activitybox2}>
            <Text style={styles.activitytext1}>Members</Text>
            <Text style={styles.activitytext2}>4</Text>
            <Text style={styles.activitytext3}>View</Text>
          </View>
          <View style={styles.activitybox2}>
            <Text style={styles.activitytext1}>Today’s chores</Text>
            <Text style={styles.activitytext2}>4/10</Text>
            <Text style={styles.activitytext3}>View</Text>
          </View>
        </View>

        {/**SECOND ROW */}
        <View style={styles.activitybox}>
          <View style={styles.activitybox2}>
            <Text style={styles.activitytext1}>Budget</Text>
            <Text style={styles.activitytext2}>4</Text>
            <Text style={styles.activitytext3}>View</Text>
          </View>
          <View style={styles.activitybox2}>
            <Text style={styles.activitytext1}>Today’s meals</Text>
            <Text style={styles.activitytext2}>4/10</Text>
            <Text style={styles.activitytext3}>View</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: '100%', paddingHorizontal: 24 },
  statbox: {
    marginTop: 30,
    backgroundColor: '#EAE9F2',
    height: 254,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  statlabel: {
    color: '#1B1C1E',
    fontSize: 18,
    fontWeight: 600,
  },

  activitybox: {
    height: 94,
    flex: 0,
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between',
  },

  activitybox2: {
    width: '45%',
    height: 94,
    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  activitytext1: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 4,
  },
  activitytext2: {
    color: '#1B1C1E',
    fontSize: 20,
    marginBottom: 4,
  },
  activitytext3: {
    color: '#2C247A',
    fontSize: 10,
    marginBottom: 4,
  },
});
