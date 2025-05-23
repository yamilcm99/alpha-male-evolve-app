export type UserProfile = {
  id?: string;
  name: string;
  age: number;
  familyStatus: FamilyStatus;
  physicalCondition: PhysicalCondition;
  pastTraumas: PastTrauma[];
  savings: SavingsLevel;
  hobbies: string[];
  lifeStage: LifeStage;
  religion: string;
  badHabits: BadHabit[];
  addictionLevels: AddictionLevel[];
  employmentStatus: EmploymentStatus;
  income: IncomeLevel;
  relationshipStatus: RelationshipStatus;
  communicationSkills: CommunicationSkills;
  publicSpeaking: PublicSpeakingLevel;
  friendsCount: FriendsCount;
  femaleCommunication: CommunicationLevel;
  updatedAt?: Date | string; // Added for 90-day profile updates
  avatar?: string; // URL to user's avatar image
};

export enum FamilyStatus {
  LIVES_ALONE = "lives_alone",
  WITH_PARENTS = "with_parents",
  WITH_PARTNER = "with_partner",
  WITH_FAMILY = "with_family",
  WITH_ROOMMATES = "with_roommates",
  DIVORCED = "divorced"
}

export enum PhysicalCondition {
  POOR = "poor",
  AVERAGE = "average",
  GOOD = "good",
  EXCELLENT = "excellent"
}

export enum PastTrauma {
  CHILDHOOD = "childhood",
  RELATIONSHIP = "relationship",
  PROFESSIONAL = "professional",
  LOSS = "loss",
  OTHER = "other",
  NONE = "none"
}

export enum SavingsLevel {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export enum LifeStage {
  ASCENT = "ascent",
  DESCENT = "descent",
  PLATEAU = "plateau",
  UNSTABLE = "unstable",
  CRITICAL = "critical"
}

export enum BadHabit {
  PORNOGRAPHY = "pornography",
  ALCOHOL = "alcohol",
  SMOKING = "smoking",
  PROCRASTINATION = "procrastination",
  OVEREATING = "overeating",
  GAMBLING = "gambling",
  NONE = "none"
}

export enum AddictionLevel {
  LEVEL_1 = "level_1",
  LEVEL_2 = "level_2",
  LEVEL_3 = "level_3",
  LEVEL_4 = "level_4",
  LEVEL_5 = "level_5",
  NONE = "none"
}

export enum EmploymentStatus {
  EMPLOYED = "employed",
  SELF_EMPLOYED = "self_employed",
  UNEMPLOYED = "unemployed",
  STUDENT = "student"
}

export enum IncomeLevel {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very_high"
}

export enum RelationshipStatus {
  SINGLE = "single",
  IN_RELATIONSHIP = "in_relationship",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed"
}

export enum CommunicationSkills {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert"
}

export enum PublicSpeakingLevel {
  FEARFUL = "fearful",
  UNCOMFORTABLE = "uncomfortable",
  NEUTRAL = "neutral",
  COMFORTABLE = "comfortable",
  CONFIDENT = "confident"
}

export enum FriendsCount {
  NONE = "none",
  FEW = "few",
  AVERAGE = "average",
  MANY = "many",
  VERY_MANY = "very_many"
}

export enum CommunicationLevel {
  VERY_BAD = "very_bad",
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
  EXCELLENT = "excellent"
}

export type Habit = {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  streak: number;
  lastCompleted: Date | null;
  goal: number;
  cycleCompleted?: boolean; // Track if 21-day cycle is completed
  cycleCompletedAt?: Date | null; // When the 21-day cycle was completed
  cyclesCompleted?: number; // Number of 21-day cycles completed
  requiredLevel?: string; // Nivel requerido para desbloquear este hábito
  isMegaHabit?: boolean; // Indicador de mega hábito (doble de puntos)
  benefits?: HabitBenefit[]; // Áreas que beneficia este hábito
  difficulty?: HabitDifficulty; // Dificultad del hábito
};

export enum HabitCategory {
  FITNESS = "fitness",
  READING = "reading",
  ABSTINENCE = "abstinence",
  CAREER = "career",
  SOCIAL = "social",
  FINANCIAL = "financial",
  OTHER = "other"
}

export enum HabitBenefit {
  PHYSICAL = "physical",
  MENTAL = "mental",
  SOCIAL = "social",
  FINANCIAL = "financial"
}

export enum HabitDifficulty {
  EASY = "easy",
  MEDIUM = "medium", 
  HARD = "hard",
  VERY_HARD = "very_hard"
}

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
  category: AchievementCategory;
  requirement: number;
  currentProgress: number;
};

export enum AchievementCategory {
  FITNESS = "fitness",
  READING = "reading",
  ABSTINENCE = "abstinence",
  CAREER = "career",
  SOCIAL = "social",
  FINANCIAL = "financial",
  OVERALL = "overall"
}

export type GoalCategory = "fitness" | "career" | "social" | "financial" | "personal";

export type Goal = {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  deadline: Date | null;
  completed: boolean;
  steps: GoalStep[];
};

export type GoalStep = {
  id: string;
  description: string;
  completed: boolean;
};
