'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = ({ visible, member, onEndCall }) => {
  const [callStatus, setCallStatus] = useState('Calling...');
  const [seconds, setSeconds] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const ringtone = useRef(null);

  useEffect(() => {
    let timer;
    let connectionTimeout;

    if (visible) {
      // Play ringing sound
      ringtone.current = new Sound('ringing.mp3', Sound.MAIN_BUNDLE, error => {
        if (!error) {
          ringtone.current.setNumberOfLoops(-1);
          ringtone.current.play();
        }
      });

      // Simulate connection after 3.5 seconds
      connectionTimeout = setTimeout(() => {
        if (ringtone.current) ringtone.current.stop();
        setCallStatus('Connected');
        setIsConnected(true);
      }, 3500);

      if (isConnected) {
        timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
      }

      return () => {
        if (ringtone.current) ringtone.current.release();
        clearTimeout(connectionTimeout);
        clearInterval(timer);
      };
    } else {
      setSeconds(0);
      setCallStatus('Calling...');
      setIsConnected(false);
    }
  }, [visible, isConnected]);

  const formatTimer = s => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
    >
      <ImageBackground
        source={require('../assets/avata.png')} // Remote person's "camera"
        style={styles.container}
        imageStyle={styles.backgroundImage}
        blurRadius={isConnected ? 0 : 10} // Blur until connected
      >
        {/* Dark overlay for better UI contrast */}
        <View style={styles.overlay} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={onEndCall}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Top Info */}
        <View style={styles.topInfo}>
          <Text style={styles.name}>{member?.name || 'Tayo White'}</Text>
          <Text style={styles.status}>{callStatus}</Text>
          {isConnected && (
            <Text style={styles.timer}>{formatTimer(seconds)}</Text>
          )}
        </View>

        {/* Small "Self Preview" (What I look like) */}
        {isConnected && (
          <View style={styles.selfPreview}>
            {/* Mock camera view - typically a Camera component here */}
            <View style={styles.mockCamera} />
            <Text style={styles.selfLabel}>You</Text>
          </View>
        )}

        {/* Bottom Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.endCall]}
            onPress={onEndCall}
          >
            <Ionicons
              name="call-outline"
              size={26}
              color="#fff"
              style={{ transform: [{ rotate: '135deg' }] }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="videocam" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="mic-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Darker overlay for video
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  topInfo: {
    alignItems: 'center',
    zIndex: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  status: {
    marginTop: 8,
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  timer: {
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selfPreview: {
    position: 'absolute',
    top: 120,
    right: 20,
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  mockCamera: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#555', // Placeholder for local camera stream
  },
  selfLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  actionBtn: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  endCall: {
    backgroundColor: '#E53935',
  },
});
