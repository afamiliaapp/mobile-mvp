import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RewardsBar from '../components/RewardsBar';
import AppContainer from '../components/AppContainer';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Rewards() {
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
      <View style={styles.container2}></View>
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
});
