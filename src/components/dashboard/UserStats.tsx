
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  PhysicalCondition, 
  CommunicationSkills,
  LifeStage,
  SavingsLevel,
  IncomeLevel
} from '@/types/user';
import { Users, Dumbbell, Brain, DollarSign, TrendingUp } from 'lucide-react';

const UserStats = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return null;
  }

  // Function to determine physical condition level (1-4)
  const getPhysicalLevel = () => {
    switch (userProfile.physicalCondition) {
      case PhysicalCondition.POOR: return 1;
      case PhysicalCondition.AVERAGE: return 2;
      case PhysicalCondition.GOOD: return 3;
      case PhysicalCondition.EXCELLENT: return 4;
      default: return 2;
    }
  };

  // Function to determine communication skills level (1-4)
  const getCommunicationLevel = () => {
    switch (userProfile.communicationSkills) {
      case CommunicationSkills.BEGINNER: return 1;
      case CommunicationSkills.INTERMEDIATE: return 2;
      case CommunicationSkills.ADVANCED: return 3;
      case CommunicationSkills.EXPERT: return 4;
      default: return 2;
    }
  };
  
  // Function to determine savings level (1-4)
  const getSavingsLevel = () => {
    switch (userProfile.savings) {
      case SavingsLevel.NONE: return 1;
      case SavingsLevel.LOW: return 2;
      case SavingsLevel.MEDIUM: return 3;
      case SavingsLevel.HIGH: return 4;
      default: return 2;
    }
  };

  // Function to determine income level (1-5)
  const getIncomeLevel = () => {
    switch (userProfile.income) {
      case IncomeLevel.NONE: return 1;
      case IncomeLevel.LOW: return 2;
      case IncomeLevel.MEDIUM: return 3;
      case IncomeLevel.HIGH: return 4;
      case IncomeLevel.VERY_HIGH: return 5;
      default: return 3;
    }
  };

  // Function to determine life stage impact (1-5)
  const getLifeStageLevel = () => {
    switch (userProfile.lifeStage) {
      case LifeStage.CRITICAL: return 1;
      case LifeStage.DESCENT: return 2;
      case LifeStage.UNSTABLE: return 3;
      case LifeStage.PLATEAU: return 4;
      case LifeStage.ASCENT: return 5;
      default: return 3;
    }
  };

  // Calculate the overall progress
  const calculateOverallProgress = () => {
    const physical = getPhysicalLevel();
    const communication = getCommunicationLevel();
    const savings = getSavingsLevel();
    const income = getIncomeLevel();
    const lifeStage = getLifeStageLevel();
    
    // Normalize to 0-100%
    const maxPossible = 4 + 4 + 4 + 5 + 5; // Max possible from all categories
    const current = physical + communication + savings + income + lifeStage;
    return Math.round((current / maxPossible) * 100);
  };

  // Helper function to convert numeric level to a label
  const getLevelLabel = (level: number, maxLevel: number) => {
    const labels = {
      4: ["Bajo", "Medio", "Alto", "Excelente"],
      5: ["Muy bajo", "Bajo", "Medio", "Alto", "Excelente"]
    };
    
    return labels[maxLevel as 4 | 5][level - 1];
  };

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Estado actual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Dumbbell className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium">Condición física</span>
            </div>
            <span className="text-sm text-blue-400">{getLevelLabel(getPhysicalLevel(), 4)}</span>
          </div>
          <Progress value={(getPhysicalLevel() / 4) * 100} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">
            {getPhysicalLevel() < 4 ? `Aumenta la frecuencia e intensidad de tu ejercicio para alcanzar el siguiente nivel` : `¡Estás en excelente forma! Mantén tu rutina.`}
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-indigo-500 mr-2" />
              <span className="text-sm font-medium">Habilidades comunicativas</span>
            </div>
            <span className="text-sm text-indigo-500">{getLevelLabel(getCommunicationLevel(), 4)}</span>
          </div>
          <Progress value={(getCommunicationLevel() / 4) * 100} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">
            {getCommunicationLevel() < 4 ? `Practica hablar en público y mejorar tu asertividad para avanzar` : `¡Eres un comunicador experto! Ayuda a otros a mejorar.`}
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium">Nivel de ahorros</span>
            </div>
            <span className="text-sm text-green-500">{getLevelLabel(getSavingsLevel(), 4)}</span>
          </div>
          <Progress value={(getSavingsLevel() / 4) * 100} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">
            {getSavingsLevel() < 4 ? `Incrementa tus ahorros mensuales para aumentar tu seguridad financiera` : `¡Gran trabajo! Tienes un colchón financiero sólido.`}
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium">Nivel de ingresos</span>
            </div>
            <span className="text-sm text-amber-500">{getLevelLabel(getIncomeLevel(), 5)}</span>
          </div>
          <Progress value={(getIncomeLevel() / 5) * 100} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">
            {getIncomeLevel() < 5 ? `Busca oportunidades para aumentar tus fuentes de ingreso` : `¡Excelente nivel de ingresos! Considera diversificar tus inversiones.`}
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium">Etapa vital</span>
            </div>
            <span className="text-sm text-purple-500">{getLevelLabel(getLifeStageLevel(), 5)}</span>
          </div>
          <Progress value={(getLifeStageLevel() / 5) * 100} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">
            {getLifeStageLevel() < 5 ? `Trabaja en tus objetivos para avanzar a una etapa de ascenso constante` : `¡Estás en una etapa de ascenso! Mantén tu impulso.`}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-evolve-purple mr-2" />
              <span className="text-sm font-medium">Progreso general</span>
            </div>
            <span className="text-sm text-evolve-purple">{calculateOverallProgress()}%</span>
          </div>
          <Progress value={calculateOverallProgress()} className="h-3 bg-evolve-dark" />
          <p className="text-xs text-center text-gray-400 mt-2">
            Tu desarrollo integral basado en todos los factores medibles
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
