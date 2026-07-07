import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

import AppContainer from '../components/AppContainer';
import AddMealPlanModal from '../components/AddMealPlanModal';
import MealPlannerBar from '../components/MealPlannerBar';
import { useMeals } from '../context/MealContext';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

const Meal = () => {
  const navigation = useNavigation<any>();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const { meals, addMeal, deleteMeal, updateMeal, toggleMeal } = useMeals();

  const handleSave = (data: {
    mealName: string;
    selectedDay: string;
    mealTime: string;
    member: string;
    notes: string;
  }) => {
    addMeal({
      title: data.mealName,
      category: data.mealTime,
      day: data.selectedDay,
      member: data.member,
      notes: data.notes,
    });
    setModalVisible(false);
  };

  // ✅ Calendar markings
  const markedDates = meals.reduce((acc, meal) => {
    acc[meal.day] = {
      marked: true,
      dotColor: '#302B80',
    };
    return acc;
  }, {} as any);

  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    customStyles: {
      container: styles.selectedDay,
      text: { color: '#fff', fontWeight: 'bold' },
    },
  };

  // ✅ Filter meals (search + optional date filter)
  const filteredMeals = meals.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.day.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AppContainer>
      <View style={styles.container}>
        <MealPlannerBar />
        <BackButton />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Calendar */}
            <View style={styles.calendarContainer}>
              <Calendar
                current={today}
                onDayPress={day => setSelectedDate(day.dateString)}
                markingType={'custom'}
                markedDates={markedDates}
                theme={{
                  calendarBackground: '#fff',
                  todayTextColor: '#302b80',
                  dayTextColor: '#333',
                  textMonthFontWeight: 'bold',
                }}
              />
            </View>

            {/* Header */}
            <View style={styles.headerRow}>
              <ThemedText variant="title" style={styles.headerTitle}>
                Meal plans
              </ThemedText>
              <TouchableOpacity
                style={styles.searchCircle}
                onPress={() => setShowSearch(prev => !prev)}
              >
                <Icon name="search" size={18} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            {showSearch && (
              <View style={styles.searchInputContainer}>
                <TextInput
                  placeholder="Search meals..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                  placeholderTextColor="#999"
                />
              </View>
            )}

            {/* Content */}
            <View style={styles.contentBody}>
              {filteredMeals.length > 0 ? (
                filteredMeals.map(item => (
                  <View key={item.id} style={styles.mealCard}>
                    <View style={styles.cardHeader}>
                      <ThemedText variant="title" style={styles.mealTitleText}>
                        {item.title}
                      </ThemedText>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          item.selected && styles.checkboxDone,
                        ]}
                        onPress={() => toggleMeal(item.id)}
                      >
                        {item.selected && (
                          <Icon name="check" size={16} color="#FFF" />
                        )}
                      </TouchableOpacity>
                    </View>

                    <ThemedText style={styles.mealCategoryText}>
                      {item.category}
                    </ThemedText>

                    <View style={styles.cardFooter}>
                      <ThemedText style={styles.mealDayText}>
                        {item.day}
                      </ThemedText>

                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() =>
                          navigation.navigate('MealDetails', {
                            meal: item,
                            onDelete: (id: string) => deleteMeal(id),
                            onUpdate: (data: any) => updateMeal(data),
                          })
                        }
                      >
                        <ThemedText style={styles.viewButtonText}>
                          View
                        </ThemedText>
                        <Icon name="chevron-right" size={16} color="#8E8E93" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.cardSeparator} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <ThemedText style={styles.emptyTitle}>
                    No meals found
                  </ThemedText>
                  <ThemedText style={styles.emptySubtitle}>
                    Try searching something else or add a new meal
                  </ThemedText>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Icon name="plus" size={20} color="#fff" />
                    <Text style={styles.buttonText}>New meal plan</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>

          {/* FAB */}
          {meals.length > 0 && (
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="plus" size={22} color="#333" />
              <Text style={styles.fabText}>New meal plan</Text>
            </TouchableOpacity>
          )}

          <AddMealPlanModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSave}
          />
        </SafeAreaView>
      </View>
    </AppContainer>
  );
};

export default Meal;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 120 },
  calendarContainer: { marginVertical: 16 },
  selectedDay: { backgroundColor: '#302B80', borderRadius: 8 },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: '700' },

  searchCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInputContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  searchInput: {
    height: 40,
    fontSize: 14,
    color: '#1C1C1E',
  },

  contentBody: { marginTop: 25 },

  mealCard: { marginBottom: 20 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mealTitleText: { fontSize: 14, fontWeight: '500' },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxDone: {
    backgroundColor: '#302B80',
    borderColor: '#302B80',
  },

  mealCategoryText: { fontSize: 12, marginTop: 4 },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  mealDayText: { fontSize: 12 },

  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  viewButtonText: {
    fontSize: 10,

    marginRight: 4,
  },

  cardSeparator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginTop: 18,
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 15,

    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 22,
  },

  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#302B80',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  fabText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
    color: '#1C1C1E',
  },
});
