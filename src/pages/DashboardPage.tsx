
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import UserSummary from '@/components/dashboard/UserSummary';
import HabitTracker from '@/components/dashboard/HabitTracker';
import AchievementsList from '@/components/dashboard/AchievementsList';
import PersonalRecommendations from '@/components/dashboard/PersonalRecommendations';
import UserStats from '@/components/dashboard/UserStats';

const DashboardPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-300">Vista general de tu progreso y recomendaciones</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <UserSummary />
        </div>
        <div className="md:col-span-8">
          <PersonalRecommendations />
        </div>
        <div className="md:col-span-4">
          <UserStats />
        </div>
        <div className="md:col-span-8">
          <HabitTracker />
        </div>
        <div className="md:col-span-4">
          <AchievementsList />
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
