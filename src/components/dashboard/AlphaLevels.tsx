
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Hammer, Wrench, ArrowUpRight } from 'lucide-react';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const AlphaLevels = () => {
  const { userProfile } = useUser();
  
  const levels = [
    { name: "Principiante", description: "Comienzo del camino de evolución", minScore: 0, maxScore: 20, color: "bg-red-500", icon: <Wrench size={16} /> },
    { name: "Aprendiz", description: "Aprendiendo los fundamentos", minScore: 21, maxScore: 40, color: "bg-orange-500", icon: <Wrench size={16} /> },
    { name: "Dedicado", description: "Compromiso con el desarrollo personal", minScore: 41, maxScore: 60, color: "bg-yellow-500", icon: <Hammer size={16} /> },
    { name: "Experto", description: "Dominio de las habilidades clave", minScore: 61, maxScore: 80, color: "bg-green-500", icon: <Wrench size={16} className="rotate-45" /> },
    { name: "Maestro", description: "Nivel alpha completo", minScore: 81, maxScore: 100, color: "bg-evolve-purple", icon: <ArrowUpRight size={16} /> }
  ];

  if (!userProfile) {
    return null;
  }

  const { level, score, levelCompletions } = calculateUserLevel(userProfile);
  const currentLevelObj = levels.find(l => l.name === level) || levels[0];
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-evolve-purple/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-evolve-purple/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
      
      <CardContent className="pt-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-evolve-purple" />
            Niveles Alpha
          </h2>
          <div className="text-sm bg-evolve-purple/20 px-3 py-1.5 rounded-full border border-evolve-purple/20 flex items-center">
            <span className="mr-2">Tu nivel:</span>
            <span className="font-bold">{level}</span>
            <div className="mx-1 h-3 w-px bg-evolve-purple/30"></div>
            <div className="flex items-center">
              <span className="text-evolve-purple font-mono">{score}</span>
              <span className="text-gray-400">/100</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="h-14 flex mb-2">
            {levels.map((lvl, index) => (
              <div 
                key={lvl.name} 
                className={`flex-1 ${lvl.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === levels.length - 1 ? 'rounded-r-lg' : ''} flex items-center justify-center text-xs font-bold relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <span className="relative z-10 flex items-center">
                  <span className="mr-1">{lvl.icon}</span>
                  {lvl.name}
                </span>
                {lvl.name === level && (
                  <div className="absolute inset-0 border-2 border-white"></div>
                )}
              </div>
            ))}
          </div>
          <div className="relative h-3 bg-gray-800 rounded-full mb-6">
            <div 
              className="absolute top-0 h-3 rounded-full bg-gradient-to-r from-evolve-purple to-evolve-blue" 
              style={{ width: `${score}%` }}
            />
            <div 
              className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-evolve-purple -mt-0.5 transition-all duration-700 ease-out"
              style={{ left: `${Math.max(0, Math.min(score, 100))}%`, transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {levels.map((lvl, index) => {
            const isCurrentLevel = lvl.name === level;
            const isPastLevel = index < levels.findIndex(l => l.name === level);
            
            // Use the levelCompletions data to determine the progress for each level bar
            const levelProgress = levelCompletions[lvl.name as keyof typeof levelCompletions];
            
            return (
              <div 
                key={lvl.name}
                className={`p-3 rounded-lg ${isCurrentLevel ? 'border-2 border-evolve-purple bg-evolve-purple/10' : isPastLevel ? 'bg-gray-800/80 border border-evolve-purple/30' : 'bg-gray-800/50 border border-gray-700'} flex flex-col items-center text-center transition-all hover:border-evolve-purple/50`}
              >
                <div className="w-8 h-8 rounded-full bg-evolve-dark flex items-center justify-center mb-2 border border-gray-700">
                  <div className={`w-6 h-6 rounded-full ${lvl.color} flex items-center justify-center`}>
                    {lvl.icon}
                  </div>
                </div>
                <span className="text-sm font-bold">{lvl.name}</span>
                <p className="text-xs text-gray-400 mt-1">{lvl.description}</p>
                <div className="mt-2 w-full">
                  <div className="relative pt-3">
                    <div className="overflow-hidden h-6 text-xs flex rounded-full bg-gray-800/80">
                      <div 
                        style={{ width: `${levelProgress}%` }}
                        className={`${lvl.color} rounded-l-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/10 pattern-diagonal-stripes pattern-white pattern-bg-transparent pattern-size-2 pattern-opacity-10"></div>
                      </div>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full overflow-hidden border-2 border-white absolute -top-1 -right-3 flex items-center justify-center bg-evolve-dark shadow-lg transition-all"
                      style={{ 
                        right: `calc(${100 - levelProgress}% - 16px)`
                      }}
                    >
                      <Gauge className="w-4 h-4 text-evolve-purple" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlphaLevels;
