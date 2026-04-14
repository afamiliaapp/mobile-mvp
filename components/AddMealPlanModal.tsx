import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const MEAL_TIMES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const MEMBERS = ['Dad', 'Mom', 'Brother', 'Sister', 'Others'];

type DropdownField = 'day' | 'mealTime' | 'member' | null;

interface DropdownProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  isOpen: boolean;
  onOpen: () => void;
  onSelect: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onOpen,
  onSelect,
}) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={[styles.dropdown, isOpen && styles.dropdownOpen]}
      onPress={onOpen}
      activeOpacity={0.8}
    >
      <Text style={[styles.dropdownText, !value && styles.placeholder]}>
        {value || placeholder}
      </Text>
      <Text style={[styles.chevron, isOpen && styles.chevronUp]}>›</Text>
    </TouchableOpacity>

    {isOpen && (
      <View style={styles.optionsList}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionItem, value === opt && styles.optionSelected]}
            onPress={() => onSelect(opt)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                value === opt && styles.optionTextSelected,
              ]}
            >
              {opt}
            </Text>
            {value === opt && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

interface AddMealPlanModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: any; // 2. Added initialData prop
  onSave?: (data: any) => void;
}

const AddMealPlanModal: React.FC<AddMealPlanModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
}) => {
  const [mealName, setMealName] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [mealTime, setMealTime] = useState('Breakfast');
  const [member, setMember] = useState('');
  const [notes, setNotes] = useState('');
  const [openDropdown, setOpenDropdown] = useState<DropdownField>(null);

  useEffect(() => {
    if (visible && initialData) {
      setMealName(initialData.title || '');
      setSelectedDay(initialData.day || '');
      setMealTime(initialData.category || 'Breakfast');
      setMember(initialData.member || '');
      setNotes(initialData.notes || '');
    } else if (visible && !initialData) {
      // Reset if adding new
      setMealName('');
      setSelectedDay('');
      setMealTime('Breakfast');
      setMember('');
      setNotes('');
    }
  }, [visible, initialData]);

  const toggleDropdown = (field: DropdownField) => {
    setOpenDropdown(prev => (prev === field ? null : field));
  };

  const handleSave = () => {
    // Pass the ID back if we are editing so we know which one to update
    onSave?.({
      id: initialData?.id,
      mealName,
      selectedDay,
      mealTime,
      member,
      notes,
    });
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setMealName('');
    setSelectedDay('');
    setMealTime('Breakfast');
    setMember('');
    setNotes('');
    setOpenDropdown(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      {/* Dim backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sheetWrapper}
        pointerEvents="box-none"
      >
        <View style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.heading}>
              {initialData ? 'Edit meal plan' : 'Add meal plan'}
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
            >
              <Icon name="x" size={20} color="#6b6b80" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Meal Name */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter meal name"
                placeholderTextColor="#b0b0b0"
                value={mealName}
                onChangeText={setMealName}
                onFocus={() => setOpenDropdown(null)}
              />
            </View>

            {/* Day */}
            <Dropdown
              label="Day"
              value={selectedDay}
              placeholder="Select day"
              options={DAYS}
              isOpen={openDropdown === 'day'}
              onOpen={() => toggleDropdown('day')}
              onSelect={val => {
                setSelectedDay(val);
                setOpenDropdown(null);
              }}
            />

            {/* Meal Time */}
            <Dropdown
              label="Meal time"
              value={mealTime}
              placeholder="Select meal time"
              options={MEAL_TIMES}
              isOpen={openDropdown === 'mealTime'}
              onOpen={() => toggleDropdown('mealTime')}
              onSelect={val => {
                setMealTime(val);
                setOpenDropdown(null);
              }}
            />

            {/* Who's cooking */}
            <Dropdown
              label="Who's cooking?"
              value={member}
              placeholder="Select member"
              options={MEMBERS}
              isOpen={openDropdown === 'member'}
              onOpen={() => toggleDropdown('member')}
              onSelect={val => {
                setMember(val);
                setOpenDropdown(null);
              }}
            />

            {/* Notes */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Notes / recipe link</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Enter any note or paste a recipe link"
                placeholderTextColor="#b0b0b0"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                onFocus={() => setOpenDropdown(null)}
                textAlignVertical="top"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.85}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMealPlanModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 26, 26, 0.45)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#f9f9f7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#d0d0dc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    letterSpacing: -0.4,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ebebf0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 12,
  },
  fieldWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b6b80',
    marginBottom: 7,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 15,
    color: '#1a1a2e',
    borderWidth: 0.5,
    borderColor: '#e8e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  notesInput: {
    minHeight: 80,
    paddingTop: 14,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#e8e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  dropdownOpen: {
    borderColor: '#2d2b6b',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0.5,
  },
  dropdownText: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  placeholder: {
    color: '#b0b0b0',
  },
  chevron: {
    fontSize: 20,
    color: '#9090a0',
    transform: [{ rotate: '90deg' }],
    lineHeight: 22,
  },
  chevronUp: {
    transform: [{ rotate: '-90deg' }],
    color: '#2d2b6b',
  },
  optionsList: {
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#2d2b6b',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    shadowColor: '#2d2b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f5',
  },
  optionSelected: {
    backgroundColor: '#f4f4fb',
  },
  optionText: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  optionTextSelected: {
    color: '#2d2b6b',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 14,
    color: '#2d2b6b',
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#2d2b6b',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#2d2b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
