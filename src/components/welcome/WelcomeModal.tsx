
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, Hammer, Tools, Wrench } from 'lucide-react';
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
              <DialogTitle className="text-2xl md:text-3xl text-center text-white flex flex-col items-center">
                <div className="w-16 h-16 bg-evolve-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Hammer className="w-8 h-8 text-evolve-purple" />
                </div>
                ¡Listo para <span className="text-evolve-purple">impulsarte</span>!
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Alcanza tus metas y transforma tu vida
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-evolve-purple/5 to-transparent -z-10 rounded-lg"></div>
              <img 
                src="/placeholder.svg" 
                alt="Motivational" 
                className="w-40 h-40 mx-auto mb-4 opacity-75 drop-shadow-xl"
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
              <DialogTitle className="text-2xl md:text-3xl text-center text-white flex flex-col items-center">
                <div className="w-16 h-16 bg-evolve-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8 text-evolve-purple" />
                </div>
                Di adiós a tus <span className="text-evolve-purple">malos hábitos</span>
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Es hora de romper con el pasado
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-evolve-purple/5 to-transparent -z-10 rounded-lg"></div>
              <img 
                src="/placeholder.svg" 
                alt="Breaking Bad Habits" 
                className="w-40 h-40 mx-auto mb-4 opacity-75 drop-shadow-xl"
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
              <DialogTitle className="text-2xl md:text-3xl text-center text-white flex flex-col items-center">
                <div className="w-16 h-16 bg-evolve-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Tools className="w-8 h-8 text-evolve-purple" />
                </div>
                <span className="text-evolve-purple">¡Comienza ya</span> tu transformación!
              </DialogTitle>
              <DialogDescription className="text-lg md:text-xl text-center text-white/80">
                Tu nueva vida te espera
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-evolve-purple/5 to-transparent -z-10 rounded-lg"></div>
              <img 
                src="/placeholder.svg" 
                alt="Transformation" 
                className="w-40 h-40 mx-auto mb-4 opacity-75 drop-shadow-xl" 
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
      <DialogContent className="bg-evolve-dark border-evolve-purple/30 text-white max-w-md w-11/12 rounded-lg shadow-lg shadow-evolve-purple/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-evolve-purple/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-evolve-purple/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {renderStepContent()}
          <DialogFooter>
            <div className="w-full flex flex-col space-y-2">
              {step < totalSteps ? (
                <Button 
                  onClick={handleNextStep} 
                  className="w-full bg-evolve-purple hover:bg-evolve-purple/80 text-white group transition-all"
                >
                  Continuar <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNextStep} 
                  className="w-full bg-evolve-purple hover:bg-evolve-purple/80 text-white group transition-all"
                >
                  Entendido <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              
              {!isOnboarded && step === totalSteps && (
                <Button 
                  onClick={handleCompleteProfile} 
                  variant="outline" 
                  className="w-full border-evolve-purple text-evolve-purple hover:bg-evolve-purple/10 group transition-all"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Completar mi perfil
                </Button>
              )}
              
              {isOnboarded && step === totalSteps && (
                <Button 
                  onClick={handleGoToDashboard} 
                  variant="outline" 
                  className="w-full border-evolve-purple text-evolve-purple hover:bg-evolve-purple/10 group transition-all"
                >
                  <Tools className="mr-2 h-4 w-4" />
                  Ir al Dashboard
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
