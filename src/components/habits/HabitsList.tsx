
import React, { useMemo, useState } from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, ArrowUpRight, Loader2, Star, Filter } from 'lucide-react';
import { HabitCategory } from '@/types/user';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const HabitsList = () => {
  const { habits, completeHabit } = useHabits();
  const { userProfile } = useUser();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showMegaOnly, setShowMegaOnly] = useState(false);
  
  const userLevel = useMemo(() => {
    if (!userProfile) return { level: 'Principiante', score: 0 };
    return calculateUserLevel(userProfile);
  }, [userProfile]);
  
  const handleComplete = async (habitId: string) => {
    try {
      completeHabit(habitId);
      toast.success('¡Hábito completado para hoy!', {
        description: 'Sigue así para mantener tu racha.',
        duration: 3000
      });
    } catch (error) {
      toast.error('No se pudo completar el hábito', {
        description: 'Por favor intenta nuevamente.',
        duration: 3000
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

  // Determinar si un hábito está disponible según el nivel del usuario
  const isHabitAvailableForUserLevel = (requiredLevel: string): boolean => {
    const levelRanking = {
      'Principiante': 1,
      'Aprendiz': 2,
      'Dedicado': 3,
      'Experto': 4,
      'Maestro': 5
    };
    
    return levelRanking[userLevel.level as keyof typeof levelRanking] >= levelRanking[requiredLevel as keyof typeof levelRanking];
  };

  // Filtrar y ordenar los hábitos
  const filteredAndSortedHabits = useMemo(() => {
    let filtered = [...habits];
    
    // Filtrar por nivel del usuario
    filtered = filtered.filter(habit => {
      if (!habit.requiredLevel) return true;
      return isHabitAvailableForUserLevel(habit.requiredLevel);
    });
    
    // Filtrar por categoría si se ha seleccionado alguna
    if (categoryFilter) {
      filtered = filtered.filter(habit => habit.category === categoryFilter);
    }
    
    // Filtrar por mega hábitos si está activo el filtro
    if (showMegaOnly) {
      filtered = filtered.filter(habit => habit.isMegaHabit);
    }
    
    // Ordenar: primero los no completados, luego por racha (mayor primero)
    return filtered.sort((a, b) => {
      // Mostrar primero los mega hábitos
      if (a.isMegaHabit && !b.isMegaHabit) return -1;
      if (!a.isMegaHabit && b.isMegaHabit) return 1;
      
      // Después los no completados
      const aCompleted = isCompletedToday(a.lastCompleted);
      const bCompleted = isCompletedToday(b.lastCompleted);
      if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
      
      // Y finalmente por racha (mayor primero)
      return b.streak - a.streak;
    });
  }, [habits, categoryFilter, showMegaOnly, userLevel]);

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
        <CardTitle className="flex items-center">
          Mis Hábitos
          <span className="ml-2 text-sm font-normal text-gray-400">
            (Nivel actual: {userLevel.level})
          </span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowMegaOnly(!showMegaOnly)}
            className={`${showMegaOnly ? 'bg-evolve-purple/20 border-evolve-purple' : ''}`}
          >
            <Star size={16} className={`mr-1 ${showMegaOnly ? 'text-yellow-400' : ''}`} />
            Mega Hábitos
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="?tab=new">
              <span className="mr-2">Nuevo</span>
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <div className="px-6 pb-2 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCategoryFilter(null)}
          className={`${!categoryFilter ? 'bg-evolve-purple/20 border-evolve-purple' : ''}`}
        >
          Todos
        </Button>
        {Object.values(HabitCategory).map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setCategoryFilter(category)}
            className={`${categoryFilter === category ? 'bg-evolve-purple/20 border-evolve-purple' : ''}`}
          >
            <span className="mr-1">{getCategoryIcon(category as HabitCategory)}</span>
            {getCategoryLabel(category as HabitCategory)}
          </Button>
        ))}
      </div>
      
      <CardContent>
        <div 
          className="space-y-3"
          role="list"
          aria-label="Lista de hábitos"
        >
          <AnimatePresence>
            {filteredAndSortedHabits.length > 0 ? (
              filteredAndSortedHabits.map(habit => {
                const completed = isCompletedToday(habit.lastCompleted);
                
                return (
                  <motion.div 
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:border-evolve-purple/30
                      ${habit.isMegaHabit ? 'bg-evolve-dark/60 border-yellow-500/30' : 'bg-evolve-dark/40 border-evolve-gray/20'}`}
                    role="listitem"
                  >
                    <div className="flex items-center">
                      {habit.isMegaHabit && (
                        <div className="mr-2">
                          <Star size={18} className="text-yellow-400" />
                        </div>
                      )}
                      <span 
                        className="mr-3 text-2xl" 
                        role="img" 
                        aria-label={`Categoría: ${habit.category}`}
                      >
                        {getCategoryIcon(habit.category)}
                      </span>
                      <div>
                        <h4 className="font-medium">
                          {habit.name}
                          {habit.requiredLevel && (
                            <span className="ml-2 px-2 py-0.5 bg-evolve-purple/20 text-xs rounded-full">
                              Nivel {habit.requiredLevel}
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="mr-2">Racha: {habit.streak} días</span>
                          <span>Meta: {habit.goal} días</span>
                          {habit.isMegaHabit && (
                            <span className="ml-2 text-yellow-400">+2x puntos</span>
                          )}
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
              })
            ) : (
              <div className="text-center py-6 text-gray-400">
                No se encontraron hábitos con los filtros seleccionados
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

// Función auxiliar para obtener etiquetas legibles de categorías
const getCategoryLabel = (category: HabitCategory): string => {
  switch (category) {
    case HabitCategory.FITNESS:
      return 'Fitness';
    case HabitCategory.READING:
      return 'Lectura';
    case HabitCategory.ABSTINENCE:
      return 'Abstinencia';
    case HabitCategory.CAREER:
      return 'Carrera';
    case HabitCategory.SOCIAL:
      return 'Social';
    case HabitCategory.FINANCIAL:
      return 'Finanzas';
    case HabitCategory.OTHER:
    default:
      return 'Otro';
  }
};

export default HabitsList;
