
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, Habit, Achievement, Goal } from '../types/user';

type UserContextType = {
  userProfile: UserProfile | null;
  isOnboarded: boolean;
  habits: Habit[];
  achievements: Achievement[];
  goals: Goal[];
  setUserProfile: (profile: UserProfile) => void;
  completeOnboarding: () => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  completeHabit: (habitId: string) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  completeGoal: (goalId: string) => void;
  unlockAchievement: (achievementId: string) => void;
};

const defaultUserContext: UserContextType = {
  userProfile: null,
  isOnboarded: false,
  habits: [],
  achievements: [],
  goals: [],
  setUserProfile: () => {},
  completeOnboarding: () => {},
  addHabit: () => {},
  updateHabit: () => {},
  completeHabit: () => {},
  addGoal: () => {},
  updateGoal: () => {},
  completeGoal: () => {},
  unlockAchievement: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Cargar datos del almacenamiento local si existen
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    const storedOnboarded = localStorage.getItem('isOnboarded');
    const storedHabits = localStorage.getItem('habits');
    const storedAchievements = localStorage.getItem('achievements');
    const storedGoals = localStorage.getItem('goals');

    if (storedProfile) setUserProfileState(JSON.parse(storedProfile));
    if (storedOnboarded) setIsOnboarded(JSON.parse(storedOnboarded));
    if (storedHabits) setHabits(JSON.parse(storedHabits));
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  }, []);

  // Guardar datos en el almacenamiento local
  useEffect(() => {
    if (userProfile) localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('isOnboarded', JSON.stringify(isOnboarded));
    if (habits.length) localStorage.setItem('habits', JSON.stringify(habits));
    if (achievements.length) localStorage.setItem('achievements', JSON.stringify(achievements));
    if (goals.length) localStorage.setItem('goals', JSON.stringify(goals));
  }, [userProfile, isOnboarded, habits, achievements, goals]);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  const addHabit = (habit: Habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) => prev.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
  };

  const completeHabit = (habitId: string) => {
    setHabits((prev) => 
      prev.map(habit => {
        if (habit.id === habitId) {
          return {
            ...habit,
            streak: habit.streak + 1,
            lastCompleted: new Date()
          };
        }
        return habit;
      })
    );

    // Verificar si se desbloquea algún logro
    checkAchievements(habitId);
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
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) => 
      prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlockedAt) {
          return {
            ...achievement,
            unlockedAt: new Date()
          };
        }
        return achievement;
      })
    );
  };

  const checkAchievements = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    achievements.forEach(achievement => {
      if (achievement.category === habit.category && 
          habit.streak >= achievement.requirement && 
          !achievement.unlockedAt) {
        unlockAchievement(achievement.id);
      }
    });
  };

  const value = {
    userProfile,
    isOnboarded,
    habits,
    achievements,
    goals,
    setUserProfile,
    completeOnboarding,
    addHabit,
    updateHabit,
    completeHabit,
    addGoal,
    updateGoal,
    completeGoal,
    unlockAchievement
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
