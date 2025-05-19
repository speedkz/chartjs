import React from 'react';
import HQDivisionChart from '../components/HQDivisionChart';

const HQDivisionChartTest: React.FC = () => {
  return (
    <div className="p-4 bg-[#101010] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">HQDivisionChart Test</h1>
      
      {/* Test with default width */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Default Layout</h2>
        <HQDivisionChart title="HQ Division Chart - Default" />
      </div>
      
      {/* Test with constrained width */}
      <div className="mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-2">Constrained Width (400px)</h2>
        <HQDivisionChart title="HQ Division Chart - Narrow" />
      </div>
      
      {/* Test with custom height */}
      <div className="mb-8" style={{ height: '400px' }}>
        <h2 className="text-xl font-semibold mb-2">Custom Height (400px)</h2>
        <div className="h-full">
          <HQDivisionChart title="HQ Division Chart - Tall" />
        </div>
      </div>
    </div>
  );
};

export default HQDivisionChartTest;
