import React, { useMemo } from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, ArrowUpRight, Loader2 } from 'lucide-react';
import { HabitCategory } from '@/types/user';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HabitsList = () => {
  const { habits, completeHabit } = useHabits();
  
  const handleComplete = async (habitId: string) => {
    try {
      completeHabit(habitId);
      toast.success('¡Hábito completado para hoy!', {
        description: 'Sigue así para mantener tu racha.'
      });
    } catch (error) {
      toast.error('No se pudo completar el hábito', {
        description: 'Por favor intenta nuevamente.'
      });
    }
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
    return today.toDateString() === completedDate.toDateString();
  };

  // Memoize the sorted habits list
  const sortedHabits = useMemo(() => {
    return [...habits].sort((a, b) => {
      // Show incomplete habits first
      const aCompleted = isCompletedToday(a.lastCompleted);
      const bCompleted = isCompletedToday(b.lastCompleted);
      if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
      
      // Then sort by streak (higher streaks first)
      return b.streak - a.streak;
    });
  }, [habits]);

  if (!habits.length) {
    return (
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Mis Hábitos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <p className="mb-4">No tienes hábitos configurados aún.</p>
            <Button 
              asChild
              className="bg-evolve-purple hover:bg-evolve-purple/80"
            >
              <Link to="?tab=new">
                Crear primer hábito
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Hábitos</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="?tab=new">
            <span className="mr-2">Nuevo</span>
            <ArrowUpRight size={16} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div 
          className="space-y-3"
          role="list"
          aria-label="Lista de hábitos"
        >
          <AnimatePresence>
            {sortedHabits.map(habit => {
              const completed = isCompletedToday(habit.lastCompleted);
              
              return (
                <motion.div 
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20 transition-all hover:border-evolve-purple/30"
                  role="listitem"
                >
                  <div className="flex items-center">
                    <span 
                      className="mr-3 text-2xl" 
                      role="img" 
                      aria-label={`Categoría: ${habit.category}`}
                    >
                      {getCategoryIcon(habit.category)}
                    </span>
                    <div>
                      <h4 className="font-medium">{habit.name}</h4>
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="mr-2">Racha: {habit.streak} días</span>
                        <span>Meta: {habit.goal} días</span>
                      </div>
                    </div>
                  </div>
                  
                  {completed ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center text-green-500 bg-green-500/10 px-3 py-1 rounded-full"
                    >
                      <Check size={16} className="mr-1" />
                      <span>Completado</span>
                    </motion.div>
                  ) : (
                    <Button
                      onClick={() => handleComplete(habit.id)}
                      size="sm"
                      className="bg-evolve-purple hover:bg-evolve-purple/80 transition-all group-hover:scale-105"
                      aria-label={`Completar hábito: ${habit.name}`}
                    >
                      <Calendar size={16} className="mr-2" /> 
                      Completar
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitsList;