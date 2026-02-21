import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import LegalAndCompliance from '../components/LegalAndCompliance';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Legal() {
  const [activeTab, setActiveTab] = useState('terms'); // default tab

  const termsData = [
    {
      id: 1,
      title: 'Using Afamilia',
      points: [
        'Afamilia is designed for family use: parents, children, relatives, and guests.',
        'Parents are always the primary account holders and responsible for managing family spaces.',
        'You agree to use Afamilia only for lawful and family-friendly purposes.',
      ],
    },
    {
      id: 2,
      title: ' Accounts & Roles',
      points: [
        'Parents can create and manage the family space, invite members, and control permissions.',
        'Children accounts are always linked to a parent account.',
        'Relatives & Guests have limited access defined by parents.',
        'You are responsible for keeping your login details secure',
      ],
    },
    {
      id: 3,
      title: ' Content & Data',
      points: [
        'You can upload family photos, stories, chores, events, and messages.',
        'You keep ownership of your content. Afamilia only stores and displays it inside your family space.',
        'Parents control who sees what inside their space (children, relatives, guests).',
      ],
    },
    {
      id: 4,
      title: 'Subscriptions & Payments',
      points: [
        'Afamilia offers both Free and Premium plans',
        'Subscriptions are billed monthly or annually through your chosen payment method.',
        'You can cancel anytime. Premium features remain active until the end of the billing cycle',
        'Refunds are subject to local consumer protection laws.',
      ],
    },
    {
      id: 5,
      title: 'Safety & Child Protection',
      points: [
        'Children’s accounts are designed with privacy by default',
        'We do not allow children under 13 to create independent accounts.',
        'Parents must supervise children’s activity.',
      ],
    },
    {
      id: 6,
      title: ' Privacy & Security',
      points: [
        'We protect your data in line with the NDPR (Nigeria Data Protection Regulation), NDPA (Nigeria Data Protection Act 2023), and global standards like GDPR',
        'Payments are processed securely through approved providers.',
        'We never sell your data.',
        'See our Privacy Policy for full details',
      ],
    },
    {
      id: 7,
      title: 'Termination & Deletion',
      points: [
        'Parents may delete family accounts at any time.',
        'Deletion is permanent and removes all family data (photos, chats, chores, memories).',
        'Afamilia may suspend or terminate accounts if used unlawfully or in breach of these Terms.',
      ],
    },
    {
      id: 8,
      title: 'Limitation of Liability',
      points: [
        'Afamilia is provided “as is',
        'We are not liable for indirect damages (lost photos, missed events, etc.)',
        'We commit to maintaining secure and reliable services but cannot guarantee 100% uptime.',
      ],
    },
    {
      id: 9,
      title: 'Changes to Terms',
      points: [
        'We may update these Terms occasionally.',
        'Parents will be notified in-app and by email.',
        'Continued use after updates means you accept the new Terms.',
      ],
    },
    {
      id: 10,
      title: 'Contact Us',
      points: ['Questions? Reach out at'],
    },
  ];

  const privacyData = [
    {
      id: 1,
      title: 'What We Collect',
      points: [
        'Account info: name, email, phone number.',
        'Family data: roles (Parent, Child, Relative, Guest).',
        'Content: photos, stories, chores, events, chat messages.',
        'Device info: to secure logins and manage access.',
        'Payment details: if you subscribe to Premium.',
      ],
    },
    {
      id: 2,
      title: 'How We Use Your Data',
      points: [
        'To provide family features: calendar, chores, rewards, memories, chat.',
        'To personalize your dashboard (e.g., showing chores first if that’s your priority).',
        'To send notifications and reminders.',
        'To process payments (Premium subscriptions).',
        'To improve the app safely with anonymized analytics.',
      ],
    },
    {
      id: 3,
      title: 'Who Can See Your Data',
      points: [
        'Inside your family space: Parents decide what children, relatives, and guests can access.',
        'Afamilia staff do not view your family content unless you request support.',
        'We do not share your data with advertisers.',
      ],
    },
    {
      id: 4,
      title: 'Children’s Privacy',
      points: [
        'Children’s accounts are protected by default.',
        'No child can sign up without a Parent account.',
        'Parents control visibility of children’s data.',
        'We comply with global child-protection standards (COPPA-style).',
      ],
    },
    {
      id: 5,
      title: 'Data Storage & Security',
      points: [
        'Your data is stored securely in encrypted servers.',
        'Photos and messages are accessible only within your family space.',
        'If you delete your account, your family data is permanently erased.',
      ],
    },
    {
      id: 6,
      title: 'Your Rights',
      points: [
        'Access and download your data.',
        'Correct inaccurate information.',
        'Delete your account and all associated family data.',
        'Opt-out of non-essential notifications or emails.',
      ],
    },
    {
      id: 7,
      title: 'Sharing & Third Parties',
      points: [
        'We never sell your data.',
        'Third parties are only used for secure payments and storage services.',
        'Any third-party provider must meet global data protection standards.',
      ],
    },
    {
      id: 8,
      title: 'Data Retention',
      points: [
        'We keep your data as long as your account is active.',
        'Deleted accounts are erased within 30 days.',
      ],
    },
    {
      id: 9,
      title: 'Updates to This Policy',
      points: [
        'We may update this Privacy Policy from time to time.',
        'Parents will be notified of major changes.',
      ],
    },
    {
      id: 10,
      title: 'Contact Our Data Protection Officer (DPO)',
      points: ['Email: privacy@afamilia.app'],
    },
  ];

  return (
    <AppContainer>
      <View style={styles.container}>
        <LegalAndCompliance />
        <BackButton />

        {/* Toggle */}
        <View style={styles.togglebox}>
          <Pressable
            onPress={() => setActiveTab('terms')}
            style={[
              styles.togglebox1,
              activeTab === 'terms' && styles.activeTab,
            ]}
          >
            <ThemedText
              style={[
                styles.toggleText,
                activeTab === 'terms' && styles.activeText,
              ]}
            >
              Terms & Conditions
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('privacy')}
            style={[
              styles.togglebox2,
              activeTab === 'privacy' && styles.activeTab,
            ]}
          >
            <ThemedText
              style={[
                styles.toggleText,
                activeTab === 'privacy' && styles.activeText,
              ]}
            >
              Privacy Policy
            </ThemedText>
          </Pressable>
        </View>

        {/* Content Switch */}
        <View style={{ marginTop: 20 }}>
          {activeTab === 'terms' ? (
            <ScrollView
              style={styles.textbox1}
              showsVerticalScrollIndicator={false}
            >
              <ThemedText style={styles.termstext}>
                Last Updated: 26th Jan 2025
              </ThemedText>

              <ThemedText style={styles.termstext}>
                Welcome to Afamilia :The Heart of Home. By creating an account
                or using our app, you agree to these Terms. Please read them
                carefully
              </ThemedText>

              {termsData.map(section => (
                <View key={section.id} style={styles.termstextbox2}>
                  <ThemedText>
                    {section.id}. {section.title}
                  </ThemedText>

                  {section.points.map((point, index) => (
                    <ThemedText key={index} style={styles.termstext1}>
                      {'\u2022'} {point}
                    </ThemedText>
                  ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <ScrollView
              style={styles.textbox1}
              showsVerticalScrollIndicator={false}
            >
              <ThemedText style={styles.termstext}>
                Last Updated: 26th Jan 2025
              </ThemedText>

              <ThemedText style={styles.termstext}>
                Your privacy matters to us. Afamilia is built with families
                first, meaning your data stays private and secure.
              </ThemedText>

              {privacyData.map(section => (
                <View key={section.id} style={styles.termstextbox2}>
                  <ThemedText>
                    {section.id}. {section.title}
                  </ThemedText>

                  {section.points.map((point, index) => (
                    <ThemedText key={index} style={styles.termstext1}>
                      {'\u2022'} {point}
                    </ThemedText>
                  ))}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 20,
  },

  togglebox: {
    height: 41,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    marginTop: 20,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  togglebox1: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  togglebox2: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#2C247A',
  },

  textbox1: {
    height: '80%',
  },

  activeText: {
    color: '#fff',
  },

  termstext: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },

  termstextbox2: {
    marginTop: 10,
  },

  termstext1: {
    marginVertical: 3,
    marginLeft: 17,
  },
});
