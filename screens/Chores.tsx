'use client';
import AppContainer from '../components/AppContainer';
import ChoresBar from '../components/ChoresBar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useChores, Chore } from '../context/ChoreContext';
import ThemedText from '../components/ThemedText';

type Tab = 'all' | 'open' | 'closed';
type MemberTag = { id: string; label: string };

const ChoreCard = ({
  item,
  onToggle,
  onView,
}: {
  item: Chore;
  onToggle: () => void;
  onView: () => void;
}) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.topRow}>
      <Text style={cardStyles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={[
          cardStyles.check,
          item.status === 'closed' && cardStyles.checkDone,
        ]}
        onPress={onToggle}
      >
        {item.status === 'closed' && (
          <Icon name="check" size={11} color="#fff" />
        )}
      </TouchableOpacity>
    </View>

    {item.description ? (
      <Text style={cardStyles.description} numberOfLines={1}>
        {item.description}
      </Text>
    ) : null}

    <View style={cardStyles.bottomRow}>
      <View style={cardStyles.meta}>
        <Text style={cardStyles.metaText}>
          {item.dueTime} | {item.dueDate} | {item.assigneeCount}+ member
        </Text>
        {item.overdue && <Text style={cardStyles.overdue}> | Overdue</Text>}
      </View>
      <TouchableOpacity
        style={cardStyles.viewBtn}
        onPress={onView}
        activeOpacity={0.7}
      >
        <Text style={cardStyles.viewBtnText}>View</Text>
        <Icon name="chevron-right" size={13} color="#2C247A" />
      </TouchableOpacity>
    </View>
  </View>
);

