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
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completed, total - completed],
      backgroundColor: ['#D3BC8E', '#3B4255'], // Genshin gold and dark slate
      borderColor: 'transparent',
      borderWidth: 0,
      hoverOffset: 4,
    }]
  };
  const options: any = {
    plugins: {
      legend: { labels: { font: { family: 'Outfit', size: 14 }, color: '#3B4255' } },
      tooltip: { titleFont: { family: 'Outfit', size: 14 }, bodyFont: { family: 'Outfit', size: 14 }, backgroundColor: 'rgba(59,66,85,0.9)', cornerRadius: 4 }
    },
    cutout: '75%',
    animation: { animateScale: true, animateRotate: true }
  };
  return (
    <div className="card-genshin w-full max-w-sm mx-auto flex flex-col items-center relative group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-genshingold blur-[60px] opacity-20 pointer-events-none"></div>
      
      <h3 className="text-2xl h-genshin mb-6 text-center z-10 flex items-center gap-2">
        <span>✦</span> Progress Stats <span>✦</span>
      </h3>
      
      <div className="w-full relative z-10 transition-transform duration-700 hover:scale-[1.02]">
        <Doughnut data={data} options={options} />
        
        {/* Centered text in doughnut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
          <span className="text-4xl sm:text-5xl font-genshin text-genshingold drop-shadow-sm">{Math.round((completed/total)*100) || 0}%</span>
        </div>
      </div>
      
      <p className="text-center mt-8 font-body text-genshindark text-sm uppercase tracking-widest px-6 py-2 border-t border-genshingold/30 relative z-10">
        {completed} / {total} Commissions Cleared
      </p>
    </div>
  );
};

export default StatisticChart;