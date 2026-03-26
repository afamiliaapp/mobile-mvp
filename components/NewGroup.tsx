'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const USERS = [
  { id: '1', name: 'Fred' },
  { id: '2', name: 'John' },
  { id: '3', name: 'Mary' },
  { id: '4', name: 'Angela' },
];

const NewGroup = ({ onCreate, onCancel }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const addMember = user => {
    const exists = members.find(m => m.id === user.id);
    if (!exists) {
      setMembers([...members, user]);
    }
    setOpenDropdown(false);
  };

  const removeMember = id => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleCreate = () => {
    if (!groupName || members.length === 0) return;
    onCreate({
      name: groupName,
      members: members,
      text: `Group created with ${members.length} members`,
      time: 'Just now',
      group: true,
      unread: false,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Group</Text>

      <Text style={styles.label}>Group Name</Text>
      <TextInput
        placeholder="Enter Group Name"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Member</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpenDropdown(!openDropdown)}
      >
        <Text style={styles.dropdownText}>
          {members.length > 0 ? 'Add more members' : 'Select member'}
        </Text>
        <Ionicons
          name={openDropdown ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#666"
        />
      </TouchableOpacity>

      {openDropdown && (
        <View style={styles.dropdownList}>
          <FlatList
            data={USERS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => addMember(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <View style={styles.membersContainer}>
        {members.map(member => (
          <View key={member.id} style={styles.memberTag}>
            <Text style={styles.memberText}>{member.name}</Text>
            <TouchableOpacity onPress={() => removeMember(member.id)}>
              <Text style={styles.remove}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelLink} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewGroup;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  label: { fontSize: 13, color: '#666', marginBottom: 6, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: { color: '#999' },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  membersContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  memberTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  memberText: { marginRight: 6, fontSize: 12 },
  remove: { fontSize: 14, color: '#999' },
  button: {
    marginTop: 20,
    backgroundColor: '#342E8C',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  cancelLink: { marginTop: 15, alignItems: 'center' },
  cancelText: { color: '#666', fontSize: 14 },
});
