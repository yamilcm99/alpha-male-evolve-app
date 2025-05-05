
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Goal } from '@/types/user';
import { toast } from '@/components/ui/sonner';
import { createInitialGoals } from '@/utils/initialData';

type GoalsContextType = {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  completeGoal: (goalId: string) => void;
  initializeGoals: () => void;
};

const defaultGoalsContext: GoalsContextType = {
  goals: [],
  addGoal: () => {},
  updateGoal: () => {},
  completeGoal: () => {},
  initializeGoals: () => {},
};

const GoalsContext = createContext<GoalsContextType>(defaultGoalsContext);

export const useGoals = () => useContext(GoalsContext);

type GoalsProviderProps = {
  children: ReactNode;
};

export const GoalsProvider = ({ children }: GoalsProviderProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from localStorage if they exist
  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (goals.length) localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const initializeGoals = () => {
    const initialGoals = createInitialGoals();
    setGoals(initialGoals);
  };

  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) => prev.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  const completeGoal = (goalId: string) => {
    setGoals((prev) => 
      prev.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            completed: true
          };
        }
        return goal;
      })
    );
    
    toast.success("¡Meta completada! ¡Felicidades!");
  };

  const value = {
    goals,
    addGoal,
    updateGoal,
    completeGoal,
    initializeGoals,
  };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
};
