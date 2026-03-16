import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import CalendarBar from '../components/CalendarBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar as RNCalendar } from 'react-native-calendars';
import ThemedText from '../components/ThemedText';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const changeMonth = direction => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const saveEvent = () => {
    const newEvent = {
      name,
      description,
      startDate,
      endDate,
      category,
    };

    setEvents([...events, newEvent]);

    setName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setCategory('');

    setModalVisible(false);
  };

  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <AppContainer>
      <View style={styles.container}>
        <CalendarBar />

        <ScrollView style={styles.container2}>
          {/* MONTH NAVIGATION */}

          <View style={styles.monthChangerbox}>
            <View style={styles.monthChangerbox2}>
              <ThemedText style={styles.monthChangertext}>{month}</ThemedText>
              <ThemedText style={styles.monthChangertext}>{year}</ThemedText>
            </View>

            <View style={styles.monthNavBox}>
              <Pressable
                style={styles.monthNavBox2}
                onPress={() => changeMonth(-1)}
              >
                <Icon name="chevron-left" size={12} />
              </Pressable>

              <Pressable
                style={styles.monthNavBox2}
                onPress={() => changeMonth(1)}
              >
                <Icon name="chevron-right" size={12} />
              </Pressable>
            </View>
          </View>

          {/* CALENDAR */}

          <View style={styles.CalendarBox}>
            <RNCalendar
              current={currentDate.toISOString().split('T')[0]}
              onDayPress={day => setStartDate(day.dateString)}
            />
          </View>

          {/* SCHEDULED APPOINTMENTS */}

          <View style={styles.schedulesearch}>
            <View style={styles.scheduleBox2}>
              <ThemedText style={styles.monthChangertext}>
                Scheduled appointments
              </ThemedText>
            </View>

            <View style={styles.searchBox2}>
              <Icon name="search" size={16} color="#807d7d" />
            </View>
          </View>

          {/* NO EVENTS */}

          {events.length === 0 && (
            <View style={styles.addnewNoteBox}>
              <ThemedText style={styles.addneweventText1}>
                No family events yet
              </ThemedText>

              <ThemedText style={styles.addneweventText2}>
                Start by adding your first birthday, appointment, or reminder
              </ThemedText>

              <Pressable
                style={styles.addnewbutton}
                onPress={() => setModalVisible(true)}
              >
                <Icon name="plus" size={12} color="#fff" />
                <ThemedText style={{ color: '#fff', fontSize: 12 }}>
                  New event
                </ThemedText>
              </Pressable>
            </View>
          )}

          {/* EVENTS */}

          {events.map((event, index) => (
            <View key={index} style={styles.schedulebox2}>
              <View style={styles.schedulebox3}>
                <ThemedText style={styles.schedulebox3title}>
                  {event.name}
                </ThemedText>

                <ThemedText style={styles.schedulebox3text1}>
                  {event.description}
                </ThemedText>

                <View style={styles.scheduledatebox}>
                  <ThemedText style={styles.scheduletimetext}>
                    {event.startDate}
                  </ThemedText>

                  <Text style={styles.scheduletimelabel}>
                    {' '}
                    {event.category}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* MODAL */}

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder="Event name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput
              placeholder="Start date"
              value={startDate}
              onChangeText={setStartDate}
              style={[styles.input, { flex: 1 }]}
            />

            <TextInput
              placeholder="End date"
              value={endDate}
              onChangeText={setEndDate}
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <Pressable style={styles.saveBtn} onPress={saveEvent}>
            <Text style={{ color: '#fff' }}>Save</Text>
          </Pressable>
        </View>
      </Modal>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },

  container2: {
    marginTop: '20%',
    height: '100%',
  },

  monthChangerbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  monthChangerbox2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '25%',
  },

  monthChangertext: {
    fontSize: 16,
    color: '#1B1C1E',
  },

  monthNavBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },

  monthNavBox2: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#c9c3c3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CalendarBox: {
    height: 320,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  schedulesearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  scheduleBox2: {
    width: '80%',
  },

  searchBox2: {
    padding: 7,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#c9c3c3',
    borderRadius: 50,
  },

  addnewNoteBox: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addneweventText1: {
    color: '#060606',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },

  addneweventText2: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 15,
  },

  addnewbutton: {
    backgroundColor: '#2C247A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    justifyContent: 'center',
    marginTop: 15,
    width: 120,
    gap: 6,
  },

  schedulebox2: {
    height: 95,
    borderTopColor: '#E2E8F9',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
  },

  schedulebox3: {
    width: '75%',
    marginTop: 12,
  },

  schedulebox3title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  schedulebox3text1: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
    color: '#666',
  },

  scheduledatebox: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },

  scheduletimetext: {
    fontSize: 12,
    fontWeight: '500',
  },

  scheduletimelabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFB800',
    marginLeft: 5,
  },

  schedulebox4: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scheduleviewbtn: {
    flexDirection: 'row',
    height: 22,
    width: 60,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  scheduleviewtxt: {
    fontSize: 10,
    fontWeight: '400',
    marginRight: 4,
  },

  /* MODAL STYLES */

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1B1C1E',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: '#fff',
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  saveBtn: {
    backgroundColor: '#2C247A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelBtnText: {
    color: '#333',
    fontSize: 14,
  },
});
