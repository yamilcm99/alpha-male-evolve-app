import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { BadHabit, CommunicationSkills, PhysicalCondition, PastTrauma, LifeStage, FamilyStatus } from '@/types/user';
import { calculateUserLevel } from '@/utils/userLevelCalculator';
import { Gauge } from 'lucide-react';

const UserSummary = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return null;
  }

  const { level, score } = calculateUserLevel(userProfile);
  
  // Calcular la fecha de la próxima actualización (90 días desde la última)
  const lastUpdated = userProfile.updatedAt ? new Date(userProfile.updatedAt) : new Date();
  const nextUpdateDate = new Date(lastUpdated);
  nextUpdateDate.setDate(nextUpdateDate.getDate() + 90);
  
  // Calcular días restantes hasta la próxima actualización
  const today = new Date();
  const daysUntilUpdate = Math.max(0, Math.floor((nextUpdateDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Formatear la fecha de próxima actualización
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white overflow-hidden">
      <div className="relative">
        {/* Barra de progreso en la parte superior */}
        <div className="h-2 bg-evolve-gray/30">
          <div 
            className="h-full bg-evolve-purple" 
            style={{ width: `${score}%` }}
          />
        </div>
        
        <CardContent className="pt-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-evolve-purple/20 border-2 border-evolve-purple flex items-center justify-center text-2xl font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">{userProfile.name}</h3>
              <div className="flex items-center">
                <span className="text-sm bg-evolve-purple/20 px-2 py-0.5 rounded-full text-evolve-purple flex items-center">
                  <Gauge className="w-3 h-3 mr-1" />
                  Nivel: {level}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-400">Condición física</span>
              <div className="flex items-center">
                <span>{
                  userProfile.physicalCondition === PhysicalCondition.POOR ? 'Pobre' :
                  userProfile.physicalCondition === PhysicalCondition.AVERAGE ? 'Promedio' :
                  userProfile.physicalCondition === PhysicalCondition.GOOD ? 'Buena' : 'Excelente'
                }</span>
                <SpeedometerIndicator value={
                  userProfile.physicalCondition === PhysicalCondition.POOR ? 25 :
                  userProfile.physicalCondition === PhysicalCondition.AVERAGE ? 50 :
                  userProfile.physicalCondition === PhysicalCondition.GOOD ? 75 : 100
                } />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Etapa vital</span>
              <div className="flex items-center">
                <span>{
                  userProfile.lifeStage === LifeStage.ASCENT ? 'En ascenso' :
                  userProfile.lifeStage === LifeStage.DESCENT ? 'En bajada' :
                  userProfile.lifeStage === LifeStage.PLATEAU ? 'En meseta' :
                  userProfile.lifeStage === LifeStage.UNSTABLE ? 'Inestable' : 'Crítica'
                }</span>
                <SpeedometerIndicator value={
                  userProfile.lifeStage === LifeStage.CRITICAL ? 20 :
                  userProfile.lifeStage === LifeStage.DESCENT ? 40 :
                  userProfile.lifeStage === LifeStage.UNSTABLE ? 60 :
                  userProfile.lifeStage === LifeStage.PLATEAU ? 80 : 100
                } />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Estado de relación</span>
              <div className="flex items-center">
                <span>{
                  userProfile.relationshipStatus === 'single' ? 'Soltero' :
                  userProfile.relationshipStatus === 'in_relationship' ? 'En pareja' :
                  userProfile.relationshipStatus === 'married' ? 'Casado' :
                  userProfile.relationshipStatus === 'divorced' ? 'Divorciado' : 'Viudo'
                }</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Comunicación</span>
              <div className="flex items-center">
                <span>{
                  userProfile.communicationSkills === CommunicationSkills.BEGINNER ? 'Principiante' :
                  userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE ? 'Intermedio' :
                  userProfile.communicationSkills === CommunicationSkills.ADVANCED ? 'Avanzado' : 'Experto'
                }</span>
                <SpeedometerIndicator value={
                  userProfile.communicationSkills === CommunicationSkills.BEGINNER ? 25 :
                  userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE ? 50 :
                  userProfile.communicationSkills === CommunicationSkills.ADVANCED ? 75 : 100
                } />
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="text-xs text-center">
              <span className="text-gray-400">Próxima actualización de perfil:</span> 
              <span className="ml-1 font-medium text-evolve-purple">{formatDate(nextUpdateDate)}</span> 
              <span className="ml-1">({daysUntilUpdate} días restantes)</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// Componente para los indicadores de progreso tipo tacómetro
const SpeedometerIndicator = ({ value }: { value: number }) => {
  // Asegurarnos que el valor esté entre 0 y 100
  const normalizedValue = Math.max(0, Math.min(value, 100));
  
  // Calcular color basado en el valor
  const getColor = (val: number) => {
    if (val < 30) return 'bg-red-500';
    if (val < 60) return 'bg-yellow-500';
    if (val < 80) return 'bg-green-500';
    return 'bg-evolve-purple';
  };
  
  return (
    <div className="ml-2 relative w-12 h-6">
      <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
      <div 
        className={`absolute h-6 rounded-l-full ${getColor(normalizedValue)}`} 
        style={{ width: `${normalizedValue}%`, maxWidth: '100%', borderTopRightRadius: normalizedValue >= 100 ? '9999px' : '0', borderBottomRightRadius: normalizedValue >= 100 ? '9999px' : '0' }}
      ></div>
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
        style={{ left: `${normalizedValue}%` }}
      ></div>
    </div>
  );
};

export default UserSummary;
