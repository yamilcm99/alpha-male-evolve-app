
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HabitsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hábitos</h1>
        <p className="text-gray-300">Seguimiento y gestión de tus hábitos diarios</p>
      </div>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Seguimiento de Hábitos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenido de hábitos estará disponible pronto.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default HabitsPage;
