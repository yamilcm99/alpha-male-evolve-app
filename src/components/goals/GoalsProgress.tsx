
import React from 'react';
import { useGoals } from '@/context/GoalsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const GoalsProgress = () => {
  const { goals } = useGoals();
  const isMobile = useIsMobile();
  
  // Calcular estadísticas generales
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.completed).length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  
  // Calcular metas por categoría
  const goalsByCategory = goals.reduce((acc, goal) => {
    const category = goal.category;
    
    if (!acc[category]) {
      acc[category] = {
        name: getCategoryName(category),
        total: 0,
        completed: 0
      };
    }
    
    acc[category].total += 1;
    if (goal.completed) acc[category].completed += 1;
    
    return acc;
  }, {} as Record<string, { name: string; total: number; completed: number }>);
  
  // Datos para el gráfico de pastel
  const pieData = Object.values(goalsByCategory).map(cat => ({
    name: cat.name,
    value: cat.total,
    completed: cat.completed
  }));
  
  // Datos para metas con fecha límite próxima
  const now = new Date();
  const upcomingGoals = goals
    .filter(g => !g.completed && g.deadline !== null)
    .sort((a, b) => {
      const dateA = new Date(a.deadline as Date).getTime();
      const dateB = new Date(b.deadline as Date).getTime();
      return dateA - dateB;
    })
    .slice(0, 3);
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
  
  return (
    <div className="space-y-6">
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Metas completadas</span>
              <span className="text-sm text-green-500">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <p className="text-sm text-gray-400 mt-2">
              Has completado {completedGoals} de {totalGoals} metas establecidas
            </p>
          </div>
          
          {upcomingGoals.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">Próximas fechas límite</h3>
              <div className="space-y-2">
                {upcomingGoals.map(goal => {
                  const deadline = new Date(goal.deadline as Date);
                  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={goal.id} className="p-3 rounded-md bg-evolve-dark/40">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{goal.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          daysLeft <= 3 ? 'bg-red-900/50 text-red-300' :
                          daysLeft <= 7 ? 'bg-amber-900/50 text-amber-300' :
                          'bg-blue-900/50 text-blue-300'
                        }`}>
                          {daysLeft} días
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{goal.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Metas por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`Total: ${value}, Completadas: ${props.payload.completed}`, name]}
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '4px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Crea metas para ver estadísticas por categoría</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get user-friendly category names
const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    fitness: 'Fitness',
    career: 'Carrera',
    social: 'Social',
    financial: 'Finanzas',
    personal: 'Personal'
  };
  
  return categoryMap[category] || 'Otra';
};

export default GoalsProgress;
