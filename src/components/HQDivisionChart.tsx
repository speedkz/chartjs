import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { DivisionData } from '../api/hqDivisionApi';
import { fetchHQDivisionData } from '../api/hqDivisionApi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HQDivisionChartProps {
  title?: string;
}

// Define Chart.js type for bar chart
type BarChartData = ChartData<'bar'>;

const HQDivisionChart: React.FC<HQDivisionChartProps> = ({
  title = "HQ Division"
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [divisions, setDivisions] = useState<DivisionData[]>([]);
  const [chartData, setChartData] = useState<BarChartData>({
    labels: [],
    datasets: []
  });
  // Create chart data from divisions
  const createChartData = useCallback((divisionData: DivisionData[]): BarChartData => {
    return {
      labels: divisionData.map(division => division.name),
      datasets: [
        {
          label: 'Level 3',
          data: divisionData.map(division => division.levels.level3),
          backgroundColor: '#C6FF00',
          barPercentage: 0.8,
          categoryPercentage: 0.9,
          barThickness: 20,
          borderWidth: 0,
          borderRadius: 0,
          stack: 'Stack 0'
        },
        {
          label: 'Level 2',
          data: divisionData.map(division => division.levels.level2),
          backgroundColor: '#FF9100',
          barPercentage: 0.8,
          categoryPercentage: 0.9,
          barThickness: 20,
          borderWidth: 0,
          borderRadius: 0,
          stack: 'Stack 0'
        },
        {
          label: 'Level 1',
          data: divisionData.map(division => division.levels.level1),
          backgroundColor: '#07BFCB',
          barPercentage: 0.8,
          categoryPercentage: 0.9,
          barThickness: 20,
          borderWidth: 0,
          borderRadius: 0,
          stack: 'Stack 0'
        }
      ]
    };
  }, []);

  // Fetch division data on component mount
  useEffect(() => {
    const getDivisions = async () => {
      setLoading(true);
      try {
        const data = await fetchHQDivisionData();
        setDivisions(data);
        setChartData(createChartData(data));
      } catch (error) {
        console.error("Failed to fetch HQ division data:", error);
      } finally {
        setLoading(false);
      }
    };

    getDivisions();
  }, [createChartData]);
  // Update chart data on window resize - use a throttled resize handler
  useEffect(() => {
    let resizeTimer: number | null = null;
    
    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      
      resizeTimer = window.setTimeout(() => {
        setChartData(createChartData(divisions));
      }, 250); // Add 250ms delay to prevent multiple rerenders
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [createChartData, divisions]);

  // Chart options with proper typing
  const options = useMemo<ChartOptions<'bar'>>(() => ({
    indexAxis: 'x' as const,
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 500 // Reduce animation duration to reduce flickering
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: '#585869',
          lineWidth: 1,
        },
        ticks: {
          font: {
            family: 'Pretendard, sans-serif',
            size: 12,
          },
          color: '#FFFFFF',
          padding: 5,
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 45,
        grid: {
          display: false,
          color: '#585869',
          lineWidth: 1,
        },
        ticks: {
          font: {
            family: 'Pretendard, sans-serif',
            size: 12,
          },
          color: '#70707C',
          callback: (value) => value
        },
        border: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            family: 'Pretendard, sans-serif',
            size: 12,
          },
          color: '#FFFFFF',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rect',
          boxWidth: 8,
          boxHeight: 8
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#373743',
        titleFont: {
          family: 'Pretendard, sans-serif',
          size: 12,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: 'Pretendard, sans-serif',
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          title: function(items) {
            if (items.length > 0) {
              return divisions[items[0].dataIndex]?.name || '';
            }
            return '';
          }
        }
      },
    },
  }), [divisions]);

  if (loading) {
    return (
      <div className="bg-[#101010] rounded-lg p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-white">Loading division data...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#101010] rounded-lg p-6 flex flex-col gap-6">
      {/* Title */}
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <h2 className="text-white text-lg font-bold">{title}</h2>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="w-full" style={{ height: '240px' }}>
        <Bar 
          data={chartData}
          options={options}
          redraw={false}
        />
      </div>
    </div>
  );
};

export default HQDivisionChart;
