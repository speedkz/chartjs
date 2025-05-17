import { useState } from 'react';
import { Dashboard } from '../components/Dashboard';
import ProjectDashboardExample from './ProjectDashboardExample';

type TabType = 'basic-charts' | 'project-dashboard';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('basic-charts');

  return (
    <div className="home-page">
      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'basic-charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic-charts')}
        >
          Basic Chart Examples
        </button>
        <button 
          className={`tab-button ${activeTab === 'project-dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('project-dashboard')}
        >
          Project Dashboard
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'basic-charts' ? (
          <Dashboard />
        ) : (
          <ProjectDashboardExample />
        )}
      </div>
    </div>
  );
}
