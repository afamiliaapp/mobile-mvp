'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppContainer from '../components/AppContainer';
import { useChores } from '../context/ChoreContext';

const ChoreDetails = ({ route, navigation }: any) => {
  const { item } = route.params;
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { deleteChore } = useChores(); // Access delete function

  const detailFields = [
    { label: 'Assigned to', value: `${item.assigneeCount} members` },
    { label: 'Description', value: item.description || 'No description' },
    { label: 'Due time', value: item.dueTime },
    { label: 'Due date', value: item.dueDate },
    {
      label: 'Status',
      value: item.status.toUpperCase(),
      isGreen: item.status === 'open',
    },
    { label: 'Reminder', value: 'Active', isGreen: true },
  ];

  const handleDelete = () => {
    deleteChore(item.id); // Remove from global list
    setIsDeleteVisible(false);
    navigation.goBack(); // When you land back on Chores, the item is gone!
  };

  const handleEdit = () => {
    // Now you can navigate back and pass the item to open the modal in edit mode
    navigation.navigate('Chores', { editItem: item });
  };

  return (
    <AppContainer>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color="#2C247A" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>{item.title}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={() => console.log('Complete')}>
              <Icon
                name="check-circle"
                size={20}
                color="#4CAF50"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEdit}>
              <Icon
                name="edit-3"
                size={20}
                color="#8E8E93"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsDeleteVisible(true)}>
              <Icon name="trash-2" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Details List */}
        <View style={styles.content}>
          {detailFields.map((field, index) => (
            <View key={index} style={styles.fieldGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <Text
                style={[styles.value, field.isGreen && { color: '#10B981' }]}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Delete Confirmation Modal */}
        <Modal
          visible={isDeleteVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDeleteVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModal}>
              <Text style={styles.modalTitle}>Delete</Text>
              <Text style={styles.modalSubtitle}>
                When you delete this chores, you lose your chores ar task
                assigned
              </Text>

              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => setIsDeleteVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalBtn, styles.deleteBtn]}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </AppContainer>
  );
};

export default ChoreDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 40,
  },
  mainTitle: { fontSize: 20, fontWeight: '700', color: '#1C1C1E', flex: 1 },
  actionIcons: { flexDirection: 'row', alignItems: 'center' },
  content: { paddingHorizontal: 24 },
  fieldGroup: { marginBottom: 30 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C7C7CC',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  value: { fontSize: 16, fontWeight: '500', color: '#1C1C1E' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deleteModal: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F2F2F7',
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
  },
  cancelBtnText: {
    color: '#1C1C1E',
    fontWeight: '600',
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
