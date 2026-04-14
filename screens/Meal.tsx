import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Add this
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContainer from '../components/AppContainer';
import AddMealPlanModal from '../components/AddMealPlanModal';
import MealPlannerBar from '../components/MealPlannerBar';

// 1. Updated Interface to include all details
interface MealItemType {
  id: string;
  title: string;
  category: string;
  day: string;
  selected: boolean;
  member: string; // Added
  notes: string; // Added
}

const Meal = () => {
  const navigation = useNavigation<any>(); // Hook for navigation
  const [selectedDate, setSelectedDate] = useState('2023-07-21');
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState<MealItemType[]>([]);

  const deleteMeal = (id: string) => {
    setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
  };

  const updateMeal = (updatedData: any) => {
    setMeals(prevMeals =>
      prevMeals.map(m =>
        m.id === updatedData.id
          ? {
              ...m,
              // Map the modal's field names back to your MealItemType keys
              title: updatedData.mealName,
              day: updatedData.selectedDay,
              category: updatedData.mealTime,
              member: updatedData.member,
              notes: updatedData.notes,
            }
          : m,
      ),
    );
  };

  const handleSave = (data: {
    mealName: string;
    selectedDay: string;
    mealTime: string;
    member: string;
    notes: string;
  }) => {
    const newMeal: MealItemType = {
      id: Math.random().toString(),
      title: data.mealName,
      category: data.mealTime,
      day: data.selectedDay,
      selected: false,
      member: data.member,
      notes: data.notes,
    };

    setMeals(prevMeals => [...prevMeals, newMeal]);
    setModalVisible(false);
  };

  return (
    <AppContainer>
      <View style={styles.container}>
        <MealPlannerBar />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.calendarContainer}>
              <Calendar
                current={'2023-07-01'}
                onDayPress={day => setSelectedDate(day.dateString)}
                markingType={'custom'}
                markedDates={{
                  [selectedDate]: {
                    customStyles: {
                      container: styles.selectedDay,
                      text: { color: '#fff', fontWeight: 'bold' },
                    },
                  },
                }}
                theme={{
                  calendarBackground: 'transparent',
                  todayTextColor: '#302b80',
                  dayTextColor: '#333',
                  textMonthFontWeight: 'bold',
                }}
              />
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Meal plans</Text>
              <TouchableOpacity style={styles.searchCircle}>
                <Icon name="search" size={18} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.contentBody}>
              {meals.length > 0 ? (
                meals.map(item => (
                  <View key={item.id} style={styles.mealCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.mealTitleText}>{item.title}</Text>
                      <View style={styles.checkbox}>
                        {item.selected && (
                          <MaterialIcon name="check" size={16} color="#FFF" />
                        )}
                      </View>
                    </View>
                    <Text style={styles.mealCategoryText}>{item.category}</Text>
                    <View style={styles.cardFooter}>
                      <Text style={styles.mealDayText}>{item.day}</Text>

                      {/* Updated View Button */}
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
                        <Text style={styles.viewButtonText}>View</Text>
                        <Icon name="chevron-right" size={16} color="#8E8E93" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardSeparator} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>No meals planned yet</Text>
                  <Text style={styles.emptySubtitle}>
                    Add your first meal and bring your family together at the
                    table
                  </Text>
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
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  searchCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBody: { marginTop: 25 },

  // List Styles
  mealCard: { marginBottom: 20 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitleText: { fontSize: 14, fontWeight: '500', color: '#1C1C1E' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealCategoryText: { fontSize: 12, color: '#A1A1A1', marginTop: 4 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  mealDayText: { fontSize: 12, color: '#636366' },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  viewButtonText: { fontSize: 10, color: '#3A3A3C', marginRight: 4 },
  cardSeparator: { height: 1, backgroundColor: '#E5E5EA', marginTop: 18 },

  // Empty State Styles
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
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

  // FAB Styles
  fab: {
    position: 'absolute',
    bottom: 50,
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
