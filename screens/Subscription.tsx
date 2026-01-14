import { StyleSheet, Text, View } from 'react-native';
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

          <View style={styles.activeplabox}></View>
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
  },
});
