
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AchievementsList from '@/components/dashboard/AchievementsList';
import PersonalRecommendations from '@/components/dashboard/PersonalRecommendations';

interface DashboardProgressProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const DashboardProgress = ({ isExpanded, toggleExpand }: DashboardProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-display">Progreso y Recomendaciones</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-controls="achievements-section"
          className="flex items-center"
        >
          {isExpanded ? (
            <>Contraer <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Expandir <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      <div 
        id="achievements-section"
        className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${isExpanded ? '' : 'hidden'}`}
      >
        <div className="md:col-span-4">
          <AchievementsList />
        </div>
        <div className="md:col-span-8">
          <PersonalRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DashboardProgress;
