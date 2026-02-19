import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import RewardsBar from '../components/RewardsBar';
import AppContainer from '../components/AppContainer';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

const recentActivities = [
  {
    id: 1,
    title: 'Completed weekly chores',
    time: '2 hours ago',
    points: '+13 Points',
  },
  {
    id: 2,
    title: 'Finished reading challenge',
    time: '5 hours ago',
    points: '+20 Points',
  },
  {
    id: 3,
    title: 'Completed workout session',
    time: '1 day ago',
    points: '+15 Points',
  },
  {
    id: 4,
    title: 'Submitted assignment',
    time: '2 days ago',
    points: '+25 Points',
  },
  {
    id: 5,
    title: 'Daily login bonus',
    time: '3 days ago',
    points: '+5 Points',
  },
  {
    id: 6,
    title: 'Daily login bonus',
    time: '3 days ago',
    points: '+5 Points',
  },
  {
    id: 7,
    title: 'Daily login bonus',
    time: '3 days ago',
    points: '+5 Points',
  },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState('tier');
  // 'activity' or 'tier'

  return (
    <AppContainer>
      <View style={styles.container1}>
        <RewardsBar />
        <BackButton />
      </View>

      <View style={styles.rewardheroImg}>
        <View>
          <Image
            source={require('../assets/rewardimg.png')}
            style={styles.rewardimg}
          />
        </View>

        <View style={styles.rewardpoints}>
          <View style={styles.rewardpointsbox}>
            <Image
              source={require('../assets/goldencoin.png')}
              style={styles.coin}
            />

            <ThemedText variant="title" style={styles.cointext}>
              234
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.cointext2} variant="body">
              Total Points Tier 1/5
            </ThemedText>
          </View>
        </View>

        <View>
          <Image
            source={require('../assets/rewardimg.png')}
            style={styles.rewardimg2}
          />
        </View>
      </View>

      <View style={styles.container2}>
        <View style={styles.progressbox}>
          <View>
            <ThemedText style={styles.progresstext1} variant="title">
              You've Earned 234 Points
            </ThemedText>
            <ThemedText style={styles.progresstext1} variant="body">
              30 Points to next tier
            </ThemedText>
          </View>

          <View style={styles.progressbar}>
            <View style={styles.progressbar2}></View>
          </View>
        </View>

        {/* TOGGLE SECTION */}
        <View style={styles.activitybox}>
          {/* Recent Activity */}
          <Pressable
            style={[
              styles.activitybox2,
              activeTab === 'activity' && styles.activeLeft,
            ]}
            onPress={() => setActiveTab('activity')}
          >
            <ThemedText
              variant="body"
              style={activeTab === 'activity' && styles.activeText}
            >
              Recent activity
            </ThemedText>
          </Pressable>

          {/* Progress Tier */}
          <Pressable
            style={[
              styles.activitybox3,
              activeTab === 'tier' && styles.activeRight,
            ]}
            onPress={() => setActiveTab('tier')}
          >
            <Text style={[activeTab === 'tier' && styles.activeText]}>
              Progress Tier
            </Text>
          </Pressable>
        </View>

        {/* CONDITIONAL CONTENT */}
        {activeTab === 'activity' ? (
          <ScrollView
            style={styles.recentscroll}
            showsVerticalScrollIndicator={false}
          >
            {recentActivities.map(item => (
              <View key={item.id} style={styles.recentsbox}>
                <View style={styles.recentsbox1}>
                  <ThemedText variant="title">{item.title}</ThemedText>
                  <ThemedText variant="body">{item.time}</ThemedText>
                </View>

                <View style={styles.recentsbox2}>
                  <ThemedText style={styles.recentsbox2text}>
                    {item.points}
                  </ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View>
            <Text>Progress Tier Content Here</Text>
          </View>
        )}
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  recentscroll: {
    marginTop: 20,

    height: '45%',
  },
  container1: {
    flex: 0,
    paddingHorizontal: 20,
    height: 'auto',
  },
  container2: {
    flex: 0,
    paddingHorizontal: 20,
  },

  rewardheroImg: {
    height: 135,

    marginTop: 15,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },

  rewardimg: {
    height: 200,
    width: 150,
    position: 'absolute',
    left: -25,
    top: -70,
  },
  rewardimg2: {
    height: 200,
    width: 150,
    position: 'absolute',
    right: 0,
    top: -70,
  },

  rewardpoints: {
    height: 70,
    width: 82,
  },

  rewardpointsbox: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  coin: {
    height: 22,
    width: 22,
    marginRight: 7,
  },
  cointext: {
    fontSize: 29,
    fontWeight: 'bold',
  },

  cointext2: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 5,
  },
  progressbox: {
    height: 73,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    borderColor: '#E2E8F9',
  },

  progresstext1: {
    fontSize: 10,
  },

  progressbar: {
    height: 8,
    width: '70%',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
  },
  progressbar2: {
    height: 6,
    width: '20%',
    borderRadius: 5,
    borderWidth: 1,

    backgroundColor: '#2C247A',
  },

  activitybox: {
    height: 41,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 6,
    flex: 0,
    flexDirection: 'row',
    borderColor: '#E2E8F9',
  },

  activitybox2: {
    height: '100%',
    width: '50%',
    borderWidth: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: '#E2E8F9',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activitybox3: {
    height: '100%',
    width: '50%',
    borderWidth: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: '#E2E8F9',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeLeft: {
    backgroundColor: '#2C247A',
  },

  activeRight: {
    backgroundColor: '#2C247A',
  },

  activeText: {
    color: '#FFF',
  },

  recentsbox: {
    height: 66,
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#E2E8F9',
    paddingBottom: 40,
  },

  recentsbox1: {
    width: '70%',
    height: 56,

    paddingVertical: 5,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  recentsbox2: {
    width: '30%',
    height: 56,

    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  recentsbox2text: {
    color: '#37BC12',
  },
});
