'use client';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (expenseData: any) => void;
  initialData?: any; // New prop for editing
}

const BUDGET_CATEGORIES = [
  'Housing & Rent',
  'Groceries',
  'Transportation',
  'Utilities',
  'Healthcare',
  'Education/School',
  'Entertainment',
  'Shopping',
  'Savings/Investment',
  'Miscellaneous',
];

const MEMBERS = ['Dad', 'Mom', 'Brother', 'Sister'];

const initialState = {
  name: '',
  description: '',
  category: '',
  amount: '',
  paidBy: '',
  time: '',
  date: '',
  receipt: null as any,
};

const AddExpenseModal = ({
  isVisible,
  onClose,
  onSave,
  initialData,
}: Props) => {
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showMemberPicker, setShowMemberPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState(initialState);

  // Sync form state when modal visibility or initialData changes
  useEffect(() => {
    if (isVisible) {
      if (initialData) {
        setFormData({
          ...initialData,
          amount: initialData.amount.toString(), // Convert number to string for input
        });
      } else {
        setFormData({
          ...initialState,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          date: new Date().toLocaleDateString(),
        });
      }
    }
  }, [isVisible, initialData]);

  const handleSave = () => {
    if (!formData.name || !formData.amount) {
      Alert.alert('Error', 'Please enter a name and amount');
      return;
    }
    onSave({
      ...formData,
      id: initialData?.id || Date.now(), // Keep existing ID or create new one
      amount: parseFloat(formData.amount) || 0,
    });
    onClose();
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (result.assets && result.assets.length > 0) {
      setFormData({ ...formData, receipt: result.assets[0] });
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate)
      setFormData({ ...formData, date: selectedDate.toLocaleDateString() });
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData({
        ...formData,
        time: selectedTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {initialData ? 'Edit expense' : 'Add expenses'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={24} color="#1C1C1E" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.form}
          >
            <Label text="Name" />
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={formData.name}
              onChangeText={t => setFormData({ ...formData, name: t })}
            />

            <Label text="Description" />
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={formData.description}
              onChangeText={t => setFormData({ ...formData, description: t })}
            />

            <Label text="Category" />
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text
                style={[
                  styles.placeholderText,
                  formData.category ? { color: '#1C1C1E' } : null,
                ]}
              >
                {formData.category || 'Select category'}
              </Text>
              <Icon
                name={showCategoryPicker ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#8E8E93"
              />
            </TouchableOpacity>
            {showCategoryPicker && (
              <View style={styles.dropdownList}>
                {BUDGET_CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({ ...formData, category: cat });
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{cat}</Text>
                    {formData.category === cat && (
                      <Icon name="check" size={16} color="#2C247A" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Label text="Amount" />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={formData.amount}
              onChangeText={t => setFormData({ ...formData, amount: t })}
            />

            <Label text="Paid by" />
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => setShowMemberPicker(!showMemberPicker)}
            >
              <Text
                style={[
                  styles.placeholderText,
                  formData.paidBy ? { color: '#1C1C1E' } : null,
                ]}
              >
                {formData.paidBy || 'Select member'}
              </Text>
              <Icon
                name={showMemberPicker ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#8E8E93"
              />
            </TouchableOpacity>
            {showMemberPicker && (
              <View style={styles.dropdownList}>
                {MEMBERS.map(member => (
                  <TouchableOpacity
                    key={member}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({ ...formData, paidBy: member });
                      setShowMemberPicker(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{member}</Text>
                    {formData.paidBy === member && (
                      <Icon name="check" size={16} color="#2C247A" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Label text="Time" />
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.inputText}>{formData.time}</Text>
              <Icon name="clock" size={18} color="#8E8E93" />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                onChange={onTimeChange}
              />
            )}

            <Label text="Date" />
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>{formData.date}</Text>
              <Icon name="calendar" size={18} color="#8E8E93" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <Label text="Receipt" />
            <View style={styles.uploadContainer}>
              <View style={styles.filePreview}>
                <Icon name="link-2" size={18} color="#8E8E93" />
                <Text style={styles.fileName} numberOfLines={1}>
                  {formData.receipt
                    ? formData.receipt.fileName
                    : 'No file selected'}
                </Text>
              </View>
              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <Text style={styles.uploadBtnText}>
                  {formData.receipt ? 'Change' : 'Upload'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const Label = ({ text }: { text: string }) => (
  <Text style={styles.label}>{text}</Text>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1C1C1E' },
  form: { padding: 24 },
  label: { fontSize: 14, color: '#8E8E93', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1C1C1E',
  },
  inputText: { fontSize: 16, color: '#1C1C1E' },
  pickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  placeholderText: { fontSize: 16, color: '#8E8E93' },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dropdownText: { fontSize: 15, color: '#1C1C1E' },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    padding: 8,
    paddingLeft: 16,
  },
  filePreview: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  fileName: { fontSize: 14, color: '#1C1C1E', width: '70%' },
  uploadBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadBtnText: { fontSize: 14, fontWeight: '500', color: '#8E8E93' },
  saveButton: {
    backgroundColor: '#2C247A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});

export default AddExpenseModal;
