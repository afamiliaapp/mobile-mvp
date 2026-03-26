'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { height } = Dimensions.get('window');

const AddGroupMembers = ({ onSave }) => {
  const [selectedMembers, setSelectedMembers] = useState([
    { id: '1', name: 'Fred' },
    { id: '2', name: 'John' },
  ]);

  const removeMember = id => {
    setSelectedMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <Pressable style={styles.overlay} onPress={onSave}>
      <StatusBar barStyle="light-content" />

      {/* The Actual Modal Content */}
      <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
        <View style={styles.headerNav}>
          <Text style={styles.titleSmall}>Add members</Text>
          <TouchableOpacity onPress={onSave}>
            <Icon name="x" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.selectContainer}>
            <Text style={styles.selectText}>Select member</Text>
            <Icon name="chevron-down" size={20} color="#A9A9A9" />
          </TouchableOpacity>

          <View style={styles.chipsContainer}>
            {selectedMembers.map(member => (
              <View key={member.id} style={styles.chip}>
                <Text style={styles.chipText}>{member.name}</Text>
                <TouchableOpacity
                  onPress={() => removeMember(member.id)}
                  style={styles.chipRemove}
                >
                  <Icon name="x" size={10} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dims the background
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    height: height * 0.35, // Exactly 25% of the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 15,
  },
  titleSmall: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  content: { flex: 1 },
  selectContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: { fontSize: 14, color: '#A9A9A9' },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  chipText: { fontSize: 13, color: '#1C1C1E', marginRight: 5 },
  chipRemove: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#2C247A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 'auto', // Pushes button to bottom of the 25% height
    marginBottom: 15,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});

export default AddGroupMembers;
