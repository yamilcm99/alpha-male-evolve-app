
import React from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HabitCategory } from '@/types/user';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const HabitProgressChart = () => {
  const { habits } = useHabits();
  const isMobile = useIsMobile();
  
  // Filter out habits with no progress
  const habitsWithProgress = habits.filter(habit => habit.streak > 0);
  
  if (!habitsWithProgress.length) {
    return (
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white h-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Progreso de hábitos</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <p>Completa tus hábitos para ver el progreso aquí</p>
          </div>
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
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white h-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Progreso de hábitos</CardTitle>
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
