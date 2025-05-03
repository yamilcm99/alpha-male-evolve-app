
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { 
  UserProfile, 
  FamilyStatus, 
  PhysicalCondition, 
  PastTrauma, 
  SavingsLevel, 
  MotivationLevel, 
  BadHabit, 
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
    familyStatus: FamilyStatus.SINGLE,
    physicalCondition: PhysicalCondition.AVERAGE,
    pastTraumas: [PastTrauma.NONE],
    savings: SavingsLevel.LOW,
    hobbies: [],
    motivationLevel: MotivationLevel.MEDIUM,
    beliefs: [],
    badHabits: [],
    employmentStatus: EmploymentStatus.EMPLOYED,
    income: IncomeLevel.MEDIUM,
    relationshipStatus: RelationshipStatus.SINGLE,
    communicationSkills: CommunicationSkills.INTERMEDIATE
  });

  const totalSteps = 5;

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

    // Asegurarse de que hay al menos una creencia
    if (!formData.beliefs?.length) {
      toast.error("Por favor, indica al menos una creencia");
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
                <Label>Estado Familiar</Label>
                <RadioGroup
                  value={formData.familyStatus}
                  onValueChange={(value) => handleSingleSelectChange('familyStatus', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(FamilyStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={`family-${status}`} />
                      <Label htmlFor={`family-${status}`}>
                        {status === 'single' ? 'Soltero' :
                          status === 'married' ? 'Casado' :
                          status === 'divorced' ? 'Divorciado' :
                          status === 'widowed' ? 'Viudo' : 'Padre'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Estado de Relación</Label>
                <RadioGroup
                  value={formData.relationshipStatus}
                  onValueChange={(value) => handleSingleSelectChange('relationshipStatus', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(RelationshipStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={`relationship-${status}`} />
                      <Label htmlFor={`relationship-${status}`}>
                        {status === 'single' ? 'Soltero' :
                          status === 'in_relationship' ? 'En una relación' :
                          status === 'married' ? 'Casado' :
                          status === 'divorced' ? 'Divorciado' : 'Viudo'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
                <RadioGroup
                  value={formData.physicalCondition}
                  onValueChange={(value) => handleSingleSelectChange('physicalCondition', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(PhysicalCondition).map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <RadioGroupItem value={condition} id={`physical-${condition}`} />
                      <Label htmlFor={`physical-${condition}`}>
                        {condition === 'poor' ? 'Pobre' :
                          condition === 'average' ? 'Promedio' :
                          condition === 'good' ? 'Buena' : 'Excelente'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Traumas Pasados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.values(PastTrauma).map((trauma) => (
                    <div key={trauma} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`trauma-${trauma}`} 
                        checked={formData.pastTraumas?.includes(trauma)} 
                        onCheckedChange={(checked) => handleCheckboxArrayChange('pastTraumas', trauma, checked === true)}
                      />
                      <Label htmlFor={`trauma-${trauma}`}>
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
                <Label>Nivel de Motivación</Label>
                <RadioGroup
                  value={formData.motivationLevel}
                  onValueChange={(value) => handleSingleSelectChange('motivationLevel', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(MotivationLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`motivation-${level}`} />
                      <Label htmlFor={`motivation-${level}`}>
                        {level === 'very_low' ? 'Muy baja' :
                          level === 'low' ? 'Baja' :
                          level === 'medium' ? 'Media' :
                          level === 'high' ? 'Alta' : 'Muy alta'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Hábitos y Hobbies</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Malos Hábitos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.values(BadHabit).map((habit) => (
                    <div key={habit} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`habit-${habit}`} 
                        checked={formData.badHabits?.includes(habit)} 
                        onCheckedChange={(checked) => handleCheckboxArrayChange('badHabits', habit, checked === true)}
                      />
                      <Label htmlFor={`habit-${habit}`}>
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

              <div className="space-y-2">
                <Label htmlFor="beliefs">Creencias/Valores (separados por coma)</Label>
                <Input 
                  id="beliefs" 
                  placeholder="Autodisciplina, honestidad, etc." 
                  value={formData.beliefs?.join(', ')} 
                  onChange={(e) => {
                    const beliefs = e.target.value.split(',').map(belief => belief.trim()).filter(Boolean);
                    setFormData(prev => ({ ...prev, beliefs }));
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
            <h3 className="text-xl font-semibold mb-4">Situación Laboral y Financiera</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Estado Laboral</Label>
                <RadioGroup
                  value={formData.employmentStatus}
                  onValueChange={(value) => handleSingleSelectChange('employmentStatus', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(EmploymentStatus).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={`employment-${status}`} />
                      <Label htmlFor={`employment-${status}`}>
                        {status === 'employed' ? 'Empleado' :
                          status === 'self_employed' ? 'Autónomo' :
                          status === 'unemployed' ? 'Desempleado' : 'Estudiante'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Nivel de Ingresos</Label>
                <RadioGroup
                  value={formData.income}
                  onValueChange={(value) => handleSingleSelectChange('income', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(IncomeLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`income-${level}`} />
                      <Label htmlFor={`income-${level}`}>
                        {level === 'none' ? 'Sin ingresos' :
                          level === 'low' ? 'Bajo' :
                          level === 'medium' ? 'Medio' :
                          level === 'high' ? 'Alto' : 'Muy alto'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Nivel de Ahorros</Label>
                <RadioGroup
                  value={formData.savings}
                  onValueChange={(value) => handleSingleSelectChange('savings', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(SavingsLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`savings-${level}`} />
                      <Label htmlFor={`savings-${level}`}>
                        {level === 'none' ? 'Sin ahorros' :
                          level === 'low' ? 'Pocos ahorros' :
                          level === 'medium' ? 'Ahorros moderados' : 'Muchos ahorros'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Comunicación e Interacción Social</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Habilidades de Comunicación</Label>
                <RadioGroup
                  value={formData.communicationSkills}
                  onValueChange={(value) => handleSingleSelectChange('communicationSkills', value)}
                  className="flex flex-col space-y-2"
                >
                  {Object.values(CommunicationSkills).map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <RadioGroupItem value={skill} id={`communication-${skill}`} />
                      <Label htmlFor={`communication-${skill}`}>
                        {skill === 'beginner' ? 'Principiante' :
                          skill === 'intermediate' ? 'Intermedio' :
                          skill === 'advanced' ? 'Avanzado' : 'Experto'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mt-8 p-4 bg-evolve-dark/60 rounded-lg border border-evolve-purple/20">
                <h4 className="font-semibold text-lg mb-2">Resumen del Perfil</h4>
                <p>Nombre: {formData.name}</p>
                <p>Edad: {formData.age}</p>
                <p>Estado Familiar: {
                  formData.familyStatus === FamilyStatus.SINGLE ? 'Soltero' :
                  formData.familyStatus === FamilyStatus.MARRIED ? 'Casado' :
                  formData.familyStatus === FamilyStatus.DIVORCED ? 'Divorciado' :
                  formData.familyStatus === FamilyStatus.WIDOWED ? 'Viudo' : 'Padre'
                }</p>
                <p>Estado de Relación: {
                  formData.relationshipStatus === RelationshipStatus.SINGLE ? 'Soltero' :
                  formData.relationshipStatus === RelationshipStatus.IN_RELATIONSHIP ? 'En una relación' :
                  formData.relationshipStatus === RelationshipStatus.MARRIED ? 'Casado' :
                  formData.relationshipStatus === RelationshipStatus.DIVORCED ? 'Divorciado' : 'Viudo'
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
          <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-evolve-gray/30" indicatorClassName="bg-evolve-purple" />
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
