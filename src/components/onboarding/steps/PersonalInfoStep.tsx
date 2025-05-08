
import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FamilyStatus, RelationshipStatus } from '@/types/user';

type PersonalInfoStepProps = {
  control: any;
  errors: any;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSingleSelectChange: (name: string, value: string) => void;
  getUniqueId: (prefix: string, value: string) => string;
};

const PersonalInfoStep = ({
  control,
  errors,
  formData,
  handleInputChange,
  handleNumberChange,
  handleSingleSelectChange,
  getUniqueId,
}: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información Personal</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
            Nombre
          </Label>
          <Controller
            name="name"
            control={control}
            rules={{ 
              required: "El nombre es obligatorio", 
              minLength: { value: 2, message: "Nombre demasiado corto" }
            }}
            render={({ field }) => (
              <Input 
                id="name" 
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                  errors.name ? "border-destructive" : ""
                }`}
                aria-invalid={errors.name ? "true" : "false"}
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-destructive" role="alert">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className={errors.age ? "text-destructive" : ""}>
            Edad
          </Label>
          <Controller
            name="age"
            control={control}
            rules={{ 
              required: "La edad es obligatoria", 
              min: { value: 18, message: "Debes ser mayor de edad" },
              max: { value: 100, message: "Edad no válida" }
            }}
            render={({ field }) => (
              <Input 
                id="age" 
                type="number" 
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleNumberChange(e);
                }}
                className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                  errors.age ? "border-destructive" : ""
                }`}
                aria-invalid={errors.age ? "true" : "false"}
              />
            )}
          />
          {errors.age && (
            <p className="text-sm text-destructive" role="alert">
              {errors.age.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Con quién vives</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(FamilyStatus).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('family', status)}
                  value={status}
                  checked={formData.familyStatus === status}
                  onChange={() => handleSingleSelectChange('familyStatus', status)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('family', status)}>
                  {status === 'lives_alone' ? 'Vivo solo' :
                    status === 'with_parents' ? 'Con mis padres' :
                    status === 'with_partner' ? 'Con mi pareja' :
                    status === 'with_family' ? 'Con mi familia (pareja e hijos)' : 
                    'Con compañeros de piso'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Estado de Relación</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(RelationshipStatus).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('relationship', status)}
                  value={status}
                  checked={formData.relationshipStatus === status}
                  onChange={() => handleSingleSelectChange('relationshipStatus', status)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('relationship', status)}>
                  {status === 'single' ? 'Soltero' :
                    status === 'in_relationship' ? 'En una relación' :
                    status === 'married' ? 'Casado' :
                    status === 'divorced' ? 'Divorciado' : 'Viudo'}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
