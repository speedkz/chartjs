import type { ChartData, ChartOptions, Scale, TooltipItem } from "chart.js";
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
import type { Project } from "../api/projectApi";
import { fetchProjectSizes } from "../api/projectApi";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectSizeProps {
  title?: string;
}

// Define Chart.js type for bar chart
type BarChartData = ChartData<"bar", number[], string>;

const ProjectSizeChart: React.FC<ProjectSizeProps> = ({
  title = "Project size",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [chartData, setChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });
  console.log(chartData);
  // Create chart data from projects
  const createChartData = useCallback(
    (projectData: Project[]): BarChartData => ({
      // Ensure we're using project names as labels (for Y-axis)
      labels: projectData.map((project) => project.name),
      datasets: [
        {          label: "Size",
          data: projectData.map((project) => project.size),
          backgroundColor: "#008CFF", // Blue color from Figma design
          barThickness: 16, // Exactly 16px as per requirement
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    }),
    []
  );

  // Fetch project data on component mount
  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectSizes();
        setProjects(data);
        setChartData(createChartData(data));
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [createChartData]);

  // Update chart data on window resize - use a throttled resize handler
  useEffect(() => {
    let resizeTimer: number | null = null;

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        setChartData(createChartData(projects));
      }, 250); // Add 250ms delay to prevent multiple rerenders
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [createChartData, projects]);
  // Chart options with proper typing
  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      indexAxis: "y" as const, // Ensure horizontal bar chart with projects on Y-axis
      maintainAspectRatio: false,
      responsive: true,
      animation: {
        duration: 500, // Reduce animation duration to reduce flickering
      },      layout: {
        padding: {
          left: 20, // Increased left padding to prevent text cutting at the beginning
          right: 10,
          top: 5,
          bottom: 5
        }
      },
      scales: {
        y: {
          grid: {
            display: false,
            drawOnChartArea: false,
          },
          border: {
            display: false,
          },
          position: 'left',
          ticks: {
            font: {
              family: "Pretendard, sans-serif",
              size: 13,
            },
            color: "#FFFFFF",
            padding: 10, // Increased padding to avoid text cutting
            // Improved truncation for project names with proper typing
            callback: function (this: Scale, tickValue: string | number) {
              const ctx = this.chart.ctx;
              const value = chartData.labels?.[+tickValue]
                ? chartData.labels[+tickValue]
                : String(tickValue);
                // Maximum width for project names
              const maxWidth = 100; // Reduced to ensure no cutting with ellipsis
              
              // Configure font for measurement
              ctx.font = "13px Pretendard, sans-serif";

              // Measure text width
              const textWidth = ctx.measureText(value).width;

              // If text exceeds max width, truncate from the end with ellipsis
              if (textWidth > maxWidth) {
                let truncatedText = value;
                while (
                  truncatedText.length > 0 &&
                  ctx.measureText(truncatedText + "...").width > maxWidth
                ) {
                  truncatedText = truncatedText.substring(
                    0,
                    truncatedText.length - 1
                  );
                }
                return truncatedText + "...";
              }

              return value;
            },
          },
          afterFit: function (scale: Scale) {
            // Set width to exactly 120px for the y-axis as required
            scale.width = 120; // Fixed width for the y-axis to 120px
          },
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
            color: "#70707C",
            stepSize: 10,
            callback: function (this: Scale, tickValue: string | number) {
              return typeof tickValue === "string"
                ? parseInt(tickValue, 10)
                : tickValue;
            },
          },
          max: 60,
        },
      },
      plugins: {
        legend: {
          display: false,
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
            // Improved tooltip to show the full project name
            title: function (items: TooltipItem<"bar">[]) {
              if (items.length > 0) {
                const index = items[0].dataIndex;
                return projects[index]?.name || "";
              }
              return "";
            },
            label: function (context: TooltipItem<"bar">) {
              const value =
                context.parsed.x !== undefined
                  ? context.parsed.x
                  : context.parsed.y;
              return `Size: ${value}`;
            },
          },
        },
      },
    }),
    [projects, chartData.labels]
  );

  if (loading) {
    return (
      <div className="bg-[#212124] rounded-lg p-4 md:p-6 flex items-center justify-center">
        <div className="text-white">Loading project data...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#212124] rounded-lg p-4 md:p-6">
      {/* Title */}
      <h2 className="text-white text-lg font-medium mb-4 text-center">
        {title}
      </h2>

      {/* Chart Container */}
      <div
        className="w-full"
        style={{ height: `${projects.length * 40}px`, minHeight: "200px" }}
      >
        <Bar data={chartData} options={options} redraw={false} />
      </div>
    </div>
  );
};

export default ProjectSizeChart;
