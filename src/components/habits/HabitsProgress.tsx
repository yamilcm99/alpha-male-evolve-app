
import React from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const HabitsProgress = () => {
  const { habits } = useHabits();
  const isMobile = useIsMobile();
  
  // Calcular progreso general de hábitos
  const totalHabits = habits.length;
  const habitsInProgress = habits.filter(h => h.streak > 0).length;
  const habitsCompleted = habits.filter(h => h.cycleCompleted).length;
  const habitProgress = totalHabits ? Math.round((habitsInProgress / totalHabits) * 100) : 0;
  
  // Agrupar hábitos por categoría para el gráfico de barras
  const habitsByCategory = habits.reduce((acc, habit) => {
    const category = habit.category.toString();
    if (!acc[category]) {
      acc[category] = {
        category: getCategoryLabel(habit.category),
        total: 0,
        completed: 0,
        progress: 0
      };
    }
    
    acc[category].total += 1;
    if (habit.cycleCompleted) acc[category].completed += 1;
    acc[category].progress = Math.round((acc[category].completed / acc[category].total) * 100);
    
    return acc;
  }, {} as Record<string, { category: string; total: number; completed: number; progress: number }>);
  
  const categoryData = Object.values(habitsByCategory);
  
  // Datos para el gráfico de progreso individual
  const habitData = habits.map(habit => ({
    name: habit.name.length > 10 ? habit.name.substring(0, 10) + '...' : habit.name,
    progreso: Math.min(100, Math.round((habit.streak / habit.goal) * 100)),
    categoria: habit.category
  }));
  
  return (
    <div className="space-y-6">
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Hábitos en progreso</span>
              <span className="text-sm text-blue-400">{habitProgress}%</span>
            </div>
            <Progress value={habitProgress} className="h-2" />
            <p className="text-sm text-gray-400 mt-2">
              {habitsCompleted} de {totalHabits} hábitos han completado su ciclo de 21 días
            </p>
          </div>
          
          {categoryData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-4">Progreso por categoría</h3>
              <div className="space-y-3">
                {categoryData.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{cat.category}</span>
                      <span className="text-sm text-blue-400">{cat.progress}%</span>
                    </div>
                    <Progress value={cat.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Progreso Individual</CardTitle>
        </CardHeader>
        <CardContent>
          {habitData.length > 0 ? (
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
              <BarChart
                data={habitData}
                margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#999" />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  width={100}
                  stroke="#999"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '4px' }}
                  labelStyle={{ color: 'white' }}
                />
                <Bar 
                  dataKey="progreso" 
                  name="Progreso (%)" 
                  radius={[0, 4, 4, 0]} 
                  maxBarSize={30}
                >
                  {habitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCategoryColor(entry.categoria)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Completa tus hábitos para ver el progreso individual</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get category colors
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fitness': return '#6366F1';
    case 'reading': return '#8B5CF6';
    case 'abstinence': return '#EC4899';
    case 'career': return '#10B981';
    case 'social': return '#F59E0B';
    case 'financial': return '#3B82F6';
    default: return '#8B5CF6';
  }
};

// Helper function to get a readable category label
const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'fitness': return 'Fitness';
    case 'reading': return 'Lectura';
    case 'abstinence': return 'Abstinencia';
    case 'career': return 'Carrera';
    case 'social': return 'Social';
    case 'financial': return 'Finanzas';
    default: return 'Otro';
  }
};

export default HabitsProgress;
