
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsList from '@/components/goals/GoalsList';
import GoalForm from '@/components/goals/GoalForm';
import GoalsProgress from '@/components/goals/GoalsProgress';

const GoalsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Metas</h1>
        <p className="text-gray-300">Establece y da seguimiento a tus metas fitness</p>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="list">Lista de Metas</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
          <TabsTrigger value="new">Nueva Meta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <GoalsList />
        </TabsContent>
        
        <TabsContent value="progress">
          <GoalsProgress />
        </TabsContent>
        
        <TabsContent value="new">
          <GoalForm />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default GoalsPage;
