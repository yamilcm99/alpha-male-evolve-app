
import React from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle, CardMetric } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HabitCategory } from '@/types/user';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart2 } from 'lucide-react';

const HabitProgressChart = () => {
  const { habits } = useHabits();
  const isMobile = useIsMobile();
  
  // Filter out habits with no progress
  const habitsWithProgress = habits.filter(habit => habit.streak > 0);
  
  if (!habitsWithProgress.length) {
    return (
      <Card hover={true} className="h-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-evolve-purple" />
            <CardTitle>Progreso de hábitos</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-[300px]">
          <CardMetric>0 Hábitos</CardMetric>
          <p className="card-context">Completa tus hábitos para ver el progreso aquí</p>
        </CardContent>
      </Card>
    );
  }
  
  // Transform habits data for the chart
  const chartData = habitsWithProgress.map(habit => ({
    name: habit.name.length > 12 ? habit.name.substring(0, 12) + '...' : habit.name,
    progreso: habit.streak,
    meta: habit.goal,
    categoria: getCategoryLabel(habit.category),
    porcentaje: Math.min(100, Math.round((habit.streak / habit.goal) * 100))
  }));
  
  // Chart config for better accessibility
  const chartConfig = {
    progreso: {
      label: "Días completados",
      color: "#7B5EBF",
    },
    meta: {
      label: "Meta",
      color: "#444",
    }
  };
  
  return (
    <Card hover={true} className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-evolve-purple" />
          <CardTitle>Progreso de hábitos</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] mt-4" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              height={60}
              stroke="#999"
              fontSize={12}
              tick={{ fill: "#999" }}
              tickLine={{ stroke: "#666" }}
              axisLine={{ stroke: "#666" }}
            />
            <YAxis 
              stroke="#999" 
              tick={{ fill: "#999" }}
              tickLine={{ stroke: "#666" }}
              axisLine={{ stroke: "#666" }}
            />
            <Legend />
            <ChartTooltip 
              content={
                <ChartTooltipContent />
              }
            />
            <Bar 
              dataKey="progreso" 
              name="Días completados" 
              fill="#7B5EBF" 
              radius={[4, 4, 0, 0]} 
              aria-label="Días completados"
            />
          </BarChart>
        </ChartContainer>
        
        <p className="text-sm text-center text-gray-400 mt-4">
          Visualización del progreso de tus hábitos activos
        </p>
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

export default HabitProgressChart;
