'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface DeleteExpenseModalProps {
  isVisible: boolean;
  onClose: () => void;

  onDelete: () => void;
}

const DeleteExpenseModal = ({
  isVisible,
  onClose,
  onDelete,
}: DeleteExpenseModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = () => {
    if (isConfirmed) {
      onDelete();
      setIsConfirmed(false); // Reset for next time
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Delete expense</Text>

              <Text style={styles.subtitle}>This will remove the expense</Text>

              {/* Confirmation Toggle Row */}
              <TouchableOpacity
                style={styles.confirmRow}
                activeOpacity={0.7}
                onPress={() => setIsConfirmed(!isConfirmed)}
              >
                <View
                  style={[
                    styles.checkbox,
                    isConfirmed && styles.checkboxActive,
                  ]}
                >
                  {isConfirmed && <Icon name="check" size={12} color="#fff" />}
                </View>
                <Text style={styles.confirmText}>
                  Confirm that i want to delete my expense
                </Text>
              </TouchableOpacity>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    !isConfirmed && styles.deleteButtonDisabled,
                  ]}
                  onPress={handleDelete}
                  disabled={!isConfirmed}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,

    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 16,
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#2C247A',
    borderColor: '#2C247A',
  },
  confirmText: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default DeleteExpenseModal;
