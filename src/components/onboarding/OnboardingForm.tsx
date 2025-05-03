
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { 
  UserProfile, 
  FamilyStatus, 
  PhysicalCondition, 
  PastTrauma, 
  SavingsLevel,
  LifeStage,
  BadHabit, 
  AddictionLevel,
  EmploymentStatus, 
  IncomeLevel, 
  RelationshipStatus,
  CommunicationSkills
} from '@/types/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

const OnboardingForm = () => {
  const navigate = useNavigate();
  const { setUserProfile, completeOnboarding } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 30,
    familyStatus: FamilyStatus.LIVES_ALONE,
    physicalCondition: PhysicalCondition.AVERAGE,
    pastTraumas: [PastTrauma.NONE],
    savings: SavingsLevel.LOW,
    hobbies: [],
    lifeStage: LifeStage.PLATEAU,
    religion: '',
    badHabits: [],
    addictionLevels: [],
    employmentStatus: EmploymentStatus.EMPLOYED,
    income: IncomeLevel.MEDIUM,
    relationshipStatus: RelationshipStatus.SINGLE,
    communicationSkills: CommunicationSkills.INTERMEDIATE
  });

  const totalSteps = 6;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleCheckboxArrayChange = (name: keyof UserProfile, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[name] as string[] || [];
      
      if (checked) {
        return { ...prev, [name]: [...currentArray, value] };
      } else {
        return { ...prev, [name]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSingleSelectChange = (name: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Asegurarse de que hay al menos un hobby
    if (!formData.hobbies?.length) {
      toast.error("Por favor, indica al menos un hobby");
      return;
    }

    // Asegurarse de que hay religión
    if (!formData.religion) {
      toast.error("Por favor, indica tu religión o creencia espiritual");
      return;
    }

    // Si el usuario seleccionó "NONE" en pastTraumas, asegurarse de que sea la única opción
    if (formData.pastTraumas?.includes(PastTrauma.NONE) && formData.pastTraumas.length > 1) {
      setFormData(prev => ({ ...prev, pastTraumas: [PastTrauma.NONE] }));
    }

    // Si el usuario seleccionó "NONE" en badHabits, asegurarse de que sea la única opción
    if (formData.badHabits?.includes(BadHabit.NONE) && formData.badHabits.length > 1) {
      setFormData(prev => ({ ...prev, badHabits: [BadHabit.NONE] }));
    }

    setUserProfile(formData as UserProfile);
    completeOnboarding();
    
    toast.success("¡Perfil creado con éxito!");
    navigate('/dashboard');
  };

  // Helper function to generate unique IDs
  const getUniqueId = (prefix: string, value: string) => `${prefix}-${value}`;

  // Fix function for addiction level selection
  const handleAddictionLevelChange = (habit: string, level: AddictionLevel) => {
    setFormData(prev => {
      // Create a copy of current addiction levels
      const currentLevels = [...(prev.addictionLevels || [])];
      
      // Format our new value as "habit:level"
      const newValue = `${habit}:${level}` as AddictionLevel;
      
      // Find if this habit already has a level set
      const existingIndex = currentLevels.findIndex(item => {
        if (typeof item === 'string' && item.startsWith(`${habit}:`)) return true;
        return false;
      });
      
      // Replace or add the new value
      if (existingIndex >= 0) {
        currentLevels[existingIndex] = newValue;
      } else {
        currentLevels.push(newValue);
      }
      
      return { ...prev, addictionLevels: currentLevels };
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Información Personal</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required
                  className="bg-evolve-dark/60 border-evolve-gray/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  min={18} 
                  max={100} 
                  value={formData.age} 
                  onChange={handleNumberChange}
                  required
                  className="bg-evolve-dark/60 border-evolve-gray/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Con quién vives</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(FamilyStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('family', status)}
                        value={status}
                        checked={formData.familyStatus === status}
                        onChange={() => handleSingleSelectChange('familyStatus', status)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('family', status)}>
                        {status === 'lives_alone' ? 'Vivo solo' :
                          status === 'with_parents' ? 'Con mis padres' :
                          status === 'with_partner' ? 'Con mi pareja' :
                          status === 'with_family' ? 'Con mi familia (pareja e hijos)' : 
                          'Con compañeros de piso'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Estado de Relación</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(RelationshipStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('relationship', status)}
                        value={status}
                        checked={formData.relationshipStatus === status}
                        onChange={() => handleSingleSelectChange('relationshipStatus', status)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('relationship', status)}>
                        {status === 'single' ? 'Soltero' :
                          status === 'in_relationship' ? 'En una relación' :
                          status === 'married' ? 'Casado' :
                          status === 'divorced' ? 'Divorciado' : 'Viudo'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Estado Físico y Mental</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Condición Física</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(PhysicalCondition).map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('physical', condition)}
                        value={condition}
                        checked={formData.physicalCondition === condition}
                        onChange={() => handleSingleSelectChange('physicalCondition', condition)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('physical', condition)}>
                        {condition === 'poor' ? 'Pobre' :
                          condition === 'average' ? 'Promedio' :
                          condition === 'good' ? 'Buena' : 'Excelente'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Traumas Pasados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.values(PastTrauma).map((trauma) => (
                    <div key={trauma} className="flex items-center space-x-2">
                      <Checkbox 
                        id={getUniqueId('trauma', trauma)} 
                        checked={formData.pastTraumas?.includes(trauma)} 
                        onCheckedChange={(checked) => handleCheckboxArrayChange('pastTraumas', trauma, checked === true)}
                      />
                      <Label htmlFor={getUniqueId('trauma', trauma)}>
                        {trauma === 'childhood' ? 'Infancia' :
                          trauma === 'relationship' ? 'Relaciones' :
                          trauma === 'professional' ? 'Profesional' :
                          trauma === 'loss' ? 'Pérdida' :
                          trauma === 'other' ? 'Otro' : 'Ninguno'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>¿En qué etapa de tu vida sientes que estás?</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(LifeStage).map((stage) => (
                    <div key={stage} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('lifestage', stage)}
                        value={stage}
                        checked={formData.lifeStage === stage}
                        onChange={() => handleSingleSelectChange('lifeStage', stage)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('lifestage', stage)}>
                        {stage === 'ascent' ? 'En ascenso (mejorando)' :
                          stage === 'descent' ? 'En bajada (empeorando)' :
                          stage === 'plateau' ? 'En meseta (estancado)' :
                          stage === 'unstable' ? 'Inestable (altibajos)' : 'Crítica (situación grave)'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Religión y Hobbies</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="religion">Religión o Creencias Espirituales</Label>
                <Input 
                  id="religion" 
                  placeholder="Cristiano, Ateo, Agnóstico, etc." 
                  value={formData.religion} 
                  onChange={e => setFormData(prev => ({ ...prev, religion: e.target.value }))}
                  required
                  className="bg-evolve-dark/60 border-evolve-gray/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobbies">Hobbies (separados por coma)</Label>
                <Input 
                  id="hobbies" 
                  placeholder="Gym, leer, viajar, etc." 
                  value={formData.hobbies?.join(', ')} 
                  onChange={(e) => {
                    const hobbies = e.target.value.split(',').map(hobby => hobby.trim()).filter(Boolean);
                    setFormData(prev => ({ ...prev, hobbies }));
                  }}
                  required
                  className="bg-evolve-dark/60 border-evolve-gray/30 text-white"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Hábitos y Adicciones</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Malos Hábitos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.values(BadHabit).map((habit) => (
                    <div key={habit} className="flex items-center space-x-2">
                      <Checkbox 
                        id={getUniqueId('habit', habit)} 
                        checked={formData.badHabits?.includes(habit)} 
                        onCheckedChange={(checked) => handleCheckboxArrayChange('badHabits', habit, checked === true)}
                      />
                      <Label htmlFor={getUniqueId('habit', habit)}>
                        {habit === 'pornography' ? 'Pornografía' :
                          habit === 'alcohol' ? 'Alcohol' :
                          habit === 'smoking' ? 'Fumar' :
                          habit === 'procrastination' ? 'Procrastinación' :
                          habit === 'overeating' ? 'Comer en exceso' :
                          habit === 'gambling' ? 'Juegos de azar' : 'Ninguno'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nivel de adicción (1-5, donde 5 es la más grave)</Label>
                {formData.badHabits?.filter(h => h !== BadHabit.NONE).map((habit) => (
                  <div key={habit} className="mt-2">
                    <Label className="mb-1">
                      {habit === 'pornography' ? 'Pornografía' :
                       habit === 'alcohol' ? 'Alcohol' :
                       habit === 'smoking' ? 'Fumar' :
                       habit === 'procrastination' ? 'Procrastinación' :
                       habit === 'overeating' ? 'Comer en exceso' :
                       habit === 'gambling' ? 'Juegos de azar' : ''}
                    </Label>
                    <div className="flex space-x-4 mt-1">
                      {[
                        AddictionLevel.LEVEL_1,
                        AddictionLevel.LEVEL_2,
                        AddictionLevel.LEVEL_3,
                        AddictionLevel.LEVEL_4,
                        AddictionLevel.LEVEL_5
                      ].map((level) => (
                        <div key={`${habit}-${level}`} className="flex items-center space-x-1">
                          <input
                            type="radio"
                            id={getUniqueId(`addiction-${habit}`, level)}
                            value={level}
                            checked={formData.addictionLevels?.some(al => al === `${habit}:${level}`)}
                            onChange={() => handleAddictionLevelChange(habit, level)}
                            className="text-evolve-purple focus:ring-evolve-purple"
                          />
                          <Label htmlFor={getUniqueId(`addiction-${habit}`, level)}>
                            {level === 'level_1' ? '1' :
                             level === 'level_2' ? '2' :
                             level === 'level_3' ? '3' :
                             level === 'level_4' ? '4' : '5'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {(!formData.badHabits?.length || formData.badHabits?.includes(BadHabit.NONE)) && (
                  <p className="text-sm text-gray-400">No hay hábitos seleccionados para valorar.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Situación Laboral y Financiera</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Estado Laboral</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(EmploymentStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('employment', status)}
                        value={status}
                        checked={formData.employmentStatus === status}
                        onChange={() => handleSingleSelectChange('employmentStatus', status)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('employment', status)}>
                        {status === 'employed' ? 'Empleado' :
                          status === 'self_employed' ? 'Autónomo' :
                          status === 'unemployed' ? 'Desempleado' : 'Estudiante'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nivel de Ingresos</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(IncomeLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('income', level)}
                        value={level}
                        checked={formData.income === level}
                        onChange={() => handleSingleSelectChange('income', level)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('income', level)}>
                        {level === 'none' ? 'Sin ingresos' :
                          level === 'low' ? 'Bajo' :
                          level === 'medium' ? 'Medio' :
                          level === 'high' ? 'Alto' : 'Muy alto'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nivel de Ahorros</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(SavingsLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('savings', level)}
                        value={level}
                        checked={formData.savings === level}
                        onChange={() => handleSingleSelectChange('savings', level)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('savings', level)}>
                        {level === 'none' ? 'Sin ahorros' :
                          level === 'low' ? 'Pocos ahorros' :
                          level === 'medium' ? 'Ahorros moderados' : 'Muchos ahorros'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Comunicación e Interacción Social</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Habilidades de Comunicación</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(CommunicationSkills).map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('communication', skill)}
                        value={skill}
                        checked={formData.communicationSkills === skill}
                        onChange={() => handleSingleSelectChange('communicationSkills', skill)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('communication', skill)}>
                        {skill === 'beginner' ? 'Principiante' :
                          skill === 'intermediate' ? 'Intermedio' :
                          skill === 'advanced' ? 'Avanzado' : 'Experto'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-evolve-dark/60 rounded-lg border border-evolve-purple/20">
                <h4 className="font-semibold text-lg mb-2">Resumen del Perfil</h4>
                <p>Nombre: {formData.name}</p>
                <p>Edad: {formData.age}</p>
                <p>Con quién vives: {
                  formData.familyStatus === FamilyStatus.LIVES_ALONE ? 'Solo' :
                  formData.familyStatus === FamilyStatus.WITH_PARENTS ? 'Con padres' :
                  formData.familyStatus === FamilyStatus.WITH_PARTNER ? 'Con pareja' :
                  formData.familyStatus === FamilyStatus.WITH_FAMILY ? 'Con familia' : 'Con compañeros'
                }</p>
                <p>Estado de Relación: {
                  formData.relationshipStatus === RelationshipStatus.SINGLE ? 'Soltero' :
                  formData.relationshipStatus === RelationshipStatus.IN_RELATIONSHIP ? 'En una relación' :
                  formData.relationshipStatus === RelationshipStatus.MARRIED ? 'Casado' :
                  formData.relationshipStatus === RelationshipStatus.DIVORCED ? 'Divorciado' : 'Viudo'
                }</p>
                <p>Etapa vital: {
                  formData.lifeStage === LifeStage.ASCENT ? 'En ascenso' :
                  formData.lifeStage === LifeStage.DESCENT ? 'En bajada' :
                  formData.lifeStage === LifeStage.PLATEAU ? 'En meseta' :
                  formData.lifeStage === LifeStage.UNSTABLE ? 'Inestable' : 'Crítica'
                }</p>
                <p>Habilidades de Comunicación: {
                  formData.communicationSkills === CommunicationSkills.BEGINNER ? 'Principiante' :
                  formData.communicationSkills === CommunicationSkills.INTERMEDIATE ? 'Intermedio' :
                  formData.communicationSkills === CommunicationSkills.ADVANCED ? 'Avanzado' : 'Experto'
                }</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Paso {currentStep} de {totalSteps}</span>
            <span className="text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-evolve-gray/30" />
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="border-evolve-purple/50 text-white hover:bg-evolve-purple/20"
          >
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-evolve-purple hover:bg-evolve-purple/80"
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              type="submit"
              className="bg-evolve-purple hover:bg-evolve-purple/80"
            >
              Completar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default OnboardingForm;
