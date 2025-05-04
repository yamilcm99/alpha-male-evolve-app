
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserProfile, Habit, Achievement, Goal } from '../types/user';
import { createInitialHabits, createInitialAchievements, createInitialGoals } from '@/utils/initialData';
import { toast } from '@/components/ui/sonner';

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
    // Ensure the profile has an ID
    const profileWithId = {
      ...profile,
      id: profile.id || uuidv4()
    };
    
    setUserProfileState(profileWithId);
  };

  const completeOnboarding = () => {
    // Generate initial data based on the user profile
    if (userProfile) {
      // Initialize habits based on user's bad habits
      const initialHabits = createInitialHabits(userProfile.badHabits);
      setHabits(initialHabits);
      
      // Initialize achievements
      const initialAchievements = createInitialAchievements();
      setAchievements(initialAchievements);
      
      // Initialize goals
      const initialGoals = createInitialGoals();
      setGoals(initialGoals);
      
      toast.success("¡Perfil configurado con éxito! Se han creado hábitos y metas personalizadas.");
    }
    
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

    // Check if this is the user's first completed habit
    const firstHabitAchievement = achievements.find(a => a.name === "Primer Paso");
    if (firstHabitAchievement && !firstHabitAchievement.unlockedAt) {
      unlockAchievement(firstHabitAchievement.id);
      toast.success("¡Logro desbloqueado: Primer Paso!");
    }

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
    
    toast.success("¡Meta completada! ¡Felicidades!");
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
      // Check if the habit has reached the streak requirement for the achievement
      // and if the achievement category matches the habit category
      const habitCategory = habit.category.toString().toLowerCase();
      const achievementCategory = achievement.category.toString().toLowerCase();
      
      // For overall category achievements
      if (achievementCategory === "overall" && 
          habit.streak >= achievement.requirement && 
          !achievement.unlockedAt) {
        unlockAchievement(achievement.id);
        toast.success(`¡Logro desbloqueado: ${achievement.name}!`);
      }
      
      // For specific category achievements
      if (habitCategory === achievementCategory && 
          habit.streak >= achievement.requirement && 
          !achievement.unlockedAt) {
        unlockAchievement(achievement.id);
        toast.success(`¡Logro desbloqueado: ${achievement.name}!`);
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
