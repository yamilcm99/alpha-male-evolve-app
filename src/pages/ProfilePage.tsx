
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';

const ProfilePage = () => {
  const { userProfile } = useUser();
  
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-gray-300">Gestiona tu información personal</p>
      </div>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Datos Personales</CardTitle>
        </CardHeader>
        <CardContent>
          {userProfile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Información Básica</h3>
                <p>Nombre: {userProfile.name}</p>
                <p>Edad: {userProfile.age} años</p>
                <p>Estado físico: {userProfile.physicalCondition}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Preferencias</h3>
                <p>Contenido de preferencias estará disponible pronto.</p>
              </div>
            </div>
          ) : (
            <p>Cargando información del perfil...</p>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProfilePage;
