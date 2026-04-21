import React, { createContext, useContext, useState } from 'react';

export interface MealItemType {
  id: string;
  title: string;
  category: string;
  day: string;
  selected: boolean;
  member: string;
  notes: string;
  toggleMeal: (id: string) => void;
}

interface MealContextType {
  meals: MealItemType[];
  addMeal: (data: Omit<MealItemType, 'id' | 'selected'>) => void;
  deleteMeal: (id: string) => void;
  updateMeal: (updatedData: any) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<MealItemType[]>([]);

  const addMeal = (data: Omit<MealItemType, 'id' | 'selected'>) => {
    setMeals(prev => [
      ...prev,
      { id: Math.random().toString(), selected: false, ...data },
    ]);
  };

  const toggleMeal = (id: string) => {
    setMeals(prev =>
      prev.map(m => (m.id === id ? { ...m, selected: !m.selected } : m)),
    );
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const updateMeal = (updatedData: any) => {
    setMeals(prev =>
      prev.map(m =>
        m.id === updatedData.id
          ? {
              ...m,
              title: updatedData.mealName,
              day: updatedData.selectedDay,
              category: updatedData.mealTime,
              member: updatedData.member,
              notes: updatedData.notes,
              selected: updatedData.selected ?? m.selected,
            }
          : m,
      ),
    );
  };

  return (
    <MealContext.Provider
      value={{ meals, addMeal, deleteMeal, updateMeal, toggleMeal }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => {
  const ctx = useContext(MealContext);
  if (!ctx) throw new Error('useMeals must be used within MealProvider');
  return ctx;
};
