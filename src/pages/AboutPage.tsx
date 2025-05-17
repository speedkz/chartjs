export function AboutPage() {
  return (
    <div className="about-page">
      <h2>About This Project</h2>
      <div className="about-content">
        <section>
          <h3>React Chart.js Demo</h3>
          <p>
            This application demonstrates how to use Chart.js with React and TypeScript to create
            beautiful, interactive charts for data visualization.
          </p>
        </section>
        
        <section>
          <h3>Features</h3>
          <ul>
            <li>Interactive charts with Chart.js</li>
            <li>React components for different chart types</li>
            <li>TypeScript for type safety</li>
            <li>Project dashboard with various chart examples</li>
            <li>Responsive design that works on mobile and desktop</li>
          </ul>
        </section>
        
        <section>
          <h3>Technologies Used</h3>
          <ul>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Chart.js</li>
            <li>React-Chartjs-2</li>
            <li>Vite</li>
          </ul>
        </section>
        
        <section>
          <h3>Chart Types</h3>
          <p>
            This demo showcases several chart types including:
          </p>
          <ul>
            <li>Bar charts</li>
            <li>Line charts</li>
            <li>Pie charts</li>
            <li>Gantt charts (custom implementation)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
