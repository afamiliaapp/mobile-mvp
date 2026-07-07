import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FamilyRoleDropdown() {
  const [selectedRole, setSelectedRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const familyRoles = [
    'Father',
    'Mother',
    'First Son',
    'First Daughter',
    'Second Son',
    'Second Daughter',
    'Third Son',
    'Third Daughter',
    'Fourth Son',
    'Fourth Daughter',
    'Fifth Son',
    'Fifth Daughter',
    'Others',
  ];

  return (
    <View style={styles.inputbox1}>
      <Text style={styles.inputtext1}>Who are you in your family?</Text>

      {/* Input Box */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownContainer}
      >
        <Text style={{ flex: 1, color: selectedRole ? '#000' : '#888' }}>
          {selectedRole || 'Select role'}
        </Text>

        <Ionicons
          name="chevron-down"
          size={20}
          color="#888"
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <FlatList
              data={familyRoles}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const isSelected = selectedRole === item;

                return (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      isSelected && styles.selectedItemBorder,
                      isSelected && {
                        borderBottomWidth: 2,
                        borderColor: '',
                      }, // <-- highlight selected
                    ]}
                    onPress={() => {
                      setSelectedRole(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.itemText}>{item}</Text>

                    {/* Right Radio */}
                    <View style={styles.radioOuter}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputbox1: {
    marginVertical: 10,
  },
  inputtext1: {
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  dropdownContainer: {
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    maxHeight: 400,
    marginTop: 100,
  },

  item: {
    paddingHorizontal: 20,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },

  /** NEW — Border for selected item */
  selectedItemBorder: {
    borderWidth: 2, // stronger complete border
    borderColor: '#007AFF',
    borderRadius: 10,
    backgroundColor: '#F4F8FF',
  },

  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2C247A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: '#2C247A',
  },

  itemText: {
    fontSize: 16,
    color: '#000',
  },
});
