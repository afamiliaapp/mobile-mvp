import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Image,
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
              placeholder="Enter preferred family space name"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />{' '}
          </View>

          <View style={styles.inputbox3}>
            <Text style={styles.input3text}>
              Tell us what matters most to your family right now. We’ll
              highlight the right tools for you.
            </Text>

            <View style={styles.iconContainer}>
              {/** INPUTE ICONS ROW 1 */}
              <View style={styles.inputiconsrow1}>
                <View style={styles.inputiconsbox1}>
                  <Image
                    source={require('../assets/money-bag-01.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.icontext}> Saving Money</Text>
                </View>
                <View style={styles.inputiconsbox1}>
                  <Image
                    source={require('../assets/icons8_stacking 1.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.icontext}> Staying Organized</Text>
                </View>
              </View>

              {/** INPUTE ICONS ROW 2 */}
              <View style={styles.inputiconsrow1}>
                <View style={styles.inputiconsbox1}>
                  <Image
                    source={require('../assets/camera-ai.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.icontext}> Sharing Memories</Text>
                </View>
                <View style={styles.inputiconsbox1}>
                  <Image
                    source={require('../assets/icons8_people_working_together_9 1.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.icontext}> Staying Connected</Text>
                </View>
              </View>

              <View style={styles.iconcountbox}>
                <Text>0/4</Text>
              </View>
            </View>
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
  inputbox3: {
    height: 230,
    backgroundColor: '',

    marginTop: 20,
  },
  input3text: {
    fontSize: 12,
    color: '#6C7278',
  },

  iconContainer: {
    marginTop: 10,
  },

  inputiconsrow1: {
    height: 56,
    flexDirection: 'row',
    flex: 0,
    backgroundColor: '',
    marginTop: 10,
    alignItems: 'center',
  },
  inputiconsbox1: {
    flex: 0,
    width: '48%',
    height: 46,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  icontext: {
    fontSize: 14,
    color: '#1B1C1E',
    fontWeight: 500,
  },
  iconcountbox: {
    marginTop: 15,
  },
});
