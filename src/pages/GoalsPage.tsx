
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GoalsPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Metas</h1>
        <p className="text-gray-300">Establece y da seguimiento a tus metas fitness</p>
      </div>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Metas Personales</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenido de metas estará disponible pronto.</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default GoalsPage;
