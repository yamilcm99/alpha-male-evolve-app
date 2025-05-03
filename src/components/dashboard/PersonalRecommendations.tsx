
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  EmploymentStatus, 
  BadHabit, 
  PhysicalCondition, 
  RelationshipStatus,
  CommunicationSkills,
  FamilyStatus
} from '@/types/user';
import { BookOpen, Dumbbell, Briefcase, HeartHandshake, Users, DollarSign, Ban } from 'lucide-react';

const PersonalRecommendations = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return null;
  }

  // Función para generar recomendaciones basadas en el perfil del usuario
  const getRecommendations = () => {
    const recommendations = [];

    // Recomendaciones basadas en estado físico
    if (userProfile.physicalCondition === PhysicalCondition.POOR) {
      recommendations.push({
        title: "Mejora tu condición física",
        description: "Comienza con caminatas diarias de 20 minutos y aumenta gradualmente la intensidad.",
        icon: <Dumbbell className="text-blue-400" />
      });
    } else if (userProfile.physicalCondition === PhysicalCondition.AVERAGE) {
      recommendations.push({
        title: "Eleva tu estado físico",
        description: "Intenta incluir entrenamiento de fuerza 3 veces por semana además de cardio.",
        icon: <Dumbbell className="text-blue-400" />
      });
    }

    // Recomendaciones basadas en empleo
    if (userProfile.employmentStatus === EmploymentStatus.UNEMPLOYED) {
      recommendations.push({
        title: "Desarrollo profesional",
        description: "Dedica 1 hora diaria a aprender nuevas habilidades en tu campo o explora nuevas áreas.",
        icon: <Briefcase className="text-green-500" />
      });
    }

    // Recomendaciones basadas en malos hábitos
    if (userProfile.badHabits?.includes(BadHabit.PORNOGRAPHY)) {
      recommendations.push({
        title: "Control de impulsos",
        description: "Establece un sistema de bloqueo en tus dispositivos y busca actividades alternativas cuando sientas el impulso.",
        icon: <Ban className="text-red-500" />
      });
    }

    if (userProfile.badHabits?.includes(BadHabit.PROCRASTINATION)) {
      recommendations.push({
        title: "Combate la procrastinación",
        description: "Utiliza la técnica Pomodoro: 25 minutos de trabajo enfocado seguidos de 5 minutos de descanso.",
        icon: <BookOpen className="text-yellow-500" />
      });
    }

    // Recomendaciones basadas en estado de relación
    if (userProfile.relationshipStatus === RelationshipStatus.DIVORCED || 
        userProfile.familyStatus === FamilyStatus.DIVORCED) {
      recommendations.push({
        title: "Reconstrucción personal",
        description: "Establece nuevas rutinas y dedica tiempo a actividades que disfrutes en solitario para redescubrirte.",
        icon: <HeartHandshake className="text-purple-500" />
      });
    }

    // Recomendaciones basadas en habilidades de comunicación
    if (userProfile.communicationSkills === CommunicationSkills.BEGINNER || 
        userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE) {
      recommendations.push({
        title: "Mejora tu comunicación",
        description: "Practica técnicas de escucha activa y busca oportunidades para conversar con personas nuevas semanalmente.",
        icon: <Users className="text-indigo-500" />
      });
    }

    // Añadir algunas recomendaciones financieras si es necesario
    if (userProfile.savings === 'low' || userProfile.savings === 'none') {
      recommendations.push({
        title: "Planificación financiera",
        description: "Comienza a ahorrar al menos el 10% de tus ingresos mensuales y busca reducir gastos innecesarios.",
        icon: <DollarSign className="text-emerald-500" />
      });
    }

    // Asegurar que siempre haya al menos 3 recomendaciones
    if (recommendations.length < 3) {
      const generalRecommendations = [
        {
          title: "Lectura diaria",
          description: "Desarrolla el hábito de leer al menos 20 páginas diarias para expandir tus conocimientos.",
          icon: <BookOpen className="text-yellow-500" />
        },
        {
          title: "Ejercicio consistente",
          description: "Integra 30 minutos de actividad física diaria para mantener tu cuerpo y mente en óptimas condiciones.",
          icon: <Dumbbell className="text-blue-400" />
        },
        {
          title: "Desarrollo de red de contactos",
          description: "Conecta con al menos una persona nueva en tu campo cada semana para expandir oportunidades.",
          icon: <Users className="text-indigo-500" />
        },
        {
          title: "Planificación semanal",
          description: "Dedica 30 minutos cada domingo a planificar tus objetivos y tareas para la próxima semana.",
          icon: <Briefcase className="text-green-500" />
        },
      ];

      // Añadir recomendaciones generales hasta alcanzar al menos 3
      for (let i = 0; i < generalRecommendations.length && recommendations.length < 3; i++) {
        // Verificar que no estemos duplicando recomendaciones
        if (!recommendations.some(rec => rec.title === generalRecommendations[i].title)) {
          recommendations.push(generalRecommendations[i]);
        }
      }
    }

    // Limitar a máximo 4 recomendaciones
    return recommendations.slice(0, 4);
  };

  const recommendations = getRecommendations();

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Recomendaciones Personalizadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex p-3 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
              <div className="mr-4 mt-1">
                {recommendation.icon}
              </div>
              <div>
                <h4 className="font-medium">{recommendation.title}</h4>
                <p className="text-sm text-gray-300">{recommendation.description}</p>
              </div>
            </div>
          ))}
          
          <a 
            href="/plan"
            className="block text-center text-evolve-purple hover:underline mt-2"
          >
            Ver plan completo
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalRecommendations;
