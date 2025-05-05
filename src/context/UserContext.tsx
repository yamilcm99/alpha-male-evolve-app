
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserProfile } from '../types/user';
import { toast } from '@/components/ui/sonner';
import { HabitsProvider, useHabits } from './HabitsContext';
import { AchievementsProvider, useAchievements } from './AchievementsContext';
import { GoalsProvider, useGoals } from './GoalsContext';

type UserContextType = {
  userProfile: UserProfile | null;
  isOnboarded: boolean;
  setUserProfile: (profile: UserProfile) => void;
  completeOnboarding: () => void;
};

const defaultUserContext: UserContextType = {
  userProfile: null,
  isOnboarded: false,
  setUserProfile: () => {},
  completeOnboarding: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

type InnerUserProviderProps = {
  children: ReactNode;
};

const InnerUserProvider = ({ children }: InnerUserProviderProps) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  
  const { initializeHabits } = useHabits();
  const { initializeAchievements } = useAchievements();
  const { initializeGoals } = useGoals();

  // Load data from localStorage if it exists
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    const storedOnboarded = localStorage.getItem('isOnboarded');

    if (storedProfile) setUserProfileState(JSON.parse(storedProfile));
    if (storedOnboarded) setIsOnboarded(JSON.parse(storedOnboarded));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (userProfile) localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('isOnboarded', JSON.stringify(isOnboarded));
  }, [userProfile, isOnboarded]);

  const setUserProfile = (profile: UserProfile) => {
    // Ensure the profile has an ID and updatedAt
    const profileWithId = {
      ...profile,
      id: profile.id || uuidv4(),
      updatedAt: profile.updatedAt || new Date().toISOString()
    };
    
    setUserProfileState(profileWithId);
  };

  const completeOnboarding = () => {
    // Generate initial data based on the user profile
    if (userProfile) {
      // Initialize habits, achievements, and goals
      initializeHabits(userProfile);
      initializeAchievements();
      initializeGoals();
      
      toast.success("¡Perfil configurado con éxito! Se han creado hábitos y metas personalizadas.");
    }
    
    setIsOnboarded(true);
  };

  const value = {
    userProfile,
    isOnboarded,
    setUserProfile,
    completeOnboarding,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <AchievementsProvider>
      <HabitsProvider>
        <GoalsProvider>
          <InnerUserProvider>
            {children}
          </InnerUserProvider>
        </GoalsProvider>
      </HabitsProvider>
    </AchievementsProvider>
  );
};

// Export a combined hook for components that need access to all contexts
export const useUserData = () => {
  const { userProfile, isOnboarded, setUserProfile, completeOnboarding } = useUser();
  const { habits, addHabit, updateHabit, completeHabit } = useHabits();
  const { achievements, unlockAchievement } = useAchievements();
  const { goals, addGoal, updateGoal, completeGoal } = useGoals();

  return {
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
};
