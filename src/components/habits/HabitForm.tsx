
import React, { useState } from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HabitCategory, HabitBenefit, HabitDifficulty } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const HabitForm = () => {
  const { addHabit } = useHabits();
  const navigate = useNavigate();
  const { userProfile } = useUser();
  
  const userLevel = userProfile ? calculateUserLevel(userProfile).level : 'Principiante';
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>(HabitCategory.FITNESS);
  const [goal, setGoal] = useState(21);
  const [isMegaHabit, setIsMegaHabit] = useState(false);
  const [requiredLevel, setRequiredLevel] = useState(userLevel);
  const [difficulty, setDifficulty] = useState<HabitDifficulty>(HabitDifficulty.MEDIUM);
  const [benefits, setBenefits] = useState<HabitBenefit[]>([]);

  const handleBenefitChange = (benefit: HabitBenefit) => {
    setBenefits(prev => {
      if (prev.includes(benefit)) {
        return prev.filter(b => b !== benefit);
      } else {
        return [...prev, benefit];
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (name.trim() === '') {
      toast.error('El nombre del hábito es requerido');
      return;
    }
    
    if (goal < 1) {
      toast.error('La meta debe ser al menos 1 día');
      return;
    }
    
    if (benefits.length === 0) {
      toast.error('Selecciona al menos un área de beneficio');
      return;
    }
    
    const newHabit = {
      id: uuidv4(),
      name,
      description,
      category,
      streak: 0,
      lastCompleted: null,
      goal,
      isMegaHabit,
      requiredLevel,
      difficulty,
      benefits
    };
    
    addHabit(newHabit);
    toast.success('¡Nuevo hábito creado con éxito!');
    navigate('/habits?tab=list');
    
    // Reset form
    setName('');
    setDescription('');
    setCategory(HabitCategory.FITNESS);
    setGoal(21);
    setIsMegaHabit(false);
    setRequiredLevel(userLevel);
    setDifficulty(HabitDifficulty.MEDIUM);
    setBenefits([]);
  };
  
  const levelOptions = [
    { value: "Principiante", label: "Principiante" },
    { value: "Aprendiz", label: "Aprendiz" },
    { value: "Dedicado", label: "Dedicado" },
    { value: "Experto", label: "Experto" },
    { value: "Maestro", label: "Maestro" }
  ];
  
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <p className="text-xs text-gray-400">Número de días para completar el ciclo</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requiredLevel">Nivel requerido</Label>
              <Select 
                value={requiredLevel} 
                onValueChange={setRequiredLevel}
              >
                <SelectTrigger className="bg-evolve-dark/30 border-evolve-purple/30">
                  <SelectValue placeholder="Selecciona un nivel" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Nivel mínimo para acceder a este hábito</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Dificultad</Label>
              <Select 
                value={difficulty} 
                onValueChange={(value) => setDifficulty(value as HabitDifficulty)}
              >
                <SelectTrigger className="bg-evolve-dark/30 border-evolve-purple/30">
                  <SelectValue placeholder="Selecciona dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={HabitDifficulty.EASY}>Fácil</SelectItem>
                  <SelectItem value={HabitDifficulty.MEDIUM}>Media</SelectItem>
                  <SelectItem value={HabitDifficulty.HARD}>Difícil</SelectItem>
                  <SelectItem value={HabitDifficulty.VERY_HARD}>Muy difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-evolve-dark/30 p-4 rounded-lg border border-evolve-purple/30">
            <Label className="mb-2 block">Áreas que beneficia este hábito</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="physical" 
                  checked={benefits.includes(HabitBenefit.PHYSICAL)}
                  onCheckedChange={() => handleBenefitChange(HabitBenefit.PHYSICAL)}
                />
                <label htmlFor="physical" className="text-sm">Física</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mental" 
                  checked={benefits.includes(HabitBenefit.MENTAL)}
                  onCheckedChange={() => handleBenefitChange(HabitBenefit.MENTAL)}
                />
                <label htmlFor="mental" className="text-sm">Mental</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="social" 
                  checked={benefits.includes(HabitBenefit.SOCIAL)}
                  onCheckedChange={() => handleBenefitChange(HabitBenefit.SOCIAL)}
                />
                <label htmlFor="social" className="text-sm">Social</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="financial" 
                  checked={benefits.includes(HabitBenefit.FINANCIAL)}
                  onCheckedChange={() => handleBenefitChange(HabitBenefit.FINANCIAL)}
                />
                <label htmlFor="financial" className="text-sm">Financiera</label>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-400" size={20} />
              <div>
                <Label htmlFor="mega-habit" className="text-base">Mega hábito</Label>
                <p className="text-xs text-gray-400">Los mega hábitos son más difíciles pero dan el doble de puntos</p>
              </div>
            </div>
            <Switch 
              id="mega-habit" 
              checked={isMegaHabit}
              onCheckedChange={setIsMegaHabit}
            />
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
