
import React from 'react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-evolve-dark to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-evolve-purple">Alpha</span>Evolve
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Completa tu perfil para obtener un plan personalizado para mejorar tu rendimiento masculino.
          </p>
        </div>
        
        <OnboardingForm />
        
        <div className="text-center mt-8 text-sm opacity-70">
          <p>Tus datos son confidenciales y solo se utilizan para personalizar tu experiencia.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
