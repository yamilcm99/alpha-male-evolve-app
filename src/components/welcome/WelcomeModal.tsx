
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Hammer, Wrench } from 'lucide-react';

const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 3;
  
  // Hide modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // If this modal was already shown, don't show it again
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setIsVisible(false);
    }
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    // Navigate to dashboard when closing
    navigate('/dashboard');
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };
  
  const steps = [
    {
      title: "Bienvenido a Evolve Alpha",
      content: "Estás a punto de comenzar tu camino de transformación personal. Evolve Alpha te guiará en el desarrollo de hábitos, capacidades y mentalidad para convertirte en tu mejor versión.",
      icon: <Wrench className="w-8 h-8 text-evolve-purple" />
    },
    {
      title: "Cómo funciona",
      content: "Primero, realiza una evaluación completa de tu situación actual. Luego, basándose en estos datos, crearemos un plan personalizado para ti. Seguirás hábitos diarios durante 21 días para formar nuevos patrones.",
      icon: <Hammer className="w-8 h-8 text-evolve-purple" />
    },
    {
      title: "Tu primera misión",
      content: "Para comenzar, completa el proceso de onboarding respondiendo algunas preguntas sobre tu vida actual. Esto nos permitirá crear recomendaciones personalizadas para tu situación específica.",
      icon: <ChevronRight className="w-8 h-8 text-evolve-purple" />
    }
  ];
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal backdrop - Making it less dark and ensuring it doesn't remain */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
        style={{ opacity: 0.8 }} // Set specific opacity
      ></div>
      
      {/* Modal content */}
      <Card className="relative z-10 w-full max-w-md mx-4 bg-evolve-dark/90 border-evolve-purple/30 text-white shadow-evolve animate-fade-in">
        <div className="absolute top-0 right-0 w-40 h-40 bg-evolve-purple/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-evolve-purple/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <CardHeader className="text-center pt-8 relative">
          <div className="mb-4 mx-auto bg-evolve-dark/70 p-4 rounded-full border border-evolve-purple/30">
            {steps[currentStep - 1].icon}
          </div>
          <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
        </CardHeader>
        
        <CardContent className="text-center px-6 py-4 relative">
          <p className="text-gray-300">{steps[currentStep - 1].content}</p>
          
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({length: totalSteps}).map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full ${i + 1 <= currentStep ? 'bg-evolve-purple' : 'bg-gray-600'}`}
              ></div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 pb-6 px-6">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Saltar
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-evolve-purple hover:bg-evolve-purple/80 text-white"
          >
            {currentStep === totalSteps ? (
              <>
                <span>Comenzar</span>
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <span>Siguiente</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeModal;
