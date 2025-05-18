import type { ChartData, ChartOptions, TooltipItem } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  type ProjectTimelineData,
  fetchProjectTimelines,
} from "../api/ganttChartApi";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SimpleGanttChartProps {
  title?: string;
}

// Define Chart.js type for bar chart
type BarChartData = ChartData<"bar", number[], string>;

const SimpleGanttChart: React.FC<SimpleGanttChartProps> = ({
  title = "Project Timeline",
}) => {  const [loading, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<ProjectTimelineData[]>([]);
  const [chartData, setChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });

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

  // Status indicator color function
  const getStatusColor = (status: string): string => {
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
  const colors = useMemo(() => ({
    requirementDiscussion: "#8252FF", // Purple
    proposal: "#1A31FF", // Blue
    approved: "#008CFF", // Light blue
    developing: "#1DE9B6", // Green
  }), []);

  // Create dataset object for chart
  const createChartData = useCallback(
    (data: ProjectTimelineData[]): BarChartData => {
      if (!data.length) return { labels: [], datasets: [] };

      const labels = data.map((item) => item.project.name);

      return {
        labels,
        datasets: [
          {
            label: "Requirement Discussion",
            data: data.map((item) => item.phases.requirementDiscussion),
            backgroundColor: colors.requirementDiscussion,
            barThickness: 10,
            borderWidth: 0,
            borderRadius: 2,
            stack: "Stack 0", // Add stack for stacking bars
          },
          {
            label: "Proposal",
            data: data.map((item) => item.phases.proposal),
            backgroundColor: colors.proposal,
            barThickness: 10,
            borderWidth: 0,
            borderRadius: 2,
            stack: "Stack 0", // Add stack for stacking bars
          },
          {
            label: "Approved",
            data: data.map((item) => item.phases.approved),
            backgroundColor: colors.approved,
            barThickness: 10,
            borderWidth: 0,
            borderRadius: 2,
            stack: "Stack 0", // Add stack for stacking bars
          },
          {
            label: "Developing",
            data: data.map((item) => item.phases.developing),
            backgroundColor: colors.developing,
            barThickness: 10,
            borderWidth: 0,
            borderRadius: 2,
            stack: "Stack 0", // Add stack for stacking bars
          },
        ],
      };
    },
    [colors]
  );

  // Fetch project data on component mount
  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectTimelines();
        setProjectData(data);
        setChartData(createChartData(data));
      } catch (error) {
        console.error("Failed to fetch project timeline data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [createChartData]);

  // Update chart data on window resize
  useEffect(() => {
    let resizeTimer: number | null = null;

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        setChartData(createChartData(projectData));
      }, 250); // Add 250ms delay to prevent multiple rerenders
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [createChartData, projectData]);
  // Chart options with proper typing
  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      indexAxis: "y" as const,
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderWidth: 0,
        },
      },
      responsive: true,
      animation: {
        duration: 500, // Reduce animation duration
      },
      scales: {
        y: {
          display: false, // Hide Y-axis labels since we'll show them in our custom fixed column
          grid: {
            display: true,
            color: "#585869",
            lineWidth: 1,
          },
          stacked: true, // Enable stacking on Y axis
        },
        x: {
          grid: {
            display: true,
            color: "#585869",
            lineWidth: 1,
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
            weight: "bold" as const,
          },
          bodyFont: {
            family: "Pretendard, sans-serif",
            size: 12,
          },
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            title: function (items: TooltipItem<"bar">[]) {
              if (items.length > 0) {
                const index = items[0].dataIndex;
                return projectData[index]?.project.name || "";
              }
              return "";
            },
            label: function (context: TooltipItem<"bar">) {
              const value = context.parsed.x || 0;
              const datasetLabel = context.dataset.label || "";
              return `${datasetLabel}: ${value}`;
            },
          },
        },
      },
    }),
    [projectData]
  );

  if (loading) {
    return (
      <div className="bg-[#212124] rounded-lg p-4 md:p-6 flex items-center justify-center">
        <div className="text-white">Loading project data...</div>
      </div>
    );
  }

  return (
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
          {projectData.map((item) => (
            <div
              key={`project-${item.project.id}`}
              className="flex items-center p-3 border-b border-[#373743]"
              style={{ height: "50px" }}
            >
              <div
                className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: getStatusColor(item.project.status) }}
              ></div>
              <span
                className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                style={{
                  color: getStatusColor(item.project.status),
                  maxWidth: "200px",
                }}
                title={item.project.name}
              >
                {item.project.name}
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
          </div>          {/* Chart area - in the same scroll container as months header */}
          <div
            style={{
              minWidth: "1020px",
              height: `${projectData.length * 50}px`,
              paddingTop: "4px",
            }}
          >
            <Bar options={options} data={chartData} redraw={false} />
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
