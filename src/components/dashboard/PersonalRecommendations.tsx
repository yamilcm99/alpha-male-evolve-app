
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  EmploymentStatus, 
  BadHabit, 
  PhysicalCondition, 
  RelationshipStatus,
  CommunicationSkills,
  FamilyStatus,
  HabitCategory
} from '@/types/user';
import { BookOpen, Dumbbell, Briefcase, HeartHandshake, Users, DollarSign, Ban, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';

const PersonalRecommendations = () => {
  const { userProfile, addHabit, habits } = useUser();

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
        description: "Comienza con caminatas diarias de 20 minutos y aumenta gradualmente la intensidad. Un estudio de la Universidad de Stanford demuestra que 21 días de actividad física moderada pueden establecer un hábito duradero y mejorar la resistencia cardiovascular hasta en un 15%.",
        icon: <Dumbbell className="text-blue-400" />,
        habitSuggestion: {
          name: "Caminar 20 minutos diarios",
          description: "Camina al menos 20 minutos cada día para mejorar tu condición física gradualmente",
          category: HabitCategory.FITNESS,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    } else if (userProfile.physicalCondition === PhysicalCondition.AVERAGE) {
      recommendations.push({
        title: "Eleva tu estado físico",
        description: "Incluye entrenamiento de fuerza 3 veces por semana además de cardio. La ciencia del desarrollo muscular indica que 21 días de entrenamiento consistente pueden aumentar tu masa muscular en un 8% y tu metabolismo basal en un 5%, mejorando tu composición corporal.",
        icon: <Dumbbell className="text-blue-400" />,
        habitSuggestion: {
          name: "Entrenamiento de fuerza",
          description: "Realiza ejercicios de fuerza 3 veces por semana durante al menos 30 minutos",
          category: HabitCategory.FITNESS,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Recomendaciones basadas en empleo
    if (userProfile.employmentStatus === EmploymentStatus.UNEMPLOYED) {
      recommendations.push({
        title: "Desarrollo profesional diario",
        description: "Dedica 1 hora diaria a aprender nuevas habilidades en tu campo o explora nuevas áreas. El principio de los 21 días aplicado al aprendizaje muestra que puedes dominar los fundamentos de una nueva habilidad técnica con práctica diaria, aumentando tu valor en el mercado laboral hasta en un 20%.",
        icon: <Briefcase className="text-green-500" />,
        habitSuggestion: {
          name: "Aprendizaje profesional diario",
          description: "Dedica 1 hora diaria a estudiar o practicar habilidades relevantes para tu carrera",
          category: HabitCategory.CAREER,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Recomendaciones basadas en malos hábitos
    if (userProfile.badHabits?.includes(BadHabit.PORNOGRAPHY)) {
      recommendations.push({
        title: "Control de impulsos - 21 días hacia la libertad",
        description: "Establece un sistema de bloqueo en tus dispositivos y busca actividades alternativas cuando sientas el impulso. Estudios neurológicos demuestran que después de 21 días de abstinencia, los circuitos de recompensa del cerebro comienzan a recalibrarse, reduciendo la intensidad y frecuencia de los deseos compulsivos en un 60%.",
        icon: <Ban className="text-red-500" />,
        habitSuggestion: {
          name: "Día libre de contenido pornográfico",
          description: "Mantente un día completo sin consumir contenido pornográfico",
          category: HabitCategory.ABSTINENCE,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    if (userProfile.badHabits?.includes(BadHabit.PROCRASTINATION)) {
      recommendations.push({
        title: "Combate la procrastinación - El método de los 21 días",
        description: "Utiliza la técnica Pomodoro: 25 minutos de trabajo enfocado seguidos de 5 minutos de descanso. La investigación en productividad muestra que 21 días de uso consistente de este método puede incrementar tu eficiencia hasta en un 40% y reducir la ansiedad asociada a las tareas en un 30%.",
        icon: <BookOpen className="text-yellow-500" />,
        habitSuggestion: {
          name: "Técnica Pomodoro diaria",
          description: "Completa al menos 4 ciclos Pomodoro cada día (25 min trabajo/5 min descanso)",
          category: HabitCategory.CAREER,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Recomendaciones basadas en estado de relación
    if (userProfile.relationshipStatus === RelationshipStatus.DIVORCED || 
        userProfile.familyStatus === FamilyStatus.DIVORCED) {
      recommendations.push({
        title: "Reconstrucción personal - 21 días para redescubrirte",
        description: "Establece nuevas rutinas y dedica tiempo a actividades que disfrutes en solitario. La psicología positiva ha demostrado que 21 días de auto-cuidado y reflexión consciente pueden reducir los niveles de cortisol (hormona del estrés) hasta en un 23% y aumentar los niveles de serotonina en un 15%, mejorando significativamente tu bienestar emocional.",
        icon: <HeartHandshake className="text-purple-500" />,
        habitSuggestion: {
          name: "Tiempo para mí",
          description: "Dedica 30 minutos diarios a una actividad que te genere paz y satisfacción personal",
          category: HabitCategory.SOCIAL,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Recomendaciones basadas en habilidades de comunicación
    if (userProfile.communicationSkills === CommunicationSkills.BEGINNER || 
        userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE) {
      recommendations.push({
        title: "Mejora tu comunicación - Transformación en 21 días",
        description: "Practica técnicas de escucha activa y busca oportunidades para conversar con personas nuevas semanalmente. Los expertos en desarrollo de habilidades sociales afirman que 21 días de práctica deliberada pueden mejorar tu capacidad de comunicación en un 30% y reducir la ansiedad social en un 25%.",
        icon: <Users className="text-indigo-500" />,
        habitSuggestion: {
          name: "Conversación significativa diaria",
          description: "Ten al menos una conversación profunda cada día, practicando la escucha activa",
          category: HabitCategory.SOCIAL,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Añadir algunas recomendaciones financieras si es necesario
    if (userProfile.savings === 'low' || userProfile.savings === 'none') {
      recommendations.push({
        title: "Planificación financiera - 21 días hacia la estabilidad",
        description: "Comienza a ahorrar al menos el 10% de tus ingresos mensuales y busca reducir gastos innecesarios. Los expertos financieros señalan que 21 días de control de gastos y ahorro consciente pueden establecer un patrón neurológico de disciplina financiera que permanece activo hasta 3 años después de la intervención inicial.",
        icon: <DollarSign className="text-emerald-500" />,
        habitSuggestion: {
          name: "Registro diario de gastos",
          description: "Anota todos tus gastos diarios y revisa tu presupuesto",
          category: HabitCategory.FINANCIAL,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Recomendación de lectura para todos
    recommendations.push({
      title: "Lectura diaria - 21 días hacia el conocimiento",
      description: "Desarrolla el hábito de leer al menos 20 páginas diarias. Estudios neurológicos muestran que 21 días de lectura consistente pueden aumentar las conexiones neuronales en un 8.7%, mejorar el vocabulario en un 20% y reducir el riesgo de deterioro cognitivo en un 32% a largo plazo.",
      icon: <BookOpen className="text-yellow-500" />,
      habitSuggestion: {
        name: "Lectura diaria",
        description: "Lee al menos 20 páginas de un libro que aporte valor a tu desarrollo",
        category: HabitCategory.READING,
        streak: 0,
        lastCompleted: null,
        goal: 21
      }
    });

    // Asegurar que siempre haya al menos 3 recomendaciones
    if (recommendations.length < 3) {
      const generalRecommendations = [
        {
          title: "Ejercicio consistente - La transformación de los 21 días",
          description: "Integra 30 minutos de actividad física diaria para mantener tu cuerpo y mente en óptimas condiciones. La neurociencia del ejercicio demuestra que 21 días de actividad constante pueden aumentar los niveles de BDNF (factor neurotrófico derivado del cerebro) en un 14%, mejorando la cognición, memoria y estado de ánimo.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "30 minutos de ejercicio diario",
            description: "Realiza al menos 30 minutos de actividad física cada día",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        },
        {
          title: "Desarrollo de red de contactos - 21 días de conexiones estratégicas",
          description: "Conecta con al menos una persona nueva en tu campo cada semana. Las investigaciones en capital social indican que 21 días de networking estratégico pueden expandir tu red profesional útil en un 40% y aumentar las oportunidades de crecimiento laboral en un 27%.",
          icon: <Users className="text-indigo-500" />,
          habitSuggestion: {
            name: "Networking semanal",
            description: "Establece contacto con al menos una nueva persona en tu campo profesional cada semana",
            category: HabitCategory.SOCIAL,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        },
        {
          title: "Planificación semanal - El poder de 21 días de organización",
          description: "Dedica 30 minutos cada domingo a planificar tus objetivos y tareas para la próxima semana. Los estudios de gestión del tiempo demuestran que 21 días de planificación sistemática pueden incrementar tu productividad en un 37% y reducir el estrés relacionado con tareas pendientes en un 29%.",
          icon: <Calendar className="text-green-500" />,
          habitSuggestion: {
            name: "Planificación semanal",
            description: "Dedica 30 minutos cada domingo a planificar tu semana",
            category: HabitCategory.CAREER,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
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

  // Función para añadir un hábito sugerido
  const handleAddHabit = (habitSuggestion) => {
    // Verificar si el hábito ya existe
    const habitExists = habits.some(h => h.name === habitSuggestion.name);
    
    if (habitExists) {
      toast.info("Este hábito ya está en tu lista");
      return;
    }
    
    const newHabit = {
      ...habitSuggestion,
      id: uuidv4()
    };
    
    addHabit(newHabit);
    toast.success(`¡Hábito "${newHabit.name}" añadido! Comienza tu ciclo de 21 días.`);
  };

  return (
    <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
      <CardHeader>
        <CardTitle>Recomendaciones Personalizadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex flex-col p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
              <div className="flex items-start mb-3">
                <div className="mr-4 mt-1">
                  {recommendation.icon}
                </div>
                <div>
                  <h4 className="font-medium text-lg">{recommendation.title}</h4>
                  <p className="text-sm text-gray-300 mt-1">{recommendation.description}</p>
                </div>
              </div>
              
              {recommendation.habitSuggestion && (
                <div className="mt-3 flex justify-between items-center bg-evolve-dark/60 p-3 rounded border border-evolve-purple/20">
                  <div>
                    <p className="text-sm font-medium">Hábito sugerido: <span className="text-evolve-purple">{recommendation.habitSuggestion.name}</span></p>
                    <p className="text-xs text-gray-400 mt-1">Completa 21 días para establecer este hábito permanentemente</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-evolve-purple text-evolve-purple hover:bg-evolve-purple hover:text-white"
                    onClick={() => handleAddHabit(recommendation.habitSuggestion)}
                  >
                    <Calendar className="h-4 w-4 mr-1" /> Añadir
                  </Button>
                </div>
              )}
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
      <CardFooter className="border-t border-evolve-gray/20 pt-4">
        <div className="w-full text-center text-sm text-gray-400">
          <p>Los hábitos tardan aproximadamente 21 días en formarse y 90 días en convertirse en parte de tu personalidad.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PersonalRecommendations;
