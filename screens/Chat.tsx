'use client';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import ChatBar from '../components/ChatBar';
import ThemedText from '../components/ThemedText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../components/Search';
import ChatRoom from '../components/ChatRoom';
import NewGroup from '../components/NewGroup'; // Ensure this file exists with the code from the previous step

const { height } = Dimensions.get('window');

export default function Chat() {
  const [activeTab, setActiveTab] = useState('all');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedMember, setSelectedMember] = useState('');

  // Initial Mock Data
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      name: 'Tayo White',
      text: 'See you at the reunion!',
      time: '10:24 AM',
      unread: true,
      group: false,
    },
    {
      id: '2',
      name: 'Family Group',
      text: 'Fred: I am bringing the drinks',
      time: '9:15 AM',
      unread: false,
      group: true,
    },
  ]);

  // Filter logic for tabs
  const filteredMessages = chatMessages.filter(msg => {
    if (activeTab === 'unread') return msg.unread;
    if (activeTab === 'group') return msg.group;
    return true;
  });

  // Handle creating a simple 1-on-1 chat
  const startNewChat = () => {
    if (!selectedMember) return;
    const newMessage = {
      id: Date.now().toString(),
      name: selectedMember,
      text: `Started a chat with ${selectedMember}`,
      time: 'Just now',
      unread: false,
      group: false,
    };
    setChatMessages(prev => [newMessage, ...prev]);
    setActiveChat(newMessage);
    setChatModalVisible(false);
    setSelectedMember('');
  };

  // Handle creating a new group from NewGroup.js
  const handleCreateGroup = groupData => {
    const newGroupEntry = {
      ...groupData,
      id: Date.now().toString(),
    };
    setChatMessages(prev => [newGroupEntry, ...prev]);
    setChatModalVisible(false);
    setActiveChat(newGroupEntry);
  };

  return (
    <>
      <AppContainer>
        <View style={styles.container}>
          <ChatBar />

          {/* TAB TOGGLE */}
          <View style={styles.messagetogglebox}>
            {['all', 'unread', 'group'].map(tab => (
              <Pressable
                key={tab}
                style={[
                  styles.messagetogglebox2,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <ThemedText style={activeTab === tab && { color: '#fff' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'unread' &&
                    ` (${chatMessages.filter(m => m.unread).length})`}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <Search />

          {/* LIST AREA */}
          <ScrollView
            style={styles.messagescontainer}
            showsVerticalScrollIndicator={false}
          >
            {filteredMessages.length > 0 ? (
              filteredMessages.map((chat, index) => (
                <Pressable
                  key={chat.id || index}
                  onPress={() => setActiveChat(chat)}
                >
                  <View style={styles.messagesbox}>
                    <View style={styles.messagesbox2}>
                      <View style={styles.avatarWrapper}>
                        <Image
                          source={require('../assets/avata.png')}
                          style={styles.avatar}
                        />
                      </View>
                      <View style={styles.messagesbox3}>
                        <ThemedText variant="title" style={styles.titletext}>
                          {chat.name}
                        </ThemedText>
                        <ThemedText numberOfLines={1} style={styles.titletext2}>
                          {chat.text}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.messagesbox4}>
                      <ThemedText style={styles.titletext2}>
                        {chat.time}
                      </ThemedText>
                      {chat.unread && (
                        <View style={styles.messagesbox5}>
                          <ThemedText style={styles.messagescounter}>
                            1
                          </ThemedText>
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              /* EMPTY STATE */
              <View style={styles.nomessageBox}>
                <Icon
                  name={activeTab === 'group' ? 'users' : 'comments-o'}
                  size={50}
                  color="#eee"
                />
                <ThemedText
                  variant="title"
                  style={{ fontSize: 16, marginTop: 10 }}
                >
                  {activeTab === 'group' ? 'No Groups Found' : 'No Messages'}
                </ThemedText>
                <Pressable
                  style={styles.startnewchat}
                  onPress={() => setChatModalVisible(true)}
                >
                  <Icon name="plus" size={10} color="#fff" />
                  <ThemedText style={styles.titletext3}>
                    {activeTab === 'group'
                      ? 'Add a new group'
                      : 'Start new chat'}
                  </ThemedText>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </AppContainer>

      {/* NEW CHAT / NEW GROUP MODAL */}
      <Modal visible={chatModalVisible} animationType="slide" transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setChatModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            {activeTab === 'group' ? (
              <NewGroup
                onCreate={handleCreateGroup}
                onCancel={() => setChatModalVisible(false)}
              />
            ) : (
              <View>
                <ThemedText style={styles.modalTitle}>
                  New Individual Chat
                </ThemedText>
                {['John', 'Sarah', 'David'].map(m => (
                  <Pressable
                    key={m}
                    onPress={() => setSelectedMember(m)}
                    style={[
                      styles.memberItem,
                      selectedMember === m && { backgroundColor: '#F0EEFF' },
                    ]}
                  >
                    <Text>{m}</Text>
                  </Pressable>
                ))}
                <Pressable style={styles.chatButton} onPress={startNewChat}>
                  <Text style={{ color: '#fff' }}>Chat Now</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* CHAT ROOM MODAL (FULLSCREEN) */}
      <Modal visible={activeChat !== null} animationType="slide">
        {activeChat && (
          <ChatRoom member={activeChat} onBack={() => setActiveChat(null)} />
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  messagetogglebox: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: '5%',
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ddd',
  },
  messagetogglebox2: { paddingVertical: 12, alignItems: 'center', flex: 1 },
  activeTab: { backgroundColor: '#2C247A' },
  messagescontainer: { flex: 1, marginTop: 10 },
  messagesbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    paddingBottom: 12,
    marginTop: 15,
  },
  messagesbox2: { flexDirection: 'row', flex: 1 },
  messagesbox3: { marginLeft: 12, justifyContent: 'center', flex: 1 },
  messagesbox4: { alignItems: 'flex-end', justifyContent: 'center' },
  messagesbox5: {
    backgroundColor: '#2C247A',
    height: 18,
    width: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  titletext: { fontSize: 15, fontWeight: '600' },
  titletext2: { fontSize: 13, color: '#777', marginTop: 2 },
  messagescounter: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  nomessageBox: {
    alignItems: 'center',
    marginTop: '40%',
    paddingHorizontal: 40,
  },
  startnewchat: {
    backgroundColor: '#2C247A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  titletext3: { color: 'white', fontSize: 14, fontWeight: '500' },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  memberItem: { padding: 15, borderRadius: 10, marginBottom: 5 },
  chatButton: {
    backgroundColor: '#2C247A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
