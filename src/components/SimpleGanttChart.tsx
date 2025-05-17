/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectStatus {
  name: string;
  status: "normal" | "warning" | "critical";
}

interface SimpleGanttChartProps {
  title?: string;
}

const SimpleGanttChart: React.FC<SimpleGanttChartProps> = ({
  title = "Project Timeline",
}) => {
  // Sample projects with status
  const projects: ProjectStatus[] = [
    { name: "AI Innovation Hub", status: "normal" },
    { name: "Cloud Optimization Project", status: "normal" },
    { name: "Cybersecurity Enhancement Program", status: "warning" },
    { name: "Data Analytics Initiative", status: "normal" },
    { name: "Blockchain Integration Task", status: "critical" },
  ];

  // Monthly headers
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create labels from project names
  const labels = projects.map((project) => project.name);

  // Status indicator color function
  const getStatusColor = (status: string) => {
    switch (status) {
      case "warning":
        return "#F8D905"; // Yellow
      case "critical":
        return "#F62F82"; // Pink
      default:
        return "#1DE9B6"; // Green
    }
  };

  // Dataset colors from Figma
  const colors = {
    requirementDiscussion: "#8252FF", // Purple
    proposal: "#1A31FF", // Blue
    approved: "#008CFF", // Light blue
    developing: "#1DE9B6", // Green
  };
  // Create dataset object for chart
  const createChartData = () => ({
    labels,
    datasets: [
      {
        label: "Requirement Discussion",
        data: [2, 3, 0, 4, 5],
        backgroundColor: colors.requirementDiscussion,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
        stack: "Stack 0", // Add stack for stacking bars
      },
      {
        label: "Proposal",
        data: [6, 4, 3, 3, 0],
        backgroundColor: colors.proposal,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
        stack: "Stack 0", // Add stack for stacking bars
      },
      {
        label: "Approved",
        data: [3, 5, 4, 1, 3],
        backgroundColor: colors.approved,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
        stack: "Stack 0", // Add stack for stacking bars
      },
      {
        label: "Developing",
        data: [4, 2, 5, 3, 0],
        backgroundColor: colors.developing,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
        stack: "Stack 0", // Add stack for stacking bars
      },
    ],
  });

  const [chartData, setChartData] = useState(createChartData());
  // Update chart data on window resize
  useEffect(() => {
    const handleResize = () => {
      setChartData(createChartData());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [createChartData]);
  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    scales: {
      y: {
        display: false, // Hide Y-axis labels since we'll show them in our custom fixed column
        grid: {
          display: true,
          color: "#585869",
          lineWidth: 1,
          borderDash: [2, 2],
        },
        stacked: true, // Enable stacking on Y axis
      },
      x: {
        grid: {
          display: true,
          color: "#585869",
          lineWidth: 1,
          borderDash: [2, 2],
        },
        ticks: {
          font: {
            family: "Pretendard, sans-serif",
            size: 14,
          },
          color: "#FFFFFF",
        },
        stacked: true, // Enable stacking on X axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend since we're creating a custom one
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#373743",
        titleFont: {
          family: "Pretendard, sans-serif",
          size: 14,
          weight: "bold" as const, // TypeScript fix
        },
        bodyFont: {
          family: "Pretendard, sans-serif",
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
  };  return (
    <div className="bg-[#212124] rounded-lg overflow-hidden p-4">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4">
        {title}
      </h2>

      {/* Grid-based Gantt chart layout */}
      <div className="grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] w-full overflow-hidden bg-[#212124]">
        {/* Project header - fixed */}
        <div className="col-start-1 row-start-1 bg-[#373743] p-3 font-semibold text-white flex items-center z-10 rounded-tl-md h-[50px]">
          Projects
        </div>

        {/* Projects column - fixed */}
        <div className="col-start-1 row-start-2 bg-[#212124] border-r border-[#373743] z-10 shadow-md">
          {projects.map((project, index) => (
            <div
              key={`project-${index}`}
              className="flex items-center p-3 border-b border-[#373743]"
              style={{ height: "50px" }}
            >
              <div
                className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: getStatusColor(project.status) }}
              ></div>
              <span
                className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                style={{
                  color: getStatusColor(project.status),
                  maxWidth: "200px",
                }}
                title={project.name}
              >
                {project.name}
              </span>
            </div>
          ))}
        </div>

        {/* Chart scroll container - contains both months header and chart */}
        <div className="col-start-2 row-span-2 overflow-x-auto z-[1] bg-[#212124] scrollbar-thin scrollbar-track-[#2d2d30] scrollbar-thumb-[#555]">
          {/* Months header - in the same scroll container as chart */}
          <div className="bg-[#373743] h-[50px] sticky top-0 z-[1] w-full">
            <div className="flex min-w-[1020px] w-full bg-[#373743] border-b border-[#444]">
              {months.map((month, index) => (
                <div
                  key={`month-${index}`}
                  className="text-white p-3 flex items-center justify-center flex-1 text-center border-r border-[rgba(88,88,105,0.3)]"
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
          {/* Chart area - in the same scroll container as months header */}
          <div
            style={{
              minWidth: "1020px",
              height: `${projects.length * 50}px`,
              paddingTop: "4px",
            }}
          >
            <Bar options={options} data={chartData} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.requirementDiscussion }}
          ></div>
          <span className="text-white text-xs">Requirement Discussion</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.proposal }}
          ></div>
          <span className="text-white text-xs">Proposal</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.approved }}
          ></div>
          <span className="text-white text-xs">Approved</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.developing }}
          ></div>
          <span className="text-white text-xs">Developing</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleGanttChart;
