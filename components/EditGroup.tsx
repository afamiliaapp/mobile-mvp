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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const EditGroup = ({ currentName, onSave, onClose }) => {
  const [groupName, setGroupName] = useState(currentName || 'Family Group');

  const handleSave = () => {
    onSave(groupName); // Pass the updated name back
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
    backgroundColor: '#2C247A', // Using your signature purple
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
