import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useTheme } from '@/hooks/useTheme';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const chartOptions = (theme) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: theme === 'dark' ? '#e2e8f0' : '#475569',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: theme === 'dark' ? '#e2e8f0' : '#475569',
      },
    },
    y: {
      grid: {
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: theme === 'dark' ? '#e2e8f0' : '#475569',
      },
    },
  },
});

const ChartContainer = ({ title, children, className = '' }) => (
  <div className={`bg-card border rounded-lg p-4 shadow-sm ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    <div className="h-64 w-full">{children}</div>
  </div>
);

export const BarChart = ({ title, data, options, className }) => {
  const [theme] = useTheme();
  return (
    <ChartContainer title={title} className={className}>
      <Bar
        data={data}
        options={{
          ...chartOptions(theme),
          ...options,
        }}
      />
    </ChartContainer>
  );
};

export const LineChart = ({ title, data, options, className }) => {
  const [theme] = useTheme();
  return (
    <ChartContainer title={title} className={className}>
      <Line
        data={data}
        options={{
          ...chartOptions(theme),
          ...options,
        }}
      />
    </ChartContainer>
  );
};

export const PieChart = ({ title, data, options, className }) => {
  const [theme] = useTheme();
  return (
    <ChartContainer title={title} className={className}>
      <Pie
        data={data}
        options={{
          ...chartOptions(theme),
          ...options,
        }}
      />
    </ChartContainer>
  );
};

// Sample data generators
export const generateBarData = (labels, datasets) => ({
  labels,
  datasets: datasets.map((dataset) => ({
    ...dataset,
    backgroundColor: dataset.backgroundColor || 'rgba(79, 70, 229, 0.7)',
    borderColor: dataset.borderColor || 'rgba(79, 70, 229, 1)',
    borderWidth: 1,
    borderRadius: 4,
  })),
});

export const generateLineData = (labels, datasets) => ({
  labels,
  datasets: datasets.map((dataset) => ({
    ...dataset,
    borderColor: dataset.borderColor || 'rgba(79, 70, 229, 1)',
    backgroundColor: dataset.backgroundColor || 'rgba(79, 70, 229, 0.1)',
    borderWidth: 2,
    tension: 0.4,
    fill: true,
    pointBackgroundColor: 'white',
    pointBorderColor: 'rgba(79, 70, 229, 1)',
    pointBorderWidth: 2,
  })),
});

export const generatePieData = (labels, dataset) => ({
  labels,
  datasets: [
    {
      data: dataset.data,
      backgroundColor: dataset.backgroundColor || [
        'rgba(79, 70, 229, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(167, 139, 250, 0.8)',
        'rgba(192, 132, 252, 0.8)',
      ],
      borderColor: 'transparent',
      borderWidth: 1,
    },
  ],
});
