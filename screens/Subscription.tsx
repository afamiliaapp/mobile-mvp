import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import SubscriptionPlanBar from '../components/SubscriptionPlanBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';
import { PaystackWebView } from 'react-native-paystack-webview';

export default function Subscription() {
  const [billingType, setBillingType] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('free');

  // ✅ Paystack states
  const [showPaystack, setShowPaystack] = useState(false);
  const [amount, setAmount] = useState(0);

  const plans = {
    monthly: [
      {
        id: 'free',
        title: 'Free (Monthly)',
        features: ['Chores & Points', 'Memories (50 uploads / month)'],
        price: 'Free Forever',
      },
      {
        id: 'paid',
        title: 'Premium (Pro)',
        features: [
          'Unlimited Memories Storage',
          'Unlimited Groups',
          'Advanced Rewards & Badges',
          'Priority Support',
          'AI-powered Insights (coming soon)',
        ],
        price: '₦2,500 / month',
      },
    ],
    yearly: [
      {
        id: 'paid',
        title: 'Premium (Yearly)',
        features: ['Unlimited uploads', 'Priority support'],
        price: '₦25,000 / year',
      },
    ],
  };

  // ✅ Handle Subscribe
  const handleSubscribe = plan => {
    if (plan.price === 'Free Forever') return;

    const priceMap = {
      '₦2,500 / month': 250000, // Paystack uses kobo
      '₦25,000 / year': 2500000,
    };

    setAmount(priceMap[plan.price]);
    setShowPaystack(true);
  };

  return (
    <AppContainer>
      <View style={styles.container}>
        <SubscriptionPlanBar />
        <BackButton />

        <View style={styles.cardbox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Current Plan */}
            <ThemedText variant="title" style={styles.sectionTitle}>
              Current Plan
            </ThemedText>

            <View style={styles.activePlanBox}>
              <View style={styles.activePlanBox2}>
                <Text style={styles.activePlanText}>
                  Next billing: October 26, 2025
                </Text>
                <Text style={styles.activePlanText}>
                  Enjoy unlimited family features and priority support.
                </Text>
              </View>

              <View style={styles.activeBadge}>
                <Text style={{ fontSize: 14 }}>Active</Text>
              </View>

              <Image
                style={styles.circleImg}
                source={require('../assets/Circle 5.png')}
              />
            </View>

            {/* Billing Toggle */}
            <View style={styles.billingSwitch}>
              {['monthly', 'yearly'].map(type => (
                <Pressable
                  key={type}
                  style={[
                    styles.billingButton,
                    billingType === type && styles.activeBilling,
                  ]}
                  onPress={() => {
                    setBillingType(type);
                    setSelectedPlan(plans[type][0].id);
                  }}
                >
                  <Text
                    style={[
                      styles.billingText,
                      billingType === type && styles.activeBillingText,
                    ]}
                  >
                    {type === 'monthly' ? 'Monthly' : 'Yearly'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <ThemedText style={styles.availableText}>
              Available Plans
            </ThemedText>

            {/* Plans */}
            {plans[billingType].map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                onSubscribe={() => handleSubscribe(plan)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* ✅ PAYSTACK MODAL */}
      {showPaystack && (
        <PaystackWebView
          paystackKey="pk_live_xxxxxxxxxxxxxxxxxxxxx"
          amount={amount}
          billingEmail="user@email.com"
          activityIndicatorColor="green"
          onCancel={() => {
            setShowPaystack(false);
            console.log('Payment Cancelled');
          }}
          onSuccess={res => {
            setShowPaystack(false);
            console.log('Payment Success:', res);
          }}
          autoStart={true}
        />
      )}
    </AppContainer>
  );
}

const PlanCard = ({ plan, selected, onSelect, onSubscribe }) => {
  return (
    <Pressable
      style={[styles.planCard, selected && styles.activePlanBorder]}
      onPress={onSelect}
    >
      <View style={styles.planHeader}>
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.planTitle}>{plan.title}</ThemedText>

          {plan.features.map((feature, index) => (
            <ThemedText key={index} style={styles.planFeature}>
              {feature}
            </ThemedText>
          ))}

          <ThemedText style={styles.priceText}>{plan.price}</ThemedText>
        </View>

        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>

      {selected && (
        <Pressable
          style={styles.subscribeBox}
          onPress={() => {
            if (plan.price !== 'Free Forever') {
              onSubscribe();
            }
          }}
        >
          <ThemedText>
            {plan.price === 'Free Forever' ? 'Current Plan' : 'Subscribe'}
          </ThemedText>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 20,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 25,
  },
  activePlanBox: {
    backgroundColor: '#2C247A',
    borderRadius: 10,
    marginTop: 20,
    padding: 16,
    position: 'relative',
    flexDirection: 'row',
    height: 118,
    justifyContent: 'space-between',
  },
  activePlanBox2: {
    width: '70%',
  },
  activePlanText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 20,
  },
  activeBadge: {
    backgroundColor: '#F2F8F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  circleImg: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  billingSwitch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    marginTop: 30,
    overflow: 'hidden',
  },
  billingButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  billingText: {
    fontSize: 14,
  },
  activeBilling: {
    backgroundColor: '#2C247A',
  },
  activeBillingText: {
    color: '#fff',
    fontWeight: '600',
  },
  availableText: {
    marginVertical: 20,
  },
  planCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  planFeature: {
    fontSize: 13,
    marginBottom: 4,
  },
  priceText: {
    marginTop: 10,
    fontWeight: '600',
  },
  subscribeBox: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  activePlanBorder: {
    borderColor: '#007AFF',
  },
  cardbox: {
    height: '90%',
  },
});
