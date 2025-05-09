
import { UserProfile, PhysicalCondition, CommunicationSkills, LifeStage, BadHabit, PastTrauma } from '@/types/user';

export const calculateUserLevel = (userProfile: UserProfile) => {
  let score = 0;
  const maxScore = 100;

  // Factores positivos
  if (userProfile.physicalCondition === PhysicalCondition.GOOD) score += 10;
  if (userProfile.physicalCondition === PhysicalCondition.EXCELLENT) score += 15;
  
  if (userProfile.communicationSkills === CommunicationSkills.ADVANCED) score += 10;
  if (userProfile.communicationSkills === CommunicationSkills.EXPERT) score += 15;
  
  if (userProfile.lifeStage === LifeStage.PLATEAU) score += 5;
  if (userProfile.lifeStage === LifeStage.ASCENT) score += 15;
  
  if (userProfile.income === 'medium') score += 5;
  if (userProfile.income === 'high') score += 10;
  if (userProfile.income === 'very_high') score += 15;
  
  if (userProfile.savings === 'medium') score += 5;
  if (userProfile.savings === 'high') score += 10;
  
  // Factores de comunicación y habilidades sociales
  if (userProfile.publicSpeaking === 'comfortable') score += 5;
  if (userProfile.publicSpeaking === 'confident') score += 10;
  
  if (userProfile.friendsCount === 'average') score += 3;
  if (userProfile.friendsCount === 'many') score += 5;
  if (userProfile.friendsCount === 'very_many') score += 10;
  
  if (userProfile.femaleCommunication === 'good') score += 5;
  if (userProfile.femaleCommunication === 'excellent') score += 10;
  
  // Factores negativos
  const badHabits = userProfile.badHabits?.filter(h => h !== BadHabit.NONE) || [];
  score -= badHabits.length * 5;
  
  // Penalizar más por niveles de adicción más altos
  const addictionLevels = userProfile.addictionLevels || [];
  addictionLevels.forEach(level => {
    if (level === 'level_3') score -= 3;
    if (level === 'level_4') score -= 4;
    if (level === 'level_5') score -= 5;
  });
  
  if (userProfile.pastTraumas?.includes(PastTrauma.CHILDHOOD)) score -= 5;
  if (userProfile.pastTraumas?.includes(PastTrauma.RELATIONSHIP)) score -= 3;
  if (userProfile.pastTraumas?.includes(PastTrauma.PROFESSIONAL)) score -= 3;
  if (userProfile.pastTraumas?.includes(PastTrauma.LOSS)) score -= 3;
  
  // Asegurar que el puntaje final esté entre 0 y maxScore
  score = Math.max(0, Math.min(score, maxScore));
  
  // Convertir el puntaje a un nivel
  let level = '';
  if (score <= 20) level = 'Principiante';
  else if (score <= 40) level = 'Aprendiz';
  else if (score <= 60) level = 'Dedicado';
  else if (score <= 80) level = 'Experto';
  else level = 'Maestro';
  
  // Include min/max scores for each level for the UI
  const levelRanges = {
    Principiante: { min: 0, max: 20 },
    Aprendiz: { min: 21, max: 40 },
    Dedicado: { min: 41, max: 60 },
    Experto: { min: 61, max: 80 },
    Maestro: { min: 81, max: 100 }
  };

  // Determine score percentage within the current level range
  const currentRange = levelRanges[level as keyof typeof levelRanges];
  const levelProgress = ((score - currentRange.min) / (currentRange.max - currentRange.min)) * 100;
  
  // Generate level completion data - indicates if previous levels are complete
  const levelCompletions = {
    Principiante: score > 20 ? 100 : Math.min(score / 20 * 100, 100),
    Aprendiz: score > 40 ? 100 : (score <= 20 ? 0 : (score - 20) / 20 * 100),
    Dedicado: score > 60 ? 100 : (score <= 40 ? 0 : (score - 40) / 20 * 100),
    Experto: score > 80 ? 100 : (score <= 60 ? 0 : (score - 60) / 20 * 100),
    Maestro: score <= 80 ? 0 : (score - 80) / 20 * 100
  };
  
  return { 
    level, 
    score, 
    levelProgress, 
    levelCompletions,
    levelRanges
  };
};
