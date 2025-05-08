
import React from 'react';
import { Label } from '@/components/ui/label';
import { EmploymentStatus, IncomeLevel, SavingsLevel } from '@/types/user';

type WorkFinanceStepProps = {
  formData: any;
  handleSingleSelectChange: (name: string, value: string) => void;
  getUniqueId: (prefix: string, value: string) => string;
};

const WorkFinanceStep = ({
  formData,
  handleSingleSelectChange,
  getUniqueId,
}: WorkFinanceStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Situación Laboral y Financiera</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Estado Laboral</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(EmploymentStatus).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('employment', status)}
                  value={status}
                  checked={formData.employmentStatus === status}
                  onChange={() => handleSingleSelectChange('employmentStatus', status)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('employment', status)}>
                  {status === 'employed' ? 'Empleado' :
                    status === 'self_employed' ? 'Autónomo' :
                    status === 'unemployed' ? 'Desempleado' : 'Estudiante'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nivel de Ingresos</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(IncomeLevel).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('income', level)}
                  value={level}
                  checked={formData.income === level}
                  onChange={() => handleSingleSelectChange('income', level)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('income', level)}>
                  {level === 'none' ? 'Sin ingresos' :
                    level === 'low' ? 'Bajo' :
                    level === 'medium' ? 'Medio' :
                    level === 'high' ? 'Alto' : 'Muy alto'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nivel de Ahorros</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(SavingsLevel).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('savings', level)}
                  value={level}
                  checked={formData.savings === level}
                  onChange={() => handleSingleSelectChange('savings', level)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('savings', level)}>
                  {level === 'none' ? 'Sin ahorros' :
                    level === 'low' ? 'Pocos ahorros' :
                    level === 'medium' ? 'Ahorros moderados' : 'Muchos ahorros'}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFinanceStep;
