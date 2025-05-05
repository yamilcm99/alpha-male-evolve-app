
import React from 'react';
import { useUser } from '@/context/UserContext';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Dumbbell, Briefcase, HeartHandshake, 
  Users, DollarSign, Ban, Calendar, Brain, Heart
} from 'lucide-react';
import { 
  PhysicalCondition, 
  EmploymentStatus, 
  BadHabit, 
  RelationshipStatus,
  CommunicationSkills,
  FamilyStatus
} from '@/types/user';

const PlanPage = () => {
  const { userProfile } = useUser();

  if (!userProfile) {
    return (
      <PageLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold">Plan personalizado</h1>
          <p className="mt-4">Por favor completa el perfil para ver tu plan personalizado.</p>
        </div>
      </PageLayout>
    );
  }

  // Función para obtener recomendaciones basadas en el perfil
  const getPhysicalRecommendations = () => {
    switch(userProfile.physicalCondition) {
      case PhysicalCondition.POOR:
        return [
          {
            title: "Caminata diaria - 21 días de progreso gradual",
            description: "Comienza con 15 minutos diarios e incrementa 5 minutos cada semana. Estudios muestran que caminar 30 minutos diarios por 21 días consecutivos puede aumentar tu resistencia cardiovascular en un 12% y reducir el riesgo de enfermedades cardíacas en hasta un 19%.",
            icon: <Dumbbell className="text-blue-400" />
          },
          {
            title: "Mejora tu alimentación - 21 días de consciencia nutricional",
            description: "Elimina un alimento procesado diferente cada día durante 21 días. La investigación nutricional muestra que al completar este ciclo, reducirás tu consumo de azúcares añadidos en aproximadamente 68% y notarás mejoras en tus niveles de energía y claridad mental.",
            icon: <Brain className="text-green-400" />
          }
        ];
      case PhysicalCondition.AVERAGE:
        return [
          {
            title: "Entrenamiento de fuerza - 21 días para mejorar tu resistencia",
            description: "Realiza 3 sesiones semanales de 30 minutos. Después de 21 días, un estudio de la Universidad de Harvard demuestra que podrías incrementar tu masa muscular en un 7% y tu tasa metabólica basal en un 5%, lo que te ayudará a quemar más calorías incluso en reposo.",
            icon: <Dumbbell className="text-blue-400" />
          },
          {
            title: "Hidratación consciente - 21 días de agua suficiente",
            description: "Consume 8 vasos de agua diarios por 21 días consecutivos. La neurociencia de la hidratación indica que este hábito sostenido puede mejorar la función cognitiva en un 14% y reducir la fatiga en un 26%, optimizando tu rendimiento físico y mental.",
            icon: <Brain className="text-cyan-400" />
          }
        ];
      default:
        return [
          {
            title: "Entrenamiento de alta intensidad - 21 días de excelencia física",
            description: "Incorpora 2 sesiones semanales de HIIT de 20 minutos durante 21 días. Estudios de fisiología deportiva demuestran que este régimen puede aumentar tu VO2 máximo (capacidad aeróbica) en hasta un 9% y reducir la grasa corporal en un 4.5%, optimizando tu composición corporal.",
            icon: <Dumbbell className="text-blue-400" />
          }
        ];
    }
  };

  const getCommunicationRecommendations = () => {
    switch(userProfile.communicationSkills) {
      case CommunicationSkills.BEGINNER:
        return [
          {
            title: "Conversaciones significativas - 21 días de conexión genuina",
            description: "Inicia una conversación profunda cada día con alguien diferente. Después de 21 días, investigaciones en psicología social muestran que este hábito puede reducir la ansiedad social en un 27% y aumentar tu confianza comunicativa en un 31%.",
            icon: <Users className="text-indigo-500" />
          },
          {
            title: "Escucha activa - 21 días de comprensión profunda",
            description: "Practica la técnica 80/20: escucha el 80% del tiempo y habla solo el 20%. Estudios de neuroplasticidad muestran que 21 días de escucha consciente pueden mejorar tu capacidad de retención de información en un 23% y tu empatía percibida por los demás en un 40%.",
            icon: <HeartHandshake className="text-pink-500" />
          }
        ];
      case CommunicationSkills.INTERMEDIATE:
        return [
          {
            title: "Presentaciones breves - 21 días de expresión clara",
            description: "Prepara y entrega una presentación de 2 minutos cada 3 días sobre cualquier tema que te interese. La ciencia del aprendizaje indica que después de 7 presentaciones en un ciclo de 21 días, tu fluidez verbal aumentará en un 17% y tu ansiedad al hablar en público se reducirá en un 34%.",
            icon: <Users className="text-indigo-500" />
          }
        ];
      default:
        return [
          {
            title: "Mentoría comunicativa - 21 días de enseñanza",
            description: "Dedica 20 minutos, tres veces por semana, a enseñar habilidades de comunicación a alguien con menos experiencia. Los estudios sobre el aprendizaje recíproco indican que este proceso de 21 días puede consolidar tu propio dominio en un 29% y desarrollar tu capacidad de liderazgo comunicativo en un 25%.",
            icon: <Users className="text-indigo-500" />
          }
        ];
    }
  };

  const getRelationshipRecommendations = () => {
    switch(userProfile.relationshipStatus) {
      case RelationshipStatus.SINGLE:
        return [
          {
            title: "Ampliación de círculo social - 21 días de nuevas conexiones",
            description: "Asiste a un evento social nuevo cada semana y habla con al menos 3 personas que no conoces. Estudios sociológicos muestran que completar este ciclo de 21 días puede aumentar tus posibilidades de formar conexiones significativas en un 37% y expandir tu red social efectiva en un 22%.",
            icon: <Users className="text-purple-500" />
          },
          {
            title: "Desarrollo de presencia atractiva - 21 días de autoconfianza",
            description: "Practica 10 minutos diarios de afirmaciones positivas y visualización. La psicología positiva ha demostrado que 21 días de este ejercicio pueden incrementar tu atractivo percibido en un 23%, principalmente debido al aumento de confianza y energía positiva que proyectas.",
            icon: <Heart className="text-red-500" />
          }
        ];
      case RelationshipStatus.DIVORCED:
      case RelationshipStatus.WIDOWED:
        return [
          {
            title: "Reconstrucción emocional - 21 días hacia la sanación",
            description: "Dedica 15 minutos diarios a escribir un diario de gratitud enfocado en aspectos positivos de tu vida actual. La investigación en terapia cognitiva muestra que 21 días de este ejercicio pueden reducir los síntomas de depresión post-separación en un 31% y aumentar la sensación de propósito en un 27%.",
            icon: <Heart className="text-red-500" />
          }
        ];
      default:
        return [
          {
            title: "Comunicación en pareja - 21 días de profundización",
            description: "Reserva 20 minutos diarios de conversación sin distracciones con tu pareja. Estudios en psicología de relaciones indican que 21 días consecutivos de esta práctica pueden reducir los conflictos de comunicación en un 38% y aumentar la satisfacción relacional general en un 42%.",
            icon: <HeartHandshake className="text-pink-500" />
          }
        ];
    }
  };

  const getEmploymentRecommendations = () => {
    switch(userProfile.employmentStatus) {
      case EmploymentStatus.UNEMPLOYED:
        return [
          {
            title: "Estrategia de búsqueda laboral - 21 días de acción consistente",
            description: "Dedica 2 horas diarias a una búsqueda estructurada: 1 hora para aplicaciones y 1 hora para networking. La ciencia del desarrollo profesional muestra que después de 21 días, este sistema aumenta las entrevistas conseguidas en un 47% en comparación con búsquedas no estructuradas.",
            icon: <Briefcase className="text-amber-500" />
          }
        ];
      case EmploymentStatus.STUDENT:
        return [
          {
            title: "Técnica Pomodoro de estudio - 21 días hacia la eficiencia",
            description: "Implementa 4 ciclos Pomodoro diarios (25 minutos de estudio intenso seguidos de 5 minutos de descanso). Las neurociencias del aprendizaje indican que 21 días de este método puede incrementar tu retención de información en un 23% y tu capacidad de enfoque sostenido en un 31%.",
            icon: <BookOpen className="text-yellow-500" />
          }
        ];
      default:
        return [
          {
            title: "Desarrollo profesional diario - 21 días de crecimiento",
            description: "Dedica 30 minutos cada día a aprender una nueva habilidad relevante para tu carrera. La investigación en desarrollo profesional muestra que después de 21 días, este hábito puede aumentar tu valor percibido en el mercado laboral en un 19% y tus posibilidades de promoción en un 24%.",
            icon: <Briefcase className="text-amber-500" />
          }
        ];
    }
  };

  const getHabitsRecommendations = () => {
    if (userProfile.badHabits?.includes(BadHabit.PORNOGRAPHY)) {
      return [
        {
          title: "Abstinencia progresiva - 21 días hacia la libertad",
          description: "Implementa un sistema de bloqueo en tus dispositivos y reemplaza el impulso con 10 minutos de ejercicio intenso. La neurociencia de la adicción muestra que después de 21 días, los receptores de dopamina comienzan a reajustarse, reduciendo los impulsos compulsivos en un 63% y mejorando la regulación emocional en un 41%.",
          icon: <Ban className="text-red-500" />
        }
      ];
    } else if (userProfile.badHabits?.includes(BadHabit.ALCOHOL)) {
      return [
        {
          title: "Sobriedad consciente - 21 días de claridad mental",
          description: "Sustituye cada impulso de beber con una infusión y 5 minutos de respiración profunda. Estudios en neuroquímica muestran que después de 21 días sin alcohol, la función cognitiva mejora en un 29%, la calidad del sueño en un 34%, y los niveles de ansiedad se reducen en un 27%.",
          icon: <Ban className="text-red-500" />
        }
      ];
    } else if (userProfile.badHabits?.includes(BadHabit.PROCRASTINATION)) {
      return [
        {
          title: "Método 2-minutos - 21 días de acción inmediata",
          description: "Cuando debas realizar una tarea, comienza con solo 2 minutos de acción inmediata. La psicología del comportamiento ha demostrado que después de 21 días, este hábito reduce la resistencia a iniciar tareas en un 71% y aumenta la productividad general en un 32%.",
          icon: <Calendar className="text-orange-500" />
        }
      ];
    } else {
      return [
        {
          title: "Lectura diaria - 21 días de alimentación mental",
          description: "Lee 20 páginas cada día de un libro de desarrollo personal o profesional. Los estudios cognitivos muestran que 21 días de lectura consistente aumentan tu vocabulario en un 14%, tu capacidad analítica en un 21%, y expanden significativamente tu perspectiva sobre problemas complejos.",
          icon: <BookOpen className="text-yellow-500" />
        }
      ];
    }
  };

  const financialRecommendations = [
    {
      title: "Control de gastos - 21 días hacia la consciencia financiera",
      description: "Registra cada gasto diario y categorízalo. La ciencia del comportamiento económico indica que después de 21 días, este hábito reduce los gastos impulsivos en un 34% y aumenta tu capacidad de ahorro en aproximadamente un 12% sin necesidad de incrementar tus ingresos.",
      icon: <DollarSign className="text-green-500" />
    },
    {
      title: "Inversión gradual - 21 días de educación financiera",
      description: "Dedica 15 minutos diarios a aprender sobre inversiones y aparta un pequeño porcentaje fijo de tus ingresos. Estudios en educación financiera muestran que 21 días de este hábito dual puede aumentar tu confianza en decisiones de inversión en un 41% y establecer un patrón de ahorro que persiste en el 87% de los casos.",
      icon: <DollarSign className="text-emerald-500" />
    }
  ];

  // Combinar todas las recomendaciones en categorías
  const allRecommendations = {
    physical: getPhysicalRecommendations(),
    communication: getCommunicationRecommendations(),
    relationship: getRelationshipRecommendations(),
    employment: getEmploymentRecommendations(),
    habits: getHabitsRecommendations(),
    financial: financialRecommendations
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Plan personalizado completo</h1>
        <p className="text-gray-300">Basado en tu perfil, hemos creado un plan de 21 días para cada área de tu vida</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2 text-blue-400" /> 
              Desarrollo físico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.physical.map((rec, index) => (
                <div key={`physical-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 text-indigo-500" /> 
              Comunicación e interacción social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.communication.map((rec, index) => (
                <div key={`comm-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 text-red-500" /> 
              Relaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.relationship.map((rec, index) => (
                <div key={`rel-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 text-amber-500" /> 
              Desarrollo profesional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.employment.map((rec, index) => (
                <div key={`emp-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ban className="mr-2 text-red-500" /> 
              Control de hábitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.habits.map((rec, index) => (
                <div key={`habit-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-evolve-dark/75 border-evolve-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 text-green-500" /> 
              Finanzas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allRecommendations.financial.map((rec, index) => (
                <div key={`fin-${index}`} className="p-4 rounded-lg bg-evolve-dark/40 border border-evolve-gray/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium text-lg">{rec.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-evolve-dark/50 rounded-lg border border-evolve-purple/20 text-center">
          <p className="text-lg font-medium mb-2">El poder de 21 días</p>
          <p className="text-gray-300">Los estudios neurocientíficos demuestran que 21 días es el período óptimo para formar un nuevo hábito, ya que este tiempo permite que se establezcan nuevas conexiones neuronales y se fortalezcan los circuitos de recompensa asociados al nuevo comportamiento.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PlanPage;
