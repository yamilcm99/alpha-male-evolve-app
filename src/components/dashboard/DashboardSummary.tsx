
import React from 'react';
import UserSummary from '@/components/dashboard/UserSummary';
import ProgressStats from '@/components/dashboard/ProgressStats';
import AlphaLevels from '@/components/dashboard/AlphaLevels';

const DashboardSummary = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-4">
          <UserSummary />
        </div>
        <div className="md:col-span-8">
          <ProgressStats />
        </div>
      </div>
      
      <div className="mb-8">
        <AlphaLevels />
      </div>
    </>
  );
};

export default DashboardSummary;
