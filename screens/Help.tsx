import AppContainer from '../components/AppContainer';
import SupportBar from '../components/SupportBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';
import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Help() {
  const navigation = useNavigation();

  const handleSendMessage = () => {
    navigation.navigate('SupportChat');
  };
  const [activeTicket, setActiveTicket] = useState('all');

  // ✅ Dummy Ticket Data
  const tickets = [
    {
      id: 1,
      title: 'Payment not successful',
      time: '2 hours ago',
      date: '29 feb 2025',
      status: 'Resolved',
    },
    {
      id: 2,
      title: 'Unable to login',
      time: '2 hours ago',
      date: '29 feb 2025',
      status: 'closed',
    },
    {
      id: 3,
      title: 'App crashing',
      time: '2 hours ago',
      date: '29 feb 2025',
      status: 'open',
    },
    {
      id: 4,
      title: 'Refund request',
      time: '2 hours ago',
      date: '29 feb 2025',
      status: 'Resolved',
    },
  ];

  // ✅ Filter Logic
  const filteredTickets =
    activeTicket === 'all'
      ? tickets
      : tickets.filter(ticket => ticket.status === activeTicket);

  return (
    <AppContainer>
      <View style={styles.conatiner}>
        <SupportBar />
        <BackButton />

        <View style={styles.conatiner2}>
          <ThemedText style={styles.titletext} variant="title">
            Hi Victor!
          </ThemedText>
          <ThemedText style={styles.text} variant="body">
            Ask us anything or share your Review with us!
          </ThemedText>
        </View>

        {/* Chat Intro Box */}
        <View style={styles.chatintrobox}>
          <View style={styles.chatintrobox1}>
            <ThemedText variant="title" style={styles.chatintrobox1text}>
              Start a conversation
            </ThemedText>

            <View style={styles.chatimagebox1}>
              <Image
                style={styles.chatimage1}
                source={require('../assets/chatimg1.png')}
              />
              <Image
                style={styles.chatimage}
                source={require('../assets/chatimg2.png')}
              />
              <Image
                style={styles.chatimage}
                source={require('../assets/chatimg3.png')}
              />
              <Image
                style={styles.chatimage}
                source={require('../assets/chatimg4.png')}
              />
              <Image
                style={styles.chatimage}
                source={require('../assets/chatimg5.png')}
              />
            </View>

            <Pressable onPress={handleSendMessage} style={styles.sendbutton}>
              <ThemedText style={styles.sendbuttontxt}>
                Send us a message
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.chatintrobo2}>
            <ThemedText variant="title" style={styles.chatintrobox1text}>
              Our reply time
            </ThemedText>

            <View style={styles.clockbox}>
              <Image source={require('../assets/greenclock.png')} />
              <ThemedText variant="body" style={styles.clocktext}>
                Under 5 minutes
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Ticket Toggle */}
        <View style={styles.ticketbox}>
          <Pressable
            style={[
              styles.ticketbox1,
              activeTicket === 'all' && styles.activeTab,
            ]}
            onPress={() => setActiveTicket('all')}
          >
            <ThemedText style={activeTicket === 'all' && styles.activeText}>
              All Ticket
            </ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.ticketbox1,
              activeTicket === 'open' && styles.activeTab,
            ]}
            onPress={() => setActiveTicket('open')}
          >
            <ThemedText style={activeTicket === 'open' && styles.activeText}>
              Open Ticket
            </ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.ticketbox1,
              activeTicket === 'closed' && styles.activeTab,
            ]}
            onPress={() => setActiveTicket('closed')}
          >
            <ThemedText style={activeTicket === 'closed' && styles.activeText}>
              Closed Ticket
            </ThemedText>
          </Pressable>
        </View>

        {/* Ticket Content */}
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredTickets.length === 0 ? (
            <ThemedText>No tickets found.</ThemedText>
          ) : (
            filteredTickets.map(ticket => (
              <View key={ticket.id} style={styles.ticketCard}>
                <View style={styles.tickettimebox}>
                  <ThemedText variant="title">{ticket.title}</ThemedText>

                  <View style={styles.tickettimebox2}>
                    <ThemedText style={{ marginTop: 4, marginHorizontal: 4 }}>
                      {ticket.time}
                    </ThemedText>

                    <View style={styles.timebar}></View>

                    <ThemedText style={{ marginTop: 4, marginHorizontal: 4 }}>
                      {ticket.date}
                    </ThemedText>

                    <View style={styles.timebar}></View>

                    <ThemedText style={{ marginTop: 4, marginHorizontal: 4 }}>
                      {ticket.status}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.tickettimebox3}>
                  <View style={styles.ticketviewbox}>
                    <ThemedText style={styles.ticketviewtext}>View</ThemedText>
                    <View>
                      <Icon name="chevron-right" size={12} color="#999999" />
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    paddingHorizontal: 20,
  },

  conatiner2: {
    height: 51,
    marginTop: 40,
    justifyContent: 'space-between',
  },

  titletext: {
    fontSize: 16,
    fontWeight: '500',
  },

  text: {
    fontSize: 12,
    fontWeight: '400',
  },

  chatintrobox: {
    height: 138,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E2E8F0',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  chatintrobox1: {
    width: '48%',
    height: 116,
    justifyContent: 'space-between',
  },

  chatintrobox1text: {
    fontSize: 11,
    fontWeight: '400',
  },

  chatimagebox1: {
    width: '80%',
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatimage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: -17,
  },

  chatimage1: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },

  sendbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    backgroundColor: '#2B2B8A',
    borderRadius: 10,
  },

  sendbuttontxt: {
    color: '#fff',
    fontSize: 12,
  },

  clockbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  clocktext: {
    marginLeft: 4,
  },

  chatintrobo2: {
    width: '48%',
    height: 116,
  },

  ticketbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
    marginTop: 30,
    borderWidth: 1,
  },

  ticketbox1: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },

  activeTab: {
    backgroundColor: '#2B2B8A',
  },

  activeText: {
    color: '#fff',
  },

  ticketCard: {
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingBottom: 10,
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },

  tickettimebox2: {
    alignItems: 'center',

    flex: 0,
    flexDirection: 'row',
  },

  tickettimebox: {
    width: '75%',
    height: 56,
    justifyContent: 'space-between',
  },

  tickettimebox3: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timebar: {
    height: 14,
    width: 2,
    backgroundColor: '#000000',
  },

  ticketviewbox: {
    height: 22,
    width: 58,
    borderRadius: 6,
    flex: 0,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F9',
  },

  ticketviewtext: {
    fontSize: 10,
  },

  scroll: {
    height: '42%',

    marginTop: 25,
    paddingTop: 10,
  },
});
