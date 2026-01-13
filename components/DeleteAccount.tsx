import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

export default function DeleteAccount() {
  const [ShowModalDeleteAcc, setShowModalDeleteAcc] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShowModalDeleteAcc(true);
        }}
        style={styles.deletebox}
      >
        <Text style={styles.delettext}>Delete your Account</Text>
      </TouchableOpacity>

      <Modal transparent animationType="slide" visible={ShowModalDeleteAcc}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalDelBox2}>
            <ScrollView>
              <View style={styles.modalTitleBox2}>
                <Text style={styles.modalTitle}>Delete your account</Text>
              </View>

              <View>
                <Text style={styles.timeselectorTitle}>
                  When you delete your account, you lose access to Afamilia
                  account services. and we permanently delete your personal
                  data.
                </Text>

                <TouchableOpacity
                  style={styles.timeselectbox2}
                  onPress={() => setChecked(prev => !prev)}
                  activeOpacity={0.7}
                >
                  {/* Radio Button */}
                  <View
                    style={[
                      styles.radioOuter,
                      checked && styles.radioOuterActive,
                    ]}
                  >
                    {checked && <View style={styles.radioInner} />}
                  </View>

                  <Text style={styles.timeselectorTitle3}>
                    Confirm that I want to delete my account
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.deletebox2}>
                <TouchableOpacity
                  style={styles.cancelbox2}
                  onPress={() => setShowModalDeleteAcc(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <View style={styles.savebox}>
                  <Text style={styles.saveboxtxt}>Delete</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  deletebox: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 40,
  },
  delettext: {
    color: '#ED0D0D',
    fontSize: 16,
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
    height: '98%',
    marginTop: '100%',
  },

  modalDelBox2: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    paddingHorizontal: 20,
    height: '40%',
    marginTop: '130%',
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

  timeselectbox: {
    height: 46,

    flex: 0,
    flexDirection: 'row',

    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  timeselectorTitle: {
    fontSize: 14,
    color: '#999999',
    fontWeight: 400,
    lineHeight: 18,
  },

  timeselectorTitle2: {
    fontSize: 14,
    color: '#1B1C1E',
  },

  timeselectorbox: {
    marginBottom: 30,
  },

  savebox: {
    height: 52,
    backgroundColor: '#ED0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    width: 152,
  },
  saveboxtxt: {
    color: '#fff',
    fontSize: 16,
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
  },

  timeselectbox2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  radioOuterActive: {
    borderColor: '#FF3B30', // danger color
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },

  timeselectorTitle3: {
    fontSize: 14,
    color: '#999999',
    fontWeight: 400,
    flex: 1,
  },

  deletebox2: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  cancelbox2: {
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,

    width: 152,
  },
});
