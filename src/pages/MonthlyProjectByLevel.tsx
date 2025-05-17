import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Props cho component
interface MonthlyProjectByLevelProps {
  title?: string;
  category?: string;
}

const MonthlyProjectByLevel: React.FC<MonthlyProjectByLevelProps> = ({
  title = "Monthly Project by level",
  category = "Telecommunication",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  // Dữ liệu mẫu từ thiết kế Figma
  const data = {
    labels: ["Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Level 1",
        data: [25, 30, 45], // Giá trị mẫu dựa trên chiều cao thanh trong Figma
        backgroundColor: "#07BFCB", // Màu Level 1 từ Figma
        barPercentage: 0.65,
        categoryPercentage: 0.6,
      },
      {
        label: "Level 2",
        data: [20, 25, 35], // Giá trị mẫu
        backgroundColor: "#FF9100", // Màu Level 2 từ Figma
        barPercentage: 0.65,
        categoryPercentage: 0.6,
      },
      {
        label: "Level 3",
        data: [21, 21, 20], // Giá trị mẫu
        backgroundColor: "#C6FF00", // Màu Level 3 từ Figma
        barPercentage: 0.65,
        categoryPercentage: 0.6,
      },
    ],
  };
  useEffect(() => {
    if (chartRef.current) {
      // Hủy chart instance cũ nếu có
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Tạo plugin để vẽ background container cho mỗi tháng
      const bgGradientPlugin = {
        id: "bgGradient",
        beforeDatasetsDraw(chart: Chart) {
          const { ctx, chartArea, scales } = chart;
          const { top, bottom, width, height } = chartArea;
          const numberOfBars = data.labels.length;
          const barWidth = (width / numberOfBars) * 0.7; // Chiều rộng container tương ứng với 70% của khoảng cách giữa các tháng

          // Vẽ gradient background cho mỗi nhóm cột
          data.labels.forEach((_, index) => {
            const xPos = scales.x.getPixelForValue(index) - barWidth / 2;

            // Tạo gradient
            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
            gradient.addColorStop(0, "rgba(55, 55, 67, 0.7)");
            gradient.addColorStop(1, "rgba(139, 139, 169, 0.05)");

            // Vẽ rectangle với gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(xPos, top, barWidth, height);

            // Thêm border radius phía trên (cong nhẹ)
            ctx.beginPath();
            ctx.moveTo(xPos, top);
            ctx.arcTo(xPos, top - 5, xPos + 5, top - 5, 5);
            ctx.arcTo(xPos + barWidth, top - 5, xPos + barWidth, top, 5);
            ctx.lineTo(xPos + barWidth, top);
            ctx.closePath();
            ctx.fill();
          });
        },
      }; // Plugin để vẽ tổng và tên tháng
      const labelsPlugin = {
        id: "labelsPlugin",
        afterDraw(chart: Chart) {
          const { ctx, chartArea, scales } = chart;
          // Thiết lập style cho text
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Vẽ tổng số trên đầu mỗi cột
          ctx.font = "bold 16px Pretendard, sans-serif";
          ctx.fillStyle = "#ffffff";

          // Tính tổng giá trị cho mỗi tháng
          const totalsByMonth = data.datasets.reduce((totals, dataset) => {
            dataset.data.forEach((value, index) => {
              totals[index] = (totals[index] || 0) + value;
            });
            return totals;
          }, [] as number[]); // Vẽ tổng số
          totalsByMonth.forEach((total, index) => {
            const xPos = scales.x.getPixelForValue(index);
            ctx.fillText(total.toString(), xPos, chartArea.top - 16);
          });

          // Vẽ nhãn tháng ở dưới
          ctx.font = "12px Pretendard, sans-serif";
          ctx.fillStyle = "#ffffff";

          data.labels.forEach((month, index) => {
            const xPos = scales.x.getPixelForValue(index);
            ctx.fillText(month.toString(), xPos, chartArea.bottom + 12);
          });
        },
      };

      // Khởi tạo chart mới
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 25, // Thêm padding phía trên cho tổng
                bottom: 25, // Thêm padding phía dưới cho tên tháng
              },
            },
            scales: {
              x: {
                stacked: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false, // Ẩn nhãn tháng vì chúng ta sẽ tự tạo riêng
                },
              },
              y: {
                stacked: false,
                beginAtZero: true,
                grid: {
                  color: "rgba(88, 88, 105, 0.2)",
                  borderDash: [1, 2],
                },
                ticks: {
                  stepSize: 20,
                  color: "rgba(255, 255, 255, 0.8)",
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Ẩn legend mặc định vì chúng ta sẽ tạo custom legend
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#FFF",
                bodyColor: "#FFF",
                padding: 10,
                borderWidth: 0,
              },
            },
          },
          plugins: [bgGradientPlugin, labelsPlugin],
        });
      }
    }

    // Cleanup khi component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Tạo custom legend giống như trong thiết kế Figma
  const renderLegendItem = (color: string, label: string) => (
    <div className="flex items-center gap-1 text-sm">
      <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
      <span className="text-white text-xs">{label}</span>
    </div>
  );
  return (
    <div className="bg-[#101010] rounded-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 w-full h-full">
      {/* Title Container */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h3 className="text-white text-base sm:text-lg font-bold">{title}</h3>
        </div>
        {category && (
          <p className="text-white/0 text-xs sm:text-sm font-bold">{category}</p>
        )}
      </div>
      {/* Chart Container */}
      <div className="flex flex-col justify-between items-center flex-grow min-h-[200px] w-full">
        <div className="relative w-full h-full min-h-[160px]">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Legend Container */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {renderLegendItem("#07BFCB", "Level 1")}
          {renderLegendItem("#FF9100", "Level 2")}
          {renderLegendItem("#C6FF00", "Level 3")}
        </div>
      </div>
    </div>
  );
};

export default MonthlyProjectByLevel;
