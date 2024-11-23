import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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
      callbacks: {
        label: function(context: any) {
          return `Volume: $${context.parsed.y.toLocaleString()}`;
        }
      }
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
        callback: (value: number) => `$${(value / 1000000).toFixed(1)}M`,
      },
    },
  },
};

const generateData = () => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const volumes = labels.map(() => Math.random() * 10000000 + 5000000);

  return {
    labels,
    datasets: [
      {
        label: 'Trading Volume',
        data: volumes,
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };
};

export default function VolumeChart() {
  return (
    <div className="relative group h-[300px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50 h-full">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Trading Volume</h3>
        <Bar options={options} data={generateData()} />
      </div>
    </div>
  );
}