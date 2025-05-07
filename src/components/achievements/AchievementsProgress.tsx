
import React from 'react';
import { useAchievements } from '@/context/AchievementsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const AchievementsProgress = () => {
  const { achievements } = useAchievements();
  const isMobile = useIsMobile();
  
  // Calcular progreso general
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlockedAt).length;
  const achievementProgress = totalAchievements > 0 
    ? Math.round((unlockedAchievements / totalAchievements) * 100) 
    : 0;
  
  // Agrupar logros por categoría
  const categoryGroups = achievements.reduce((acc, achievement) => {
    const category = achievement.category.toString().toLowerCase();
    if (!acc[category]) {
      acc[category] = {
        category: getCategoryLabel(category),
        total: 0,
        unlocked: 0
      };
    }
    
    acc[category].total += 1;
    if (achievement.unlockedAt) {
      acc[category].unlocked += 1;
    }
    
    return acc;
  }, {} as Record<string, { category: string; total: number; unlocked: number }>);
  
  // Datos para el gráfico de barras
  const chartData = Object.values(categoryGroups).map(group => ({
    category: group.category,
    completed: group.unlocked,
    pending: group.total - group.unlocked
  }));
  
  // Datos para el radar
  const radarData = Object.values(categoryGroups).map(group => ({
    subject: group.category,
    A: group.total > 0 ? Math.round((group.unlocked / group.total) * 100) : 0,
    fullMark: 100
  }));
  
  return (
    <div className="space-y-6">
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Progreso de Logros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Logros desbloqueados</span>
              <span className="text-sm text-amber-500">{achievementProgress}%</span>
            </div>
            <Progress value={achievementProgress} className="h-2" />
            <p className="text-sm text-gray-400 mt-2">
              Has desbloqueado {unlockedAchievements} de {totalAchievements} logros disponibles
            </p>
          </div>
          
          <div className="space-y-4">
            {Object.values(categoryGroups).map(group => {
              const progress = group.total > 0 
                ? Math.round((group.unlocked / group.total) * 100) 
                : 0;
              
              return (
                <div key={group.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{group.category}</span>
                    <span className="text-sm text-amber-500">
                      {group.unlocked}/{group.total} ({progress}%)
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle>Logros por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                barGap={2}
                barSize={15}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="category" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                  stroke="#999"
                />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '4px' }}
                  labelStyle={{ color: 'white' }}
                />
                <Legend />
                <Bar dataKey="completed" name="Completados" fill="#F7A44C" />
                <Bar dataKey="pending" name="Pendientes" fill="#444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle>Balance de Áreas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid stroke="#666" />
                <PolarAngleAxis dataKey="subject" stroke="#999" />
                <PolarRadiusAxis stroke="#999" />
                <Radar
                  name="Progreso %"
                  dataKey="A"
                  stroke="#9b87f5"
                  fill="#9b87f5"
                  fillOpacity={0.6}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Completado']}
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #444', borderRadius: '4px' }}
                  labelStyle={{ color: 'white' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
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
  
  return categories[category] || 'General';
};

export default AchievementsProgress;
