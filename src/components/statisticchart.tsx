import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticChartProps {
  total: number;
  completed: number;
}

const StatisticChart: React.FC<StatisticChartProps> = ({ total, completed }) => {
  const data = {
    labels: ['Selesai 🎉', 'Belum 💤'],
    datasets: [{
      data: [completed, total - completed],
      backgroundColor: ['#C1F0DB', '#FFD1DC'],
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 20,
    }]
  };
  const options = {
    plugins: {
      legend: { labels: { font: { family: 'Nunito', size: 14 } } }
    },
    cutout: '70%',
  };
  return (
    <div className="card-cute w-full max-w-sm mx-auto flex flex-col items-center">
      <h3 className="text-xl h-cute mb-4">🐱 Progress Pengingat</h3>
      <div className="w-full relative">
        <Doughnut data={data} options={options} />
      </div>
      <p className="text-center mt-4 font-bold text-lg text-text/80">{completed}/{total} selesai</p>
    </div>
  );
};

export default StatisticChart;