'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound'; // CLI Sound Library

// Enable playback in silence mode for iOS
Sound.setCategory('Playback');

const CallScreen = ({ visible, member, onEndCall }) => {
  const [callStatus, setCallStatus] = useState('Calling..');
  const [seconds, setSeconds] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Ref to store the sound object so we can stop it later
  const ringtone = useRef(null);

  useEffect(() => {
    let timer;
    let connectionTimeout;

    if (visible) {
      // 1. INITIALIZE & PLAY SOUND
      ringtone.current = new Sound('ringing.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // Loop the ringing sound
        ringtone.current.setNumberOfLoops(-1);
        ringtone.current.play();
      });

      // 2. SIMULATE CONNECTION
      connectionTimeout = setTimeout(() => {
        stopRinging(); // Stop sound when connected
        setCallStatus('Connected');
        setIsConnected(true);
      }, 4000);

      // 3. TIMER LOGIC
      if (isConnected) {
        timer = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000);
      }

      return () => {
        stopRinging();
        clearTimeout(connectionTimeout);
        clearInterval(timer);
      };
    } else {
      stopRinging();
      setSeconds(0);
      setCallStatus('Calling..');
      setIsConnected(false);
    }
  }, [visible, isConnected]);

  const stopRinging = () => {
    if (ringtone.current) {
      ringtone.current.stop(() => {
        ringtone.current.release();
        ringtone.current = null;
      });
    }
  };

  const formatTimer = totalSeconds => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={onEndCall}>
            <Ionicons name="chevron-back" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/avata.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{member?.name || 'Member'}</Text>
          <Text style={[styles.status, isConnected && { color: '#4CAF50' }]}>
            {callStatus}
          </Text>
          {isConnected && (
            <Text style={styles.timer}>{formatTimer(seconds)}</Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.endCall]}
            onPress={onEndCall}
          >
            <Ionicons
              name="call"
              size={22}
              color="#fff"
              style={{ transform: [{ rotate: '135deg' }] }}
            />
          </TouchableOpacity>
          {/* Other action buttons... */}
        </View>
      </View>
    </Modal>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  topBar: { paddingHorizontal: 20 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: { alignItems: 'center' },
  avatar: { width: 160, height: 160, borderRadius: 80 },
  name: { fontSize: 24, fontWeight: '700', marginTop: 20, color: '#2C247A' },
  status: { color: '#999', marginTop: 8, fontSize: 18 },
  timer: { color: '#666', marginTop: 4, fontSize: 16, fontWeight: '500' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  endCall: { backgroundColor: '#E53935' },
});
