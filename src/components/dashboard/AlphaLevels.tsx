
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge } from 'lucide-react';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const AlphaLevels = () => {
  const { userProfile } = useUser();
  const levels = [
    { name: "Principiante", description: "Comienzo del camino de evolución", minScore: 0, maxScore: 20, color: "bg-red-500" },
    { name: "Aprendiz", description: "Aprendiendo los fundamentos", minScore: 21, maxScore: 40, color: "bg-orange-500" },
    { name: "Dedicado", description: "Compromiso con el desarrollo personal", minScore: 41, maxScore: 60, color: "bg-yellow-500" },
    { name: "Experto", description: "Dominio de las habilidades clave", minScore: 61, maxScore: 80, color: "bg-green-500" },
    { name: "Maestro", description: "Nivel alpha completo", minScore: 81, maxScore: 100, color: "bg-evolve-purple" }
  ];

  if (!userProfile) {
    return null;
  }

  const { level, score } = calculateUserLevel(userProfile);
  const currentLevelObj = levels.find(l => l.name === level) || levels[0];
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            Niveles Alpha
          </h2>
          <div className="text-sm bg-evolve-purple/20 px-3 py-1 rounded-full">
            Tu nivel: <span className="font-bold">{level}</span> ({score}/100)
          </div>
        </div>

        <div className="relative">
          <div className="h-12 flex mb-2">
            {levels.map((lvl, index) => (
              <div 
                key={lvl.name} 
                className={`flex-1 ${lvl.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === levels.length - 1 ? 'rounded-r-lg' : ''} flex items-center justify-center text-xs font-bold`}
              >
                {lvl.name}
              </div>
            ))}
          </div>
          <div className="relative h-3 bg-gray-800 rounded-full mb-4">
            <div 
              className="absolute top-0 h-3 rounded-full bg-evolve-purple" 
              style={{ width: `${score}%` }}
            />
            <div 
              className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-evolve-purple -mt-0.5"
              style={{ left: `${Math.max(0, Math.min(score, 100))}%`, transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {levels.map((lvl, index) => (
            <div 
              key={lvl.name}
              className={`p-3 rounded-lg ${lvl.name === level ? 'border-2 border-evolve-purple/70 bg-evolve-dark' : 'bg-gray-800/50'} flex flex-col items-center text-center`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${lvl.color} mr-1`}></div>
                <span className="text-sm font-bold">{lvl.name}</span>
              </div>
              <p className="text-xs text-gray-400">{lvl.description}</p>
              <div className="mt-2 w-full">
                <div className="relative pt-3">
                  <div className="overflow-hidden h-6 text-xs flex rounded-full bg-gray-800">
                    <div 
                      style={{ 
                        width: level === lvl.name 
                          ? `${((score - lvl.minScore) / (lvl.maxScore - lvl.minScore)) * 100}%` 
                          : level !== levels[index+1]?.name ? (level !== levels[index-1]?.name ? '0%' : '100%') : '0%'
                      }} 
                      className={`${lvl.color} rounded-l-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
                    ></div>
                  </div>
                  <div 
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white absolute -top-1 -right-3 flex items-center justify-center bg-evolve-dark"
                    style={{ 
                      right: level === lvl.name 
                        ? `calc(${100 - ((score - lvl.minScore) / (lvl.maxScore - lvl.minScore)) * 100}% - 16px)` 
                        : 'calc(100% - 16px)'
                    }}
                  >
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlphaLevels;
