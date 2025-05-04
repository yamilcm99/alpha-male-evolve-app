
import { v4 as uuidv4 } from 'uuid';
import { 
  Habit, 
  HabitCategory, 
  Achievement, 
  AchievementCategory, 
  BadHabit, 
  Goal, 
  GoalCategory 
} from '@/types/user';

export const createInitialHabits = (badHabits: BadHabit[]): Habit[] => {
  const habits: Habit[] = [];
  
  // Create habits based on user's bad habits
  if (badHabits.includes(BadHabit.PORNOGRAPHY)) {
    habits.push({
      id: uuidv4(),
      name: "Día sin pornografía",
      description: "Mantente un día entero sin consumir contenido pornográfico",
      category: HabitCategory.ABSTINENCE,
      streak: 0,
      lastCompleted: null,
      goal: 90
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
      goal: 30
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
      goal: 30
    });
  }
  
  // Add default habits for everyone
  habits.push({
    id: uuidv4(),
    name: "Lectura diaria",
    description: "Lee al menos 15 minutos al día",
    category: HabitCategory.READING,
    streak: 0,
    lastCompleted: null,
    goal: 30
  });
  
  habits.push({
    id: uuidv4(),
    name: "Ejercicio físico",
    description: "Realiza al menos 15 minutos de ejercicio al día",
    category: HabitCategory.FITNESS,
    streak: 0,
    lastCompleted: null,
    goal: 30
  });
  
  habits.push({
    id: uuidv4(),
    name: "Networking",
    description: "Establece una nueva conexión profesional cada semana",
    category: HabitCategory.SOCIAL,
    streak: 0,
    lastCompleted: null,
    goal: 12
  });
  
  return habits;
};

export const createInitialAchievements = (): Achievement[] => {
  return [
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
      name: "Maestro de la abstinencia",
      description: "Mantén un hábito de abstinencia durante 30 días",
      icon: "shield",
      unlockedAt: null,
      category: AchievementCategory.ABSTINENCE,
      requirement: 30,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Atleta en formación",
      description: "Mantén un hábito de fitness durante 30 días",
      icon: "activity",
      unlockedAt: null,
      category: AchievementCategory.FITNESS,
      requirement: 30,
      currentProgress: 0
    },
    {
      id: uuidv4(),
      name: "Lector ávido",
      description: "Mantén un hábito de lectura durante 30 días",
      icon: "book",
      unlockedAt: null,
      category: AchievementCategory.READING,
      requirement: 30,
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
    }
  ];
};
