import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({id, data}) => {
  console.log('PieChart Props:', id, data);

  const [chartInstance,setChartInstance]=useState(null);

  useEffect(()=>{  
    renderChart();
    return()=>{
      destroyChart();
    }
  },[]);

  const destroyChart =()=>{
    if(chartInstance){
      chartInstance.destroy();
    }
  };

  let newChartInstance
  const renderChart=()=>{
    destroyChart()
    if (newChartInstance) {
      newChartInstance.destroy();
    }
    newChartInstance=new Chart(document.getElementById(id),{
      type:'pie',
      // data:data,
      data: {
        labels: Object.keys(data || {}),
        datasets: [
          {
            data: Object.values(data || {}),
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'orange'], // Update with appropriate colors
          },
        ],
      },
      options:{
        animation: {
          animateRotate: false, // Disable rotation animation
          animateScale: false, // Disable scale animation
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
      },
    });
    setChartInstance(newChartInstance);
  }

  return <div className='w-56 h-56'><canvas id={id}/></div>;
};

export default PieChart;
