import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import ChatBar from '../components/ChatBar';
import ThemedText from '../components/ThemedText';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../components/Search';

export default function Chat() {
  return (
    <>
      <AppContainer>
        <View style={styles.container}>
          <ChatBar />
          {/**MESSAGE TOGGLE */}
          <View style={styles.messagetogglebox}>
            <View style={styles.messagetogglebox2}>
              <ThemedText>All</ThemedText>
            </View>
            <View style={styles.messagetogglebox2}>
              <ThemedText>All</ThemedText>
            </View>
            <View style={styles.messagetogglebox2}>
              <ThemedText>All</ThemedText>
            </View>
          </View>

          {/**SEARCH CHAT */}

          <Search />

          {/**MESSAGES BOX */}

          <View style={styles.messagescontainer}>
            <View style={styles.messagesbox}>
              <View style={styles.messagesbox2}>
                <Image
                  source={require('../assets/avata.png')}
                  style={{ width: 39, height: 39 }}
                />

                <View style={styles.messagesbox3}>
                  <ThemedText variant="title" style={styles.titletext}>
                    Milinndra
                  </ThemedText>

                  <ThemedText style={styles.titletext2}>
                    Why would you go to tropical...
                  </ThemedText>
                </View>
              </View>

              <View style={styles.messagesbox4}>
                <ThemedText style={styles.titletext2}>2 hours ago</ThemedText>
                <View style={styles.messagesbox5}>
                  <ThemedText style={styles.messagescounter}>1</ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.nomessageBox}>
            <ThemedText variant="title" style={{ fontSize: 16 }}>
              Start Chat
            </ThemedText>

            <ThemedText style={{ textAlign: 'center', marginVertical: 10 }}>
              Feel free to start a conversation with your family member
            </ThemedText>

            <View style={styles.startnewchat}>
              <Icon name="plus" size={10} style={{ color: '#FFF' }} />

              <ThemedText style={styles.titletext3}>Start new chat</ThemedText>
            </View>
          </View>
        </View>
      </AppContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'red',
    height: '100%',
  },

  messagetogglebox: {
    flex: 0,
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: '15%',
  },
  messagetogglebox2: {
    paddingVertical: 20,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 50,
  },
  searchbox: {
    flex: 0,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#E2E8F9',
    height: '20%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  messagescontainer: {
    flex: 0,
    flexDirection: 'column',
  },

  messagesbox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#E2E8F9',
    paddingBottom: 10,
    marginTop: 20,
  },

  messagesbox2: {
    flex: 0,
    flexDirection: 'row',

    width: '70%',
    backgroundColor: 'pink',
  },

  messagesbox3: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  titletext: {
    fontSize: 14,
  },

  titletext2: {
    fontSize: 12,
  },

  messagesbox4: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  messagesbox5: {
    backgroundColor: '#2C247A',
    height: 19,
    width: 19,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  messagescounter: {
    fontSize: 9,
    color: '#fff',
  },

  nomessageBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '30%',
    paddingHorizontal: 50,
  },

  startnewchat: {
    backgroundColor: '#2C247A',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 6,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titletext3: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
});