const Chores = ({ route, navigation }: any) => {
  const [activeTab, setActiveTab] = useState<Tab>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const { chores, toggleStatus, addChore, updateChore } = useChores();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [choreName, setChoreName] = useState('');
  const [choreDesc, setChoreDesc] = useState('');
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState<MemberTag[]>([]);
  const [reminder, setReminder] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (route.params?.editItem) {
      const item = route.params.editItem;
      setChoreName(item.title);
      setChoreDesc(item.description);
      setEditingId(item.id);
      setIsModalVisible(true);
      navigation.setParams({ editItem: undefined });
    }
  }, [route.params?.editItem]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (d: Date) =>
    d.toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const addMemberTag = () => {
    const val = memberInput.trim();
    if (!val) return;
    setMembers(prev => [...prev, { id: Date.now().toString(), label: val }]);
    setMemberInput('');
  };

  const removeMemberTag = (id: string) =>
    setMembers(prev => prev.filter(m => m.id !== id));

  const resetForm = () => {
    setChoreName('');
    setChoreDesc('');
    setDueTime(null);
    setDueDate(null);
    setMembers([]);
    setMemberInput('');
    setReminder(false);
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const handleSave = () => {
    if (!choreName.trim()) return;
    const now = new Date();
    const isOverdue = !!dueDate && dueDate < now;

    const chore: Chore = {
      id: editingId || Date.now().toString(),
      title: choreName.trim(),
      description: choreDesc.trim(),
      assigneeCount: members.length || 1,
      dueDate: dueDate ? formatDate(dueDate) : 'No due date',
      dueTime: dueTime ? formatTime(dueTime) : '--:--',
      status: 'open',
      overdue: isOverdue,
    };

    // ✅ Fix: update if editing, add if new
    if (editingId) {
      updateChore(chore);
    } else {
      addChore(chore);
    }

    closeModal();
  };

  const filtered = chores.filter(c => {
    const matchesTab = activeTab === 'all' ? true : c.status === activeTab;
    const matchesSearch = c.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const allCount = chores.length;
  const openCount = chores.filter(c => c.status === 'open').length;
  const closedCount = chores.filter(c => c.status === 'closed').length;

  const tabLabel = (tab: Tab) => {
    if (tab === 'all') return `All (${allCount})`;
    if (tab === 'open') return `Open (${openCount})`;
    return `Closed (${closedCount})`;
  };

  const renderChore = ({ item }: { item: Chore }) => (
    <ChoreCard
      item={item}
      onToggle={() => toggleStatus(item.id)}
      onView={() => navigation.navigate('ChoreDetails', { item })}
    />
  );

  return (
    <>
      <AppContainer>
        <SafeAreaView style={styles.container}>
          <View>
            <ChoresBar />
          </View>

          {/* TAB TOGGLE */}
          <View style={styles.tabContainer}>
            {(['all', 'open', 'closed'] as Tab[]).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <ThemedText
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tabLabel(tab)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={16}
              color="#A9A9A9"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search chores"
              placeholderTextColor="#A9A9A9"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="x" size={16} color="#A9A9A9" />
              </TouchableOpacity>
            )}
          </View>

          {/* LIST */}
          {filtered.length > 0 ? (
            <FlatList
              data={filtered}
              renderItem={renderChore}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Icon name="clipboard" size={48} color="#E0E0E0" />
              <ThemedText style={styles.emptyTitle}>
                No chores assigned yet.
              </ThemedText>
              <ThemedText style={styles.emptySubtitle}>
                Add your first family task to get started
              </ThemedText>
              <TouchableOpacity
                style={styles.newChoreBtn}
                onPress={() => setIsModalVisible(true)}
              >
                <Icon
                  name="plus"
                  size={14}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.newChoreBtnText}>New chores</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* FAB */}
          {filtered.length > 0 && (
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="plus" size={22} color="#fff" />
            </TouchableOpacity>
          )}

          {/* ✅ FIXED MODAL */}
          <Modal visible={isModalVisible} animationType="slide" transparent>
            <View style={styles.overlay}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <ThemedText variant="title" style={styles.modalTitle}>
                      {editingId ? 'Edit Chore' : 'New Chore'}
                    </ThemedText>
                    <TouchableOpacity onPress={closeModal}>
                      <Icon name="x" size={22} color="#1C1C1E" />
                    </TouchableOpacity>
                  </View>

                  {/* Chore Name */}
                  <View style={styles.field}>
                    <ThemedText style={styles.fieldLabel}>
                      CHORE NAME
                    </ThemedText>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Wash the dishes"
                      placeholderTextColor="#b8b8b8"
                      value={choreName}
                      onChangeText={setChoreName}
                    />
                  </View>

                  {/* Description */}
                  <View style={styles.field}>
                    <ThemedText style={styles.fieldLabel}>
                      DESCRIPTION
                    </ThemedText>
                    <TextInput
                      style={[
                        styles.input,
                        { height: 80, textAlignVertical: 'top' },
                      ]}
                      placeholder="Optional details..."
                      placeholderTextColor="#b8b8b8"
                      value={choreDesc}
                      onChangeText={setChoreDesc}
                      multiline
                    />
                  </View>

                  {/* Due Time */}
                  <View style={styles.field}>
                    <ThemedText style={styles.fieldLabel}>DUE TIME</ThemedText>
                    <TouchableOpacity
                      style={styles.inputRow}
                      onPress={() => setShowTimePicker(true)}
                    >
                      <ThemedText
                        style={
                          dueTime ? styles.inputText : styles.inputPlaceholder
                        }
                      >
                        {dueTime ? formatTime(dueTime) : 'Select time'}
                      </ThemedText>
                      <Icon name="clock" size={16} color="#9b9b9b" />
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={dueTime ?? new Date()}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, date) => {
                          setShowTimePicker(false);
                          if (date) setDueTime(date);
                        }}
                      />
                    )}
                  </View>

                  {/* Due Date */}
                  <View style={styles.field}>
                    <ThemedText style={styles.fieldLabel}>DUE DATE</ThemedText>
                    <TouchableOpacity
                      style={styles.inputRow}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <ThemedText
                        style={
                          dueDate ? styles.inputText : styles.inputPlaceholder
                        }
                      >
                        {dueDate ? formatDate(dueDate) : 'Select date'}
                      </ThemedText>
                      <Icon name="calendar" size={16} color="#9b9b9b" />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={dueDate ?? new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, date) => {
                          setShowDatePicker(false);
                          if (date) setDueDate(date);
                        }}
                      />
                    )}
                  </View>

                  {/* Members */}
                  <View style={styles.field}>
                    <ThemedText style={styles.fieldLabel}>
                      ASSIGN MEMBERS
                    </ThemedText>
                    <View style={styles.memberWrap}>
                      {members.map(m => (
                        <View key={m.id} style={styles.tag}>
                          <Text style={styles.tagText}>{m.label}</Text>
                          <TouchableOpacity
                            onPress={() => removeMemberTag(m.id)}
                          >
                            <Text style={styles.tagClose}>×</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TextInput
                        style={styles.memberInput}
                        placeholder="Add member..."
                        placeholderTextColor="#b8b8b8"
                        value={memberInput}
                        onChangeText={setMemberInput}
                        onSubmitEditing={addMemberTag}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  {/* Reminder */}
                  <View style={styles.reminderRow}>
                    <ThemedText style={styles.reminderLabel}>
                      Set Reminder
                    </ThemedText>
                    <Switch
                      value={reminder}
                      onValueChange={setReminder}
                      trackColor={{ false: '#E5E5EA', true: '#2C247A' }}
                      thumbColor="#fff"
                    />
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    style={[
                      styles.saveBtn,
                      !choreName.trim() && styles.saveBtnDisabled,
                    ]}
                    onPress={handleSave}
                    disabled={!choreName.trim()}
                  >
                    <Text style={styles.saveBtnText}>
                      {editingId ? 'Update Chore' : 'Save'}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </AppContainer>
    </>
  );
};

export default Chores;

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: '#2C247A', borderColor: '#2C247A' },
  description: { fontSize: 13, color: '#8E8E93', marginBottom: 10 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  metaText: { fontSize: 11, color: '#8E8E93' },
  overdue: { fontSize: 11, color: '#FF3B30', fontWeight: '600' },
  viewBtn: { flexDirection: 'row', alignItems: 'center' },
  viewBtnText: { fontSize: 12, color: '#2C247A', fontWeight: '600' },
});

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  tabContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    margin: 16,
    overflow: 'hidden',
    marginTop: '15%',
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { backgroundColor: '#2C247A' },
  tabText: { fontSize: 13, fontWeight: '500', color: '#8E8E93' },
  activeTabText: { color: '#fff', fontWeight: '700' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1C1C1E' },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
    textAlign: 'center',
  },
  newChoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C247A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  newChoreBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  listContainer: { paddingHorizontal: 16, paddingBottom: 100 },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2C247A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#2C247A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f0e17',
    letterSpacing: -0.5,
  },
  field: { marginBottom: 18 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9b9b9b',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ebebeb',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0f0e17',
    backgroundColor: '#fafafa',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#ebebeb',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fafafa',
  },
  inputText: { fontSize: 14, color: '#0f0e17', flex: 1 },
  inputPlaceholder: { fontSize: 14, color: '#b8b8b8', flex: 1 },
  memberWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#ebebeb',
    borderRadius: 14,
    padding: 10,
    backgroundColor: '#fafafa',
    minHeight: 50,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f0f0f5',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: { fontSize: 12, fontWeight: '500', color: '#3d3d5c' },
  tagClose: { fontSize: 16, color: '#9b9b9b', lineHeight: 18 },
  memberInput: {
    flex: 1,
    minWidth: 80,
    fontSize: 14,
    color: '#0f0e17',
    paddingVertical: 4,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 4,
  },
  reminderLabel: { fontSize: 14, fontWeight: '500', color: '#0f0e17' },
  saveBtn: {
    backgroundColor: '#2C247A',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#2C247A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  saveBtnDisabled: { backgroundColor: '#C7C7CC', shadowOpacity: 0 },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
