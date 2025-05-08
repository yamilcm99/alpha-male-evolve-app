
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { UserProfile, FamilyStatus, PhysicalCondition, PastTrauma, SavingsLevel, LifeStage, BadHabit, AddictionLevel, EmploymentStatus, IncomeLevel, RelationshipStatus, CommunicationSkills, PublicSpeakingLevel, FriendsCount, CommunicationLevel } from '@/types/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';

// Import step components
import PersonalInfoStep from './steps/PersonalInfoStep';
import PhysicalMentalStep from './steps/PhysicalMentalStep';
import ReligionHobbiesStep from './steps/ReligionHobbiesStep';
import HabitsAddictionsStep from './steps/HabitsAddictionsStep';
import WorkFinanceStep from './steps/WorkFinanceStep';
import CommunicationSkillsStep from './steps/CommunicationSkillsStep';
import ProfileSummaryStep from './steps/ProfileSummaryStep';

// Import utilities
import { getUniqueId, handleAddictionLevelChange as handleAddictionLevelChangeUtil, processFormData } from './utils/formUtils';

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

  const handleAddictionLevelChange = (habit: string, level: AddictionLevel) => {
    handleAddictionLevelChangeUtil(formData, setFormData, habit, level);
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
    
    const finalFormData = processFormData(formData, data);
    
    setUserProfile(finalFormData as UserProfile);
    completeOnboarding();
    
    toast.success("¡Perfil creado con éxito!");
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            control={control}
            errors={errors}
            formData={formData}
            handleInputChange={handleInputChange}
            handleNumberChange={handleNumberChange}
            handleSingleSelectChange={handleSingleSelectChange}
            getUniqueId={getUniqueId}
          />
        );
      
      case 2:
        return (
          <PhysicalMentalStep
            formData={formData}
            handleSingleSelectChange={handleSingleSelectChange}
            handleCheckboxArrayChange={handleCheckboxArrayChange}
            getUniqueId={getUniqueId}
          />
        );

      case 3:
        return (
          <ReligionHobbiesStep
            control={control}
            errors={errors}
            setFormData={setFormData}
          />
        );

      case 4:
        return (
          <HabitsAddictionsStep
            formData={formData}
            handleCheckboxArrayChange={handleCheckboxArrayChange}
            handleAddictionLevelChange={handleAddictionLevelChange}
            getUniqueId={getUniqueId}
          />
        );

      case 5:
        return (
          <WorkFinanceStep
            formData={formData}
            handleSingleSelectChange={handleSingleSelectChange}
            getUniqueId={getUniqueId}
          />
        );

      case 6:
        return (
          <CommunicationSkillsStep
            formData={formData}
            handleSingleSelectChange={handleSingleSelectChange}
            getUniqueId={getUniqueId}
          />
        );

      case 7:
        return (
          <ProfileSummaryStep formData={formData} />
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
