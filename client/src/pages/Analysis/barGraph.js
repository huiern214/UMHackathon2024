import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarPlot = ({ data }) => {
  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar
        data={data}
        options={{
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

export default BarPlot;
