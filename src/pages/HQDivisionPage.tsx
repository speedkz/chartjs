import React from 'react';
import HQDivisionChart from '../components/HQDivisionChart';

const HQDivisionPage: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-[#101010]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">HQ Division Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* HQ Division Chart */}
          <div className="w-full">
            <HQDivisionChart title="HQ Division by Level" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HQDivisionPage;