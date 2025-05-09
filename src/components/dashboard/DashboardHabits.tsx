
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import UserStats from '@/components/dashboard/UserStats';
import HabitTracker from '@/components/dashboard/HabitTracker';
import HabitProgressChart from '@/components/dashboard/HabitProgressChart';
import HabitCalendarView from '@/components/dashboard/HabitCalendarView';

interface DashboardHabitsProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const DashboardHabits = ({ isExpanded, toggleExpand }: DashboardHabitsProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-display">Seguimiento de Hábitos</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-controls="habits-section"
          className="flex items-center"
        >
          {isExpanded ? (
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
      
      <div 
        id="habits-section"
        className={`card-grid mt-6 ${isExpanded ? '' : 'hidden'}`}
      >
        <HabitProgressChart />
        <HabitCalendarView />
      </div>
    </div>
  );
};

export default DashboardHabits;
