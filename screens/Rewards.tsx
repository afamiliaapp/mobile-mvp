import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import RewardsBar from '../components/RewardsBar';
import AppContainer from '../components/AppContainer';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

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
            <Text
              style={[
                styles.tiertext,
                activeTab === 'tier' && styles.activeText,
              ]}
            >
              Progress Tier
            </Text>
          </Pressable>
        </View>

        {/* CONDITIONAL CONTENT */}
        {activeTab === 'activity' ? (
          <View style={{ marginTop: 20 }}>
            <Text>Recent Activity Content Here</Text>
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <Text>Progress Tier Content Here</Text>
          </View>
        )}
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    paddingHorizontal: 20,
    height: 'auto',
  },
  container2: {
    flex: 0,
    paddingHorizontal: 20,
    height: '100%',
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
});
