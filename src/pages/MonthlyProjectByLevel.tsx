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
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchMonthlyProjectLevels,
  type MonthlyProjectData,
} from "../api/monthlyProjectApi";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Component props
interface MonthlyProjectByLevelProps {
  title?: string;
  category?: string;
}

// Define Chart.js type for bar chart
type BarChartData = ChartData<"bar", number[], string>;

const MonthlyProjectByLevel: React.FC<MonthlyProjectByLevelProps> = ({
  title = "Monthly Project by level",
  category = "Telecommunication",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<MonthlyProjectData | null>(
    null
  );
  const [chartData, setChartData] = useState<BarChartData>({
    labels: [],
    datasets: [],
  });
  // Create chart data from API response
  const createChartData = useCallback(
    (data: MonthlyProjectData): BarChartData => {
      return {
        labels: data.data.map((item) => item.month),
        datasets: [
          {
            label: "Level 1",
            data: data.data.map((item) => item.level1),
            backgroundColor: "#07BFCB", // Level 1 color from Figma
            barPercentage: 0.65,
            categoryPercentage: 0.6,
          },
          {
            label: "Level 2",
            data: data.data.map((item) => item.level2),
            backgroundColor: "#FF9100", // Level 2 color from Figma
            barPercentage: 0.65,
            categoryPercentage: 0.6,
          },
          {
            label: "Level 3",
            data: data.data.map((item) => item.level3),
            backgroundColor: "#1DE9B6", // Level 3 color from Figma
            barPercentage: 0.65,
            categoryPercentage: 0.6,
          },
        ],
      };
    },
    []
  );

  // Fetch project data on component mount and when category changes
  useEffect(() => {
    const getProjectData = async () => {
      setLoading(true);
      try {
        const data = await fetchMonthlyProjectLevels(category);
        setProjectData(data);
        setChartData(createChartData(data));
      } catch (error) {
        console.error("Failed to fetch monthly project data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjectData();
  }, [category, createChartData]);
  // Chart options with proper typing
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            family: "Pretendard, sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#585869",
          lineWidth: 1,
        },
        ticks: {
          color: "#70707C",
          font: {
            family: "Pretendard, sans-serif",
          },
          stepSize: 10,
          callback: function (value) {
            return value;
          },
        },
        max: 50, // Maximum value on Y-axis
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          color: "#FFFFFF",
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            family: "Pretendard, sans-serif",
            size: 12,
          },
        },
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
          label: function (context: TooltipItem<"bar">) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-[#212124] rounded-lg p-4 md:p-6 flex items-center justify-center">
        <div className="text-white">Loading project data...</div>
      </div>
    );
  }
  return (
    <div className="bg-[#212124] rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <div className="text-[#1DE9B6] font-medium">
          {projectData?.category}
        </div>
      </div>
      <div className="h-64">
        {!loading && (
          <Bar
            options={options} 
            data={chartData} 
            redraw={false}
          />
        )}
      </div>
    </div>
  );
};

export default MonthlyProjectByLevel;
