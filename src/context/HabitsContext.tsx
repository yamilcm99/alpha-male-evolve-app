
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Habit, HabitCategory, UserProfile } from '@/types/user';
import { toast } from '@/components/ui/sonner';
import { useAchievements } from './AchievementsContext';
import { createInitialHabits } from '@/utils/initialData';

type HabitsContextType = {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  completeHabit: (habitId: string) => void;
  initializeHabits: (userProfile: UserProfile) => void;
};

const defaultHabitsContext: HabitsContextType = {
  habits: [],
  addHabit: () => {},
  updateHabit: () => {},
  completeHabit: () => {},
  initializeHabits: () => {},
};

const HabitsContext = createContext<HabitsContextType>(defaultHabitsContext);

export const useHabits = () => useContext(HabitsContext);

type HabitsProviderProps = {
  children: ReactNode;
};

export const HabitsProvider = ({ children }: HabitsProviderProps) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { unlockAchievement, achievements } = useAchievements();

  // Load habits from localStorage if they exist
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) setHabits(JSON.parse(storedHabits));
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length) localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const initializeHabits = (userProfile: UserProfile) => {
    // Initialize habits based on user's bad habits
    const initialHabits = createInitialHabits(userProfile.badHabits);
    setHabits(initialHabits);
  };

  const addHabit = (habit: Habit) => {
    // Ensure the habit has all required fields with default values if missing
    const completedHabit = {
      ...habit,
      streak: habit.streak || 0,
      lastCompleted: habit.lastCompleted || null,
      goal: habit.goal || 21, // Default to 21 days
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: habit.requiredLevel || "Principiante", // Default level
      isMegaHabit: habit.isMegaHabit || false // Default not a mega habit
    };
    
    setHabits((prev) => [...prev, completedHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) => prev.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
  };

  const completeHabit = (habitId: string) => {
    setHabits((prev) => 
      prev.map(habit => {
        if (habit.id === habitId) {
          const newStreak = habit.streak + 1;
          const now = new Date();
          
          // Check if this completion marks a full 21-day cycle
          let cycleCompleted = habit.cycleCompleted || false;
          let cycleCompletedAt = habit.cycleCompletedAt;
          let cyclesCompleted = habit.cyclesCompleted || 0;
          
          // If streak equals goal (typically 21), mark cycle as completed
          if (newStreak >= habit.goal && !habit.cycleCompleted) {
            cycleCompleted = true;
            cycleCompletedAt = now;
            cyclesCompleted += 1;
            
            // Mensaje de felicitación basado en si es mega hábito o no
            if (habit.isMegaHabit) {
              toast.success(`¡GRAN LOGRO! Has completado tu mega hábito "${habit.name}" de ${habit.goal} días. ¡Recibes el doble de puntos!`, {
                duration: 6000
              });
            } else {
              toast.success(`¡Felicidades! Has completado tu ciclo de ${habit.goal} días para "${habit.name}". Este hábito ahora forma parte de tu rutina.`, {
                duration: 5000
              });
            }
            
            // Unlock achievement for completing a habit cycle
            const habitCycleAchievement = achievements.find(a => a.name === "Maestro de hábitos");
            if (habitCycleAchievement && !habitCycleAchievement.unlockedAt) {
              unlockAchievement(habitCycleAchievement.id);
            }

            // Mega hábitos desbloqueando logro especial
            if (habit.isMegaHabit) {
              const megaHabitAchievement = achievements.find(a => a.name === "Megaevolución");
              if (megaHabitAchievement) {
                const completedMegaHabits = prev.filter(h => h.isMegaHabit && h.cycleCompleted).length;
                if (completedMegaHabits + 1 >= megaHabitAchievement.requirement && !megaHabitAchievement.unlockedAt) {
                  unlockAchievement(megaHabitAchievement.id);
                  toast.success(`¡Logro desbloqueado: ${megaHabitAchievement.name}!`, {
                    duration: 4000
                  });
                }
              }
            }
          }
          
          return {
            ...habit,
            streak: newStreak,
            lastCompleted: now,
            cycleCompleted,
            cycleCompletedAt,
            cyclesCompleted
          };
        }
        return habit;
      })
    );

    // Check if this is the user's first completed habit
    const firstHabitAchievement = achievements.find(a => a.name === "Primer Paso");
    if (firstHabitAchievement && !firstHabitAchievement.unlockedAt) {
      unlockAchievement(firstHabitAchievement.id);
      toast.success("¡Logro desbloqueado: Primer Paso!", {
        duration: 3000
      });
    }

    // Check if any achievements should be unlocked
    checkAchievements(habitId);
  };

  const checkAchievements = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    achievements.forEach(achievement => {
      // Check if the habit has reached the streak requirement for the achievement
      // and if the achievement category matches the habit category
      const habitCategory = habit.category.toString().toLowerCase();
      const achievementCategory = achievement.category.toString().toLowerCase();
      
      // Para logros de categoría general
      if (achievementCategory === "overall" && 
          habit.streak >= achievement.requirement && 
          !achievement.unlockedAt) {
        unlockAchievement(achievement.id);
        toast.success(`¡Logro desbloqueado: ${achievement.name}!`, {
          duration: 3000
        });
      }
      
      // Para logros de categoría específica
      if (habitCategory === achievementCategory && 
          habit.streak >= achievement.requirement && 
          !achievement.unlockedAt) {
        unlockAchievement(achievement.id);
        toast.success(`¡Logro desbloqueado: ${achievement.name}!`, {
          duration: 3000
        });
      }
    });
  };

  const value = {
    habits,
    addHabit,
    updateHabit,
    completeHabit,
    initializeHabits,
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
};
