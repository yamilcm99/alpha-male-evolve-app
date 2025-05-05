
import React from 'react';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import { useAchievements } from '@/context/AchievementsContext';
import { useGoals } from '@/context/GoalsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Check, Calendar, ArrowUp } from 'lucide-react';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const ProgressStats = () => {
  const { userProfile } = useUser();
  const { habits } = useHabits();
  const { achievements } = useAchievements();
  const { goals } = useGoals();
  
  if (!userProfile) return null;
  
  const { level, score } = calculateUserLevel(userProfile);
  
  // Calculate habit completion stats
  const totalHabits = habits.length;
  const habitsInProgress = habits.filter(h => h.streak > 0).length;
  const habitsCompleted = habits.filter(h => h.cycleCompleted).length;
  const habitProgress = totalHabits ? Math.round((habitsInProgress / totalHabits) * 100) : 0;
  
  // Calculate achievement stats
  const totalAchievements = achievements.length;
  const achievementsUnlocked = achievements.filter(a => a.unlockedAt).length;
  const achievementProgress = totalAchievements ? Math.round((achievementsUnlocked / totalAchievements) * 100) : 0;
  
  // Calculate goals stats
  const totalGoals = goals.length;
  const goalsCompleted = goals.filter(g => g.completed).length;
  const goalProgress = totalGoals ? Math.round((goalsCompleted / totalGoals) * 100) : 0;
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Estadísticas de progreso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            title="Nivel Actual" 
            value={level} 
            icon={<ArrowUp className="h-5 w-5 text-evolve-purple" />} 
            subvalue={`${score}/100 puntos`} 
          />
          
          <StatCard 
            title="Hábitos" 
            value={`${habitsInProgress}/${totalHabits}`} 
            icon={<Calendar className="h-5 w-5 text-blue-400" />} 
            subvalue={`${habitsCompleted} ciclos completados`} 
          />
          
          <StatCard 
            title="Logros" 
            value={`${achievementsUnlocked}/${totalAchievements}`} 
            icon={<Trophy className="h-5 w-5 text-amber-500" />} 
            subvalue={`${achievementProgress}% desbloqueado`} 
          />
          
          <StatCard 
            title="Metas" 
            value={`${goalsCompleted}/${totalGoals}`} 
            icon={<Check className="h-5 w-5 text-green-500" />} 
            subvalue={`${goalProgress}% completado`} 
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Hábitos en progreso</span>
              <span className="text-sm text-blue-400">{habitProgress}%</span>
            </div>
            <Progress value={habitProgress} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Logros desbloqueados</span>
              <span className="text-sm text-amber-500">{achievementProgress}%</span>
            </div>
            <Progress value={achievementProgress} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Metas completadas</span>
              <span className="text-sm text-green-500">{goalProgress}%</span>
            </div>
            <Progress value={goalProgress} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progreso general</span>
              <span className="text-sm text-evolve-purple">{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ title, value, icon, subvalue }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  subvalue: string;
}) => {
  return (
    <div className="bg-evolve-dark/40 p-3 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="mt-2">
        <div className="text-xl font-bold">{value}</div>
        <div className="text-xs text-gray-400">{subvalue}</div>
      </div>
    </div>
  );
};

export default ProgressStats;
