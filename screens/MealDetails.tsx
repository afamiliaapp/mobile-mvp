import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmationModal from '../components/ConfirmationModal';
import AddMealPlanModal from '../components/AddMealPlanModal';
import AppContainer from '../components/AppContainer';
import MealPlannerBar from '../components/MealPlannerBar';

const MealDetails = ({ route, navigation }: any) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { meal, onDelete, onUpdate } = route.params || {
    meal: {
      title: 'No Title',
      day: '',
      category: '',
      member: '',
      notes: '',
    },
  };

  const handleDeleteConfirm = () => {
    // 1. Trigger the delete function in the parent state
    if (onDelete) {
      onDelete(meal.id);
    }

    // 2. Close the modal
    setDeleteModalVisible(false);

    // 3. Go back to the list screen
    navigation.goBack();
  };

  const handleUpdateSave = (updatedData: any) => {
    if (onUpdate) {
      // This sends the data back to the 'updateMeal' function in Meal.tsx
      onUpdate(updatedData);
    }

    // Close the modal and go back to the list to see the changes
    setEditModalVisible(false);
    navigation.goBack();
  };

  return (
    <AppContainer>
      <View style={styles.container}>
        <MealPlannerBar />
        <SafeAreaView>
          {/* Top Navigation Bar */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="chevron-left" size={24} color="#302B80" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title and Action Icons */}
            <View style={styles.titleRow}>
              <Text style={styles.mainTitle}>{meal.title}</Text>
              <View style={styles.actionIcons}>
                <TouchableOpacity
                  style={styles.iconSpacing}
                  onPress={() => setEditModalVisible(true)}
                >
                  <Icon name="edit-2" size={14} color="#636366" />
                </TouchableOpacity>

                {/* Added onPress to trigger the Delete Modal */}
                <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                  <Icon name="trash-2" size={14} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Info Sections */}
            <View style={styles.section}>
              <Text style={styles.label}>Day</Text>
              <Text style={styles.value}>{meal.day}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Meal time</Text>
              <Text style={styles.value}>{meal.category}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Who's cooking?</Text>
              <Text style={styles.value}>{meal.member || 'Not specified'}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Notes/ recipe link</Text>
              <Text style={styles.notesText}>
                {meal.notes && meal.notes.trim() !== ''
                  ? meal.notes
                  : 'No notes or recipe links provided for this meal.'}
              </Text>
            </View>
          </ScrollView>

          {/* Confirmation Modal Component */}
          <ConfirmationModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={handleDeleteConfirm} // This now runs the logic above
            title="Delete meal plan"
            subtitle="This will remove the meal plan completely from your schedule."
          />

          <AddMealPlanModal
            visible={editModalVisible}
            initialData={meal} // Pass the current meal details here!
            onClose={() => setEditModalVisible(false)}
            onSave={handleUpdateSave}
          />
        </SafeAreaView>
      </View>
    </AppContainer>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 16,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 12,
  },
  value: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '400',
  },
  notesText: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 28,
  },
});
