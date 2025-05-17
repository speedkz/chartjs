import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Props cho component
interface ProjectGanttChartProps {
  title?: string;
}

const ProjectGanttChart: React.FC<ProjectGanttChartProps> = ({
  title = "Project Timeline",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const projectsColumnRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000); // Start with a default width

  // Dữ liệu mẫu từ thiết kế Figma
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

  // Dữ liệu dự án
  const projects = [
    {
      name: "AI Innovation Hub",
      status: "normal", // normal, warning, critical
      phases: [
        { type: "requirement", start: 0, duration: 1 }, // Jan
        { type: "proposal", start: 1, duration: 3 }, // Feb-Apr
        { type: "approved", start: 3, duration: 2 }, // Apr-May
        { type: "developing", start: 4, duration: 6 }, // May-Oct
      ],
    },
    {
      name: "Cloud Optimization Project",
      status: "normal",
      phases: [
        { type: "requirement", start: 1, duration: 2 }, // Feb-Mar
        { type: "proposal", start: 3, duration: 3 }, // Apr-Jun
        { type: "approved", start: 5, duration: 3 }, // Jun-Aug
        { type: "developing", start: 7, duration: 3 }, // Aug-Oct
      ],
    },
    {
      name: "Cybersecurity Enhancement Program",
      status: "warning",
      phases: [
        { type: "requirement", start: 2, duration: 2 }, // Mar-Apr
        { type: "proposal", start: 4, duration: 2 }, // May-Jun
        { type: "approved", start: 6, duration: 3 }, // Jul-Sep
        { type: "developing", start: 8, duration: 4 }, // Sep-Dec
      ],
    },
    {
      name: "Data Analytics Initiative",
      status: "normal",
      phases: [
        { type: "requirement", start: 0, duration: 2 }, // Jan-Feb
        { type: "proposal", start: 2, duration: 2 }, // Mar-Apr
        { type: "approved", start: 4, duration: 4 }, // May-Aug
        { type: "developing", start: 7, duration: 3 }, // Aug-Oct
      ],
    },
    {
      name: "Blockchain Integration Task",
      status: "critical",
      phases: [
        { type: "requirement", start: 1, duration: 3 }, // Feb-Apr
        { type: "proposal", start: 3, duration: 1 }, // Apr
        { type: "approved", start: 5, duration: 1 }, // Jun
        { type: "developing", start: 6, duration: 2 }, // Jul-Aug
      ],
    },
  ];

  // Màu sắc
  const phaseColors = {
    requirement: "#8252FF", // Tím
    proposal: "#1A31FF", // Xanh dương
    approved: "#008CFF", // Xanh biển
    developing: "#1DE9B6", // Xanh lá
  };

  const statusColors = {
    normal: "#1DE9B6", // Xanh lá
    warning: "#F8D905", // Vàng
    critical: "#F62F82", // Hồng
  };

  // Handle scroll sync between the fixed column and the chart
  useEffect(() => {
    const handleChartScroll = () => {
      if (projectsColumnRef.current && chartContainerRef.current) {
        projectsColumnRef.current.scrollTop =
          chartContainerRef.current.scrollTop;
      }
    };

    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.addEventListener("scroll", handleChartScroll);
      return () => {
        chartContainer.removeEventListener("scroll", handleChartScroll);
      };
    }

    return;
  }, []);
  // Create Gantt chart using Chart.js
  useEffect(() => {
    // Set up resize handler
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }

      if (chartInstance.current) {
        chartInstance.current.resize();
        chartInstance.current.update();
      }
    };

    window.addEventListener("resize", handleResize);

    // Call once to set initial size
    // Using a shorter timeout for quicker initial render
    setTimeout(handleResize, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);  // Prepare chart data and options with default values
  const [chartData, setChartData] = useState<any>({
    labels: projects.map((p) => p.name),
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 12,
      },
      y: {
        stacked: true,
      },
    },
  });

  const [plugins, setPlugins] = useState<any[]>([]);

  // Prepare chart data and options
  useEffect(() => {
    if (!containerWidth) return;

    const datasets: any[] = [];
    const labels = projects.map((p) => p.name);

    // Helper function to create background array for phases
    const createBackgroundArray = (phaseType: string, projectIndex: number) => {
      return projects.map((_, index) => {
        if (index === projectIndex) {
          return phaseColors[phaseType as keyof typeof phaseColors];
        }
        return "rgba(0, 0, 0, 0)"; // transparent for other projects
      });
    };

    // Create datasets for each phase
    projects.forEach((project, projectIndex) => {
      // For each phase in the project
      project.phases.forEach((phase) => {
        datasets.push({
          label: phase.type.charAt(0).toUpperCase() + phase.type.slice(1),
          data: projects.map((_, index) => {
            if (index === projectIndex) {
              return phase.duration;
            }
            return 0; // No duration for other projects
          }),
          backgroundColor: createBackgroundArray(phase.type, projectIndex),
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.9,
          // Custom property to store start position
          startPosition: phase.start,
        });
      });
    });

    // Plugin to position bars correctly (for Gantt chart timeline)
    const positionBarsPlugin = {
      id: "positionBars",
      beforeDraw(chart: Chart) {
        const { scales } = chart;
        const xScale = scales.x;

        chart.data.datasets.forEach((dataset: any, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar: any, index) => {
            if (bar && dataset.data[index] > 0) {
              // Calculate x position based on start position
              const startPosition = dataset.startPosition || 0;
              const x = xScale.getPixelForValue(startPosition);

              // Update x position (without direct assignment)
              Object.defineProperty(bar, "_model", {
                writable: true,
                value: { ...bar._model, x },
              });
            }
          });
        });
      },
    };

    // Plugin to add status indicators
    const statusIndicatorsPlugin = {
      id: "statusIndicators",
      afterDraw(chart: Chart) {
        const { ctx, scales } = chart;
        const yScale = scales.y;

        projects.forEach((project, index) => {
          const y = yScale.getPixelForValue(index);
          const indicatorSize = 6;

          // Draw status indicator
          ctx.beginPath();
          ctx.arc(20, y, indicatorSize / 2, 0, Math.PI * 2);
          ctx.fillStyle =
            statusColors[project.status as keyof typeof statusColors];
          ctx.fill();
        });
      },
    };

    setPlugins([positionBarsPlugin, statusIndicatorsPlugin]);

    setChartData({
      labels: labels,
      datasets: datasets,
    });

    setChartOptions({
      indexAxis: "y", // Horizontal bars
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: "easeOutQuad",
      },
      layout: {
        padding: {
          left: 40, // Add padding for status indicators
        },
      },
      scales: {
        x: {
          stacked: true,
          min: 0,
          max: 12,
          grid: {
            color: "rgba(88, 88, 105, 0.5)",
            lineWidth: 0.5,
          },
          ticks: {
            stepSize: 1,
            callback: function (value: any) {
              return months[value] || "";
            },
            color: "#FFFFFF",
            font: {
              size: 12,
            },
          },
          border: {
            display: false,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            display: false, // Hide y-axis labels (will be shown in fixed column)
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: "#FFFFFF",
            usePointStyle: true,
            pointStyle: "rect",
            boxWidth: 8,
            boxHeight: 8,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          displayColors: false,
          callbacks: {
            title: function (tooltipItems: any) {
              return projects[tooltipItems[0].dataIndex].name;
            },
            label: function (context: any) {
              const dataset = context.dataset;
              const phase = dataset.label;
              const duration = context.parsed.x;
              const startPos = dataset.startPosition;
              const startMonth = months[startPos];
              const endMonth = months[startPos + duration - 1];

              return `${phase}: ${startMonth} - ${endMonth} (${duration} months)`;
            },
          },
        },
      },
    });
  }, [containerWidth, projects, months]);

  // Calculate row heights based on number of projects
  const rowHeight = 40; // Height for each project row
  const headerHeight = 50; // Height for header
  const fixedColumnWidth = 200; // Width for fixed Projects column

  console.log("Chart data:", chartData);
  console.log("Chart options:", chartOptions);  return (
    <div
      className="bg-[#212124] rounded-lg flex flex-col w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Header with title */}
      <div className="p-4 text-white bg-[#373743]">
        <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
      </div>

      {/* Chart container with fixed column */}
      <div
        className="flex relative"
        style={{
          height: `${projects.length * rowHeight + headerHeight + 70}px`,
        }}
      >
        {/* Fixed Projects column */}
        <div
          ref={projectsColumnRef}
          className="absolute left-0 z-10 bg-[#212124] border-r border-[#373743]"
          style={{
            width: `${fixedColumnWidth}px`,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Fixed column header */}
          <div
            className="flex items-center px-4 font-bold text-white"
            style={{ height: `${headerHeight}px`, backgroundColor: "#373743" }}
          >
            Projects
          </div>

          {/* Fixed column project names */}
          <div className="overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center px-4 text-white"
                style={{
                  height: `${rowHeight}px`,
                  color:
                    project.status === "warning"
                      ? statusColors.warning
                      : project.status === "critical"
                      ? statusColors.critical
                      : "#FFFFFF",
                  borderBottom: "1px solid rgba(88, 88, 105, 0.3)",
                }}
              >
                {/* Status indicator circle */}
                <div 
                  className="w-2 h-2 rounded-full mr-3"
                  style={{ 
                    backgroundColor: project.status === "warning"
                      ? statusColors.warning
                      : project.status === "critical"
                      ? statusColors.critical
                      : statusColors.normal 
                  }}
                ></div>
                <div className="truncate max-w-full">
                  {project.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chart area with horizontal scroll */}
        <div
          ref={chartContainerRef}
          className="overflow-x-auto overflow-y-hidden"
          style={{
            marginLeft: `${fixedColumnWidth}px`,
            width: `calc(100% - ${fixedColumnWidth}px)`,
            height: "100%",
          }}
        >
          <div style={{ minWidth: "700px", height: "100%" }}>
            {chartData && chartOptions && (
              <Bar
                data={chartData}
                options={chartOptions}
                plugins={plugins}
                ref={(ref: any) => {
                  if (ref) {
                    chartInstance.current = ref.chart;
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGanttChart;
