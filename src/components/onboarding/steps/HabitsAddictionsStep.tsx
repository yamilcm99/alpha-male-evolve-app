
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BadHabit, AddictionLevel } from '@/types/user';

type HabitsAddictionsStepProps = {
  formData: any;
  handleCheckboxArrayChange: (name: string, value: string, checked: boolean) => void;
  handleAddictionLevelChange: (habit: string, level: AddictionLevel) => void;
  getUniqueId: (prefix: string, value: string) => string;
};

const HabitsAddictionsStep = ({
  formData,
  handleCheckboxArrayChange,
  handleAddictionLevelChange,
  getUniqueId,
}: HabitsAddictionsStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Hábitos y Adicciones</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Malos Hábitos</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.values(BadHabit).map((habit) => (
              <div key={habit} className="flex items-center space-x-2">
                <Checkbox 
                  id={getUniqueId('habit', habit)} 
                  checked={formData.badHabits?.includes(habit)} 
                  onCheckedChange={(checked) => handleCheckboxArrayChange('badHabits', habit, checked === true)}
                />
                <Label htmlFor={getUniqueId('habit', habit)}>
                  {habit === 'pornography' ? 'Pornografía' :
                    habit === 'alcohol' ? 'Alcohol' :
                    habit === 'smoking' ? 'Fumar' :
                    habit === 'procrastination' ? 'Procrastinación' :
                    habit === 'overeating' ? 'Comer en exceso' :
                    habit === 'gambling' ? 'Juegos de azar' : 'Ninguno'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nivel de adicción (1-5, donde 5 es la más grave)</Label>
          {formData.badHabits?.filter(h => h !== BadHabit.NONE).map((habit) => (
            <div key={habit} className="mt-2">
              <Label className="mb-1">
                {habit === 'pornography' ? 'Pornografía' :
                  habit === 'alcohol' ? 'Alcohol' :
                  habit === 'smoking' ? 'Fumar' :
                  habit === 'procrastination' ? 'Procrastinación' :
                  habit === 'overeating' ? 'Comer en exceso' :
                  habit === 'gambling' ? 'Juegos de azar' : ''}
              </Label>
              <div className="flex space-x-4 mt-1">
                {[
                  AddictionLevel.LEVEL_1,
                  AddictionLevel.LEVEL_2,
                  AddictionLevel.LEVEL_3,
                  AddictionLevel.LEVEL_4,
                  AddictionLevel.LEVEL_5
                ].map((level) => (
                  <div key={`${habit}-${level}`} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      id={getUniqueId(`addiction-${habit}`, level)}
                      value={level}
                      checked={formData.addictionLevels?.some(al => al === `${habit}:${level}`)}
                      onChange={() => handleAddictionLevelChange(habit, level)}
                      className="text-evolve-purple focus:ring-evolve-purple"
                    />
                    <Label htmlFor={getUniqueId(`addiction-${habit}`, level)}>
                      {level === 'level_1' ? '1' :
                        level === 'level_2' ? '2' :
                        level === 'level_3' ? '3' :
                        level === 'level_4' ? '4' : '5'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {(!formData.badHabits?.length || formData.badHabits?.includes(BadHabit.NONE)) && (
            <p className="text-sm text-gray-400">No hay hábitos seleccionados para valorar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitsAddictionsStep;
