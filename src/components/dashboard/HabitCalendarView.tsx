
import React, { useMemo } from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDays, format, startOfWeek, startOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { HabitCategory } from '@/types/user';
import { Calendar } from 'lucide-react';

const HabitCalendarView = () => {
  const { habits } = useHabits();
  const isMobile = useIsMobile();
  
  // Create an array of the last 35 days (5 weeks)
  const today = new Date();
  const firstDay = startOfWeek(startOfMonth(today), { weekStartsOn: 1 });
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: isMobile ? addDays(today, -14) : firstDay,
      end: today
    });
  }, [isMobile, today]);
  
  // Find habits completed on each day
  const getDayHabits = (day: Date) => {
    return habits.filter(habit => {
      if (!habit.lastCompleted) return false;
      const completedDate = new Date(habit.lastCompleted);
      return isSameDay(completedDate, day);
    });
  };
  
  // Get color for habit category
  const getCategoryColor = (category: HabitCategory) => {
    switch (category) {
      case HabitCategory.FITNESS:
        return 'bg-blue-500';
      case HabitCategory.READING:
        return 'bg-green-500';
      case HabitCategory.ABSTINENCE:
        return 'bg-red-500';
      case HabitCategory.CAREER:
        return 'bg-amber-500';
      case HabitCategory.SOCIAL:
        return 'bg-indigo-500';
      case HabitCategory.FINANCIAL:
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Card hover={true} className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-evolve-purple" />
          <CardTitle>Calendario de hábitos</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-4 text-gray-300">
          Actividad reciente de hábitos completados
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {!isMobile && (
            <>
              <div className="text-center text-xs text-gray-400">Lun</div>
              <div className="text-center text-xs text-gray-400">Mar</div>
              <div className="text-center text-xs text-gray-400">Mié</div>
              <div className="text-center text-xs text-gray-400">Jue</div>
              <div className="text-center text-xs text-gray-400">Vie</div>
              <div className="text-center text-xs text-gray-400">Sáb</div>
              <div className="text-center text-xs text-gray-400">Dom</div>
            </>
          )}
          
          {days.map((day, i) => {
            const dayHabits = getDayHabits(day);
            const isToday = isSameDay(day, today);
            
            return (
              <div 
                key={i} 
                className={`aspect-square rounded-md flex flex-col items-center justify-center relative overflow-hidden transition-all hover:bg-evolve-dark/40
                  ${isToday ? 'border border-evolve-purple' : 'border border-gray-800'}`}
              >
                <div className="text-xs mb-1">
                  {isMobile ? format(day, 'dd/MM') : format(day, 'dd')}
                </div>
                {dayHabits.length > 0 ? (
                  <div className="flex flex-wrap justify-center">
                    {dayHabits.slice(0, 3).map((habit, j) => (
                      <div 
                        key={`${i}-${j}`} 
                        className={`w-2 h-2 m-0.5 rounded-full ${getCategoryColor(habit.category)}`}
                        title={habit.name}
                      />
                    ))}
                    {dayHabits.length > 3 && (
                      <div className="text-xs text-gray-400">+{dayHabits.length - 3}</div>
                    )}
                  </div>
                ) : (
                  <div className="w-2 h-2 bg-gray-700 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-2">Categorías:</div>
          <div className="flex flex-wrap gap-2">
            {Object.values(HabitCategory).map((category) => (
              <div key={category} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(category as HabitCategory)} mr-1`} />
                <span className="text-xs">{getCategoryLabel(category as HabitCategory)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get a readable category label
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

export default HabitCalendarView;
