
import React, { useState } from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HabitCategory } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const HabitForm = () => {
  const { addHabit } = useHabits();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>(HabitCategory.FITNESS);
  const [goal, setGoal] = useState(21);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHabit = {
      id: uuidv4(),
      name,
      description,
      category,
      streak: 0,
      lastCompleted: null,
      goal
    };
    
    addHabit(newHabit);
    toast.success('¡Nuevo hábito creado con éxito!');
    navigate('/habits?tab=list');
    
    // Reset form
    setName('');
    setDescription('');
    setCategory(HabitCategory.FITNESS);
    setGoal(21);
  };
  
  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Nuevo Hábito</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del hábito</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
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
              onValueChange={(value) => setCategory(value as HabitCategory)}
            >
              <SelectTrigger className="bg-evolve-dark/30 border-evolve-purple/30">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={HabitCategory.FITNESS}>Fitness</SelectItem>
                <SelectItem value={HabitCategory.READING}>Lectura</SelectItem>
                <SelectItem value={HabitCategory.ABSTINENCE}>Abstinencia</SelectItem>
                <SelectItem value={HabitCategory.CAREER}>Carrera</SelectItem>
                <SelectItem value={HabitCategory.SOCIAL}>Social</SelectItem>
                <SelectItem value={HabitCategory.FINANCIAL}>Finanzas</SelectItem>
                <SelectItem value={HabitCategory.OTHER}>Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Meta (días)</Label>
            <Input 
              id="goal" 
              type="number" 
              min="1"
              max="365"
              value={goal} 
              onChange={(e) => setGoal(parseInt(e.target.value))} 
              required 
              className="bg-evolve-dark/30 border-evolve-purple/30"
            />
            <p className="text-xs text-gray-400">Número de días para completar el ciclo de este hábito</p>
          </div>
          
          <Button type="submit" className="w-full bg-evolve-purple hover:bg-evolve-purple/80">
            Crear Hábito
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HabitForm;
