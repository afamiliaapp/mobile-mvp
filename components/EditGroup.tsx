'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

const EditGroup = ({ currentName, currentImage, onSave, onClose }) => {
  const [groupName, setGroupName] = useState(currentName || 'Family Group');
  const [groupImage, setGroupImage] = useState(currentImage || null);

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel || response.errorMessage) return;
      const uri = response.assets[0].uri;
      setGroupImage(uri);
    });
  };

  const handleSave = () => {
    onSave({ name: groupName, image: groupImage }); // Pass both name & image back
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Nav */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Edit group</Text>

          {/* GROUP IMAGE PICKER */}
          <View style={styles.imagePicker}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={handlePickImage}
            >
              {groupImage ? (
                <Image
                  source={{ uri: groupImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Icon name="users" size={30} color="#ccc" />
                </View>
              )}

              {/* Camera badge */}
              <View style={styles.cameraBadge}>
                <Icon name="camera" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.imageLabel}>Tap to change group photo</Text>
          </View>

          <Text style={styles.label}>Group Name</Text>

          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter group name"
            placeholderTextColor="#A9A9A9"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSave}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerNav: { paddingHorizontal: 20, paddingVertical: 15 },
  keyboardContainer: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 30,
  },

  // Image picker
  imagePicker: { alignItems: 'center', marginBottom: 30 },
  avatarWrapper: { position: 'relative' },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#2C247A',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  imageLabel: { marginTop: 8, fontSize: 13, color: '#8E8E93' },

  label: { fontSize: 14, color: '#8E8E93', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#2C247A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

export default EditGroup;
