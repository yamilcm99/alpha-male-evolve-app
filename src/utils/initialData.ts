
import { v4 as uuidv4 } from 'uuid';
import { 
  Habit, 
  HabitCategory, 
  Achievement, 
  AchievementCategory, 
  BadHabit, 
  Goal, 
  GoalCategory,
  HabitBenefit,
  HabitDifficulty
} from '@/types/user';

export const createInitialHabits = (badHabits: BadHabit[]): Habit[] => {
  const habits: Habit[] = [];
  
  // Hábitos básicos (Nivel Principiante)
  habits.push(
    {
      id: uuidv4(),
      name: "Lectura diaria",
      description: "Lee al menos 15 minutos al día",
      category: HabitCategory.READING,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.EASY
    },
    {
      id: uuidv4(),
      name: "Ejercicio básico",
      description: "Realiza al menos 10 minutos de ejercicio al día",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.EASY
    },
    {
      id: uuidv4(),
      name: "Control de gastos",
      description: "Registra tus gastos diarios",
      category: HabitCategory.FINANCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.FINANCIAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.EASY
    },
    {
      id: uuidv4(),
      name: "Contactar a un amigo",
      description: "Comunícate con un amigo o familiar que hace tiempo no ves",
      category: HabitCategory.SOCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 7,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.SOCIAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.EASY
    }
  );
  
  // Hábitos para niveles Aprendiz
  habits.push(
    {
      id: uuidv4(),
      name: "30 minutos de ejercicio",
      description: "Realiza al menos 30 minutos de ejercicio",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Aprendiz",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.MEDIUM
    },
    {
      id: uuidv4(),
      name: "Estudiar matemáticas",
      description: "Dedica 30 minutos a estudiar un tema de matemáticas",
      category: HabitCategory.CAREER,
      streak: 0,
      lastCompleted: null,
      goal: 14,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Aprendiz",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.CAREER],
      difficulty: HabitDifficulty.MEDIUM
    },
    {
      id: uuidv4(),
      name: "Ahorro diario",
      description: "Guarda un porcentaje fijo de tus ingresos diarios",
      category: HabitCategory.FINANCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Aprendiz",
      benefits: [HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.MEDIUM
    },
    {
      id: uuidv4(),
      name: "Una semana en el gimnasio",
      description: "Asiste al gimnasio durante 5 días consecutivos",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 5,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Aprendiz",
      benefits: [HabitBenefit.PHYSICAL],
      difficulty: HabitDifficulty.MEDIUM,
      isMegaHabit: true
    }
  );
  
  // Hábitos para nivel Dedicado
  habits.push(
    {
      id: uuidv4(),
      name: "Disciplina física avanzada",
      description: "Entrena con pesas o calistenia 45 minutos",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Dedicado",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "Estudio de física cuántica",
      description: "Dedica 45 minutos a estudiar conceptos básicos de física cuántica",
      category: HabitCategory.CAREER,
      streak: 0,
      lastCompleted: null,
      goal: 14,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Dedicado",
      benefits: [HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "Networking profesional",
      description: "Establece contacto con un nuevo profesional de tu industria",
      category: HabitCategory.SOCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 10,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Dedicado",
      benefits: [HabitBenefit.SOCIAL, HabitBenefit.CAREER],
      difficulty: HabitDifficulty.MEDIUM
    },
    {
      id: uuidv4(),
      name: "3 semanas en el gimnasio",
      description: "Completa 3 semanas consecutivas asistiendo al gimnasio 5 días por semana",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 15,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Dedicado",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.HARD,
      isMegaHabit: true
    }
  );
  
  // Hábitos para nivel Experto
  habits.push(
    {
      id: uuidv4(),
      name: "Meditación diaria",
      description: "Practica 20 minutos de meditación enfocada",
      category: HabitCategory.SOCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 30,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Experto",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "Inversión semanal",
      description: "Destina un porcentaje de tus ingresos a inversiones productivas",
      category: HabitCategory.FINANCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 12,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Experto",
      benefits: [HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "Dominio de un idioma",
      description: "Dedica 1 hora al estudio avanzado de un idioma extranjero",
      category: HabitCategory.CAREER,
      streak: 0,
      lastCompleted: null,
      goal: 30,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Experto",
      benefits: [HabitBenefit.CAREER, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "5 días sin contenido digital",
      description: "Abstente de redes sociales, videos y entretenimiento digital por 5 días",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 5,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Experto",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.VERY_HARD,
      isMegaHabit: true
    }
  );
  
  // Hábitos para nivel Maestro
  habits.push(
    {
      id: uuidv4(),
      name: "Entrenamientos de élite",
      description: "Completa un entrenamiento de alta intensidad de 1 hora",
      category: HabitCategory.FITNESS,
      streak: 0,
      lastCompleted: null,
      goal: 30,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Maestro",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.VERY_HARD
    },
    {
      id: uuidv4(),
      name: "Mentoría a otros",
      description: "Ofrece una sesión de mentoría a alguien que lo necesite",
      category: HabitCategory.SOCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 10,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Maestro",
      benefits: [HabitBenefit.SOCIAL, HabitBenefit.MENTAL],
      difficulty: HabitDifficulty.HARD
    },
    {
      id: uuidv4(),
      name: "Programación financiera",
      description: "Diseña un plan de inversión a largo plazo (>5 años)",
      category: HabitCategory.FINANCIAL,
      streak: 0,
      lastCompleted: null,
      goal: 7,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Maestro",
      benefits: [HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.VERY_HARD
    },
    {
      id: uuidv4(),
      name: "Superación total de adicciones",
      description: "30 días consecutivos sin ceder a ningún impulso adictivo",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 30,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Maestro",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.PHYSICAL, HabitBenefit.SOCIAL, HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.VERY_HARD,
      isMegaHabit: true
    }
  );
  
  // Crear hábitos basados en los malos hábitos del usuario
  if (badHabits.includes(BadHabit.PORNOGRAPHY)) {
    habits.push({
      id: uuidv4(),
      name: "Día sin pornografía",
      description: "Mantente un día entero sin consumir contenido pornográfico",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.MEDIUM
    });
    
    habits.push({
      id: uuidv4(),
      name: "5 días sin pornografía",
      description: "Mantente 5 días consecutivos sin pornografía",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 5,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Aprendiz",
      benefits: [HabitBenefit.MENTAL, HabitBenefit.SOCIAL],
      difficulty: HabitDifficulty.HARD,
      isMegaHabit: true
    });
  }
  
  if (badHabits.includes(BadHabit.ALCOHOL)) {
    habits.push({
      id: uuidv4(),
      name: "Día sin alcohol",
      description: "Mantente un día entero sin consumir alcohol",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.MENTAL, HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.MEDIUM
    });
  }
  
  if (badHabits.includes(BadHabit.SMOKING)) {
    habits.push({
      id: uuidv4(),
      name: "Día sin fumar",
      description: "Mantente un día entero sin fumar",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 21,
      cycleCompleted: false,
      cycleCompletedAt: null,
      cyclesCompleted: 0,
      requiredLevel: "Principiante",
      benefits: [HabitBenefit.PHYSICAL, HabitBenefit.FINANCIAL],
      difficulty: HabitDifficulty.MEDIUM
    });
  }
  
  return habits;
};

export const createInitialAchievements = (): Achievement[] => {
  return [
    // Logros básicos disponibles para todos los niveles
    {
      id: uuidv4(),
      name: "Primer Paso",
      description: "Completa tu primer hábito",
      icon: "star",
      unlockedAt: null,
      category: AchievementCategory.OVERALL,
      requirement: 1,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Semana constante",
      description: "Mantén un hábito durante 7 días consecutivos",
      icon: "award",
      unlockedAt: null,
      category: AchievementCategory.OVERALL,
      requirement: 7,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Maestro de hábitos",
      description: "Completa un ciclo completo de 21 días para cualquier hábito",
      icon: "calendar-check",
      unlockedAt: null,
      category: AchievementCategory.OVERALL,
      requirement: 21,
      currentProgress: 0
    },
    
    // Logros por niveles
    {
      id: uuidv4(),
      name: "Maestro de la abstinencia",
      description: "Mantén un hábito de abstinencia durante 21 días",
      icon: "shield",
      unlockedAt: null,
      category: AchievementCategory.ABSTINENCE,
      requirement: 21,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Atleta en formación",
      description: "Mantén un hábito de fitness durante 21 días",
      icon: "activity",
      unlockedAt: null,
      category: AchievementCategory.FITNESS,
      requirement: 21,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Lector ávido",
      description: "Mantén un hábito de lectura durante 21 días",
      icon: "book",
      unlockedAt: null,
      category: AchievementCategory.READING,
      requirement: 21,
      currentProgress: 0
    },
    
    // Logros avanzados (requieren nivel específico)
    {
      id: uuidv4(),
      name: "Financieramente disciplinado",
      description: "Completa un ciclo de 21 días de un hábito financiero",
      icon: "circle-dollar-sign",
      unlockedAt: null,
      category: AchievementCategory.FINANCIAL,
      requirement: 21,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Socialmente competente",
      description: "Completa 10 hábitos sociales",
      icon: "users",
      unlockedAt: null,
      category: AchievementCategory.SOCIAL,
      requirement: 10,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Maestro del autocontrol",
      description: "Completa 3 ciclos de 21 días de hábitos de abstinencia",
      icon: "medal",
      unlockedAt: null,
      category: AchievementCategory.ABSTINENCE,
      requirement: 63,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Megaevolución",
      description: "Completa 3 mega hábitos",
      icon: "award",
      unlockedAt: null,
      category: AchievementCategory.OVERALL,
      requirement: 3,
      currentProgress: 0
    }
  ];
};

export const createInitialGoals = (): Goal[] => {
  return [
    {
      id: uuidv4(),
      title: "Mejorar condición física",
      description: "Aumentar resistencia y fuerza muscular en 3 meses",
      category: "fitness" as GoalCategory,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      completed: false,
      steps: [
        {
          id: uuidv4(),
          description: "Establecer rutina de ejercicios semanal",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Registrar progreso cada semana",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Ajustar alimentación para apoyar los objetivos",
          completed: false
        }
      ]
    },
    {
      id: uuidv4(),
      title: "Ampliar red profesional",
      description: "Establecer 10 nuevas conexiones profesionales valiosas",
      category: "career" as GoalCategory,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      completed: false,
      steps: [
        {
          id: uuidv4(),
          description: "Asistir a 2 eventos de networking",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Actualizar perfil de LinkedIn",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Contactar a 5 personas de interés en mi industria",
          completed: false
        }
      ]
    },
    {
      id: uuidv4(),
      title: "Desarrollar hábito de lectura diaria",
      description: "Leer al menos 20 páginas diarias durante 21 días consecutivos",
      category: "personal" as GoalCategory,
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      completed: false,
      steps: [
        {
          id: uuidv4(),
          description: "Seleccionar libros de desarrollo personal",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Reservar 30 minutos diarios para lectura",
          completed: false
        },
        {
          id: uuidv4(),
          description: "Completar ciclo de 21 días",
          completed: false
        }
      ]
    }
  ];
};
