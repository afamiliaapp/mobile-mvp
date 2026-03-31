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
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { height } = Dimensions.get('window');

const AddGroupMembers = ({ onSave, onAddMembers }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const loadContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_CONTACTS
          : PERMISSIONS.IOS.CONTACTS;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        const allContacts = await Contacts.getAll();
        const formatted = allContacts
          .filter(c => c.givenName) // skip contacts with no name
          .map(c => ({
            id: c.recordID,
            name: `${c.givenName} ${c.familyName || ''}`.trim(),
            phone: c.phoneNumbers?.[0]?.number || '',
            avatar: c.thumbnailPath || null,
          }));
        setContacts(formatted);
        setPermissionDenied(false);
      } else {
        setPermissionDenied(true);
      }
    } catch (e) {
      console.error('Failed to load contacts', e);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen && contacts.length === 0) {
      loadContacts();
    }
    setIsDropdownOpen(prev => !prev);
  };

  const selectContact = contact => {
    // Avoid duplicates
    const alreadySelected = selectedMembers.some(m => m.id === contact.id);
    if (!alreadySelected) {
      setSelectedMembers(prev => [...prev, contact]);
    }
    setIsDropdownOpen(false);
  };

  const removeMember = id => {
    setSelectedMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleSave = () => {
    if (typeof onAddMembers === 'function') {
      onAddMembers(selectedMembers); // bubble new members up to FamilyGroupInfo
    }
    onSave();
  };

  // Contacts not yet selected
  const availableContacts = contacts.filter(
    c => !selectedMembers.some(m => m.id === c.id),
  );

  return (
    <Pressable style={styles.overlay} onPress={onSave}>
      <StatusBar barStyle="light-content" />

      <Pressable
        style={[styles.modalContent, isDropdownOpen && styles.modalExpanded]}
        onPress={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <View style={styles.headerNav}>
          <Text style={styles.titleSmall}>Add members</Text>
          <TouchableOpacity onPress={onSave}>
            <Icon name="x" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* DROPDOWN TRIGGER */}
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={toggleDropdown}
          >
            <Text style={styles.selectText}>Select member</Text>
            <Icon
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#A9A9A9"
            />
          </TouchableOpacity>

          {/* DROPDOWN LIST */}
          {isDropdownOpen && (
            <View style={styles.dropdown}>
              {isLoadingContacts ? (
                <View style={styles.dropdownCenter}>
                  <ActivityIndicator color="#2C247A" />
                  <Text style={styles.dropdownHint}>Loading contacts...</Text>
                </View>
              ) : permissionDenied ? (
                <View style={styles.dropdownCenter}>
                  <Icon name="lock" size={24} color="#ccc" />
                  <Text style={styles.dropdownHint}>
                    Contacts permission denied
                  </Text>
                </View>
              ) : availableContacts.length === 0 ? (
                <View style={styles.dropdownCenter}>
                  <Text style={styles.dropdownHint}>No contacts available</Text>
                </View>
              ) : (
                <FlatList
                  data={availableContacts}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.contactRow}
                      onPress={() => selectContact(item)}
                    >
                      {item.avatar ? (
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.contactAvatar}
                        />
                      ) : (
                        <View style={styles.contactAvatarPlaceholder}>
                          <Text style={styles.contactInitial}>
                            {item.name.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                      )}
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        {item.phone ? (
                          <Text style={styles.contactPhone}>{item.phone}</Text>
                        ) : null}
                      </View>
                      <Icon name="plus-circle" size={18} color="#2C247A" />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}

          {/* SELECTED CHIPS */}
          {selectedMembers.length > 0 && (
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
          )}

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              selectedMembers.length === 0 && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={selectedMembers.length === 0}
          >
            <Text style={styles.saveButtonText}>
              {selectedMembers.length > 0
                ? `Add ${selectedMembers.length} Member${
                    selectedMembers.length > 1 ? 's' : ''
                  }`
                : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    height: height * 0.42,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  modalExpanded: {
    height: height * 0.75, // expand when dropdown is open
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  titleSmall: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  content: { flex: 1 },

  // Dropdown trigger
  selectContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: { fontSize: 14, color: '#A9A9A9' },

  // Dropdown list
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    backgroundColor: '#fff',
    maxHeight: height * 0.35,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dropdownCenter: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  dropdownHint: { fontSize: 13, color: '#8E8E93' },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  contactAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  contactAvatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  contactInitial: { fontSize: 16, fontWeight: '700', color: '#2C247A' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '600', color: '#1C1C1E' },
  contactPhone: { fontSize: 12, color: '#8E8E93', marginTop: 1 },

  // Chips
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C247A',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  chipText: { fontSize: 13, color: '#fff', marginRight: 5 },
  chipRemove: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Save button
  saveButton: {
    backgroundColor: '#2C247A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 15,
  },
  saveButtonDisabled: { backgroundColor: '#C7C7CC' },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});

export default AddGroupMembers;
