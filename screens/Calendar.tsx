'use client';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';
import React, { useState, useRef } from 'react';
import AppContainer from '../components/AppContainer';
import CalendarBar from '../components/CalendarBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar as RNCalendar } from 'react-native-calendars';
import ThemedText from '../components/ThemedText';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButtonModal from '../components/BackButtonModal';
import { useEvents } from '../context/Eventscontext';

// ─── Swipeable event row ───────────────────────────────────────────────────────
const SWIPE_OPEN = -80; // px revealed when fully open

function SwipeableEventRow({ event, onView, onDeleteRequest }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      // Only capture horizontal gestures
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 8 && Math.abs(g.dy) < 15,
      onPanResponderMove: (_, g) => {
        const base = isOpen.current ? SWIPE_OPEN : 0;
        const next = Math.max(SWIPE_OPEN, Math.min(0, base + g.dx));
        translateX.setValue(next);
      },
      onPanResponderRelease: (_, g) => {
        // Open if swiped left past half-way, or nudged while already open
        const shouldOpen =
          g.dx < SWIPE_OPEN / 2 || (isOpen.current && g.dx < 10);
        isOpen.current = shouldOpen;
        Animated.spring(translateX, {
          toValue: shouldOpen ? SWIPE_OPEN : 0,
          useNativeDriver: true,
          tension: 80,
          friction: 12,
        }).start();
      },
    }),
  ).current;

  const snapClosed = () => {
    isOpen.current = false;
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  };

  return (
    <View style={styles.swipeWrapper}>
      {/* RED DELETE ZONE — sits behind the sliding row */}
      <Pressable
        style={styles.deleteReveal}
        onPress={() => {
          snapClosed();
          onDeleteRequest(event);
        }}
      >
        <Icon name="trash" size={18} color="#fff" />
      </Pressable>

      {/* SLIDING ROW */}
      <Animated.View
        style={[styles.schedulebox2, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.schedulebox3}>
          <ThemedText variant="title" style={styles.schedulebox3title}>
            {event.name}
          </ThemedText>
          <ThemedText style={styles.schedulebox3text1}>
            {event.description}
          </ThemedText>
          <View style={styles.scheduledatebox}>
            <ThemedText style={styles.scheduletimetext}>
              {event.time}
            </ThemedText>
            <ThemedText style={styles.scheduletimetext}>
              {' | '} {event.date} {' | '}
            </ThemedText>
            <Text style={styles.scheduletimelabel}>{event.category}</Text>
          </View>
        </View>

        <View style={styles.schedulebox4}>
          <Pressable
            style={styles.scheduleviewbtn}
            onPress={() => onView(event)}
          >
            <ThemedText variant="title" style={styles.scheduleviewtxt}>
              View
            </ThemedText>
            <Icon name="chevron-right" size={12} color="#999999" />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── Main Calendar screen ──────────────────────────────────────────────────────
export default function Calendar() {
  const { events, setEvents } = useEvents();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Unified delete target — set by swipe OR by view-modal trash icon
  const [deleteTarget, setDeleteTarget] = useState(null);

  const changeMonth = direction => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleViewEvent = event => {
    setSelectedEvent(event);
    setViewModalVisible(true);
  };

  const openDeleteModal = target => {
    setDeleteTarget(target);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setEvents(events.filter(e => e !== deleteTarget));
    setDeleteTarget(null);
    setDeleteModalVisible(false);
    setViewModalVisible(false);
  };

  const formatDateLabel = d =>
    d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatYMDtoLabel = ymd => {
    const [y, m, day] = ymd.split('-').map(Number);
    return formatDateLabel(new Date(y, m - 1, day));
  };

  const filteredEvents = selectedDate
    ? events.filter(e => e.date === formatYMDtoLabel(selectedDate))
    : events;

  const markedDates = events.reduce((acc, event) => {
    const parts = event.date.split(' ');
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const d = new Date(Number(parts[2]), monthMap[parts[1]], Number(parts[0]));
    const key = d.toISOString().split('T')[0];
    if (!acc[key]) acc[key] = { marked: true, dotColor: '#2C247A' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: '#2C247A',
    };
  }

  const saveEvent = () => {
    const formattedDate = formatDateLabel(date);
    const formattedStartTime = startTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newEvent = {
      name,
      description,
      date: formattedDate,
      time: formattedStartTime,
      category,
    };
    setEvents([...events, newEvent]);
    setName('');
    setDescription('');
    setCategory('');
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setModalVisible(false);
  };

  const updateEvent = () => {
    const updatedEvents = events.map(e =>
      e === selectedEvent ? { ...e, name, description, category } : e,
    );
    setEvents(updatedEvents);
    setEditModalVisible(false);
    setViewModalVisible(false);
  };

  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const eventsHeading = selectedDate
    ? `Events on ${formatYMDtoLabel(selectedDate)}`
    : 'Scheduled appointments';
  const showFAB = selectedDate && filteredEvents.length > 0;

  return (
    <>
      <AppContainer>
        <View style={styles.container}>
          <CalendarBar />

          <ScrollView
            style={styles.container2}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
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
                key={currentDate.toISOString()}
                current={currentDate.toISOString().split('T')[0]}
                markedDates={markedDates}
                onDayPress={day => {
                  setDate(new Date(day.dateString));
                  setSelectedDate(day.dateString);
                }}
              />
            </View>

            {/* SECTION HEADER */}
            <View style={styles.schedulesearch}>
              <View style={styles.scheduleBox2}>
                <ThemedText style={styles.monthChangertext}>
                  {eventsHeading}
                </ThemedText>
              </View>
              <View style={styles.searchBox2}>
                <Icon name="search" size={16} color="#807d7d" />
              </View>
            </View>

            {/* NO EVENTS */}
            {filteredEvents.length === 0 && (
              <View style={styles.addnewNoteBox}>
                <ThemedText style={styles.addneweventText1}>
                  {selectedDate
                    ? 'No events on this day'
                    : 'No family events yet'}
                </ThemedText>
                <ThemedText style={styles.addneweventText2}>
                  {selectedDate
                    ? 'Tap the button below to add one'
                    : 'Start by adding your first birthday, appointment, or reminder'}
                </ThemedText>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={({ pressed }) => [
                    styles.addnewbutton,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Icon name="plus" size={12} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 12 }}>New event</Text>
                </Pressable>
              </View>
            )}

            {/* EVENTS LIST — swipeable */}
            {filteredEvents.map((event, index) => (
              <SwipeableEventRow
                key={index}
                event={event}
                onView={handleViewEvent}
                onDeleteRequest={openDeleteModal}
              />
            ))}
          </ScrollView>
        </View>

        {/* FLOATING ADD BUTTON */}
        {showFAB && (
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [
              styles.fab,
              pressed && { opacity: 0.75, transform: [{ scale: 0.96 }] },
            ]}
          >
            <Icon name="plus" size={12} color="#000" />
            <Text style={styles.fabText}>New event</Text>
          </Pressable>
        )}
      </AppContainer>

      {/* ADD EVENTS MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              height: '70%',
            }}
          >
            <ThemedText
              style={{
                fontSize: 20,
                color: '#1B1C1E',
                marginBottom: 20,
                fontWeight: '600',
              }}
              variant="title"
            >
              Add appointments
            </ThemedText>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ThemedText style={styles.formtitle}>Name</ThemedText>
              <TextInput
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <ThemedText style={styles.formtitle}>Description</ThemedText>
              <TextInput
                placeholder="Enter Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <ThemedText style={styles.formtitle}>Start-End time</ThemedText>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable
                  style={[styles.input, { flex: 1 }]}
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text>
                    {startTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.input, { flex: 1 }]}
                  onPress={() => setShowEndTimePicker(true)}
                >
                  <Text>
                    {endTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Pressable>
              </View>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(e, t) => {
                    setShowStartTimePicker(false);
                    if (t) setStartTime(t);
                  }}
                />
              )}
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(e, t) => {
                    setShowEndTimePicker(false);
                    if (t) setEndTime(t);
                  }}
                />
              )}
              <ThemedText style={styles.formtitle}>Date</ThemedText>
              <Pressable
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toDateString()}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    setShowDatePicker(false);
                    if (d) setDate(d);
                  }}
                />
              )}
              <ThemedText style={styles.formtitle}>Categories</ThemedText>
              <TextInput
                placeholder="Birthday, Meeting, Reminder..."
                value={category}
                onChangeText={setCategory}
                style={styles.input}
              />
              <Pressable style={styles.saveBtn} onPress={saveEvent}>
                <Text style={{ color: '#fff' }}>Save</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* VIEW EVENTS MODAL */}
      <Modal
        visible={viewModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingTop: 5,
              height: '90%',
            }}
          >
            {selectedEvent && (
              <>
                <BackButtonModal
                  closeModal={() => setViewModalVisible(false)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <ThemedText
                    variant="title"
                    style={{ fontSize: 16, fontWeight: '500' }}
                  >
                    {selectedEvent.name}
                  </ThemedText>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Pressable
                      onPress={() => {
                        setName(selectedEvent.name);
                        setDescription(selectedEvent.description);
                        setCategory(selectedEvent.category);
                        setEditModalVisible(true);
                      }}
                    >
                      <Icon name="edit" size={14} color="#333" />
                    </Pressable>
                    <Pressable onPress={() => openDeleteModal(selectedEvent)}>
                      <Icon name="trash" size={14} color="red" />
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 13, marginBottom: 15 }}>
                    Description
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      marginBottom: 20,
                      fontWeight: '500',
                    }}
                    variant="title"
                  >
                    {selectedEvent.description}
                  </ThemedText>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <ThemedText
                    style={{ fontSize: 13, marginBottom: 15 }}
                    variant="title"
                  >
                    Start - End Time
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      marginBottom: 20,
                      fontWeight: '500',
                    }}
                    variant="title"
                  >
                    {selectedEvent.time}
                  </ThemedText>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 13, marginBottom: 15 }}>
                    Date
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      marginBottom: 20,
                      fontWeight: '500',
                    }}
                    variant="title"
                  >
                    {selectedEvent.date}
                  </ThemedText>
                </View>
                <ThemedText style={{ fontSize: 13, marginBottom: 15 }}>
                  Category
                </ThemedText>
                <ThemedText
                  style={{ fontSize: 16, marginBottom: 20, fontWeight: '500' }}
                  variant="title"
                >
                  {selectedEvent.category}
                </ThemedText>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              height: '70%',
            }}
          >
            <ThemedText
              style={{ fontSize: 20, marginBottom: 20, fontWeight: '600' }}
            >
              Edit appointments
            </ThemedText>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ThemedText style={styles.formtitle}>Name</ThemedText>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <ThemedText style={styles.formtitle}>Description</ThemedText>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <ThemedText style={styles.formtitle}>Category</ThemedText>
              <TextInput
                value={category}
                onChangeText={setCategory}
                style={styles.input}
              />
              <Pressable style={styles.saveBtn} onPress={updateEvent}>
                <Text style={{ color: '#fff' }}>Update</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setEditModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        visible={deleteModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 30,
              borderRadius: 12,
            }}
          >
            <ThemedText
              style={{ fontSize: 20, fontWeight: '600', marginBottom: 15 }}
              variant="title"
            >
              Delete Appointment
            </ThemedText>
            <ThemedText
              style={{ fontSize: 14, color: '#666', marginBottom: 25 }}
            >
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: '700', color: '#1B1C1E' }}>
                {deleteTarget?.name}
              </Text>
              ? This cannot be undone.
            </ThemedText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={[styles.cancelBtn, { flex: 1 }]}
                onPress={() => {
                  setDeleteTarget(null);
                  setDeleteModalVisible(false);
                }}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.saveBtn,
                  { flex: 1, backgroundColor: '#E53E3E' },
                ]}
                onPress={confirmDelete}
              >
                <Text style={{ color: '#fff' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 10, flex: 1 },
  container2: { marginTop: '20%' },
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
  monthChangertext: { fontSize: 16, color: '#1B1C1E' },
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
  scheduleBox2: { width: '80%' },
  searchBox2: {
    padding: 7,
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

  // Swipe
  swipeWrapper: {
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10,
    borderTopColor: '#E2E8F9',
    borderTopWidth: 1,
  },
  deleteReveal: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedulebox2: {
    height: 95,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  schedulebox3: { width: '75%', marginTop: 12 },
  schedulebox3title: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  schedulebox3text1: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
    color: '#666',
  },
  scheduledatebox: { flexDirection: 'row', marginTop: 4, alignItems: 'center' },
  scheduletimetext: { fontSize: 12, fontWeight: '500' },
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
  scheduleviewtxt: { fontSize: 10, fontWeight: '400', marginRight: 4 },

  modalContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
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
  formtitle: { fontSize: 12, marginBottom: 5 },
  fab: {
    position: 'absolute',
    bottom: 18,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    shadowColor: '#4d4d4e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
