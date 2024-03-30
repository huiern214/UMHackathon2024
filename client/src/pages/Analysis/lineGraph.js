import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data }) => {
  return (
    <div>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
