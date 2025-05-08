
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
  CommunicationSkills,
  PublicSpeakingLevel,
  FriendsCount,
  CommunicationLevel
} from '@/types/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { useForm, Controller } from 'react-hook-form';
import { Loader } from 'lucide-react';

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
    communicationSkills: CommunicationSkills.INTERMEDIATE,
    publicSpeaking: PublicSpeakingLevel.NEUTRAL,
    friendsCount: FriendsCount.AVERAGE,
    femaleCommunication: CommunicationLevel.AVERAGE
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    control, 
    handleSubmit: validateForm, 
    formState: { errors }, 
    trigger 
  } = useForm({
    defaultValues: {
      name: formData.name,
      age: formData.age,
      religion: formData.religion,
      hobbies: formData.hobbies?.join(', ') || ''
    }
  });

  const totalSteps = 7;

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

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate fields in step 1
      const isValid = await trigger(['name', 'age']);
      if (!isValid) return;
    }
    
    if (currentStep === 3) {
      // Validate fields in step 3
      const isValid = await trigger(['religion', 'hobbies']);
      if (!isValid) return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Process the hobbies string into an array
    const hobbiesArray = data.hobbies.split(',').map((hobby: string) => hobby.trim()).filter(Boolean);
    
    // If the user selected "NONE" in pastTraumas, ensure it's the only option
    if (formData.pastTraumas?.includes(PastTrauma.NONE) && formData.pastTraumas.length > 1) {
      setFormData(prev => ({ ...prev, pastTraumas: [PastTrauma.NONE] }));
    }

    // If the user selected "NONE" in badHabits, ensure it's the only option
    if (formData.badHabits?.includes(BadHabit.NONE) && formData.badHabits.length > 1) {
      setFormData(prev => ({ ...prev, badHabits: [BadHabit.NONE] }));
    }

    // Combine form data
    const finalFormData = {
      ...formData,
      name: data.name,
      age: data.age,
      religion: data.religion,
      hobbies: hobbiesArray
    };

    setUserProfile(finalFormData as UserProfile);
    completeOnboarding();
    
    toast.success("¡Perfil creado con éxito!");
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
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
                <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                  Nombre
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ 
                    required: "El nombre es obligatorio", 
                    minLength: { value: 2, message: "Nombre demasiado corto" }
                  }}
                  render={({ field }) => (
                    <Input 
                      id="name" 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                        errors.name ? "border-destructive" : ""
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className={errors.age ? "text-destructive" : ""}>
                  Edad
                </Label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ 
                    required: "La edad es obligatoria", 
                    min: { value: 18, message: "Debes ser mayor de edad" },
                    max: { value: 100, message: "Edad no válida" }
                  }}
                  render={({ field }) => (
                    <Input 
                      id="age" 
                      type="number" 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNumberChange(e);
                      }}
                      className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                        errors.age ? "border-destructive" : ""
                      }`}
                      aria-invalid={errors.age ? "true" : "false"}
                    />
                  )}
                />
                {errors.age && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.age.message as string}
                  </p>
                )}
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
                <Label htmlFor="religion" className={errors.religion ? "text-destructive" : ""}>
                  Religión o Creencias Espirituales
                </Label>
                <Controller
                  name="religion"
                  control={control}
                  rules={{ 
                    required: "Este campo es obligatorio"
                  }}
                  render={({ field }) => (
                    <Input 
                      id="religion" 
                      placeholder="Cristiano, Ateo, Agnóstico, etc." 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        setFormData(prev => ({ ...prev, religion: e.target.value }));
                      }}
                      className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                        errors.religion ? "border-destructive" : ""
                      }`}
                      aria-invalid={errors.religion ? "true" : "false"}
                    />
                  )}
                />
                {errors.religion && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.religion.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobbies" className={errors.hobbies ? "text-destructive" : ""}>
                  Hobbies (separados por coma)
                </Label>
                <Controller
                  name="hobbies"
                  control={control}
                  rules={{ 
                    required: "Debes indicar al menos un hobby",
                    validate: (value) => {
                      const hobbies = value.split(',').map(hobby => hobby.trim()).filter(Boolean);
                      return hobbies.length > 0 || "Debes indicar al menos un hobby";
                    }
                  }}
                  render={({ field }) => (
                    <Input 
                      id="hobbies" 
                      placeholder="Gym, leer, viajar, etc." 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        const hobbies = e.target.value.split(',').map(hobby => hobby.trim()).filter(Boolean);
                        setFormData(prev => ({ ...prev, hobbies }));
                      }}
                      className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                        errors.hobbies ? "border-destructive" : ""
                      }`}
                      aria-invalid={errors.hobbies ? "true" : "false"}
                    />
                  )}
                />
                {errors.hobbies && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.hobbies.message as string}
                  </p>
                )}
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
            <h3 className="text-xl font-semibold mb-4">Habilidades de Comunicación</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nivel general de comunicación</Label>
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

              <div className="space-y-2">
                <Label>¿Cómo te sientes hablando en público?</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(PublicSpeakingLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('publicSpeaking', level)}
                        value={level}
                        checked={formData.publicSpeaking === level}
                        onChange={() => handleSingleSelectChange('publicSpeaking', level)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('publicSpeaking', level)}>
                        {level === 'fearful' ? 'Me da miedo, lo evito a toda costa' :
                          level === 'uncomfortable' ? 'Me siento incómodo pero puedo hacerlo' :
                          level === 'neutral' ? 'No me afecta especialmente' :
                          level === 'comfortable' ? 'Me siento cómodo' : 'Me encanta, disfruto haciéndolo'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>¿Cuántos amigos cercanos tienes?</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(FriendsCount).map((count) => (
                    <div key={count} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('friendsCount', count)}
                        value={count}
                        checked={formData.friendsCount === count}
                        onChange={() => handleSingleSelectChange('friendsCount', count)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('friendsCount', count)}>
                        {count === 'none' ? 'Ninguno' :
                          count === 'few' ? '1-2 amigos cercanos' :
                          count === 'average' ? '3-5 amigos cercanos' :
                          count === 'many' ? '6-10 amigos cercanos' : 'Más de 10 amigos cercanos'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>¿Cómo es tu comunicación con mujeres?</Label>
                <div className="flex flex-col space-y-2">
                  {Object.values(CommunicationLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={getUniqueId('femaleCommunication', level)}
                        value={level}
                        checked={formData.femaleCommunication === level}
                        onChange={() => handleSingleSelectChange('femaleCommunication', level)}
                        className="text-evolve-purple focus:ring-evolve-purple"
                      />
                      <Label htmlFor={getUniqueId('femaleCommunication', level)}>
                        {level === 'very_bad' ? 'Muy mala, me bloqueo o evito hablarles' :
                          level === 'bad' ? 'Mala, me cuesta iniciar y mantener conversaciones' :
                          level === 'average' ? 'Normal, puedo mantener conversaciones casuales' :
                          level === 'good' ? 'Buena, me siento cómodo conversando con ellas' : 'Excelente, tengo gran facilidad para conectar con ellas'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Resumen del Perfil</h3>

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
              <p>Comunicación con mujeres: {
                formData.femaleCommunication === CommunicationLevel.VERY_BAD ? 'Muy mala' :
                formData.femaleCommunication === CommunicationLevel.BAD ? 'Mala' :
                formData.femaleCommunication === CommunicationLevel.AVERAGE ? 'Normal' :
                formData.femaleCommunication === CommunicationLevel.GOOD ? 'Buena' : 'Excelente'
              }</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <form onSubmit={validateForm(onSubmit)}>
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
            disabled={currentStep === 1 || isSubmitting}
            className="border-evolve-purple/50 text-white hover:bg-evolve-purple/20"
          >
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-evolve-purple hover:bg-evolve-purple/80"
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="bg-evolve-purple hover:bg-evolve-purple/80"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : "Completar"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default OnboardingForm;
