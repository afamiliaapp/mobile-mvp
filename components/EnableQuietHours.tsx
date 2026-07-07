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
import ThemedText from './ThemedText';

export default function EnableQuietHours() {
  const [ShowModalQuietHour, setShowModalQuietHour] = useState(false);

  return (
    <View>
      <View style={styles.settingsbox3}>
        <ThemedText style={styles.subtitletxt}>Enable Quiet Hours</ThemedText>

        <TouchableOpacity
          onPress={() => {
            setShowModalQuietHour(true);
          }}
        >
          <Image
            style={styles.editImg}
            source={require('../assets/pencil-edit-01 (2).png')}
          />
        </TouchableOpacity>

        {/* MODAL for DELETE  */}
        <Modal transparent animationType="slide" visible={ShowModalQuietHour}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalDelBox2}>
              <ScrollView>
                <View style={styles.modalTitleBox2}>
                  <Text style={styles.modalTitle}>Enable quiet hour</Text>
                </View>

                <View style={styles.timeselectorbox}>
                  <Text style={styles.timeselectorTitle}>Start Time</Text>

                  <View style={styles.timeselectbox}>
                    <Text style={styles.timeselectorTitle2}>
                      Select start time
                    </Text>

                    <Image source={require('../assets/clock-01.png')} />
                  </View>
                </View>

                <View>
                  <Text style={styles.timeselectorTitle}>Start Time</Text>

                  <View style={styles.timeselectbox}>
                    <Text style={styles.timeselectorTitle2}>
                      Select end time
                    </Text>

                    <Image source={require('../assets/clock-01.png')} />
                  </View>
                </View>

                <View style={styles.savebox}>
                  <Text style={styles.saveboxtxt}>Save</Text>
                </View>

                <TouchableOpacity onPress={() => setShowModalQuietHour(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsbox3: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitletxt: {
    fontSize: 12,
    fontWeight: 500,

    marginVertical: 15,
  },

  editImg: {
    height: 22,
    width: 22,
    marginRight: 12,
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

  timeselectbox: {
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  timeselectorTitle: {
    fontSize: 12,
    color: '#6C7278',
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
    backgroundColor: '#2C247A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  saveboxtxt: {
    color: '#fff',
    fontSize: 16,
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
