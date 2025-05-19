import type { Chart, Plugin } from "chart.js";

// Add a plugin to draw a custom zero line
export const zeroLinePlugin: Plugin = {
  id: "zeroLine",
  beforeDraw(chart: Chart) {
    const { ctx, chartArea, scales } = chart;
    if (!scales.y || !ctx || !chartArea) return;

    const y = scales.y.getPixelForValue(0);

    // Only draw if y=0 is within the chart area
    if (y >= chartArea.top && y <= chartArea.bottom) {
      ctx.save();

      // Set dash line style
      ctx.strokeStyle = "#585869";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();

      ctx.restore();
    }
  },
};
