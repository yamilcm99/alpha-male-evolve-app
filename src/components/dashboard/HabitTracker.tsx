
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { HabitCategory } from '@/types/user';
import { toast } from '@/components/ui/sonner';

const HabitTracker = () => {
  const { habits, completeHabit } = useUser();
  
  const handleComplete = (habitId: string) => {
    completeHabit(habitId);
    toast.success('¡Hábito completado para hoy!');
  };
  
  const getCategoryIcon = (category: HabitCategory) => {
    switch (category) {
      case HabitCategory.FITNESS:
        return '💪';
      case HabitCategory.READING:
        return '📚';
      case HabitCategory.ABSTINENCE:
        return '🚫';
      case HabitCategory.CAREER:
        return '💼';
      case HabitCategory.SOCIAL:
        return '👥';
      case HabitCategory.FINANCIAL:
        return '💰';
      default:
        return '⭐';
    }
  };

  const isCompletedToday = (lastCompleted: Date | null): boolean => {
    if (!lastCompleted) return false;
    
    const today = new Date();
    const completedDate = new Date(lastCompleted);
    
    return (
      today.getDate() === completedDate.getDate() &&
      today.getMonth() === completedDate.getMonth() &&
      today.getFullYear() === completedDate.getFullYear()
    );
  };

  if (!habits.length) {
    return (
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Seguimiento de Hábitos</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <p className="mb-4">No tienes hábitos configurados aún.</p>
            <Button asChild className="bg-evolve-purple hover:bg-evolve-purple/80">
              <a href="/habits">Configurar Hábitos</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Seguimiento de Hábitos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {habits.map(habit => {
            const completed = isCompletedToday(habit.lastCompleted);
            
            return (
              <div 
                key={habit.id}
                className="flex items-center justify-between p-3 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">{getCategoryIcon(habit.category)}</span>
                  <div>
                    <h4 className="font-medium">{habit.name}</h4>
                    <div className="flex items-center text-sm text-gray-300">
                      <span className="mr-2">Racha: {habit.streak} días</span>
                      <span>Meta: {habit.goal} días</span>
                    </div>
                  </div>
                </div>
                
                {completed ? (
                  <div className="flex items-center text-green-500">
                    <Check size={20} className="mr-1" />
                    <span>Completado</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleComplete(habit.id)}
                    size="sm"
                    className="bg-evolve-purple hover:bg-evolve-purple/80"
                  >
                    Completar
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
