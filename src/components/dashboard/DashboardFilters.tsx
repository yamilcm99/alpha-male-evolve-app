
import React from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardFiltersProps {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const DashboardFilters = ({
  activeFilter,
  setActiveFilter,
  timeRange,
  setTimeRange
}: DashboardFiltersProps) => {
  return (
    <Card hover={false} className="mb-6 sticky top-0 z-10 max-w-screen-xl mx-auto">
      <CardContent className="py-3 flex flex-wrap gap-2 items-center justify-between">
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
  );
};

export default DashboardFilters;
