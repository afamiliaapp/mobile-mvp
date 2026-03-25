'use client';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ThemedText from './ThemedText'; // Adjust path if needed

export default function ChatRoom({ member, onBack }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === 'me' ? styles.myBubble : styles.theirBubble,
      ]}
    >
      <Text style={{ color: item.sender === 'me' ? '#fff' : '#333' }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Icon name="chevron-left" size={28} color="#2C247A" />
        </Pressable>

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/avata.png')}
            style={styles.largeAvatar}
          />
          <ThemedText style={styles.userName}>{member?.name}</ThemedText>
          <ThemedText style={styles.lastSeen}>
            last seen 45 minutes ago
          </ThemedText>
          <ThemedText style={styles.dateText}>8/20/2024</ThemedText>
        </View>

        <View style={styles.actionIcons}>
          <Icon
            name="video"
            size={20}
            color="#666"
            style={{ marginRight: 25 }}
          />
          <Icon name="phone" size={20} color="#666" />
        </View>
      </View>

      {/* CHAT AREA */}
      <View style={{ flex: 1 }}>
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.startConversationText}>
              Start a conversation...
            </Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 20 }}
          />
        )}
      </View>

      {/* INPUT BAR */}
      <View style={styles.footer}>
        <View style={styles.inputWrapper}>
          <Icon name="smile" size={24} color="#2C247A" />
          <TextInput
            style={styles.textInput}
            placeholder="Reply ..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <Icon
            name="image"
            size={24}
            color="#999"
            style={{ marginRight: 15 }}
          />
          <Pressable onPress={sendMessage}>
            <Icon name="send" size={24} color="#2C247A" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingVertical: 20 },
  backButton: { position: 'absolute', left: 10, top: 20 },
  profileContainer: { alignItems: 'center' },
  largeAvatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 8 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  lastSeen: { fontSize: 12, color: '#999' },
  dateText: { fontSize: 11, color: '#ccc', marginTop: 2 },
  actionIcons: { flexDirection: 'row', marginTop: 15 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  startConversationText: { color: '#ccc' },
  bubble: { padding: 12, borderRadius: 18, marginBottom: 10, maxWidth: '80%' },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2C247A',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 2,
  },
  footer: { padding: 20, borderTopWidth: 0.5, borderColor: '#eee' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  textInput: { flex: 1, paddingHorizontal: 12, height: 40 },
});
