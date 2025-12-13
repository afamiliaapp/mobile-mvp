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
  const [selectedIcons, setSelectedIcons] = useState([]);

  const toggleIcon = key => {
    setSelectedIcons(prev => {
      if (prev.includes(key)) {
        return prev.filter(item => item !== key);
      }
      if (prev.length < 4) {
        return [...prev, key];
      }
      return prev;
    });
  };

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
                    renderItem={({ item }) => {
                      const isSelected = selectedNumber == item.toString();

                      return (
                        <TouchableOpacity
                          style={[
                            styles.item,
                            isSelected && styles.selectedItem, // add border if selected
                          ]}
                          onPress={() => {
                            setSelectedNumber(item.toString());
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.itemText}>{item}</Text>

                          {/* Radio Button */}
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
              {[
                {
                  key: 'saving',
                  label: 'Saving Money',
                  icon: require('../assets/money-bag-01.png'),
                },
                {
                  key: 'organize',
                  label: 'Staying Organized',
                  icon: require('../assets/icons8_stacking 1.png'),
                },
                {
                  key: 'memories',
                  label: 'Sharing Memories',
                  icon: require('../assets/camera-ai.png'),
                },
                {
                  key: 'connect',
                  label: 'Staying Connected',
                  icon: require('../assets/icons8_people_working_together_9 1.png'),
                },
              ]
                .reduce((rows, item, index) => {
                  if (index % 2 === 0) rows.push([]);
                  rows[rows.length - 1].push(item);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <View style={styles.inputiconsrow1} key={rowIndex}>
                    {row.map(item => (
                      <TouchableOpacity
                        key={item.key}
                        style={[
                          styles.inputiconsbox1,
                          selectedIcons.includes(item.key) && {
                            borderColor: '#2C247A',
                            borderWidth: 1,
                            borderRadius: 10,
                          },
                        ]}
                        onPress={() => toggleIcon(item.key)}
                      >
                        <Image
                          source={item.icon}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                          resizeMode="contain"
                        />
                        <Text style={styles.icontext}> {item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}

              <View style={styles.iconcountbox}>
                <Text>{selectedIcons.length}/4</Text>
              </View>
            </View>

            <View>
              <Text style={styles.termstext}>
                By continue means you agree to our{' '}
                <Text style={{ color: '#2C247A' }}>privacy policy </Text> &
                <Text style={{ color: '#2C247A' }}> terms & conditions</Text>
              </Text>
            </View>

            <View style={styles.continueBtn}>
              <Text style={styles.continuetxt}>Continue</Text>
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
    marginTop: 12,
    borderRadius: 20,
  },

  inputbox: {
    height: 557,
    backgroundColor: '',
    marginTop: 80,
  },
  inputbox1: {
    marginTop: 4,
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

    height: 50,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  inputbox3: {
    height: 230,

    marginTop: 20,
  },
  input3text: {
    fontSize: 12,
    color: '#6C7278',

    lineHeight: 20,
  },

  iconContainer: {
    marginTop: 10,
  },

  inputiconsrow1: {
    height: 56,
    flexDirection: 'row',
    flex: 0,
    backgroundColor: '',
    marginTop: 2,
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
  },
  icontext: {
    fontSize: 14,
    color: '#1B1C1E',
    fontWeight: 500,
  },
  iconcountbox: {
    marginTop: 5,
  },
  termstext: {
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
  },

  continueBtn: {
    height: 48,
    backgroundColor: '#2C247A',
    marginTop: 20,
    borderRadius: 10,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continuetxt: {
    fontSize: 16,
    color: '#fff',
  },
  selectedCircle: {
    width: 16,
    height: 16,
    borderRadius: 8, // makes it circular
    backgroundColor: '#2C247A',
    position: 'absolute',
    right: 10, // distance from right edge
    top: '50%',
    transform: [{ translateY: -8 }], // center vertically
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2C247A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: '100%',
    transform: [{ translateY: -10 }],
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2C247A',
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#2C247A',
    borderRadius: 10, // same as your item border radius
  },
});
