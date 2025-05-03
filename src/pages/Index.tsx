
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, User, Target, BarChart2, HeartHandshake } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-evolve-dark to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-evolve-purple">Alpha</span>Evolve
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            La plataforma definitiva para hombres que buscan evolucionar en todas las áreas de su vida.
          </p>
          <div className="mt-8">
            <Button asChild className="bg-evolve-purple hover:bg-evolve-purple/80 text-lg px-8 py-6">
              <Link to="/onboarding" className="inline-flex items-center">
                Comenzar ahora <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-lg bg-evolve-dark/75 border border-evolve-purple/20 flex flex-col items-center text-center">
            <div className="bg-evolve-purple/20 p-4 rounded-full mb-4">
              <Dumbbell size={32} className="text-evolve-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desarrollo Físico</h3>
            <p className="text-gray-300">Rutinas personalizadas según tu nivel y objetivos para maximizar tu potencial físico.</p>
          </div>

          <div className="p-6 rounded-lg bg-evolve-dark/75 border border-evolve-purple/20 flex flex-col items-center text-center">
            <div className="bg-evolve-purple/20 p-4 rounded-full mb-4">
              <Target size={32} className="text-evolve-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Superación de Hábitos</h3>
            <p className="text-gray-300">Sistemas efectivos para eliminar adicciones y construir disciplina diaria.</p>
          </div>

          <div className="p-6 rounded-lg bg-evolve-dark/75 border border-evolve-purple/20 flex flex-col items-center text-center">
            <div className="bg-evolve-purple/20 p-4 rounded-full mb-4">
              <Briefcase size={32} className="text-evolve-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crecimiento Profesional</h3>
            <p className="text-gray-300">Estrategias para avanzar en tu carrera y aumentar tu valor en el mercado laboral.</p>
          </div>

          <div className="p-6 rounded-lg bg-evolve-dark/75 border border-evolve-purple/20 flex flex-col items-center text-center">
            <div className="bg-evolve-purple/20 p-4 rounded-full mb-4">
              <HeartHandshake size={32} className="text-evolve-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inteligencia Social</h3>
            <p className="text-gray-300">Mejora tus habilidades de comunicación e interacción con los demás.</p>
          </div>
        </div>

        <div className="bg-evolve-dark/75 border border-evolve-purple/20 p-8 rounded-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-evolve-purple/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-evolve-purple font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">Completa tu perfil</h3>
              <p className="text-gray-300">Responde preguntas sobre tu situación actual para crear un perfil personalizado.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-evolve-purple/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-evolve-purple font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">Recibe tu plan personalizado</h3>
              <p className="text-gray-300">Obtendrás recomendaciones específicas basadas en tus circunstancias y objetivos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-evolve-purple/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-evolve-purple font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">Evoluciona día a día</h3>
              <p className="text-gray-300">Sigue tu progreso, gana logros y ve cómo mejoras en todas las áreas de tu vida.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Listo para evolucionar?</h2>
          <Button asChild className="bg-evolve-purple hover:bg-evolve-purple/80 text-lg">
            <Link to="/onboarding">
              Comenzar mi transformación
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

// Añadir este componente Dumbbell ya que no está en nuestras importaciones básicas
function Dumbbell(props: React.ComponentProps<typeof User>) {
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

function Briefcase(props: React.ComponentProps<typeof User>) {
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
