import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Keyboard,
  Easing,
} from 'react-native';
import AppContainer from '../components/AppContainer';
import SupportBar from '../components/SupportBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';
import Icon from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import { launchImageLibrary } from 'react-native-image-picker';

const { height } = Dimensions.get('window');
const MESSAGE_BOX_HEIGHT = 100;
const EMOJI_HEIGHT = 250;

const SupportChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const flatListRef = useRef(null);
  const emojiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
      hideEmojiPanel();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardHeight(0),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const toggleEmojiPanel = () => {
    if (showEmoji) {
      hideEmojiPanel();
    } else {
      setShowEmoji(true);
      Animated.timing(emojiAnim, {
        toValue: EMOJI_HEIGHT,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const hideEmojiPanel = () => {
    Animated.timing(emojiAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setShowEmoji(false));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      image: null,
      sender: 'user',
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    hideEmojiPanel();
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel || response.errorCode) return;
      const newMessage = {
        id: Date.now().toString(),
        text: '',
        image: response.assets[0].uri,
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        50,
      );
    });
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === 'user' ? styles.userBubble : styles.supportBubble,
      ]}
    >
      {item.text && (
        <ThemedText
          style={[
            styles.messageText,
            item.sender === 'user' && { color: '#fff' },
          ]}
        >
          {item.text}
        </ThemedText>
      )}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
    </View>
  );

  // MESSAGE SCREEN height = 70% of screen minus emoji panel and keyboard
  const messagescreenHeight =
    height * 0.8 - (showEmoji ? EMOJI_HEIGHT : 0) - keyboardHeight;

  return (
    <AppContainer>
      <View style={styles.container}>
        <SupportBar />
        <BackButton />

        <View style={{ height: messagescreenHeight }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        </View>

        {showEmoji && (
          <Animated.View style={[styles.emojiPanel, { height: emojiAnim }]}>
            <EmojiSelector
              onEmojiSelected={emoji => {
                setMessage(prev => prev + emoji);
                setTimeout(
                  () => flatListRef.current?.scrollToEnd({ animated: true }),
                  50,
                );
              }}
              showSearchBar={false}
              showTabs
            />
          </Animated.View>
        )}

        <View style={styles.messagebox}>
          <TouchableOpacity onPress={toggleEmojiPanel}>
            <Icon name="happy-outline" size={24} color="#555" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Reply..."
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity onPress={pickImage} style={styles.picture}>
            <Icon name="image-outline" size={24} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSend}>
            <Icon name="send" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
  );
};

export default SupportChat;

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  emojiPanel: {
    position: 'absolute',
    bottom: MESSAGE_BOX_HEIGHT,
    left: 0,
    right: 0,
  },

  messagebox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MESSAGE_BOX_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },

  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    width: '68%',
  },

  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2C247A',
  },

  supportBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F7FF',
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 5,
  },

  picture: {
    marginRight: 20,
  },

  messageText: {
    fontSize: 14,
  },
});
