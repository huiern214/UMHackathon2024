import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ labels,data }) => {

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColors : [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ], // Example colors
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'], // Example colors
      },
    ],
  };

  const options1 = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '200px' }}>
      <Bar data={chartData} options={options1}/>
    </div>
  );
};

export default BarGraph;
