
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { calculateUserLevel } from '@/utils/userLevelCalculator';
import { Wrench, ArrowUp, Hammer, ArrowUpRight } from 'lucide-react';

const UserSummary = () => {
  const { userProfile } = useUser();
  
  if (!userProfile) {
    return null;
  }
  
  const { level, score } = calculateUserLevel(userProfile);
  
  // Determine appropriate icon based on user level
  const getLevelIcon = () => {
    switch(level) {
      case 'Principiante': return <Wrench className="w-3 h-3 mr-1" />;
      case 'Aprendiz': return <Wrench className="w-3 h-3 mr-1" />;
      case 'Dedicado': return <Hammer className="w-3 h-3 mr-1" />;
      case 'Experto': return <Wrench className="w-3 h-3 mr-1 rotate-45" />;
      case 'Maestro': return <ArrowUpRight className="w-3 h-3 mr-1" />;
      default: return <Wrench className="w-3 h-3 mr-1" />;
    }
  };
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-evolve-purple/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-evolve-purple/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <CardContent className="pt-6 pb-6 flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-16 h-16 border-2 border-evolve-purple">
            <AvatarImage src={userProfile.avatar || undefined} alt={userProfile.name} />
            <AvatarFallback className="bg-evolve-purple/20 text-white text-lg">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-evolve-purple text-white rounded-full w-6 h-6 flex items-center justify-center border border-evolve-dark">
            {level === 'Principiante' && <Wrench size={14} />}
            {level === 'Aprendiz' && <Wrench size={14} />}
            {level === 'Dedicado' && <Hammer size={14} />}
            {level === 'Experto' && <Wrench size={14} className="rotate-45" />}
            {level === 'Maestro' && <ArrowUpRight size={14} />}
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="font-bold text-xl flex items-center">
            {userProfile.name || "Usuario"}
            <div className="ml-2 bg-evolve-purple/20 text-evolve-purple text-xs px-2 py-0.5 rounded-full flex items-center">
              {getLevelIcon()}
              <span>Nivel {level}</span>
            </div>
          </h2>
          
          <div className="text-sm text-gray-300 flex items-center mt-1">
            <span>Alpha Score: {score}/100</span>
            <div className="ml-2 text-xs text-green-400 flex items-center">
              <ArrowUp className="w-3 h-3" />
              <span>+5pts</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <div className="h-1 bg-gradient-to-r from-evolve-purple via-evolve-blue to-evolve-purple w-full"></div>
    </Card>
  );
};

export default UserSummary;
