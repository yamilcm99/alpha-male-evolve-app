
import { AddictionLevel, BadHabit, PastTrauma } from '@/types/user';

export const getUniqueId = (prefix: string, value: string): string => `${prefix}-${value}`;

export const handleAddictionLevelChange = (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  habit: string, 
  level: AddictionLevel
) => {
  setFormData(prev => {
    // Create a copy of current addiction levels
    const currentLevels = [...(prev.addictionLevels || [])];
    
    // Format our new value as "habit:level"
    const newValue = `${habit}:${level}` as AddictionLevel;
    
    // Find if this habit already has a level set
    const existingIndex = currentLevels.findIndex(item => {
      if (typeof item === 'string' && item.startsWith(`${habit}:`)) return true;
      return false;
    });
    
    // Replace or add the new value
    if (existingIndex >= 0) {
      currentLevels[existingIndex] = newValue;
    } else {
      currentLevels.push(newValue);
    }
    
    return { ...prev, addictionLevels: currentLevels };
  });
};

export const processFormData = (formData: any, data: any) => {
  // Process the hobbies string into an array
  const hobbiesArray = data.hobbies.split(',').map((hobby: string) => hobby.trim()).filter(Boolean);
  
  // If the user selected "NONE" in pastTraumas, ensure it's the only option
  let pastTraumas = [...(formData.pastTraumas || [])];
  if (pastTraumas.includes(PastTrauma.NONE) && pastTraumas.length > 1) {
    pastTraumas = [PastTrauma.NONE];
  }

  // If the user selected "NONE" in badHabits, ensure it's the only option
  let badHabits = [...(formData.badHabits || [])];
  if (badHabits.includes(BadHabit.NONE) && badHabits.length > 1) {
    badHabits = [BadHabit.NONE];
  }

  // Combine form data
  return {
    ...formData,
    name: data.name,
    age: data.age,
    religion: data.religion,
    hobbies: hobbiesArray,
    pastTraumas,
    badHabits
  };
};
