import React from 'react';
import ProjectSizeChart from '../components/ProjectSizeChart';

const ProjectSizeChartTest: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ProjectSizeChart Test</h1>
      
      {/* Test with default width */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Default Width</h2>
        <ProjectSizeChart title="Project Size Chart - Default Width" />
      </div>
      
      {/* Test with constrained width */}
      <div className="mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-2">Constrained Width (400px)</h2>
        <ProjectSizeChart title="Project Size Chart - Narrow" />
      </div>
      
      {/* Test with more projects */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">With Additional Test Data</h2>
        <ProjectSizeChart title="Project Size Chart - More Data" />
      </div>
    </div>
  );
};

export default ProjectSizeChartTest;
