import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const SimplePieChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'], // Example colors
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'], // Example colors
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} options={options}/>
    </div>
  );
};

export default SimplePieChart;
