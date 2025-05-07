
import React from 'react';
import { useGoals } from '@/context/GoalsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, CalendarClock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Progress } from '@/components/ui/progress';

const GoalsList = () => {
  const { goals, completeGoal } = useGoals();
  
  const handleCompleteGoal = (goalId: string) => {
    completeGoal(goalId);
  };
  
  const calculateProgress = (goal: any) => {
    if (!goal.steps || goal.steps.length === 0) return 100;
    const completedSteps = goal.steps.filter((step: any) => step.completed).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };
  
  if (!goals.length) {
    return (
      <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
        <CardHeader>
          <CardTitle>Mis Metas</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <p className="mb-4">No tienes metas configuradas aún.</p>
            <Button className="bg-evolve-purple hover:bg-evolve-purple/80">
              Nueva Meta
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Metas</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="?tab=new">
            <span className="mr-2">Nueva</span>
            <ArrowUpRight size={16} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map(goal => {
            const progress = calculateProgress(goal);
            const isCompleted = goal.completed;
            const hasDeadline = goal.deadline !== null;
            const formattedDeadline = hasDeadline 
              ? format(new Date(goal.deadline as Date), "d 'de' MMMM, yyyy", { locale: es }) 
              : null;
            
            return (
              <div 
                key={goal.id}
                className={`p-4 rounded-lg ${isCompleted 
                  ? 'bg-green-900/20 border border-green-700/30' 
                  : 'bg-evolve-dark/40 border border-evolve-gray/20'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                    ) : (
                      <Circle size={20} className="text-evolve-purple mr-2" />
                    )}
                    <h4 className="font-medium text-lg">{goal.title}</h4>
                  </div>
                  
                  {hasDeadline && (
                    <div className="flex items-center text-xs text-gray-300">
                      <CalendarClock size={14} className="mr-1" />
                      <span>{formattedDeadline}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{goal.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{isCompleted ? 'Completado' : `${progress}% completado`}</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
                
                {goal.steps && goal.steps.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-sm font-medium">Pasos:</p>
                    {goal.steps.slice(0, 2).map((step: any, index: number) => (
                      <div key={step.id} className="flex items-center text-sm">
                        {step.completed ? (
                          <CheckCircle size={14} className="text-green-500 mr-1.5" />
                        ) : (
                          <Circle size={14} className="text-gray-400 mr-1.5" />
                        )}
                        <span className={step.completed ? 'text-gray-300' : ''}>{step.description}</span>
                      </div>
                    ))}
                    {goal.steps.length > 2 && (
                      <div className="text-sm text-gray-400">
                        + {goal.steps.length - 2} más...
                      </div>
                    )}
                  </div>
                )}
                
                {!isCompleted && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      size="sm"
                      onClick={() => handleCompleteGoal(goal.id)}
                      className="bg-evolve-purple hover:bg-evolve-purple/80"
                      disabled={progress < 100}
                    >
                      Marcar como completada
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsList;
