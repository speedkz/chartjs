import MonthlyProjectByLevel from "./MonthlyProjectByLevel";
import SimpleGanttChart from "../components/SimpleGanttChart";

// Component example to display how to use MonthlyProjectByLevel
const ProjectDashboardExample: React.FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Project Analysis Dashboard
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr",
          maxWidth: "100%",
        }}
      >
        {/* Gantt chart will take full width on all screen sizes */}
        <SimpleGanttChart title="VNB Projects Timeline" />

        {/* Monthly Projects charts */}
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <div style={{ width: "100%" }}>
            <MonthlyProjectByLevel
              title="Monthly Project by level"
              category="Construction"
            />
          </div>

          <div style={{ width: "100%" }}>
            <MonthlyProjectByLevel
              title="Monthly Project by level"
              category="Transportation"
            />
          </div>

          <div style={{ width: "100%" }}>
            <MonthlyProjectByLevel
              title="Monthly Project by level"
              category="Telecommunication"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardExample;
