import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#1f2937',
      titleColor: '#9ca3af',
      bodyColor: '#f3f4f6',
      borderColor: '#4f46e5',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
        callback: (value: number) => `$${value.toLocaleString()}`,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
};

const generateData = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const basePrice = 3000;
  const prices = labels.map((_, i) => {
    const randomFactor = 1 + (Math.random() - 0.5) * 0.3;
    return basePrice * (1 + i * 0.1) * randomFactor;
  });

  return {
    labels,
    datasets: [
      {
        label: 'ETH Price',
        data: prices,
        fill: true,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#8b5cf6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };
};

export default function TokenPriceChart() {
  return (
    <div className="relative group h-[300px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50 h-full">
        <h3 className="text-xl font-bold text-white mb-4">ETH Price Trend</h3>
        <Line options={options} data={generateData()} />
      </div>
    </div>
  );
}