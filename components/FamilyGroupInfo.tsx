'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AddGroupMembers from '../components/AddGroupMembers';
import EditGroup from '../components/EditGroup';

const FamilyGroupInfo = ({
  groupName,
  setGroupName,
  groupImage,
  setGroupImage,
  onClose,
}) => {
  // ✅ members state lives INSIDE the component
  const [members, setMembers] = useState(
    Array.from({ length: 6 }, (_, index) => ({
      id: String(index + 1),
      name: [
        'Milendra',
        'John Doe',
        'Sarah Connor',
        'David Lee',
        'Amaka Obi',
        'Tunde Bello',
      ][index],
      avatar: `https://randomuser.me/api/portraits/${
        index % 2 === 0 ? 'women' : 'men'
      }/${index + 40}.jpg`,
    })),
  );

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderMember = ({ item }) => (
    <View style={styles.memberRow}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.memberName}>{item.name}</Text>
      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="trash-2" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topNav}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Icon name="chevron-left" size={28} color="#2C247A" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.groupHeader}>
          <View style={styles.groupAvatarContainer}>
            {groupImage ? (
              <Image source={{ uri: groupImage }} style={styles.groupAvatar} />
            ) : (
              <View style={styles.groupAvatarPlaceholder}>
                <Icon name="users" size={30} color="#ccc" />
              </View>
            )}
          </View>
          <Text style={styles.groupTitle}>{groupName}</Text>
          <Text style={styles.memberCount}>({members.length} Members)</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <View style={styles.iconCircle}>
              <Icon name="plus" size={22} color="#2C247A" />
            </View>
            <Text style={styles.iconLabel}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsEditModalVisible(true)}
          >
            <View style={styles.iconCircle}>
              <Icon name="edit-2" size={20} color="#2C247A" />
            </View>
            <Text style={styles.iconLabel}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFE5E5' }]}>
              <Icon name="log-out" size={20} color="#FF3B30" />
            </View>
            <Text style={[styles.iconLabel, { color: '#FF3B30' }]}>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SECTION HEADER WITH SEARCH TOGGLE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Group Members
          {searchQuery.length > 0 && (
            <Text style={styles.resultCount}>
              {' '}
              ({filteredMembers.length} found)
            </Text>
          )}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsSearchVisible(prev => !prev);
            setSearchQuery('');
          }}
        >
          <Icon
            name={isSearchVisible ? 'x' : 'search'}
            size={20}
            color={isSearchVisible ? '#FF3B30' : '#8E8E93'}
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH INPUT */}
      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={16}
            color="#8E8E93"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            placeholderTextColor="#A9A9A9"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="x-circle" size={16} color="#A9A9A9" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* MEMBER LIST */}
      {filteredMembers.length > 0 ? (
        <FlatList
          data={filteredMembers}
          renderItem={renderMember}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptySearch}>
          <Icon name="users" size={40} color="#eee" />
          <Text style={styles.emptySearchText}>No member found</Text>
        </View>
      )}

      {/* ADD MEMBERS MODAL */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <AddGroupMembers
          onSave={() => setIsAddModalVisible(false)}
          onAddMembers={newMembers => {
            setMembers(prev => [...prev, ...newMembers]);
            setIsAddModalVisible(false);
          }}
        />
      </Modal>

      {/* EDIT GROUP MODAL */}
      <Modal visible={isEditModalVisible} animationType="slide">
        <EditGroup
          currentName={groupName}
          currentImage={groupImage}
          onSave={({ name, image }) => {
            if (typeof setGroupName === 'function') setGroupName(name);
            if (typeof setGroupImage === 'function') setGroupImage(image);
            setIsEditModalVisible(false);
          }}
          onClose={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topNav: { paddingHorizontal: 10, paddingVertical: 10 },
  header: { paddingHorizontal: 16, paddingBottom: 20 },
  groupHeader: { alignItems: 'center', marginBottom: 20 },
  groupAvatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  groupAvatar: { width: '100%', height: '100%' },
  groupAvatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupTitle: { fontSize: 22, fontWeight: '700', color: '#2C247A' },
  memberCount: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 10,
  },
  iconButton: { alignItems: 'center' },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconLabel: { fontSize: 12, color: '#2C247A', fontWeight: '500' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  resultCount: { fontSize: 14, color: '#8E8E93', fontWeight: '400' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchInput: { flex: 1, fontSize: 15, color: '#1C1C1E' },
  emptySearch: { alignItems: 'center', marginTop: '30%' },
  emptySearchText: { marginTop: 10, fontSize: 15, color: '#8E8E93' },
  listContainer: { paddingBottom: 20 },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  memberName: { flex: 1, fontSize: 16, color: '#1C1C1E' },
  deleteButton: { padding: 8 },
});

export default FamilyGroupInfo;
