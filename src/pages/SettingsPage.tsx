
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RemindersSettings from '@/components/settings/RemindersSettings';
import PersonalNotes from '@/components/settings/PersonalNotes';
import AppSettings from '@/components/settings/AppSettings';

const SettingsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-gray-300">Personaliza tu experiencia en la aplicación</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="bg-evolve-dark/50 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="reminders">Recordatorios</TabsTrigger>
          <TabsTrigger value="notes">Notas Personales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <AppSettings />
        </TabsContent>
        
        <TabsContent value="reminders">
          <RemindersSettings />
        </TabsContent>
        
        <TabsContent value="notes">
          <PersonalNotes />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default SettingsPage;
