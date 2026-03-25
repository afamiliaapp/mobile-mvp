'use client';
import React, { useState, useRef } from 'react';
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
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ThemedText from './ThemedText';

// 1. IMPORT YOUR CALL SCREENS
import CallScreen from './CallScreen';
import VideoCallScreen from './VideoCallScreen';

const { width, height } = Dimensions.get('window');

export default function ChatRoom({ member, onBack }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 2. ADD CALL VISIBILITY STATES
  const [isVoiceCallVisible, setIsVoiceCallVisible] = useState(false);
  const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);

  const flatListRef = useRef(null);

  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const saveImage = async () => {
    try {
      await CameraRoll.saveAsset(selectedImage, { type: 'photo' });
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      Alert.alert('Error', 'Could not save image.');
    }
  };

  const handlePickImage = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorMessage) return;
      const source = response.assets[0];
      const newMsg = {
        id: Date.now().toString(),
        image: source.uri,
        sender: 'me',
        time: formatTime(),
        status: 'sent',
      };
      setMessages(prev => [...prev, newMsg]);
      simulateResponse();
    });
  };

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: formatTime(),
      status: 'sent',
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    simulateResponse();
  };

  const simulateResponse = () => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const reply = {
          id: (Date.now() + 1).toString(),
          text: 'That looks great! Let me know if you need anything else.',
          sender: 'them',
          time: formatTime(),
        };
        setMessages(prev =>
          prev
            .map(msg =>
              msg.sender === 'me' ? { ...msg, status: 'read' } : msg,
            )
            .concat(reply),
        );
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === 'me' ? styles.myBubble : styles.theirBubble,
      ]}
    >
      {item.image ? (
        <Pressable onPress={() => setSelectedImage(item.image)}>
          <Image
            source={{ uri: item.image }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        </Pressable>
      ) : (
        <Text
          style={{
            color: item.sender === 'me' ? '#fff' : '#333',
            fontSize: 15,
          }}
        >
          {item.text}
        </Text>
      )}
      <View style={styles.messageFooter}>
        <Text
          style={[
            styles.timeText,
            { color: item.sender === 'me' ? 'rgba(255,255,255,0.7)' : '#999' },
          ]}
        >
          {item.time}
        </Text>
        {item.sender === 'me' && (
          <Icon
            name={item.status === 'read' ? 'check-circle' : 'check'}
            size={12}
            color={item.status === 'read' ? '#4CAF50' : '#CCC'}
            style={{ marginLeft: 4 }}
          />
        )}
      </View>
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
          <ThemedText style={styles.userName}>
            {member?.name || 'Member'}
          </ThemedText>
          <ThemedText
            style={[styles.lastSeen, isTyping && styles.typingHeaderLabel]}
          >
            {isTyping ? 'typing...' : 'online'}
          </ThemedText>
        </View>

        {/* 3. UPDATED ICONS WITH PRESSABLES */}
        <View style={styles.actionIcons}>
          <Pressable onPress={() => setIsVideoCallVisible(true)}>
            <Icon
              name="video"
              size={20}
              color="#666"
              style={{ marginRight: 25 }}
            />
          </Pressable>
          <Pressable onPress={() => setIsVoiceCallVisible(true)}>
            <Icon name="phone" size={20} color="#666" />
          </Pressable>
        </View>
      </View>

      {/* CHAT LIST */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        {isTyping && (
          <View style={styles.typingWrapper}>
            <View
              style={[styles.bubble, styles.theirBubble, styles.typingBubble]}
            >
              <ActivityIndicator size="small" color="#2C247A" />
            </View>
          </View>
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
          <Pressable onPress={handlePickImage} style={{ marginRight: 15 }}>
            <Icon name="image" size={24} color="#999" />
          </Pressable>
          <Pressable onPress={sendMessage}>
            <Icon name="send" size={24} color="#2C247A" />
          </Pressable>
        </View>
      </View>

      {/* 4. ADD THE CALL OVERLAY MODALS */}
      <CallScreen
        visible={isVoiceCallVisible}
        member={member}
        onEndCall={() => setIsVoiceCallVisible(false)}
      />

      <VideoCallScreen
        visible={isVideoCallVisible}
        member={member}
        onEndCall={() => setIsVideoCallVisible(false)}
      />

      {/* IMAGE FULLSCREEN MODAL */}
      <Modal visible={!!selectedImage} transparent={false} animationType="fade">
        <View style={styles.fullscreenContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setSelectedImage(null)}>
              <Icon name="x" size={30} color="#fff" />
            </Pressable>
            <Pressable onPress={saveImage} style={styles.saveBtn}>
              <Icon name="download" size={24} color="#fff" />
              <Text style={{ color: '#fff', marginLeft: 8 }}>Save</Text>
            </Pressable>
          </View>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: Platform.OS === 'ios' ? 50 : 20,
  },
  profileContainer: { alignItems: 'center' },
  largeAvatar: { width: 55, height: 55, borderRadius: 27.5, marginBottom: 5 },
  userName: { fontSize: 17, fontWeight: 'bold' },
  lastSeen: { fontSize: 12, color: '#999' },
  typingHeaderLabel: { color: '#2C247A', fontWeight: '700' },
  actionIcons: { flexDirection: 'row', marginTop: 10 },
  bubble: { padding: 10, borderRadius: 15, marginBottom: 10, maxWidth: '75%' },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2C247A',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F7FF',
    borderBottomLeftRadius: 2,
  },
  messageFooter: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: { fontSize: 9 },
  messageImage: { width: 200, height: 150, borderRadius: 10, marginBottom: 5 },
  typingWrapper: { paddingHorizontal: 20, marginBottom: 10 },
  typingBubble: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    borderTopWidth: 0.5,
    borderColor: '#eee',
  },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  textInput: { flex: 1, paddingHorizontal: 12, height: 40, color: '#000' },

  // Fullscreen Styles
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  modalHeader: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  saveBtn: { flexDirection: 'row', alignItems: 'center' },
  fullImage: { width: width, height: height * 0.8 },
});
