
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Achievement } from '@/types/user';
import { createInitialAchievements } from '@/utils/initialData';

type AchievementsContextType = {
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  initializeAchievements: () => void;
};

const defaultAchievementsContext: AchievementsContextType = {
  achievements: [],
  unlockAchievement: () => {},
  initializeAchievements: () => {},
};

const AchievementsContext = createContext<AchievementsContextType>(defaultAchievementsContext);

export const useAchievements = () => useContext(AchievementsContext);

type AchievementsProviderProps = {
  children: ReactNode;
};

export const AchievementsProvider = ({ children }: AchievementsProviderProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load achievements from localStorage if they exist
  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
  }, []);

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    if (achievements.length) localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const initializeAchievements = () => {
    const initialAchievements = createInitialAchievements();
    setAchievements(initialAchievements);
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

  const value = {
    achievements,
    unlockAchievement,
    initializeAchievements,
  };

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
};
