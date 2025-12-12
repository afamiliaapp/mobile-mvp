import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FamilyRoleDropdown from '../components/FamilyRoleDropdown ';

export default function SignupTwo() {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Create your family space</Text>
          <BackButton />
          <View style={styles.slideline}></View>
        </View>

        <View style={styles.inputbox}>
          <View>
            <Text style={styles.inputtext1}>How many are in your family?</Text>
            {/* Input Box */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.dropdownContainer}
            >
              <Text
                style={{ flex: 1, color: selectedNumber ? '#000' : '#888' }}
              >
                {selectedNumber || 'Choose a number'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={20}
                color="#888"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {/* Modal Dropdown */}
            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="fade"
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalBox}>
                  <FlatList
                    data={numbers}
                    keyExtractor={item => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          setSelectedNumber(item.toString());
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.itemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          {/** FAMILY DROP DOWN */}

          <View>
            <FamilyRoleDropdown />
          </View>

          {/** SET UP YOUR FAMILY SPACE */}

          <View style={styles.inputbox1}>
            {' '}
            <Text style={styles.inputtext1}>Set up your family space</Text>{' '}
            <TextInput
              placeholder="Enter preferred family space nameS"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />{' '}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffff',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  titlebox: {
    height: 90,
  },

  title: {
    fontSize: 32,
    color: '#1B1C1E',
    fontWeight: 700,
  },

  subtitle: {
    color: '#999999',
    fontWeight: 500,
    marginTop: 10,
  },

  slideline: {
    width: 50,
    height: 4,
    backgroundColor: '#2C247A',
    marginTop: 10,
    borderRadius: 20,
  },

  inputbox: {
    height: 557,
    backgroundColor: '',
    marginTop: 90,
  },
  inputbox1: {
    marginTop: 20,
  },
  inputtext1: {
    marginBottom: 5,
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

  dropdownInput: {
    flex: 1,
    fontSize: 16,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 300,
    marginTop: 40,
    width: '100%',
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});
