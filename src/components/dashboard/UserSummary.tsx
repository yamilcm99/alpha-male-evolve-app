
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { calculateUserLevel } from '@/utils/userLevelCalculator';
import { Bot, ChevronRight } from 'lucide-react';

const UserSummary = () => {
  const { userProfile } = useUser();
  
  if (!userProfile) {
    return null;
  }
  
  const { level, score } = calculateUserLevel(userProfile);
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-evolve-purple/20 rounded-full flex items-center justify-center border-2 border-evolve-purple">
            <span className="text-2xl font-bold">{level}</span>
          </div>
          <div>
            <h3 className="text-xl font-medium">
              {userProfile.name}
            </h3>
            <p className="text-sm text-gray-300">
              Alpha Level {level} | {score}/100 puntos
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="bg-evolve-dark/40 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Edad</p>
            <p>{userProfile.age} años</p>
          </div>
          
          <div className="bg-evolve-dark/40 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Estado físico</p>
            <p>{getPhysicalConditionText(userProfile.physicalCondition)}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col pt-2 gap-2">
        <Button
          variant="outline"
          className="w-full border-evolve-purple/50 hover:bg-evolve-purple/20 justify-between"
          asChild
        >
          <Link to="/plan">
            <span>Ver plan personalizado</span>
            <ChevronRight size={16} />
          </Link>
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-evolve-purple/50 hover:bg-evolve-purple/20 justify-between"
          asChild
        >
          <Link to="/ai-coach">
            <div className="flex items-center">
              <Bot size={16} className="mr-2 text-evolve-purple" /> 
              <span>Consultar con mi coach IA</span>
            </div>
            <ChevronRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to get user-friendly text for physical condition
const getPhysicalConditionText = (condition: string): string => {
  switch (condition) {
    case 'poor':
      return 'Bajo';
    case 'average':
      return 'Promedio';
    case 'good':
      return 'Bueno';
    case 'excellent':
      return 'Excelente';
    default:
      return 'No especificado';
  }
};

export default UserSummary;
