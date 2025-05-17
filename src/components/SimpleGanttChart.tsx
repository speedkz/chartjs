/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
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
import "./Gantt.css";

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
  const chartRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);

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
      },
      {
        label: "Proposal",
        data: [6, 4, 3, 3, 0],
        backgroundColor: colors.proposal,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
      },
      {
        label: "Approved",
        data: [3, 5, 4, 1, 3],
        backgroundColor: colors.approved,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
      },
      {
        label: "Developing",
        data: [4, 2, 5, 3, 0],
        backgroundColor: colors.developing,
        barThickness: 10,
        borderWidth: 0,
        borderRadius: 2,
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
  
  // Synchronize scrolling between the fixed column and the chart/months header
  useEffect(() => {
    const projectsElement = projectsRef.current;
    const chartElement = chartRef.current;
    const monthsElement = monthsRef.current;

    if (!projectsElement || !chartElement || !monthsElement) return;

    // Handle vertical scrolling to sync projects column with chart
    const handleChartVerticalScroll = () => {
      if (chartElement) {
        projectsElement.scrollTop = chartElement.scrollTop;
      }
    };

    // Handle horizontal scrolling to sync months header with chart content
    const handleChartHorizontalScroll = () => {
      if (chartElement && monthsElement) {
        monthsElement.scrollLeft = chartElement.scrollLeft;
      }
    };

    chartElement.addEventListener("scroll", handleChartVerticalScroll);
    chartElement.addEventListener("scroll", handleChartHorizontalScroll);
    
    // Also sync when the months header is scrolled
    const handleMonthsScroll = () => {
      if (monthsElement && chartElement) {
        chartElement.scrollLeft = monthsElement.scrollLeft;
      }
    };
    
    monthsElement.addEventListener("scroll", handleMonthsScroll);
    
    return () => {
      chartElement.removeEventListener("scroll", handleChartVerticalScroll);
      chartElement.removeEventListener("scroll", handleChartHorizontalScroll);
      monthsElement.removeEventListener("scroll", handleMonthsScroll);
    };
  }, []);

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
  };
  
  return (
    <div className="bg-[#212124] rounded-lg overflow-hidden p-4">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4">
        {title}
      </h2>

      {/* Chart container with fixed column and scrollable content */}
      <div className="relative">
        {/* Fixed Projects column header - increased z-index to ensure it stays on top */}
        <div
          className="absolute top-0 left-0 z-30 w-[240px] bg-[#373743] text-white font-semibold p-3 flex items-center justify-start rounded-tl-md"
          style={{ height: "50px" }}
        >
          Projects
        </div>

        {/* Months header with synchronized scrolling */}
        <div
          ref={monthsRef}
          className="overflow-x-auto custom-scrollbar months-header"
          style={{ marginLeft: "240px", position: "relative" }}
        >
          <div
            className="flex bg-[#373743]"
            style={{ minWidth: "1020px", height: "50px" }}
          >
            {months.map((month, index) => (
              <div
                key={`month-${index}`}
                className="text-white p-3 flex items-center justify-center"
                style={{ width: `${100 / 12}%`, height: "50px" }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Main chart area */}
        <div className="flex" style={{ marginTop: "50px" }}>
          {/* Fixed projects column - increased z-index and width to fit longer project names */}
          <div
            ref={projectsRef}
            className="border-r border-r-[#373743] absolute left-0 z-20 w-[240px] bg-[#212124] overflow-y-auto shadow-lg"
            style={{ height: "300px" }}
          >
            {projects.map((project, index) => (
              <div
                key={`project-${index}`}
                className="flex items-center p-3 border-b border-[#373743]"
                style={{ height: "50px" }}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
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

          {/* Scrollable chart area - will be synchronized with months header */}
          <div
            ref={chartRef}
            className="overflow-x-auto custom-scrollbar chart-content"
            style={{ marginLeft: "240px", width: "calc(100% - 240px)" }}
          >
            <div style={{ minWidth: "1020px", height: "300px" }}>
              <Bar options={options} data={chartData} />
            </div>
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
