'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import AppContainer from '../components/AppContainer';
import ExpensesBar from '../components/ExpensesBar';
import AddBudgetModal from '../components/AddBudgetModal';
import ThemedText from '../components/ThemedText';
import BudgetDashboard from './Budgetdashboard';
import BudgetDetails from '../components/BudgetDetails';

// Import the hook from your Context file
import { useBudgets } from '../context/BudgetContext';

const Expenses = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  // Pull everything we need from Context
  const { budgets, loading, addBudget, updateBudget, deleteBudget } =
    useBudgets();

  const toggleModal = () => setModalVisible(!isModalVisible);

  // Find the budget object if one is selected
  const currentBudget = budgets.find(b => b.id === selectedBudgetId);

  // 1. Loading State (Prevents UI flicker while reading AsyncStorage)
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2C247A" />
      </View>
    );
  }

  return (
    <>
      <AppContainer>
        <View style={styles.container1}>
          {/* Only show the top ExpensesBar if we are NOT looking at a specific budget */}
          {!selectedBudgetId && (
            <View>
              <ExpensesBar />
            </View>
          )}

          {/* ─── SCENARIO A: Viewing a specific Budget ─── */}
          {selectedBudgetId && currentBudget ? (
            <BudgetDetails
              budget={currentBudget}
              onBack={() => setSelectedBudgetId(null)}
              onUpdateBudget={updateBudget}
              onDelete={() => {
                deleteBudget(currentBudget.id);
                setSelectedBudgetId(null);
              }}
            />
          ) : /* ─── SCENARIO B: No Budgets exist (Empty State) ─── */
          budgets.length === 0 ? (
            <SafeAreaView style={styles.container2}>
              <View style={styles.centered}>
                <ThemedText variant="title" style={styles.title}>
                  Keep your family spending on track.
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                  Add your first family expense to start tracking together.
                </ThemedText>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleModal}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>+ New budget</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ) : (
            /* ─── SCENARIO C: List of Budgets (Dashboard) ─── */
            <BudgetDashboard onViewBudget={id => setSelectedBudgetId(id)} />
          )}
        </View>
      </AppContainer>

      {/* Modal for adding a brand new budget */}
      <AddBudgetModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSave={(name, amount) => {
          addBudget(name, amount);
          setModalVisible(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: 10, paddingHorizontal: 20 },
  container2: { flex: 1 },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#2C247A',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});

export default Expenses;
