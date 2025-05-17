import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

export function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Chart.js Demo with React</h2>
      
      <div className="chart-container">
        <h3>Bar Chart</h3>
        <BarChart />
      </div>
      
      <div className="chart-container">
        <h3>Line Chart</h3>
        <LineChart />
      </div>
      
      <div className="chart-container">
        <h3>Pie Chart</h3>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
