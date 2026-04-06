'use client';
import React, { createContext, useState, useContext } from 'react';

export type Chore = {
  id: string;
  title: string;
  description: string;
  assigneeCount: number;
  dueDate: string;
  dueTime: string;
  status: 'open' | 'closed';
  overdue: boolean;
};

const ChoreContext = createContext<any>(null);

export const ChoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [chores, setChores] = useState<Chore[]>([]);

  const addChore = (newChore: Chore) => {
    setChores(prev => [newChore, ...prev]);
  };

  const updateChore = (updated: Chore) => {
    setChores(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const deleteChore = (id: string) => {
    setChores(prev => prev.filter(c => c.id !== id));
  };

  const toggleStatus = (id: string) => {
    setChores(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'open' ? 'closed' : 'open' }
          : c,
      ),
    );
  };

  return (
    <ChoreContext.Provider
      value={{ chores, addChore, updateChore, deleteChore, toggleStatus }}
    >
      {children}
    </ChoreContext.Provider>
  );
};

export const useChores = () => useContext(ChoreContext);
