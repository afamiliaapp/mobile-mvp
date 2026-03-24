import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import ChatBar from '../components/ChatBar';
import ThemedText from '../components/ThemedText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../components/Search';

const messages = [
  {
    name: 'Milinndra',
    text: 'Why would you go to tropical...',
    time: '2 hours ago',
    unread: true,
    group: false,
  },
  {
    name: 'Family Group',
    text: 'Meeting at 5pm',
    time: '1 hour ago',
    unread: false,
    group: true,
  },
];

export default function Chat() {
  const [activeTab, setActiveTab] = useState('all');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'unread') return msg.unread;
    if (activeTab === 'group') return msg.group;
    return true;
  });

  const closeModal = () => {
    setChatModalVisible(false);
    setSelectedMember('');
  };

  return (
    <>
      <AppContainer>
        <View style={styles.container}>
          <ChatBar />

          {/* MESSAGE TOGGLE */}
          <View style={styles.messagetogglebox}>
            <Pressable
              style={[
                styles.messagetogglebox2,
                activeTab === 'all' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('all')}
            >
              <ThemedText>All</ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.messagetogglebox2,
                activeTab === 'unread' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('unread')}
            >
              <ThemedText>Unread(20)</ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.messagetogglebox2,
                activeTab === 'group' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('group')}
            >
              <ThemedText>Group(20)</ThemedText>
            </Pressable>
          </View>

          {/* SEARCH */}
          <Search />

          {/* MESSAGES */}
          {chatStarted && (
            <View style={styles.messagescontainer}>
              {filteredMessages.map((event, index) => (
                <View key={index} style={styles.messagesbox}>
                  <View style={styles.messagesbox2}>
                    <View style={styles.avatarWrapper}>
                      <Image
                        source={require('../assets/avata.png')}
                        style={styles.avatar}
                      />
                    </View>

                    <View style={styles.messagesbox3}>
                      <ThemedText variant="title" style={styles.titletext}>
                        {event.name}
                      </ThemedText>

                      <ThemedText style={styles.titletext2}>
                        {event.text}
                      </ThemedText>
                    </View>
                  </View>

                  <View style={styles.messagesbox4}>
                    <ThemedText style={styles.titletext2}>
                      {event.time}
                    </ThemedText>

                    {event.unread && (
                      <View style={styles.messagesbox5}>
                        <ThemedText style={styles.messagescounter}>
                          1
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* START CHAT */}
          {!chatStarted && (
            <View style={styles.nomessageBox}>
              <ThemedText variant="title" style={{ fontSize: 16 }}>
                Start Chat
              </ThemedText>

              <ThemedText style={{ textAlign: 'center', marginVertical: 10 }}>
                Feel free to start a conversation with your family member
              </ThemedText>

              <Pressable
                style={styles.startnewchat}
                onPress={() => setChatModalVisible(true)}
              >
                <Icon name="plus" size={10} color="#fff" />
                <ThemedText style={styles.titletext3}>
                  Start new chat
                </ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      </AppContainer>

      {/* MODAL */}
      <Modal
        visible={chatModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        {/* OUTSIDE CLICK */}
        <Pressable style={styles.overlay} onPress={closeModal}>
          {/* INSIDE MODAL (PREVENT CLOSE) */}
          <Pressable
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            <ThemedText style={styles.modalTitle}>New Chat</ThemedText>

            <ThemedText style={styles.label}>Member</ThemedText>

            <View style={styles.selector}>
              <Text>{selectedMember || 'Select member'}</Text>
            </View>

            {['John', 'Sarah', 'David'].map((member, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedMember(member)}
                style={styles.memberItem}
              >
                <Text>{member}</Text>
              </Pressable>
            ))}

            {/* CHAT BUTTON */}
            <Pressable
              style={styles.chatButton}
              onPress={() => {
                if (!selectedMember) return;
                setChatStarted(true);
                closeModal();
              }}
            >
              <Text style={{ color: '#fff' }}>Chat</Text>
            </Pressable>

            {/* CANCEL BUTTON */}
            <Pressable style={styles.cancelButton} onPress={closeModal}>
              <Text style={{ color: '#333' }}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    height: '100%',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '55%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    marginBottom: 5,
  },

  selector: {
    borderWidth: 1,
    borderColor: '#2C247A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  memberItem: {
    paddingVertical: 10,
  },

  chatButton: {
    backgroundColor: '#2C247A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  cancelButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  avatarWrapper: {
    borderWidth: 0.5,
    borderRadius: 50,
    backgroundColor: '#FFE7CC',
  },

  avatar: {
    width: 39,
    height: 39,
    borderRadius: 50,
  },

  messagetogglebox: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: '10%',
    borderRadius: 5,
  },

  messagetogglebox2: {
    paddingVertical: 15,
    alignItems: 'center',
    width: 117,
  },

  activeTab: {
    backgroundColor: '#2C247A',
  },

  messagescontainer: {},

  messagesbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginTop: 20,
  },

  messagesbox2: {
    flexDirection: 'row',
    width: '70%',
  },

  messagesbox3: {
    marginLeft: 15,
  },

  messagesbox4: {
    alignItems: 'flex-end',
  },

  messagesbox5: {
    backgroundColor: '#2C247A',
    height: 19,
    width: 19,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  messagescounter: {
    fontSize: 9,
    color: '#fff',
  },

  titletext: {
    fontSize: 14,
  },

  titletext2: {
    fontSize: 12,
  },

  nomessageBox: {
    alignItems: 'center',
    marginTop: '30%',
    paddingHorizontal: 50,
  },

  startnewchat: {
    backgroundColor: '#2C247A',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  titletext3: {
    color: 'white',
    fontSize: 12,
  },
});
