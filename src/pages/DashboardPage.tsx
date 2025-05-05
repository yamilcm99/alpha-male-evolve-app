
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import UserSummary from '@/components/dashboard/UserSummary';
import HabitTracker from '@/components/dashboard/HabitTracker';
import AchievementsList from '@/components/dashboard/AchievementsList';
import PersonalRecommendations from '@/components/dashboard/PersonalRecommendations';
import UserStats from '@/components/dashboard/UserStats';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import AlphaLevels from '@/components/dashboard/AlphaLevels';
import HabitProgressChart from '@/components/dashboard/HabitProgressChart';
import HabitCalendarView from '@/components/dashboard/HabitCalendarView';
import ProgressStats from '@/components/dashboard/ProgressStats';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardPage = () => {
  const { userProfile, isOnboarded } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Check if user is onboarded
  useEffect(() => {
    if (!isOnboarded) {
      navigate('/onboarding');
    }
  }, [isOnboarded, navigate]);

  // Check if profile needs updating (every 90 days)
  useEffect(() => {
    if (userProfile) {
      // Check if user profile has updatedAt field
      const lastUpdated = userProfile.updatedAt ? new Date(userProfile.updatedAt) : null;
      
      if (lastUpdated) {
        const today = new Date();
        const daysDifference = Math.floor((today.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference >= 90) {
          toast.info(
            "Han pasado 90 días desde tu última actualización de perfil. ¡Es momento de evaluar tu progreso!",
            {
              duration: 10000,
              action: {
                label: "Actualizar perfil",
                onClick: () => navigate('/onboarding'),
              },
            }
          );
        }
      }
    }
  }, [userProfile, navigate]);

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-300">Vista general de tu progreso y recomendaciones</p>
      </div>
      
      <AlphaLevels />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        <div className="md:col-span-4">
          <UserSummary />
        </div>
        <div className="md:col-span-8">
          <ProgressStats />
        </div>
        <div className="md:col-span-4">
          <UserStats />
        </div>
        <div className="md:col-span-8">
          <HabitTracker />
        </div>
        <div className="md:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HabitProgressChart />
            <HabitCalendarView />
          </div>
        </div>
        <div className="md:col-span-4">
          <AchievementsList />
        </div>
        <div className="md:col-span-8">
          <PersonalRecommendations />
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
