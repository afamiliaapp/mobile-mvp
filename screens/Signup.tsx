import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Example country list (expand as needed)
const countries = [
  { name: 'Nigeria', code: 'NG', callingCode: '234', flag: '🇳🇬' },
  { name: 'Ghana', code: 'GH', callingCode: '233', flag: '🇬🇭' },
  { name: 'United States', code: 'US', callingCode: '1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', callingCode: '44', flag: '🇬🇧' },
];

const languages = [
  {
    code: 'en',
    country: 'United States',
    label: 'English',
    flag: 'https://flagsapi.com/US/flat/64.png',
  },
  {
    code: 'fr',
    country: 'France',
    label: 'French',
    flag: 'https://flagsapi.com/FR/flat/64.png',
  },
  {
    code: 'es',
    country: 'Spain',
    label: 'Spanish',
    flag: 'https://flagsapi.com/ES/flat/64.png',
  },
  {
    code: 'it',
    country: 'Italy',
    label: 'Italian',
    flag: 'https://flagsapi.com/IT/flat/64.png',
  },
  {
    code: 'cn',
    country: 'China',
    label: 'Chinese',
    flag: 'https://flagsapi.com/CN/flat/64.png',
  },
  {
    code: 'de',
    country: 'Germany',
    label: 'German',
    flag: 'https://flagsapi.com/DE/flat/64.png',
  },
  {
    code: 'ru',
    country: 'Russia',
    label: 'Russian',
    flag: 'https://flagsapi.com/RU/flat/64.png',
  },
];

const Signup = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Create your family space</Text>
          <View style={styles.slideline}></View>
        </View>

        <View style={styles.formbox}>
          {/**FULL NAME  INPUT */}
          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>Full name</Text>

            <TextInput
              placeholder="Enter full name"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />
          </View>

          {/**EMAIL INPUT */}
          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>Email</Text>

            <TextInput
              placeholder="Enter Email"
              style={{
                height: 46,
                borderWidth: 1,
                borderColor: '#E2E8F9',
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
            />
          </View>

          {/**PHONE NUMBER INPUT */}

          <View style={styles.inputbox2}>
            <Text style={styles.inputtext2}>Phone Number</Text>

            <View style={styles.inputContainer}>
              {/* Country flag dropdown */}
              <TouchableOpacity
                style={styles.countryBox}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.callingCode}>
                  +{selectedCountry.callingCode}
                </Text>
              </TouchableOpacity>

              {/* Phone number input */}
              <TextInput
                placeholder="812 345 6789"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
              />
            </View>

            {/* Modal for selecting country */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                  <Text style={styles.modalTitle}>Select Country</Text>
                  <FlatList
                    data={countries}
                    keyExtractor={item => item.code}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.countryRow}
                        onPress={() => {
                          setSelectedCountry(item);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.flag}>{item.flag}</Text>
                        <Text style={styles.countryName}>{item.name}</Text>
                        <Text style={styles.countryCode}>
                          +{item.callingCode}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>

          {/**LANGUAGE INPUT */}

          <View style={styles.inputbox1}>
            <Text style={styles.inputtext1}>Language preference</Text>

            {/* INPUT BOX */}
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDropdown(true)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langinput,
                  { color: selectedLanguage ? '#000' : '#999' },
                ]}
              >
                {selectedLanguage
                  ? selectedLanguage.label
                  : 'Choose a language'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={20}
                color="#7A7A7A"
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* DROPDOWN MODAL */}
            <Modal transparent visible={showDropdown} animationType="fade">
              <View style={styles.overlay}>
                {/* Tap outside to close */}
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => setShowDropdown(false)}
                />

                {/* Actual dropdown NOT touch-blocked */}
                <View style={styles.dropdownBox}>
                  <FlatList
                    data={languages}
                    keyExtractor={item => item.code}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.dropdownItem,
                          selectedLanguage?.code === item.code && {
                            borderWidth: 1,
                            borderColor: '#2C247A',
                            borderRadius: 10,
                            backgroundColor: '#F7F6FF',
                          },
                        ]}
                        onPress={() => {
                          setSelectedLanguage(item);
                          setShowDropdown(false);
                        }}
                      >
                        <Image
                          source={{ uri: item.flag }}
                          style={styles.flag2}
                        />
                        <Text style={styles.langText}>{item.label}</Text>

                        <View style={styles.radioOuter}>
                          {selectedLanguage?.code === item.code && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 30,
    paddingHorizontal: 24,
    width: '100%',
    backgroundColor: '#fff',
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

  //FORM STYLING

  formbox: {
    height: 538,
    backgroundColor: 'pink',
    marginTop: 40,
  },

  inputbox1: {
    height: 69,
    marginBottom: 20,
  },
  inputtext1: {
    marginBottom: 5,
    fontSize: 12,
    color: '#6C7278',
    fontWeight: 500,
  },

  inputbox2: {
    marginBottom: 20,
  },
  inputtext2: {
    marginBottom: 5,
    fontWeight: '500',
    color: '#6C7278',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 10,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flag: {
    fontSize: 20,
    marginRight: 4,
  },
  callingCode: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 12,
    padding: 16,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  countryCode: {
    fontSize: 16,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  langinput: {
    flex: 1, // take available space
    height: '100%',
    fontSize: 14,
  },

  icon: {
    marginLeft: 10,
  },

  // DROPDOWN
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 3,
    width: '100%',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10, // <--- add this
    marginVertical: 4, // spacing between items
  },
  flag2: {
    width: 28,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  langText: {
    fontSize: 16,
    color: '#333',
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2C247A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto', // push it to the right
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#2C247A',
  },
});
