
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler
);

type ChartType = "bar" | "line" | "doughnut";
type ChartWidgetProps = {
  title?: string;
  type: ChartType;
  data: any;
  options?: any;
  height?: number | string;
};

export function ChartWidget({
  title,
  type,
  data,
  options,
  height = 250,
}: ChartWidgetProps) {
  const chartProps = { data, options, style: { height } };
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm h-full flex flex-col">
      {title && <div className="mb-4 text-base font-semibold">{title}</div>}
      <div className="flex-1 flex items-center">
        {/* {type === "bar" && <Bar {...chartProps} />}
        {type === "line" && <Line {...chartProps} />}
        {type === "doughnut" && <Doughnut {...chartProps} />} */}
      </div>
    </div>
  );
}
