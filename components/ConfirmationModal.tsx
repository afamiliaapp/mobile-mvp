import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

// Define the shape of the data needed for a generic confirmation modal
interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* 1. The Dim Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* 2. The Modal Card Content */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>

          {/* Button Row */}
          <View style={styles.buttonRow}>
            {/* Cancel Button - Light and Outlined */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Delete Button - Red and Primary */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 25,
    width: '100%',
    maxWidth: 400, // Keeps card clean on larger devices
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow/Elevation for Android
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 24,
    marginBottom: 35,
    letterSpacing: 0.1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  // Button Base Styles
  cancelButton: {
    flex: 1, // Buttons take equal width
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginRight: 10, // Spacing between buttons
  },
  cancelButtonText: {
    color: '#636366',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1, // Buttons take equal width
    backgroundColor: '#FF1F1F', // Red color matching your reference
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginLeft: 10, // Spacing between buttons
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
