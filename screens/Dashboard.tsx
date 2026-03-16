import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotificationBar from '../components/NotificationBar';
import TodaysSchedule from '../components/TodaysSchedule';
import AppContainer from '../components/AppContainer';
import ThemedText from '../components/ThemedText';

export default function Dashboard() {
  return (
    <AppContainer>
      <View style={styles.container}>
        <NotificationBar />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statbox}>
            <Text variant="title" style={styles.statlabel}>
              Statistics
            </Text>
            {/**FIRST ROW */}
            <View style={styles.activitybox}>
              <View style={styles.activitybox2}>
                <Text style={styles.activitytext1}>Members</Text>
                <Text style={styles.activitytext2}>4</Text>
                <ThemedText style={styles.activitytext3}>View</ThemedText>
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

          <TodaysSchedule />
        </ScrollView>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    height: '94%',
  },
  statbox: {
    marginTop: 30,
    backgroundColor: '#EAE9F2',
    height: 254,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  statlabel: {
    fontSize: 18,
    fontWeight: 600,
  },

  activitybox: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between',
  },

  activitybox2: {
    width: '45%',

    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  activitytext1: {
    fontSize: 14,
    marginBottom: 4,
  },
  activitytext2: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 600,
  },
  activitytext3: {
    fontSize: 10,
    marginBottom: 4,
  },
});
