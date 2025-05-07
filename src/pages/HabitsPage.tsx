
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HabitForm from '@/components/habits/HabitForm';
import HabitsList from '@/components/habits/HabitsList';
import HabitsProgress from '@/components/habits/HabitsProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HabitsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hábitos</h1>
        <p className="text-gray-300">Seguimiento y gestión de tus hábitos diarios</p>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="list">Lista de Hábitos</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
          <TabsTrigger value="new">Nuevo Hábito</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <HabitsList />
        </TabsContent>
        
        <TabsContent value="progress">
          <HabitsProgress />
        </TabsContent>
        
        <TabsContent value="new">
          <HabitForm />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default HabitsPage;
