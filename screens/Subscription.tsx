import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import SubscriptionPlanBar from '../components/SubscriptionPlanBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Subscription() {
  return (
    <AppContainer>
      <View style={styles.container}>
        <SubscriptionPlanBar />
        <BackButton />

        <View style={styles.container2}>
          <ThemedText variant="title" style={styles.cplan}>
            Current Plan
          </ThemedText>

          <View style={styles.activeplabox}>
            <View>
              '
              <Text style={styles.activeplaytxt}>
                Next billing: October 26, 2025
              </Text>
              <Text style={styles.activeplaytxt}>
                Enjoy unlimited family features and priority support.
              </Text>
            </View>

            <View style={styles.activebox}>
              <Text style={styles.activetxt}>Active</Text>
            </View>

            <View style={styles.circlebox}>
              <Image
                style={styles.circleimg}
                source={require('../assets/Circle 5.png')}
              />
            </View>
          </View>
        </View>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },

  container2: {
    height: '85%',

    marginTop: 25,
  },

  cplan: {
    fontSize: 16,
    fontWeight: 500,
  },

  activeplabox: {
    backgroundColor: '#2C247A',
    height: 118,
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
    flex: 0,
    flexDirection: 'row',
    position: 'relative',
  },

  activeplaytxt: {
    color: '#ffff',
    width: 261,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 400,
  },

  activebox: {
    height: 24,
    backgroundColor: '#F2F8F9',
    width: 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  activetxt: {
    color: '#1B1C1E',
    fontSize: 14,
  },

  circleimg: {},

  circlebox: {
    flex: 0,
    position: 'absolute',
    top: 18,
    left: '56%',
  },
});
