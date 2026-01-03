import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MemberList() {
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [passport, setPassport] = useState(null);

  const pickPassport = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });

    if (!result.didCancel && result.assets?.length) {
      setPassport(result.assets[0].uri);
    }
  };

  const sendInvite = () => {
    console.log({
      name,
      email,
      birthdate,
      passport,
    });

    setShowModal(false);
  };

  const [role, setRole] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Father-in-law',
    'Mother-in-law',
    'Brother-in-law',
    'Sister-in-law',
    'Son',
    'Daughter',
  ];

  return (
    <View>
      <Text style={styles.memberlisttitle}>Member list</Text>

      <View style={styles.memberlistbox}>
        {/* Existing member */}
        <View style={styles.memberlistbox2}>
          <View style={styles.memberlistbox3}>
            <View style={styles.imagebox}>
              <Image
                style={styles.image}
                source={require('../assets/avata.png')}
              />
              <View>
                <Text style={styles.membertitle}>Ifeoma Orji</Text>
                <Text style={styles.memberdate}>
                  Mother | Added 29th Feb 2025
                </Text>
              </View>
            </View>

            <View style={styles.imagebox2}>
              <Image
                style={styles.image2}
                source={require('../assets/pencil-edit-01 (1).png')}
              />
              <Image
                style={styles.image2}
                source={require('../assets/delete-02.png')}
              />
            </View>
          </View>
        </View>

        {/* ADD / INVITE */}
        <TouchableOpacity
          style={styles.addmemberbox}
          onPress={() => setShowModal(true)}
        >
          <Image
            style={styles.addmemberimg}
            source={require('../assets/add-01.png')}
          />
          <Text style={styles.addmembertxt}>Add/Invite Member</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalTitleBox}>
              <Text style={styles.modalTitle}>Add/Invite member</Text>
              <View style={styles.modalsharebox}>
                <Text style={styles.modalsharetxt}>Share Link</Text>
              </View>
            </View>

            {/* ROLE DROPDOWN */}
            <View>
              <Text style={styles.modalFormTitle}>
                Who are you inviting to your family space?
              </Text>
              <TouchableOpacity
                style={[styles.input, styles.dropdownTrigger]}
                onPress={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                <Text style={{ color: role ? '#000' : '#999' }}>
                  {role || 'Choose a role'}
                </Text>

                <Ionicons
                  name={showRoleDropdown ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#999"
                />
              </TouchableOpacity>

              {showRoleDropdown && (
                <View style={styles.dropdown}>
                  {roles.map(item => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setRole(item);
                        setShowRoleDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Name */}

            <View>
              <Text style={styles.modalFormTitle}>Name</Text>

              <TextInput
                placeholder="Enter name"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}

            <View>
              <Text style={styles.modalFormTitle}>Email</Text>

              <TextInput
                placeholder="Enter Email"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Birthdate */}

            <View>
              <Text style={styles.modalFormTitle}>Birthdate</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: birthdate ? '#000' : '#999' }}>
                  {birthdate ? birthdate.toDateString() : 'Enter Birthdate'}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={birthdate || new Date()}
                mode="date"
                onChange={(e, date) => {
                  setShowDatePicker(false);
                  if (date) setBirthdate(date);
                }}
              />
            )}

            {/* Passport upload */}
            <TouchableOpacity style={styles.uploadBtn} onPress={pickPassport}>
              <Text style={styles.uploadText}>
                {passport ? 'Passport Selected' : 'Upload Passport'}
              </Text>
            </TouchableOpacity>

            {passport && (
              <Image source={{ uri: passport }} style={styles.preview} />
            )}

            {/* Buttons */}
            <TouchableOpacity style={styles.sendBtn} onPress={sendInvite}>
              <Text style={styles.sendText}>Send Invite</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  memberlistbox: {
    borderRadius: 10,
    borderColor: '#E2E8F9',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    height: 220,
    flex: 0,
    flexDirection: 'column',
  },

  memberlisttitle: {
    color: '#6C7278',
    fontSize: 12,
    fontWeight: 500,
    marginTop: 20,
  },
  memberlistbox2: {
    height: 180,
  },
  memberlistbox3: {
    height: 30,
    borderBlockColor: '#E2E8F9',
    borderBottomWidth: 1,

    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imagebox: {
    height: 30,
    width: 200,

    flex: 0,
    flexDirection: 'row',
  },
  image: {
    height: 27,
    width: 27,
    borderRadius: 10,
    marginRight: 10,
  },
  membertitle: {
    fontSize: 10,
    color: '#1B1C1E',
  },
  memberdate: {
    fontSize: 8,
    color: '#999999',
  },
  imagebox2: {
    width: 50,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 27,
    alignItems: 'center',
  },
  image2: {
    height: 14,
    width: 14,
  },
  addmemberbox: {
    height: 20,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },

  addmemberimg: {
    height: 14,
    width: 14,
    marginRight: 4,
  },
  addmembertxt: {
    fontSize: 12,
    color: '#999999',
    fontWeight: 500,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    height: '90%',
    marginTop: '100%',
  },

  modalTitleBox: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1B1C1E',
  },

  modalsharebox: {
    width: 85,
    height: 35,
    borderColor: '#E2E8F9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  modalsharetxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#1B1C1E',
  },
  modalFormTitle: {
    fontSize: 12,
    color: '#6C7278',
    fontWeight: 500,
    marginBottom: 4,
  },

  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  dropdownText: {
    fontSize: 14,
    color: '#1B1C1E',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    height: 46,
  },
  uploadBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  uploadText: {
    color: '#666',
  },
  preview: {
    height: 80,
    width: 80,
    borderRadius: 6,
    marginBottom: 10,
  },
  sendBtn: {
    backgroundColor: '#2C247A',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
    height: 48,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
});
