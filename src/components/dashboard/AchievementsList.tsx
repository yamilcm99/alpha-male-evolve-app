
import React from 'react';
import { useAchievements } from '@/context/AchievementsContext';
import { Card, CardContent, CardHeader, CardTitle, CardMetric } from '@/components/ui/card';
import { AchievementCategory } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';

const AchievementsList = () => {
  const { achievements } = useAchievements();

  const getCategoryName = (category: AchievementCategory) => {
    switch (category) {
      case AchievementCategory.FITNESS:
        return 'Fitness';
      case AchievementCategory.READING:
        return 'Lectura';
      case AchievementCategory.ABSTINENCE:
        return 'Abstinencia';
      case AchievementCategory.CAREER:
        return 'Carrera';
      case AchievementCategory.SOCIAL:
        return 'Social';
      case AchievementCategory.FINANCIAL:
        return 'Financiero';
      case AchievementCategory.OVERALL:
        return 'General';
      default:
        return 'Otro';
    }
  };

  const getCategoryColor = (category: AchievementCategory) => {
    switch (category) {
      case AchievementCategory.FITNESS:
        return 'bg-blue-500';
      case AchievementCategory.READING:
        return 'bg-yellow-500';
      case AchievementCategory.ABSTINENCE:
        return 'bg-red-500';
      case AchievementCategory.CAREER:
        return 'bg-green-500';
      case AchievementCategory.SOCIAL:
        return 'bg-purple-500';
      case AchievementCategory.FINANCIAL:
        return 'bg-emerald-500';
      case AchievementCategory.OVERALL:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!achievements || !achievements.length) {
    return (
      <Card hover={true} className="h-full">
        <CardHeader>
          <CardTitle>Logros</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <p>No hay logros disponibles aún.</p>
        </CardContent>
      </Card>
    );
  }

  // Filtrar logros desbloqueados
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  // Obtener los últimos 3 logros desbloqueados
  const recentAchievements = [...unlockedAchievements].sort(
    (a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime()
  ).slice(0, 3);

  return (
    <Card hover={true}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Logros Recientes</CardTitle>
          <Badge variant="outline" className="border-evolve-purple">
            {unlockedAchievements.length} / {achievements.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {recentAchievements.length > 0 ? (
          <div className="space-y-3">
            {recentAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className="flex items-center p-3 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20 transition-all hover:bg-evolve-dark/60"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(achievement.category)}`}>
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{achievement.name}</h4>
                  <div className="flex items-center text-sm text-gray-300">
                    <Badge variant="outline" className="mr-2 border-evolve-gray/50 text-xs">
                      {getCategoryName(achievement.category)}
                    </Badge>
                    <span>
                      {new Date(achievement.unlockedAt!).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <a 
              href="/achievements"
              className="block text-center text-evolve-purple hover:underline mt-4 py-2 transition-all hover:text-evolve-blue"
            >
              Ver todos los logros
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-evolve-gray/20 flex items-center justify-center mb-3">
              <Lock size={24} className="text-evolve-gray" />
            </div>
            <CardMetric>0 Logros</CardMetric>
            <p className="card-context">Completa tus hábitos diarios para desbloquear logros</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsList;
