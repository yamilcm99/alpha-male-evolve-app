
import React from 'react';
import { FamilyStatus, RelationshipStatus, LifeStage, CommunicationSkills, CommunicationLevel } from '@/types/user';

type ProfileSummaryStepProps = {
  formData: any;
};

const ProfileSummaryStep = ({ formData }: ProfileSummaryStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Resumen del Perfil</h3>

      <div className="mt-8 p-4 bg-evolve-dark/60 rounded-lg border border-evolve-purple/20">
        <h4 className="font-semibold text-lg mb-2">Resumen del Perfil</h4>
        <p>Nombre: {formData.name}</p>
        <p>Edad: {formData.age}</p>
        <p>Con quién vives: {
          formData.familyStatus === FamilyStatus.LIVES_ALONE ? 'Solo' :
          formData.familyStatus === FamilyStatus.WITH_PARENTS ? 'Con padres' :
          formData.familyStatus === FamilyStatus.WITH_PARTNER ? 'Con pareja' :
          formData.familyStatus === FamilyStatus.WITH_FAMILY ? 'Con familia' : 'Con compañeros'
        }</p>
        <p>Estado de Relación: {
          formData.relationshipStatus === RelationshipStatus.SINGLE ? 'Soltero' :
          formData.relationshipStatus === RelationshipStatus.IN_RELATIONSHIP ? 'En una relación' :
          formData.relationshipStatus === RelationshipStatus.MARRIED ? 'Casado' :
          formData.relationshipStatus === RelationshipStatus.DIVORCED ? 'Divorciado' : 'Viudo'
        }</p>
        <p>Etapa vital: {
          formData.lifeStage === LifeStage.ASCENT ? 'En ascenso' :
          formData.lifeStage === LifeStage.DESCENT ? 'En bajada' :
          formData.lifeStage === LifeStage.PLATEAU ? 'En meseta' :
          formData.lifeStage === LifeStage.UNSTABLE ? 'Inestable' : 'Crítica'
        }</p>
        <p>Habilidades de Comunicación: {
          formData.communicationSkills === CommunicationSkills.BEGINNER ? 'Principiante' :
          formData.communicationSkills === CommunicationSkills.INTERMEDIATE ? 'Intermedio' :
          formData.communicationSkills === CommunicationSkills.ADVANCED ? 'Avanzado' : 'Experto'
        }</p>
        <p>Comunicación con mujeres: {
          formData.femaleCommunication === CommunicationLevel.VERY_BAD ? 'Muy mala' :
          formData.femaleCommunication === CommunicationLevel.BAD ? 'Mala' :
          formData.femaleCommunication === CommunicationLevel.AVERAGE ? 'Normal' :
          formData.femaleCommunication === CommunicationLevel.GOOD ? 'Buena' : 'Excelente'
        }</p>
      </div>
    </div>
  );
};

export default ProfileSummaryStep;
