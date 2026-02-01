import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import SubscriptionPlanBar from '../components/SubscriptionPlanBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Subscription() {
  const [billingType, setBillingType] = useState('monthly'); // 'monthly' | 'yearly'
  const [selectedPlan, setSelectedPlan] = useState('free');
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
              <Text style={styles.activeplantxt}>
                Next billing: October 26, 2025
              </Text>
              <Text style={styles.activeplantxt}>
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

          <View style={styles.plansbox}>
            <View style={styles.monthplan}>
              <Pressable
                style={[
                  styles.monthbox,
                  billingType === 'monthly' && styles.activeBilling,
                ]}
                onPress={() => setBillingType('monthly')}
              >
                <Text
                  style={[
                    styles.monthtxt,
                    billingType === 'monthly' && styles.activeBillingText,
                  ]}
                >
                  Monthly
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.yearlybox,
                  billingType === 'yearly' && styles.activeBilling,
                ]}
                onPress={() => setBillingType('yearly')}
              >
                <Text
                  style={[
                    styles.monthtxt,
                    billingType === 'yearly' && styles.activeBillingText,
                  ]}
                >
                  Yearly
                </Text>
              </Pressable>
            </View>

            <View style={styles.availableplanbox}>
              <Text>Available Plan</Text>
            </View>

            <Pressable
              style={[
                styles.plantypebox,
                selectedPlan === 'free' && styles.activePlanBorder,
              ]}
              onPress={() => setSelectedPlan('free')}
            >
              <View style={styles.plantypebox2}>
                <View style={styles.plantypebox3}>
                  {billingType === 'monthly' ? (
                    <>
                      <ThemedText style={styles.plantxt}>
                        Free (Monthly)
                      </ThemedText>
                      <ThemedText style={styles.plantxt}>
                        Chores & Points
                      </ThemedText>
                      <ThemedText style={styles.plantxt}>
                        Memories (50 uploads / month)
                      </ThemedText>
                      <ThemedText style={styles.freeplantxt}>
                        Free Forever
                      </ThemedText>
                    </>
                  ) : (
                    <>
                      <ThemedText style={styles.plantxt}>
                        Premium (Yearly)
                      </ThemedText>
                      <ThemedText style={styles.plantxt}>
                        Unlimited uploads
                      </ThemedText>
                      <ThemedText style={styles.plantxt}>
                        Priority support
                      </ThemedText>
                      <ThemedText style={styles.freeplantxt}>
                        ₦25,000 / year
                      </ThemedText>
                    </>
                  )}
                </View>

                {/* Radio selector */}
                <View style={styles.radialOuter}>
                  {selectedPlan === 'free' && (
                    <View style={styles.radialInner} />
                  )}
                </View>
              </View>

              {selectedPlan === 'free' && (
                <View style={styles.subscribeBox}>
                  <ThemedText variant="body">
                    {billingType === 'monthly'
                      ? 'Current Monthly Plan'
                      : 'Current Yearly Plan'}
                  </ThemedText>
                </View>
              )}
            </Pressable>
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

  activeplantxt: {
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
    fontSize: 14,
  },

  circleimg: {},

  circlebox: {
    flex: 0,
    position: 'absolute',
    top: 18,
    left: '56%',
  },

  plansbox: {
    height: '70%',

    marginTop: 20,
  },
  monthplan: {
    height: 40,
    flex: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
  },
  monthbox: {
    height: 41,
    width: '50%',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E2E8F9',
  },
  yearlybox: {
    height: 41,
    width: '50%',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E2E8F9',
  },
  monthtxt: {
    fontSize: 14,

    fontWeight: 100,
  },
  availableplanbox: {
    height: 26,
    marginVertical: 25,
  },

  plantypebox: {
    height: 238,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    paddingHorizontal: 17,
    flex: 0,
    flexDirection: 'column',
  },
  plantypebox2: {
    height: 140,

    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  plantypebox3: {
    height: 140,
    width: '70%',
  },
  plantxt: {
    fontSize: 14,
    marginBottom: 5,
  },
  freeplantxt: {
    fontSize: 14,
    marginTop: 30,
  },
  radialInput: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderColor: '#D0D5DD',

    borderWidth: 1.5,
  },
  subscribeBox: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#E2E8F9',
  },
  radialOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF', // Change to your primary color
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radialInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF', // The "dot" when selected
  },
  activePlanBorder: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  activeBilling: {
    backgroundColor: '#2C247A',
  },

  activeBillingText: {
    color: '#fff',
    fontWeight: '600',
  },
});
