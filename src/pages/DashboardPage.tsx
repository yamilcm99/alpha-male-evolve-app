
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import UserSummary from '@/components/dashboard/UserSummary';
import HabitTracker from '@/components/dashboard/HabitTracker';
import AchievementsList from '@/components/dashboard/AchievementsList';
import PersonalRecommendations from '@/components/dashboard/PersonalRecommendations';
import UserStats from '@/components/dashboard/UserStats';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import AlphaLevels from '@/components/dashboard/AlphaLevels';
import HabitProgressChart from '@/components/dashboard/HabitProgressChart';
import HabitCalendarView from '@/components/dashboard/HabitCalendarView';
import ProgressStats from '@/components/dashboard/ProgressStats';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage = () => {
  const { userProfile, isOnboarded } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    habits: false,
    charts: false,
    achievements: false,
  });
  
  // State for dashboard filters
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Check if user is onboarded
  useEffect(() => {
    if (!isOnboarded) {
      navigate('/onboarding');
    }
  }, [isOnboarded, navigate]);

  // Check if profile needs updating (every 90 days)
  useEffect(() => {
    if (userProfile) {
      // Check if user profile has updatedAt field
      const lastUpdated = userProfile.updatedAt ? new Date(userProfile.updatedAt) : null;
      
      if (lastUpdated) {
        const today = new Date();
        const daysDifference = Math.floor((today.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference >= 90) {
          toast.info(
            "Han pasado 90 días desde tu última actualización de perfil. ¡Es momento de evaluar tu progreso!",
            {
              duration: 10000,
              action: {
                label: "Actualizar perfil",
                onClick: () => navigate('/onboarding'),
              },
            }
          );
        }
      }
    }
  }, [userProfile, navigate]);

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-300">Vista general de tu progreso y recomendaciones</p>
      </div>
      
      {/* Filtros persistentes en la parte superior */}
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white mb-6 sticky top-0 z-10">
        <CardContent className="py-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-evolve-purple" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Tabs
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-evolve-dark/50">
                <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
                <TabsTrigger value="fitness" className="text-xs">Fitness</TabsTrigger>
                <TabsTrigger value="mental" className="text-xs">Mental</TabsTrigger>
                <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tabs
              value={timeRange}
              onValueChange={setTimeRange}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-evolve-dark/50">
                <TabsTrigger value="week" className="text-xs">Semana</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">Mes</TabsTrigger>
                <TabsTrigger value="year" className="text-xs">Año</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      {/* Sección 1: Resumen destacado (KPIs principales) - Siempre visible */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-4">
          <UserSummary />
        </div>
        <div className="md:col-span-8">
          <ProgressStats />
        </div>
      </div>
      
      {/* Sección 2: Nivel Alpha - Siempre visible como KPI principal */}
      <AlphaLevels />
      
      {/* Sección 3: Hábitos - Expandible */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seguimiento de Hábitos</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleSection('habits')}
            aria-expanded={expandedSections.habits}
            aria-controls="habits-section"
            className="flex items-center"
          >
            {expandedSections.habits ? (
              <>Contraer <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>Expandir <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <UserStats />
          </div>
          <div className="md:col-span-8">
            <HabitTracker />
          </div>
        </div>
        
        {/* Contenido expandible de hábitos */}
        <div 
          id="habits-section"
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 ${expandedSections.habits ? '' : 'hidden'}`}
        >
          <div className="md:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HabitProgressChart />
              <HabitCalendarView />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección 4: Logros y Recomendaciones - Expandible */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Progreso y Recomendaciones</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleSection('achievements')}
            aria-expanded={expandedSections.achievements}
            aria-controls="achievements-section"
            className="flex items-center"
          >
            {expandedSections.achievements ? (
              <>Contraer <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>Expandir <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>
        
        <div 
          id="achievements-section"
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${expandedSections.achievements ? '' : 'hidden'}`}
        >
          <div className="md:col-span-4">
            <AchievementsList />
          </div>
          <div className="md:col-span-8">
            <PersonalRecommendations />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
