import React from 'react';
import { Line } from 'react-chartjs-2';

const LinePlot = ({ data }) => {
  return (
    <div>
      <h2>Line Graph Example</h2>
      <Line
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

export default LinePlot;
