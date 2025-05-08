
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

type WelcomeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const WelcomeModal = ({ open, onOpenChange }: WelcomeModalProps) => {
  const { userProfile, isOnboarded } = useUser();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // En lugar de solo cerrar el modal, manejamos la navegación aquí
      onOpenChange(false);
    }
  };

  const handleCompleteProfile = () => {
    onOpenChange(false);
    // Usamos navigate para ir a onboarding de forma programática
    navigate('/onboarding');
  };

  const handleGoToDashboard = () => {
    onOpenChange(false);
    // Usamos navigate para ir a dashboard de forma programática
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl text-center text-white">
                ¡Listo para <span className="text-evolve-purple">impulsarte</span>!
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Alcanza tus metas y transforma tu vida
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <img 
                src="/placeholder.svg" 
                alt="Motivational" 
                className="w-40 h-40 mx-auto mb-4 opacity-75"
              />
              <p className="text-white/90 text-center">
                AlphaEvolve te ayudará a convertirte en la mejor versión de ti mismo con un plan personalizado.
              </p>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl text-center text-white">
                Di adiós a tus <span className="text-evolve-purple">malos hábitos</span>
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Es hora de romper con el pasado
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <img 
                src="/placeholder.svg" 
                alt="Breaking Bad Habits" 
                className="w-40 h-40 mx-auto mb-4 opacity-75"
              />
              <p className="text-white/90 text-center">
                Nuestro sistema te ayudará a identificar y superar los hábitos que te impiden progresar.
              </p>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl text-center text-white">
                <span className="text-evolve-purple">¡Comienza ya</span> tu transformación!
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Tu nueva vida te espera
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <img 
                src="/placeholder.svg" 
                alt="Transformation" 
                className="w-40 h-40 mx-auto mb-4 opacity-75" 
              />
              <p className="text-white/90 text-center">
                {isOnboarded ? 
                  'Tu perfil está listo. ¡Dirígete al dashboard para ver tu progreso!' : 
                  'Completa tu perfil para obtener un plan personalizado y comenzar tu evolución.'}
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-evolve-dark border-evolve-purple/30 text-white max-w-md w-11/12 rounded-lg shadow-lg shadow-evolve-purple/20">
        {renderStepContent()}
        <DialogFooter>
          <div className="w-full flex flex-col space-y-2">
            {step < totalSteps ? (
              <Button 
                onClick={handleNextStep} 
                className="w-full bg-evolve-purple hover:bg-evolve-purple/80 text-white"
              >
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleNextStep} 
                className="w-full bg-evolve-purple hover:bg-evolve-purple/80 text-white"
              >
                Entendido <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {!isOnboarded && step === totalSteps && (
              <Button 
                onClick={handleCompleteProfile} 
                variant="outline" 
                className="w-full border-evolve-purple text-evolve-purple hover:bg-evolve-purple/10"
              >
                Completar mi perfil
              </Button>
            )}
            
            {isOnboarded && step === totalSteps && (
              <Button 
                onClick={handleGoToDashboard} 
                variant="outline" 
                className="w-full border-evolve-purple text-evolve-purple hover:bg-evolve-purple/10"
              >
                Ir al Dashboard
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
