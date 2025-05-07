
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AchievementsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Logros</h1>
        <p className="text-gray-300">Visualiza y celebra tus logros alcanzados</p>
      </div>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Logros Desbloqueados</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenido de logros estará disponible pronto.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default AchievementsPage;
