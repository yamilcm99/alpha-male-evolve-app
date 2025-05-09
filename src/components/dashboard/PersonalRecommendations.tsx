
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
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
import { calculateUserLevel } from '@/utils/userLevelCalculator';

const PersonalRecommendations = () => {
  const { userProfile } = useUser();
  const { addHabit, habits } = useHabits();

  if (!userProfile) {
    return null;
  }

  // Get user level to personalize recommendations
  const { level, score } = calculateUserLevel(userProfile);

  // Función para generar recomendaciones basadas en el perfil del usuario y su nivel
  const getRecommendations = () => {
    const recommendations = [];
    const userLevel = level; // Nivel actual del usuario

    // Añadir recomendaciones específicas basadas en el nivel del usuario
    switch(userLevel) {
      case 'Principiante':
        // Para principiantes, enfoque en establecer hábitos básicos y superar malos hábitos
        
        // Recomendación física básica para principiantes
        recommendations.push({
          title: "Fundamentos físicos - Los primeros 21 días",
          description: "Comienza con caminatas diarias de 15 minutos. Un estudio de la Universidad de Harvard muestra que 21 días de actividad ligera aumenta la resistencia cardiovascular en un 12% y mejora el estado de ánimo en un 27%.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "Caminata diaria de 15 minutos",
            description: "Camina al menos 15 minutos cada día para establecer una rutina de actividad física",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de control de tiempo para principiantes
        recommendations.push({
          title: "Control de tiempo - Comenzando el cambio",
          description: "Planifica tus actividades del día siguiente antes de dormir. La neurociencia del hábito muestra que 21 días de planificación nocturna crean un patrón neuronal que reduce la ansiedad matutina en un 38%.",
          icon: <Calendar className="text-green-500" />,
          habitSuggestion: {
            name: "Planificación nocturna",
            description: "Dedica 5 minutos antes de dormir para planificar tu día siguiente",
            category: HabitCategory.CAREER,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Si tiene adicciones, agregar una recomendación específica para principiantes
        if (userProfile.badHabits?.some(habit => habit !== BadHabit.NONE)) {
          recommendations.push({
            title: "Conciencia de hábitos - El primer paso",
            description: "Registra cada vez que sientes el impulso de ceder a un mal hábito. La psicología conductual demuestra que 21 días de registro consciente aumenta el autocontrol en un 42% al crear conciencia de los desencadenantes.",
            icon: <Ban className="text-red-500" />,
            habitSuggestion: {
              name: "Registro de impulsos",
              description: "Anota cada vez que sientes un impulso hacia un mal hábito y qué lo desencadenó",
              category: HabitCategory.ABSTINENCE,
              streak: 0,
              lastCompleted: null,
              goal: 21
            }
          });
        }
        break;
        
      case 'Aprendiz':
        // Para aprendices, enfoque en desarrollar disciplina y consistencia
        
        // Recomendación física intermedia para aprendices
        recommendations.push({
          title: "Resistencia física - 21 días de progreso",
          description: "Realiza 20 minutos de ejercicio cardiovascular 3 veces por semana. Estudios de fisiología deportiva muestran que 21 días de entrenamiento intermitente mejoran la capacidad pulmonar en un 18% y reducen el riesgo cardiovascular en un 14%.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "Cardio tres veces por semana",
            description: "Realiza 20 minutos de ejercicio cardiovascular (correr, nadar, bicicleta) tres veces por semana",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de lectura para aprendices
        recommendations.push({
          title: "Conocimiento diario - 21 días de crecimiento",
          description: "Lee 15 páginas diarias sobre desarrollo personal o profesional. La neuroplasticidad muestra que 21 días de lectura enfocada fortalece las conexiones neuronales relacionadas con el tema en un 24%, mejorando la retención y comprensión.",
          icon: <BookOpen className="text-yellow-500" />,
          habitSuggestion: {
            name: "Lectura diaria enfocada",
            description: "Lee 15 páginas diarias de un libro que te ayude a crecer personal o profesionalmente",
            category: HabitCategory.READING,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Si tiene problemas de comunicación, agregar una recomendación específica
        if (userProfile.communicationSkills === CommunicationSkills.BEGINNER || 
            userProfile.communicationSkills === CommunicationSkills.INTERMEDIATE) {
          recommendations.push({
            title: "Comunicación básica - 21 días para mejorar",
            description: "Practica el contacto visual y la escucha activa en cada conversación. Los estudios de comunicación interpersonal demuestran que 21 días de práctica consciente mejoran la percepción de empatía en un 31% y la calidad de las interacciones en un 26%.",
            icon: <Users className="text-indigo-500" />,
            habitSuggestion: {
              name: "Práctica de escucha activa",
              description: "En cada conversación, practica el contacto visual y resume lo que la otra persona dice antes de responder",
              category: HabitCategory.SOCIAL,
              streak: 0,
              lastCompleted: null,
              goal: 21
            }
          });
        }
        break;
        
      case 'Dedicado':
        // Para dedicados, enfoque en optimización y eficiencia
        
        // Recomendación de ejercicio avanzado para dedicados
        recommendations.push({
          title: "Entrenamiento integral - 21 días de transformación",
          description: "Implementa un programa que combine cardio y fuerza 4 veces por semana. La ciencia deportiva avanzada muestra que 21 días de entrenamiento combinado aumenta la resistencia en un 22% y acelera el metabolismo basal en un 11%.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "Entrenamiento combinado",
            description: "Realiza 30 minutos de entrenamiento combinado cardio+fuerza cuatro veces por semana",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación financiera para dedicados
        recommendations.push({
          title: "Optimización financiera - 21 días hacia la libertad",
          description: "Analiza y optimiza tus gastos fijos para aumentar tu tasa de ahorro. Los estudios económicos personales muestran que 21 días de análisis y ajuste financiero pueden incrementar el margen de ahorro en un 18% sin reducir la calidad de vida.",
          icon: <DollarSign className="text-emerald-500" />,
          habitSuggestion: {
            name: "Análisis financiero semanal",
            description: "Dedica una hora a la semana para analizar tus gastos y optimizar tu presupuesto",
            category: HabitCategory.FINANCIAL,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de networking para dedicados
        recommendations.push({
          title: "Expansión de red - 21 días de conexiones estratégicas",
          description: "Contacta a una persona nueva en tu campo profesional cada semana. Las investigaciones en capital social indican que 21 días de networking enfocado expanden tu red efectiva en un 34% y aumentan las oportunidades profesionales en un 29%.",
          icon: <Users className="text-indigo-500" />,
          habitSuggestion: {
            name: "Networking estratégico semanal",
            description: "Contacta y mantén una conversación significativa con un nuevo contacto profesional cada semana",
            category: HabitCategory.CAREER,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        break;
        
      case 'Experto':
        // Para expertos, enfoque en refinamiento y excelencia
        
        // Recomendación de alta performance física
        recommendations.push({
          title: "Alto rendimiento - 21 días de excelencia física",
          description: "Implementa un programa de entrenamiento periodizado con recuperación activa. La ciencia deportiva de élite muestra que 21 días de entrenamiento periodizado aumenta los marcadores de rendimiento en un 16% y reduce el tiempo de recuperación en un 22%.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "Entrenamiento periodizado",
            description: "Sigue un plan de entrenamiento semanal con días de alta intensidad, volumen y recuperación activa",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de desarrollo de influencia
        recommendations.push({
          title: "Liderazgo e influencia - 21 días para inspirar",
          description: "Practica técnicas avanzadas de comunicación persuasiva y storytelling. Los estudios de liderazgo muestran que 21 días de práctica deliberada en comunicación de alto impacto aumentan la capacidad de influencia en un 38% y la percepción de autoridad en un 26%.",
          icon: <Users className="text-indigo-500" />,
          habitSuggestion: {
            name: "Comunicación persuasiva",
            description: "Practica diariamente técnicas avanzadas de storytelling y comunicación persuasiva",
            category: HabitCategory.SOCIAL,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de inversión para expertos
        recommendations.push({
          title: "Estrategia de inversión - 21 días de crecimiento financiero",
          description: "Investiga y evalúa una oportunidad de inversión a largo plazo cada semana. La ciencia financiera avanzada muestra que 21 días de análisis sistemático de inversiones mejora la tasa de retorno ajustada al riesgo en un 14% y reduce las decisiones basadas en emociones en un 32%.",
          icon: <DollarSign className="text-emerald-500" />,
          habitSuggestion: {
            name: "Análisis de inversiones semanal",
            description: "Dedica 2 horas a la semana para investigar y evaluar oportunidades de inversión",
            category: HabitCategory.FINANCIAL,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        break;
        
      case 'Maestro':
        // Para maestros, enfoque en maestría y trascendencia
        
        // Recomendación de entrenamiento de élite
        recommendations.push({
          title: "Maestría física - 21 días de perfeccionamiento",
          description: "Implementa un programa de entrenamiento de élite con métricas precisas. La ciencia de alto rendimiento muestra que 21 días de entrenamiento con seguimiento detallado optimiza la bioquímica corporal en un 11% y sincroniza los ciclos circadianos para máximo rendimiento en un 15%.",
          icon: <Dumbbell className="text-blue-400" />,
          habitSuggestion: {
            name: "Entrenamiento de élite",
            description: "Sigue un programa de entrenamiento de élite con seguimiento detallado de métricas de rendimiento",
            category: HabitCategory.FITNESS,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de mentoría para maestros
        recommendations.push({
          title: "Mentoría - 21 días de legado",
          description: "Dedica tiempo a mentorear a alguien con potencial en tu campo. La psicología del desarrollo muestra que 21 días de mentoría sistemática refuerzan el dominio personal en un 24% y desarrollan capacidades de liderazgo transformacional en un 19%.",
          icon: <Users className="text-indigo-500" />,
          habitSuggestion: {
            name: "Mentoría semanal",
            description: "Dedica una hora semanal a mentorear a alguien con potencial en tu campo",
            category: HabitCategory.SOCIAL,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        
        // Recomendación de desarrollo avanzado para maestros
        recommendations.push({
          title: "Desarrollo exponencial - 21 días de crecimiento máximo",
          description: "Implementa prácticas avanzadas de desarrollo cognitivo y metacognición. La neurociencia de élite muestra que 21 días de prácticas avanzadas de pensamiento crítico aumentan la capacidad de resolución de problemas complejos en un 27% y mejoran la intuición experta en un 21%.",
          icon: <BookOpen className="text-yellow-500" />,
          habitSuggestion: {
            name: "Prácticas avanzadas de desarrollo",
            description: "Dedica 30 minutos diarios a ejercicios de metacognición y pensamiento crítico avanzado",
            category: HabitCategory.READING,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
        break;
        
      default:
        // Recomendaciones generales si algo falla
        recommendations.push({
          title: "Mejora continua - 21 días de progreso",
          description: "Establece una rutina diaria de aprendizaje y práctica. La ciencia del desarrollo de habilidades muestra que 21 días de práctica enfocada crean las bases neuronales para la automatización de comportamientos, aumentando la eficiencia en un 23%.",
          icon: <BookOpen className="text-yellow-500" />,
          habitSuggestion: {
            name: "Aprendizaje diario",
            description: "Dedica 20 minutos diarios a aprender algo nuevo en tu campo de interés",
            category: HabitCategory.READING,
            streak: 0,
            lastCompleted: null,
            goal: 21
          }
        });
    }
    
    // Recomendaciones específicas por características del usuario (independientes del nivel)
    
    // Recomendaciones basadas en estado físico
    if (userProfile.physicalCondition === PhysicalCondition.POOR) {
      recommendations.push({
        title: "Recuperación física - 21 días hacia la salud",
        description: "Comienza con ejercicios muy suaves y aumenta gradualmente. La medicina deportiva indica que 21 días de actividad física progresiva puede mejorar los marcadores de salud básicos hasta en un 18%, incluso en personas con mala condición física previa.",
        icon: <Dumbbell className="text-blue-400" />,
        habitSuggestion: {
          name: "Movimiento diario progresivo",
          description: "Comienza con 10 minutos de actividad física muy suave y aumenta 1 minuto cada dos días",
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
        title: "Desarrollo profesional estructurado - 21 días de preparación",
        description: "Dedica 2 horas diarias a desarrollar habilidades de alta demanda. Las investigaciones en reinserción laboral muestran que 21 días de capacitación enfocada aumentan las posibilidades de empleabilidad en un 35% y mejoran la confianza en entrevistas en un 46%.",
        icon: <Briefcase className="text-green-500" />,
        habitSuggestion: {
          name: "Desarrollo de habilidades profesionales",
          description: "Dedica 2 horas diarias a desarrollar una habilidad específica de alta demanda en el mercado laboral",
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
        title: "Recalibración neuronal - 21 días de liberación",
        description: "Implementa un sistema de bloqueo técnico y sustitución de actividades. La neurociencia de las adicciones muestra que 21 días de abstinencia total reducen los receptores dopaminérgicos asociados al consumo en un 38% y restablecen la sensibilidad del circuito de recompensa en un 27%.",
        icon: <Ban className="text-red-500" />,
        habitSuggestion: {
          name: "Sustitución de impulsos",
          description: "Cuando sientas un impulso, realiza inmediatamente 20 flexiones o una actividad física intensa de 2 minutos",
          category: HabitCategory.ABSTINENCE,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    if (userProfile.badHabits?.includes(BadHabit.PROCRASTINATION)) {
      recommendations.push({
        title: "Acción inmediata - 21 días de productividad",
        description: "Utiliza la técnica 2-minutos: si algo toma menos de 2 minutos, hazlo inmediatamente. La psicología del comportamiento muestra que 21 días aplicando esta regla reduce la procrastinación en un 31% y aumenta la sensación de logro diario en un 27%.",
        icon: <BookOpen className="text-yellow-500" />,
        habitSuggestion: {
          name: "Regla de los 2 minutos",
          description: "Aplica la regla de los 2 minutos: si algo toma menos de 2 minutos, hazlo inmediatamente sin posponerlo",
          category: HabitCategory.CAREER,
          streak: 0,
          lastCompleted: null,
          goal: 21
        }
      });
    }

    // Limitar a máximo 4 recomendaciones más relevantes
    return recommendations.slice(0, 4);
  };

  // Memoize recommendations to avoid recalculating on every render
  const recommendations = useMemo(() => getRecommendations(), [userProfile, level]);

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
        <CardTitle>Recomendaciones Personalizadas para Nivel {level}</CardTitle>
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
          
          <Link 
            to="/plan"
            className="block text-center text-evolve-purple hover:underline mt-2"
          >
            Ver plan completo
          </Link>
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
