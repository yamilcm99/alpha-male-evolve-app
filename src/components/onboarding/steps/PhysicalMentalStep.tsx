
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PhysicalCondition, PastTrauma, LifeStage } from '@/types/user';

type PhysicalMentalStepProps = {
  formData: any;
  handleSingleSelectChange: (name: string, value: string) => void;
  handleCheckboxArrayChange: (name: string, value: string, checked: boolean) => void;
  getUniqueId: (prefix: string, value: string) => string;
};

const PhysicalMentalStep = ({
  formData,
  handleSingleSelectChange,
  handleCheckboxArrayChange,
  getUniqueId,
}: PhysicalMentalStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Estado Físico y Mental</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Condición Física</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(PhysicalCondition).map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('physical', condition)}
                  value={condition}
                  checked={formData.physicalCondition === condition}
                  onChange={() => handleSingleSelectChange('physicalCondition', condition)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('physical', condition)}>
                  {condition === 'poor' ? 'Pobre' :
                    condition === 'average' ? 'Promedio' :
                    condition === 'good' ? 'Buena' : 'Excelente'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Traumas Pasados</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.values(PastTrauma).map((trauma) => (
              <div key={trauma} className="flex items-center space-x-2">
                <Checkbox 
                  id={getUniqueId('trauma', trauma)} 
                  checked={formData.pastTraumas?.includes(trauma)} 
                  onCheckedChange={(checked) => handleCheckboxArrayChange('pastTraumas', trauma, checked === true)}
                />
                <Label htmlFor={getUniqueId('trauma', trauma)}>
                  {trauma === 'childhood' ? 'Infancia' :
                    trauma === 'relationship' ? 'Relaciones' :
                    trauma === 'professional' ? 'Profesional' :
                    trauma === 'loss' ? 'Pérdida' :
                    trauma === 'other' ? 'Otro' : 'Ninguno'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>¿En qué etapa de tu vida sientes que estás?</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(LifeStage).map((stage) => (
              <div key={stage} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('lifestage', stage)}
                  value={stage}
                  checked={formData.lifeStage === stage}
                  onChange={() => handleSingleSelectChange('lifeStage', stage)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('lifestage', stage)}>
                  {stage === 'ascent' ? 'En ascenso (mejorando)' :
                    stage === 'descent' ? 'En bajada (empeorando)' :
                    stage === 'plateau' ? 'En meseta (estancado)' :
                    stage === 'unstable' ? 'Inestable (altibajos)' : 'Crítica (situación grave)'}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalMentalStep;
