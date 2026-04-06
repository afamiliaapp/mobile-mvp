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

const Expenses = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // 1. ADD THIS: State to store your budgets
  const [budgets, setBudgets] = useState<any[]>([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 2. ADD THIS: The function that was missing
  const handleSaveBudget = (name: string, amount: number) => {
    const newBudget = {
      id: Date.now().toString(),
      name: name,
      total: amount,
      spend: 0,
      remaining: amount,
      usedPercent: 0,
    };

    setBudgets([...budgets, newBudget]); // Add new budget to list
    setModalVisible(false); // Close the modal
  };

  return (
    <>
      <AppContainer>
        <View style={styles.container1}>
          <View>
            <ExpensesBar />
          </View>

          {/* 3. Logic to switch views */}
          {budgets.length === 0 ? (
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
            <BudgetDashboard budgets={budgets} onNewBudget={toggleModal} />
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
