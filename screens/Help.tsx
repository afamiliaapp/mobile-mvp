import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import SupportBar from '../components/SupportBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Help() {
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

        <View style={styles.chatintrobox}>
          {/**SEND MEDDAGE BOX2 */}
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

            <View style={styles.sendbutton}>
              <ThemedText style={styles.sendbuttontxt}>
                Send us a message
              </ThemedText>
            </View>
          </View>

          {/**BOX2 */}

          <View style={styles.chatintrobo2}>
            <ThemedText variant="title" style={styles.chatintrobox1text}>
              Our reply time
            </ThemedText>

            <View style={styles.clockbox}>
              <Image source={require('../assets/greenclock.png')} />

              <ThemedText style={styles.clocktext}>Under 5 minutes</ThemedText>
            </View>
          </View>
        </View>
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
    marginTop: 60,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  titletext: {
    fontSize: 16,
    fontWeight: 500,
  },

  text: {
    fontSize: 12,
    fontWeight: 400,
  },

  chatintrobox: {
    height: 138,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E2E8F0',
    marginTop: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  chatintrobox1: {
    width: '48%',
    height: 116,

    flex: 0,
    justifyContent: 'space-between',
  },

  chatintrobox1text: {
    fontSize: 11,
    fontWeight: 400,
  },

  chatimagebox1: {
    width: '80%',

    height: 41,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatimage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: -17,

    borderColor: '',
  },
  chatimage1: {
    height: 40,
    width: 40,
    borderRadius: 100,

    borderWidth: 0,
  },

  sendbutton: {
    flex: 0,
    flexDirection: 'column',
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
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  clocktext: {
    marginLeft: 4,
  },

  chatintrobo2: {
    width: '48%',
    height: 116,

    flex: 0,
  },
});
