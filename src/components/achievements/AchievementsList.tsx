
import React from 'react';
import { useAchievements } from '@/context/AchievementsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Lock, Unlock } from 'lucide-react';

const AchievementsList = () => {
  const { achievements } = useAchievements();
  
  // Separar logros desbloqueados y bloqueados
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);
  
  if (!achievements.length) {
    return (
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Mis Logros</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <p>No hay logros disponibles en este momento.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Mis Logros</CardTitle>
      </CardHeader>
      <CardContent>
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Unlock size={16} className="text-green-400 mr-2" />
              Logros Desbloqueados ({unlockedAchievements.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlockedAchievements.map(achievement => {
                const unlockedDate = new Date(achievement.unlockedAt as Date);
                return (
                  <div
                    key={achievement.id}
                    className="p-3 bg-green-900/20 border border-green-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-gray-300">{achievement.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-800/50">
                            {getCategoryLabel(achievement.category)}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Desbloqueado: {format(unlockedDate, "d MMM yyyy", { locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {lockedAchievements.length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Lock size={16} className="text-gray-400 mr-2" />
              Logros por Desbloquear ({lockedAchievements.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lockedAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="p-3 bg-evolve-dark/40 border border-evolve-gray/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl opacity-50">{achievement.icon}</div>
                    <div className="opacity-75">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                      <div className="mt-2 flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(achievement.category)}
                        </Badge>
                        {achievement.requirement > 0 && (
                          <span className="text-xs text-gray-400">
                            Meta: {achievement.requirement} días
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get category display name
const getCategoryLabel = (category: string): string => {
  const categories: Record<string, string> = {
    fitness: 'Fitness',
    reading: 'Lectura',
    abstinence: 'Abstinencia',
    career: 'Carrera',
    social: 'Social',
    financial: 'Finanzas',
    overall: 'General'
  };
  
  return categories[category.toLowerCase()] || 'General';
};

export default AchievementsList;
