
import React from 'react';
import { Label } from '@/components/ui/label';
import { CommunicationSkills, PublicSpeakingLevel, FriendsCount, CommunicationLevel } from '@/types/user';

type CommunicationSkillsStepProps = {
  formData: any;
  handleSingleSelectChange: (name: string, value: string) => void;
  getUniqueId: (prefix: string, value: string) => string;
};

const CommunicationSkillsStep = ({
  formData,
  handleSingleSelectChange,
  getUniqueId,
}: CommunicationSkillsStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Habilidades de Comunicación</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nivel general de comunicación</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(CommunicationSkills).map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('communication', skill)}
                  value={skill}
                  checked={formData.communicationSkills === skill}
                  onChange={() => handleSingleSelectChange('communicationSkills', skill)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('communication', skill)}>
                  {skill === 'beginner' ? 'Principiante' :
                    skill === 'intermediate' ? 'Intermedio' :
                    skill === 'advanced' ? 'Avanzado' : 'Experto'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>¿Cómo te sientes hablando en público?</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(PublicSpeakingLevel).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('publicSpeaking', level)}
                  value={level}
                  checked={formData.publicSpeaking === level}
                  onChange={() => handleSingleSelectChange('publicSpeaking', level)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('publicSpeaking', level)}>
                  {level === 'fearful' ? 'Me da miedo, lo evito a toda costa' :
                    level === 'uncomfortable' ? 'Me siento incómodo pero puedo hacerlo' :
                    level === 'neutral' ? 'No me afecta especialmente' :
                    level === 'comfortable' ? 'Me siento cómodo' : 'Me encanta, disfruto haciéndolo'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>¿Cuántos amigos cercanos tienes?</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(FriendsCount).map((count) => (
              <div key={count} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('friendsCount', count)}
                  value={count}
                  checked={formData.friendsCount === count}
                  onChange={() => handleSingleSelectChange('friendsCount', count)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('friendsCount', count)}>
                  {count === 'none' ? 'Ninguno' :
                    count === 'few' ? '1-2 amigos cercanos' :
                    count === 'average' ? '3-5 amigos cercanos' :
                    count === 'many' ? '6-10 amigos cercanos' : 'Más de 10 amigos cercanos'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>¿Cómo es tu comunicación con mujeres?</Label>
          <div className="flex flex-col space-y-2">
            {Object.values(CommunicationLevel).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={getUniqueId('femaleCommunication', level)}
                  value={level}
                  checked={formData.femaleCommunication === level}
                  onChange={() => handleSingleSelectChange('femaleCommunication', level)}
                  className="text-evolve-purple focus:ring-evolve-purple"
                />
                <Label htmlFor={getUniqueId('femaleCommunication', level)}>
                  {level === 'very_bad' ? 'Muy mala, me bloqueo o evito hablarles' :
                    level === 'bad' ? 'Mala, me cuesta iniciar y mantener conversaciones' :
                    level === 'average' ? 'Normal, puedo mantener conversaciones casuales' :
                    level === 'good' ? 'Buena, me siento cómodo conversando con ellas' : 'Excelente, tengo gran facilidad para conectar con ellas'}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSkillsStep;
