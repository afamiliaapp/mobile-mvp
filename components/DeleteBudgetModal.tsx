import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DeleteModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteBudgetModal = ({
  isVisible,
  onClose,
  onDelete,
}: DeleteModalProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Delete budget</Text>
          <Text style={styles.description}>
            This will remove the budget and your expenses will be removed
          </Text>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setChecked(!checked)}
          >
            <View style={[styles.circle, checked && styles.checkedCircle]}>
              {checked && <View style={styles.innerDot} />}
            </View>
            <Text style={styles.checkboxText}>
              Confirm that i want to delete my budget
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.deleteBtn, !checked && styles.disabledBtn]}
              onPress={onDelete}
              disabled={!checked}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#C7C7CC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCircle: {
    borderColor: '#2C247A',
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2C247A',
  },
  checkboxText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FF1717',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#FFB8B8',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default DeleteBudgetModal;
