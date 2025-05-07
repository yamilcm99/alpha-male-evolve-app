
import React, { useState } from 'react';
import { useGoals } from '@/context/GoalsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { GoalStep } from '@/types/user';

type GoalCategory = "fitness" | "career" | "social" | "financial" | "personal";

const GoalForm = () => {
  const { addGoal } = useGoals();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>("fitness");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [steps, setSteps] = useState<GoalStep[]>([]);
  const [newStep, setNewStep] = useState('');
  
  const handleAddStep = () => {
    if (!newStep.trim()) return;
    
    setSteps([...steps, { 
      id: uuidv4(), 
      description: newStep.trim(), 
      completed: false 
    }]);
    
    setNewStep('');
  };
  
  const handleRemoveStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal = {
      id: uuidv4(),
      title,
      description,
      category,
      deadline,
      completed: false,
      steps
    };
    
    addGoal(newGoal);
    toast.success('¡Nueva meta creada con éxito!');
    navigate('/goals?tab=list');
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory("fitness");
    setDeadline(null);
    setSteps([]);
  };
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Nueva Meta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la meta</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="bg-evolve-dark/30 border-evolve-purple/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="bg-evolve-dark/30 border-evolve-purple/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as GoalCategory)}
            >
              <SelectTrigger className="bg-evolve-dark/30 border-evolve-purple/30">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="career">Carrera</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="financial">Finanzas</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Fecha límite (opcional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-evolve-dark/30 border-evolve-purple/30"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "d 'de' MMMM, yyyy", { locale: es }) : (
                    <span className="text-gray-400">Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-3">
            <Label>Pasos para lograr la meta</Label>
            
            <div className="flex gap-2">
              <Input 
                value={newStep} 
                onChange={(e) => setNewStep(e.target.value)} 
                placeholder="Añadir paso..." 
                className="flex-1 bg-evolve-dark/30 border-evolve-purple/30"
              />
              <Button 
                type="button" 
                onClick={handleAddStep} 
                size="icon"
                className="bg-evolve-purple hover:bg-evolve-purple/80"
              >
                <Plus size={18} />
              </Button>
            </div>
            
            {steps.length > 0 && (
              <div className="space-y-2 mt-2">
                {steps.map(step => (
                  <div key={step.id} className="flex items-center justify-between p-2 bg-evolve-dark/40 rounded-md">
                    <span className="text-sm">{step.description}</span>
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleRemoveStep(step.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400">Dividir la meta en pasos pequeños ayuda a lograrla más fácilmente</p>
          </div>
          
          <Button type="submit" className="w-full bg-evolve-purple hover:bg-evolve-purple/80">
            Crear Meta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;
