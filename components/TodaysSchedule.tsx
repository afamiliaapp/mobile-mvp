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
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemedText from './ThemedText';
import { useEvents, Event } from '../context/Eventscontext';

export default function TodaysSchedule() {
  const { events, setEvents } = useEvents();

  const [showAll, setShowAll] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Get today's date string in same format as Calendar (e.g. "24 Mar 2025")
  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const todaysEvents = events.filter(e => e.date === todayStr);
  const displayedEvents = showAll ? todaysEvents : todaysEvents.slice(0, 1);

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setViewModalVisible(true);
  };

  const handleEditPress = () => {
    if (!selectedEvent) return;
    setName(selectedEvent.name);
    setDescription(selectedEvent.description);
    setCategory(selectedEvent.category);
    setEditModalVisible(true);
  };

  const updateEvent = () => {
    if (!selectedEvent) return;
    const updatedEvents = events.map(e =>
      e === selectedEvent ? { ...e, name, description, category } : e,
    );
    setEvents(updatedEvents);
    setSelectedEvent({ ...selectedEvent, name, description, category });
    setEditModalVisible(false);
    setViewModalVisible(false);
  };

  const deleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter(e => e !== selectedEvent));
    setDeleteModalVisible(false);
    setViewModalVisible(false);
  };

  return (
    <View style={styles.schedulebox}>
      <ThemedText variant="title" style={styles.scheduletitle}>
        Today's Schedule
      </ThemedText>

      {todaysEvents.length === 0 ? (
        <View style={styles.emptyBox}>
          <ThemedText style={styles.emptyText}>
            No events scheduled for today
          </ThemedText>
        </View>
      ) : (
        <>
          {displayedEvents.map((event, index) => (
            <View key={index} style={styles.schedulebox2}>
              <View style={styles.schedulebox3}>
                <ThemedText variant="title" style={styles.schedulebox3title}>
                  {event.name}
                </ThemedText>
                <ThemedText style={styles.schedulebox3text1}>
                  {event.description}
                </ThemedText>
                <View style={styles.scheduledatebox}>
                  <ThemedText style={styles.scheduletimetext}>
                    {event.time}{' '}
                  </ThemedText>
                  <ThemedText style={styles.scheduletimetext}>
                    | {event.date} |{' '}
                  </ThemedText>
                  <Text style={styles.scheduletimelabel}>{event.category}</Text>
                </View>
              </View>

              <View style={styles.schedulebox4}>
                <Pressable
                  style={styles.scheduleviewbtn}
                  onPress={() => handleViewEvent(event)}
                >
                  <ThemedText variant="title" style={styles.scheduleviewtxt}>
                    View
                  </ThemedText>
                  <Icon name="chevron-right" size={12} color="#999999" />
                </Pressable>
              </View>
            </View>
          ))}

          {todaysEvents.length > 1 && (
            <View style={styles.schedulebox5}>
              <Pressable
                style={styles.scheduleviewbtn2}
                onPress={() => setShowAll(prev => !prev)}
              >
                <ThemedText variant="title" style={styles.scheduleviewtxt2}>
                  {showAll ? 'Show less' : 'Show more'}
                </ThemedText>
                <Icon
                  name={showAll ? 'chevron-up' : 'chevron-down'}
                  size={12}
                  color="#999999"
                />
              </Pressable>
            </View>
          )}
        </>
      )}

      {/* VIEW MODAL */}
      <Modal
        visible={viewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.sheet}>
            {selectedEvent && (
              <>
                <View style={modalStyles.header}>
                  <ThemedText variant="title" style={modalStyles.headerTitle}>
                    {selectedEvent.name}
                  </ThemedText>
                  <View style={modalStyles.headerActions}>
                    <Pressable onPress={handleEditPress}>
                      <FontAwesome name="edit" size={14} color="#333" />
                    </Pressable>
                    <Pressable onPress={() => setDeleteModalVisible(true)}>
                      <FontAwesome name="trash" size={14} color="red" />
                    </Pressable>
                  </View>
                </View>

                <ThemedText style={modalStyles.label}>Description</ThemedText>
                <ThemedText variant="title" style={modalStyles.value}>
                  {selectedEvent.description}
                </ThemedText>

                <ThemedText style={modalStyles.label}>Time</ThemedText>
                <ThemedText variant="title" style={modalStyles.value}>
                  {selectedEvent.time}
                </ThemedText>

                <ThemedText style={modalStyles.label}>Date</ThemedText>
                <ThemedText variant="title" style={modalStyles.value}>
                  {selectedEvent.date}
                </ThemedText>

                <ThemedText style={modalStyles.label}>Category</ThemedText>
                <ThemedText variant="title" style={modalStyles.value}>
                  {selectedEvent.category}
                </ThemedText>

                <Pressable
                  style={modalStyles.closeBtn}
                  onPress={() => setViewModalVisible(false)}
                >
                  <Text style={{ color: '#333' }}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.sheet}>
            <ThemedText variant="title" style={modalStyles.headerTitle}>
              Edit Appointment
            </ThemedText>

            <ThemedText style={modalStyles.label}>Name</ThemedText>
            <TextInput
              value={name}
              onChangeText={setName}
              style={modalStyles.input}
            />

            <ThemedText style={modalStyles.label}>Description</ThemedText>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={modalStyles.input}
            />

            <ThemedText style={modalStyles.label}>Category</ThemedText>
            <TextInput
              value={category}
              onChangeText={setCategory}
              style={modalStyles.input}
            />

            <Pressable style={modalStyles.saveBtn} onPress={updateEvent}>
              <Text style={{ color: '#fff' }}>Update</Text>
            </Pressable>

            <Pressable
              style={modalStyles.closeBtn}
              onPress={() => setEditModalVisible(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        visible={deleteModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.sheet}>
            <ThemedText variant="title" style={modalStyles.headerTitle}>
              Delete Appointment
            </ThemedText>
            <ThemedText
              style={{ fontSize: 14, color: '#666', marginBottom: 25 }}
            >
              Are you sure you want to delete this appointment?
            </ThemedText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={[modalStyles.closeBtn, { flex: 1 }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text>Close</Text>
              </Pressable>
              <Pressable
                style={[
                  modalStyles.saveBtn,
                  { flex: 1, backgroundColor: 'red' },
                ]}
                onPress={deleteEvent}
              >
                <Text style={{ color: '#fff' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  schedulebox: { marginTop: 30, paddingHorizontal: 10 },
  scheduletitle: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  schedulebox2: {
    height: 95,
    borderTopColor: '#E2E8F9',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  schedulebox3: { width: '75%', marginTop: 12 },
  schedulebox3title: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  schedulebox3text1: { fontSize: 12, fontWeight: '400', marginBottom: 4 },
  scheduledatebox: { flexDirection: 'row', marginTop: 4, alignItems: 'center' },
  scheduletimetext: { fontSize: 12, fontWeight: '500' },
  scheduletimelabel: { fontSize: 12, fontWeight: '500', color: '#FFB800' },
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
  schedulebox5: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleviewbtn2: {
    flexDirection: 'row',
    height: 22,
    width: 88,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scheduleviewtxt2: { fontSize: 10, fontWeight: '400' },
  emptyBox: { paddingVertical: 20, alignItems: 'center' },
  emptyText: { fontSize: 13, color: '#999' },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  headerActions: { flexDirection: 'row', gap: 16 },
  label: { fontSize: 12, color: '#666', marginBottom: 4 },
  value: { fontSize: 15, fontWeight: '500', marginBottom: 16 },
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
  closeBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
