import HQDivisionChart from "../components/HQDivisionChart";
import ProjectSizeChart from "../components/ProjectSizeChart";
import SimpleGanttChart from "../components/SimpleGanttChart";
import MonthlyProjectByLevel from "./MonthlyProjectByLevel";

// Component example to display how to use MonthlyProjectByLevel
const ProjectDashboardExample: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Project Analysis Dashboard</h2>
      <div className="grid gap-4 grid-cols-1 w-full">
        {/* Gantt chart will take full width on all screen sizes */}
        <SimpleGanttChart title="VNB Projects Timeline" />

        {/* Project Size and Monthly Projects charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Project Size Chart */}
          <div className="w-full">
            <ProjectSizeChart />
          </div>

          <div className="w-full">
            <MonthlyProjectByLevel
              title="Monthly Project by level"
              category="Construction"
            />
          </div>

          <div className="w-full">
            <HQDivisionChart title="HQ Division" />
          </div>

          <div className="w-full md:col-span-2 lg:col-span-3">
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
