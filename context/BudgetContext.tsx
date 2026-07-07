'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@family_budgets_data';

export type BudgetItem = {
  id: string;
  name: string;
  spend: number;
  remaining: number;
  total: number;
  usedPercent: number;
  expenses: any[];
};

interface BudgetContextType {
  budgets: BudgetItem[];
  loading: boolean;
  addBudget: (name: string, total: number) => void;
  updateBudget: (item: BudgetItem) => void;
  deleteBudget: (id: string) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from Storage on Init
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setBudgets(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to Storage on Change
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    }
  }, [budgets, loading]);

  const addBudget = (name: string, total: number) => {
    const newBudget: BudgetItem = {
      id: Date.now().toString(),
      name,
      total,
      spend: 0,
      remaining: total,
      usedPercent: 0,
      expenses: [],
    };
    setBudgets(prev => [newBudget, ...prev]);
  };

  const updateBudget = (updated: BudgetItem) => {
    setBudgets(prev => prev.map(b => (b.id === updated.id ? updated : b)));
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{ budgets, loading, addBudget, updateBudget, deleteBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudgets must be used within BudgetProvider');
  return ctx;
};
