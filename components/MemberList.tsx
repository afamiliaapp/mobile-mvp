import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButton';
import ThemedText from './ThemedText';
import { ThemeContext } from '../context/ThemeContext';
import AppContainer from './AppContainer';

export default function MemberList() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [passport, setPassport] = useState(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!showModalDelete) {
      setAccepted(false);
    }
  }, [showModalDelete]);

  const pickPassport = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });

    if (!result.didCancel && result.assets?.length) {
      const asset = result.assets[0];

      setPassport({
        uri: asset.uri,
        name: asset.fileName || 'passport-image.jpg',
      });
    }
  };

  const sendInvite = () => {
    if (!role || !name || !email) {
      alert('Please fill all required fields');
      return;
    }

    const newMember = {
      id: Date.now(),
      name,
      role,
      addedAt: new Date().toLocaleDateString(),
      avatar: require('../assets/avata.png'), // default avatar
      email,
      birthdate,
      passport,
    };

    setMembers(prev => [...prev, newMember]);

    // Reset form
    setRole('');
    setName('');
    setEmail('');
    setBirthdate(null);
    setPassport(null);
    setShowRoleDropdown(false);

    setShowModal(false);
  };

  const updateMember = () => {
    if (!role || !name || !editingMemberId) {
      alert('Please fill all required fields');
      return;
    }

    setMembers(prev =>
      prev.map(member =>
        member.id === editingMemberId
          ? {
              ...member,
              name,
              role,
              email,
              birthdate,
              passport,
            }
          : member,
      ),
    );

    // Reset & close
    setEditingMemberId(null);
    setRole('');
    setName('');
    setEmail('');
    setBirthdate(null);
    setPassport(null);
    setShowRoleDropdown(false);

    setShowModalEdit(false);
  };

  const [role, setRole] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Ifeoma Orji',
      role: 'Mother',
      addedAt: '29th Feb 2025',
      avatar: require('../assets/avata.png'),
    },
  ]);

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
      <ThemedText style={styles.memberlisttitle}>Member list</ThemedText>

      <View style={styles.memberlistbox}>
        {/* Existing member */}
        <ScrollView>
          <View style={styles.memberlistbox2}>
            {members.map(member => (
              <View key={member.id} style={styles.memberlistbox3}>
                <View style={styles.imagebox}>
                  <Image style={styles.image} source={member.avatar} />

                  <View>
                    <ThemedText variant="title" style={styles.membertitle}>
                      {member.name}
                    </ThemedText>
                    <ThemedText style={styles.memberdate}>
                      {member.role} | Added {member.addedAt}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.imagebox2}>
                  {/**EDIT BUTTON */}
                  <TouchableOpacity
                    onPress={() => {
                      setEditingMemberId(member.id);
                      setRole(member.role);
                      setName(member.name);
                      setEmail(member.email || '');
                      setBirthdate(member.birthdate || null);
                      setPassport(member.passport || null);
                      setShowModalEdit(true);
                    }}
                  >
                    <Image
                      style={[styles.image2, { tintColor: theme.icon }]} // theme-aware color
                      source={require('../assets/pencil-edit-01 (1).png')}
                    />
                  </TouchableOpacity>

                  {/**DELETE BUTTON */}

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMember(member);
                      setShowModalDelete(true);
                    }}
                  >
                    <Image
                      style={styles.image2}
                      source={require('../assets/delete-02.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* ADD / INVITE */}
        <TouchableOpacity
          style={styles.addmemberbox}
          onPress={() => {
            setShowModal(true);
            setRole('');
            setName('');
            setEmail('');
            setBirthdate(null);
            setPassport(null);
          }}
        >
          <Image
            style={styles.addmemberimg}
            source={require('../assets/add-01.png')}
          />
          <Text style={styles.addmembertxt}>Add/Invite Member</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL for ADD / INVITE */}
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <View style={styles.modalTitleBox}>
                <Text style={styles.modalTitle}>Add/Invite member</Text>
                <View style={styles.modalsharebox}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false); // 👈 close invite modal
                      setShowModalShare(true);
                    }}
                  >
                    <Text style={styles.modalsharetxt}>Share Link</Text>
                  </TouchableOpacity>
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

              <View>
                <Text style={styles.modalFormTitle}>Upload Passport</Text>

                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={pickPassport}
                >
                  <Text
                    style={[
                      styles.fileName,
                      { color: passport ? '#1B1C1E' : '#999' },
                    ]}
                    numberOfLines={1}
                  >
                    {passport ? passport.name : 'No file selected'}
                  </Text>

                  <Text style={styles.uploadText}>
                    {passport ? 'Change File' : 'Upload'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.sendBtn} onPress={sendInvite}>
                <Text style={styles.sendText}>Send Invite</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL for EDIT MEMBER LIST */}
      <Modal transparent animationType="slide" visible={showModalEdit}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <View style={styles.modalTitleBox}>
                <Text style={styles.modalTitle}>Edit member</Text>
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

              <View>
                <Text style={styles.modalFormTitle}>Upload Passport</Text>

                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={pickPassport}
                >
                  <Text
                    style={[
                      styles.fileName,
                      { color: passport ? '#1B1C1E' : '#999' },
                    ]}
                    numberOfLines={1}
                  >
                    {passport ? passport.name : 'No file selected'}
                  </Text>

                  <Text style={styles.uploadText}>
                    {passport ? 'Change File' : 'Upload'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.sendBtn} onPress={updateMember}>
                <Text style={styles.sendText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowModalEdit(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL for SHARE LINK  */}
      <Modal transparent animationType="slide" visible={showModalShare}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox2}>
            <ScrollView>
              <View style={styles.modalTitleBox2}>
                <Text style={styles.modalTitle}>Share Link</Text>
                <BackButton />
              </View>

              {/* ROLE DROPDOWN */}
              <View>
                <Text style={styles.modalFormTitle2}>
                  Share it with anyone you wish to invite to your family space
                </Text>
              </View>

              {/* Name */}

              <View>
                <TextInput
                  placeholder="yourlink@Afamilia"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.sendBtn2}>
                <Text style={styles.sendText}>Share Via</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowModalShare(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL for DELETE  */}
      <Modal transparent animationType="slide" visible={showModalDelete}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalDelBox2}>
            <ScrollView>
              <View style={styles.modalTitleBox2}>
                <Text style={styles.modalTitle}>Delete member</Text>
              </View>

              {/* ROLE DROPDOWN */}
              <View>
                <Text style={styles.modalDeletetext}>
                  Are you sure you wish to delete this member
                </Text>
                <Text style={styles.modalDeletetext}>
                  This will revoke [Name]’s access to your family space. They
                  won’t see your calendar, chats, or memories anymore.
                </Text>

                <TouchableOpacity
                  style={styles.acceptRow}
                  onPress={() => setAccepted(!accepted)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      accepted && styles.radioOuterActive,
                    ]}
                  >
                    {accepted && <View style={styles.radioInner} />}
                  </View>

                  <Text style={styles.modalDeletetext}>
                    I understand this action cannot be undone
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Name */}

              {/* Buttons */}

              <View style={styles.deleteBox}>
                <TouchableOpacity
                  style={styles.cancelbtn}
                  onPress={() => setShowModalDelete(false)}
                >
                  <Text style={styles.cancelText2}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.deletebtn,
                    !accepted && styles.deleteBtnDisabled,
                  ]}
                  disabled={!accepted}
                  onPress={() => {
                    if (!selectedMember) return;

                    setMembers(prev =>
                      prev.filter(m => m.id !== selectedMember.id),
                    );

                    setAccepted(false);
                    setShowModalDelete(false);
                    setSelectedMember(null);
                  }}
                >
                  <Text
                    style={[
                      styles.sendText,
                      !accepted && styles.sendTextDisabled,
                    ]}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    fontSize: 12,
    fontWeight: 500,
    marginTop: 20,
  },
  memberlistbox2: {
    height: 180,
  },
  memberlistbox3: {
    paddingVertical: 6,
    borderBottomColor: '#E2E8F9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  memberdate: {
    fontSize: 8,
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
    flex: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    height: '98%',
    marginTop: '100%',
  },
  modalBox2: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    height: '58%',
    marginTop: '100%',
  },

  modalDelBox2: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    paddingHorizontal: 20,
    height: '58%',
    marginTop: '100%',
  },

  modalTitleBox: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  modalTitleBox2: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
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
  modalFormTitle2: {
    fontSize: 12,
    color: '#6C7278',
    fontWeight: 500,
    marginVertical: 8,
    marginTop: 30,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fileName: {
    flex: 1, // 👈 keeps text on the LEFT
    fontSize: 13,
    marginRight: 10,
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
  sendBtn2: {
    backgroundColor: '#2C247A',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 25,
    height: 48,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 15,
  },
  cancelText2: {
    textAlign: 'center',
    color: '#999',
  },

  modalDeletetext: {
    color: '#999999',
    fontSize: 14,
    fontWeight: 400,
    marginVertical: 10,
  },

  deleteBox: {
    height: 50,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  deletebtn: {
    height: 48,
    width: 152,
    backgroundColor: '#2C247A',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelbtn: {
    height: 48,
    width: 152,
    backgroundColor: '#fff',
    borderColor: '#E2E8F9',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  acceptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  radioOuterActive: {
    borderColor: '#D32F2F',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D32F2F',
  },

  deleteBtnDisabled: {
    opacity: 0.4,
  },

  sendTextDisabled: {
    color: '#fff',
  },
});
