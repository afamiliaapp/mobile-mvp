'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AppContainer from '../components/AppContainer';
import ExpensesBar from '../components/ExpensesBar';
import AddBudgetModal from '../components/AddBudgetModal';
import ThemedText from '../components/ThemedText';
import BudgetDashboard from './Budgetdashboard';
import BudgetDetails from '../components/BudgetDetails';

const Expenses = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [budgets, setBudgets] = useState<any[]>([]);
  // Tracks which budget to show details for. If null, show the main dashboard.
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSaveBudget = (name: string, amount: number) => {
    const newBudget = {
      id: Date.now().toString(),
      name: name,
      total: amount,
      spend: 0,
      remaining: amount,
      usedPercent: 0,
    };
    setBudgets([...budgets, newBudget]);
    setModalVisible(false);
  };

  const handleAddNewExpense = (budgetId: string, expenseAmount: number) => {
    setBudgets(prevBudgets =>
      prevBudgets.map(budget => {
        if (budget.id === budgetId) {
          const newSpend = budget.spend + expenseAmount;
          return {
            ...budget,
            spend: newSpend,
            remaining: budget.total - newSpend,
            usedPercent: Math.round((newSpend / budget.total) * 100),
          };
        }
        return budget;
      }),
    );
  };

  // Find the currently selected budget object
  const currentBudget = budgets.find(b => b.id === selectedBudgetId);

  return (
    <>
      <AppContainer>
        <View style={styles.container1}>
          {' '}
          {/* Header Bar - Hide if viewing details for a cleaner look */}
          {!selectedBudgetId && (
            <View>
              {' '}
              <ExpensesBar />
            </View>
          )}
          {/* Conditional Rendering Logic */}
          {selectedBudgetId && currentBudget ? (
            <BudgetDetails
              budget={currentBudget}
              onBack={() => setSelectedBudgetId(null)}
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
              onViewBudget={id => setSelectedBudgetId(id)} // Clicking "View" sets the ID
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

export default Expenses;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  container2: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
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
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
