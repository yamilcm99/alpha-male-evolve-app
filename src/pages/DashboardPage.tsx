
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import DashboardHabits from '@/components/dashboard/DashboardHabits';
import DashboardProgress from '@/components/dashboard/DashboardProgress';

const DashboardPage = () => {
  const { userProfile, isOnboarded } = useUser();
  const navigate = useNavigate();
  
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
      <DashboardHeader 
        title="Dashboard" 
        description="Vista general de tu progreso y evolución personal" 
      />
      
      <DashboardFilters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <DashboardSummary />
      
      <DashboardHabits 
        isExpanded={expandedSections.habits}
        toggleExpand={() => toggleSection('habits')}
      />
      
      <DashboardProgress 
        isExpanded={expandedSections.achievements}
        toggleExpand={() => toggleSection('achievements')}
      />
    </PageLayout>
  );
};

export default DashboardPage;
