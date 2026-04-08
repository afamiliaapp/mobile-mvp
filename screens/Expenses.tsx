import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
// Make sure to install: npx expo install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContainer from '../components/AppContainer';
import ExpensesBar from '../components/ExpensesBar';
import AddBudgetModal from '../components/AddBudgetModal';
import ThemedText from '../components/ThemedText';
import BudgetDashboard from './Budgetdashboard';
import BudgetDetails from '../components/BudgetDetails';

const STORAGE_KEY = '@family_budgets_data';

const Expenses = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  // --- PERSISTENCE LOGIC ---

  // Load data once when the component starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedBudgets = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedBudgets !== null) {
          setBudgets(JSON.parse(savedBudgets));
        }
      } catch (error) {
        console.error('Error loading budgets:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data whenever the budgets array changes
  useEffect(() => {
    const saveData = async () => {
      // Don't save if we are still in the initial loading phase
      // (prevents overwriting saved data with an empty array)
      if (!loading) {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
        } catch (error) {
          console.error('Error saving budgets:', error);
        }
      }
    };
    saveData();
  }, [budgets, loading]);

  // -------------------------

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSaveBudget = (name: string, amount: number) => {
    const newBudget = {
      id: Date.now().toString(),
      name: name,
      total: amount,
      spend: 0,
      remaining: amount,
      usedPercent: 0,
      expenses: [],
    };
    setBudgets(prev => [newBudget, ...prev]); // Add new one to the top
    setModalVisible(false);
  };

  const handleUpdateBudget = (updatedBudget: any) => {
    setBudgets(prev =>
      prev.map(b =>
        b.id === updatedBudget.id ? { ...b, ...updatedBudget } : b,
      ),
    );
    setModalVisible(false); // Ensure modal closes after update
  };

  const handleAddNewExpense = (budgetId: string, expenseData: any) => {
    setBudgets(prevBudgets =>
      prevBudgets.map(budget => {
        if (budget.id === budgetId) {
          // Handle both New and Edit logic for the expense itself
          const existingExpenses = budget.expenses || [];
          const exists = existingExpenses.find(
            (e: any) => e.id === expenseData.id,
          );

          let updatedExpenses;
          if (exists) {
            updatedExpenses = existingExpenses.map((e: any) =>
              e.id === expenseData.id ? expenseData : e,
            );
          } else {
            updatedExpenses = [expenseData, ...existingExpenses];
          }

          const newSpend = updatedExpenses.reduce(
            (sum: number, exp: any) => sum + exp.amount,
            0,
          );

          return {
            ...budget,
            expenses: updatedExpenses, // <--- Save the list!
            spend: newSpend,
            remaining: budget.total - newSpend,
            usedPercent: Math.round((newSpend / budget.total) * 100),
          };
        }
        return budget;
      }),
    );
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    setSelectedBudgetId(null);
  };

  const currentBudget = budgets.find(b => b.id === selectedBudgetId);

  // Show a loader while reading from storage to prevent "flickering"
  // between the empty state and your actual data.
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
          {!selectedBudgetId && (
            <View>
              <ExpensesBar />
            </View>
          )}

          {selectedBudgetId && currentBudget ? (
            <BudgetDetails
              budget={currentBudget}
              onBack={() => setSelectedBudgetId(null)}
              onNewBudget={() => setModalVisible(true)}
              onUpdateBudget={handleUpdateBudget}
              onDelete={() => handleDeleteBudget(currentBudget.id)}
              onAddExpense={(amount: number) =>
                handleAddNewExpense(currentBudget.id, amount)
              }
            />
          ) : budgets.length === 0 ? (
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
            <BudgetDashboard
              budgets={budgets}
              onNewBudget={toggleModal}
              onUpdateBudget={handleUpdateBudget}
              onViewBudget={id => setSelectedBudgetId(id)}
            />
          )}
        </View>
      </AppContainer>

      <AddBudgetModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSave={handleSaveBudget}
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
