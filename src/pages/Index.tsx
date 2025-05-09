import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, User, Target, BarChart2, HeartHandshake } from 'lucide-react';
import WelcomeModal from '@/components/welcome/WelcomeModal';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();
  const { isOnboarded } = useUser();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBeginNow = () => {
    if (isOnboarded) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-evolve-dark to-black text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),rgba(30,174,219,0.05))]" />
          <div className="absolute inset-0 bg-grid" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter font-display"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-evolve-purple to-evolve-blue">Alpha</span>
            <span className="relative">
              Evolve
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-evolve-purple to-evolve-blue"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-300"
          >
            La plataforma definitiva para hombres que buscan evolucionar en todas las áreas de su vida.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10"
          >
            <Button 
              onClick={handleBeginNow}
              className="bg-evolve-purple hover:bg-evolve-purple/80 text-lg px-8 py-7 relative overflow-hidden group transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
              <span className="relative z-10 flex items-center transition-transform group-hover:translate-x-2">
                Comenzar ahora 
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-evolve-purple to-evolve-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <FeatureCard 
            icon={<Dumbbell size={32} className="text-evolve-purple" />}
            title="Desarrollo Físico"
            description="Rutinas personalizadas según tu nivel y objetivos para maximizar tu potencial físico."
          />

          <FeatureCard 
            icon={<Target size={32} className="text-evolve-purple" />}
            title="Superación de Hábitos"
            description="Sistemas efectivos para eliminar adicciones y construir disciplina diaria."
          />

          <FeatureCard 
            icon={<Briefcase size={32} className="text-evolve-purple" />}
            title="Crecimiento Profesional"
            description="Estrategias para avanzar en tu carrera y aumentar tu valor en el mercado laboral."
          />

          <FeatureCard 
            icon={<HeartHandshake size={32} className="text-evolve-purple" />}
            title="Inteligencia Social"
            description="Mejora tus habilidades de comunicación e interacción con los demás."
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-evolve-dark/40 backdrop-blur-xl border border-evolve-purple/20 p-8 rounded-xl mb-12 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Completa tu perfil"
              description="Responde preguntas sobre tu situación actual para crear un perfil personalizado."
            />
            <StepCard 
              number="2"
              title="Recibe tu plan personalizado"
              description="Obtendrás recomendaciones específicas basadas en tus circunstancias y objetivos."
            />
            <StepCard 
              number="3"
              title="Evoluciona día a día"
              description="Sigue tu progreso, gana logros y ve cómo mejoras en todas las áreas de tu vida."
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Listo para evolucionar?</h2>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-evolve-purple hover:bg-evolve-purple/80 text-lg px-6 py-6 relative overflow-hidden group transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <span className="relative z-10">Comenzar mi transformación</span>
            <span className="absolute inset-0 bg-gradient-to-r from-evolve-purple via-evolve-blue to-evolve-purple bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
          </Button>
        </motion.div>
      </div>
      
      {showWelcomeModal && <WelcomeModal />}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.2)" }}
      className="p-6 rounded-xl bg-evolve-dark/40 backdrop-blur-lg border border-evolve-purple/20 flex flex-col items-center text-center transition-all shadow-lg"
    >
      <div className="bg-evolve-purple/10 p-4 rounded-full mb-4 shadow-inner shadow-evolve-purple/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col items-center text-center group"
    >
      <div className="bg-evolve-purple/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-evolve-purple font-bold text-xl border border-evolve-purple/30 group-hover:bg-evolve-purple/30 transition-colors">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

function Dumbbell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 6.5 11 11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22 4-4"></path>
      <path d="m2 6 4-4"></path>
      <path d="m3 10 7-7"></path>
      <path d="m14 21 7-7"></path>
    </svg>
  );
}

function Briefcase(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}

export default Index;