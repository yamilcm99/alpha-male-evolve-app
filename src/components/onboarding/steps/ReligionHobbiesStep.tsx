
import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type ReligionHobbiesStepProps = {
  control: any;
  errors: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const ReligionHobbiesStep = ({
  control,
  errors,
  setFormData,
}: ReligionHobbiesStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Religión y Hobbies</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="religion" className={errors.religion ? "text-destructive" : ""}>
            Religión o Creencias Espirituales
          </Label>
          <Controller
            name="religion"
            control={control}
            rules={{ 
              required: "Este campo es obligatorio"
            }}
            render={({ field }) => (
              <Input 
                id="religion" 
                placeholder="Cristiano, Ateo, Agnóstico, etc." 
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  setFormData(prev => ({ ...prev, religion: e.target.value }));
                }}
                className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                  errors.religion ? "border-destructive" : ""
                }`}
                aria-invalid={errors.religion ? "true" : "false"}
              />
            )}
          />
          {errors.religion && (
            <p className="text-sm text-destructive" role="alert">
              {errors.religion.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hobbies" className={errors.hobbies ? "text-destructive" : ""}>
            Hobbies (separados por coma)
          </Label>
          <Controller
            name="hobbies"
            control={control}
            rules={{ 
              required: "Debes indicar al menos un hobby",
              validate: (value) => {
                const hobbies = value.split(',').map(hobby => hobby.trim()).filter(Boolean);
                return hobbies.length > 0 || "Debes indicar al menos un hobby";
              }
            }}
            render={({ field }) => (
              <Input 
                id="hobbies" 
                placeholder="Gym, leer, viajar, etc." 
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  const hobbies = e.target.value.split(',').map(hobby => hobby.trim()).filter(Boolean);
                  setFormData(prev => ({ ...prev, hobbies }));
                }}
                className={`bg-evolve-dark/60 border-evolve-gray/30 text-white ${
                  errors.hobbies ? "border-destructive" : ""
                }`}
                aria-invalid={errors.hobbies ? "true" : "false"}
              />
            )}
          />
          {errors.hobbies && (
            <p className="text-sm text-destructive" role="alert">
              {errors.hobbies.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReligionHobbiesStep;
