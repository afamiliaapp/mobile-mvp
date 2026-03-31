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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const members = Array.from({ length: 4 }, (_, index) => ({
    id: String(index + 1),
    name: 'Milenndra',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  }));

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

      {/* Header with Back Button */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Icon name="chevron-left" size={28} color="#2C247A" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.groupHeader}>
          {/* UPDATED AVATAR — empty until image is set */}
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
          <Text style={styles.memberCount}>(25 Members)</Text>
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

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Group Members</Text>
        <TouchableOpacity>
          <Icon name="search" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* ADD MEMBERS MODAL */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <AddGroupMembers onSave={() => setIsAddModalVisible(false)} />
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
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
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
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
