import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

type DeletePhotoModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeletePhotoModal = ({
  visible,
  onClose,
  onConfirm,
}: DeletePhotoModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Pressable overlay allows closing when tapping outside the modal content */}
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        {/* Pressable on the container prevents the click from bubbling up and closing the modal when clicking the box itself */}
        <Pressable
          style={styles.modalContainer}
          onPress={e => e.stopPropagation()}
        >
          <Text style={styles.title}>Delete photo</Text>
          <Text style={styles.description}>This will remove the photos</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.7}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.8}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#9e9e9e',
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e7ff', // Subtle light blue-grey border
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9e9e9e',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f00c0c',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default DeletePhotoModal;
