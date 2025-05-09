
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold font-display mb-1">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default DashboardHeader;
