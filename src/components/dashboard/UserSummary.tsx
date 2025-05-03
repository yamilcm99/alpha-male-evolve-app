
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { BadHabit, CommunicationSkills, PhysicalCondition } from '@/types/user';

const UserSummary = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return null;
  }

  // Función para calcular el nivel general del usuario basado en su perfil
  const calculateUserLevel = () => {
    let score = 0;
    const maxScore = 100;

    // Factores positivos
    if (userProfile.physicalCondition === PhysicalCondition.GOOD) score += 10;
    if (userProfile.physicalCondition === PhysicalCondition.EXCELLENT) score += 15;
    
    if (userProfile.communicationSkills === CommunicationSkills.ADVANCED) score += 10;
    if (userProfile.communicationSkills === CommunicationSkills.EXPERT) score += 15;
    
    if (userProfile.motivationLevel === 'medium') score += 5;
    if (userProfile.motivationLevel === 'high') score += 10;
    if (userProfile.motivationLevel === 'very_high') score += 15;
    
    if (userProfile.income === 'medium') score += 5;
    if (userProfile.income === 'high') score += 10;
    if (userProfile.income === 'very_high') score += 15;
    
    if (userProfile.savings === 'medium') score += 5;
    if (userProfile.savings === 'high') score += 10;
    
    // Factores negativos
    const badHabits = userProfile.badHabits?.filter(h => h !== BadHabit.NONE) || [];
    score -= badHabits.length * 5;
    
    if (userProfile.pastTraumas?.includes('childhood')) score -= 5;
    if (userProfile.pastTraumas?.includes('relationship')) score -= 3;
    if (userProfile.pastTraumas?.includes('professional')) score -= 3;
    if (userProfile.pastTraumas?.includes('loss')) score -= 3;
    
    // Asegurar que el puntaje final esté entre 0 y maxScore
    score = Math.max(0, Math.min(score, maxScore));
    
    // Convertir el puntaje a un nivel
    if (score <= 20) return { level: 'Principiante', score };
    if (score <= 40) return { level: 'Aprendiz', score };
    if (score <= 60) return { level: 'Dedicado', score };
    if (score <= 80) return { level: 'Experto', score };
    return { level: 'Maestro', score };
  };

  const { level, score } = calculateUserLevel();

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
                <span className="text-sm bg-evolve-purple/20 px-2 py-0.5 rounded-full text-evolve-purple">
                  Nivel: {level}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-400">Condición física</span>
              <span>{
                userProfile.physicalCondition === PhysicalCondition.POOR ? 'Pobre' :
                userProfile.physicalCondition === PhysicalCondition.AVERAGE ? 'Promedio' :
                userProfile.physicalCondition === PhysicalCondition.GOOD ? 'Buena' : 'Excelente'
              }</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Motivación</span>
              <span>{
                userProfile.motivationLevel === 'very_low' ? 'Muy baja' :
                userProfile.motivationLevel === 'low' ? 'Baja' :
                userProfile.motivationLevel === 'medium' ? 'Media' :
                userProfile.motivationLevel === 'high' ? 'Alta' : 'Muy alta'
              }</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Estado de relación</span>
              <span>{
                userProfile.relationshipStatus === 'single' ? 'Soltero' :
                userProfile.relationshipStatus === 'in_relationship' ? 'En pareja' :
                userProfile.relationshipStatus === 'married' ? 'Casado' :
                userProfile.relationshipStatus === 'divorced' ? 'Divorciado' : 'Viudo'
              }</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Comunicación</span>
              <span>{
                userProfile.communicationSkills === CommunicationSkills.BEGINNER ? 'Principiante' :
                userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE ? 'Intermedio' :
                userProfile.communicationSkills === CommunicationSkills.ADVANCED ? 'Avanzado' : 'Experto'
              }</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default UserSummary;
