
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AchievementsList from '@/components/achievements/AchievementsList';
import AchievementsProgress from '@/components/achievements/AchievementsProgress';

const AchievementsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Logros</h1>
        <p className="text-gray-300">Visualiza y celebra tus logros alcanzados</p>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="list">Mis Logros</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <AchievementsList />
        </TabsContent>
        
        <TabsContent value="progress">
          <AchievementsProgress />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default AchievementsPage;
