import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PieChart = ({ id }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    renderChart();
    return () => {
      destroyChart();
    };
  }, []);

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  let newChartInstance;
  const renderChart = () => {
    destroyChart();
    if (newChartInstance) {
      newChartInstance.destroy();
    }
    newChartInstance = new Chart(document.getElementById(id), {
      type: "pie",
      data: data,
      options: {},
    });
    setChartInstance(newChartInstance);
  };

  return (
    <div className="w-56 h-56">
      <canvas id={id} />
    </div>
  );
};

export default PieChart;
