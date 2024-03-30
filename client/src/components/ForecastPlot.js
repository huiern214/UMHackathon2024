import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const ForecastPlot = ({ actualData, forecastData }) => {
  const plotRef = useRef(null);

  useEffect(() => {
    const plotData = [
    {
        name: 'Actual',
        x: actualData.map((item) => item.date),
        y: actualData.map((item) => item.amt),
        mode: 'markers',
        marker: {
          color: 'black',
          size: 4,
        },
      },
      {
        name: 'Predicted',
        x: forecastData.map((item) => item.ds),
        y: forecastData.map((item) => item.yhat),
        mode: 'lines',
        line: {
          color: '#0072B2',
          width: 2,
        },
        fillcolor: 'rgba(0, 114, 178, 0.2)',
        fill: 'tonexty',
      },
      {
        name: 'Lower Bound',
        x: forecastData.map((item) => item.ds),
        y: forecastData.map((item) => item.yhat_lower),
        mode: 'lines',
        line: {
          color: '#81BAE6',
          width: 0,
        },
        hoverinfo: 'skip',
      },
      {
        name: 'Upper Bound',
        x: forecastData.map((item) => item.ds),
        y: forecastData.map((item) => item.yhat_upper),
        mode: 'lines',
        line: {
          color: '#81BAE6',
          width: 0,
        },
        fill: 'tonexty',
        hoverinfo: 'skip',
      },
      {
        name: 'Cap',
        x: forecastData.map((item) => item.ds),
        y: forecastData.map((item) => item.cap),
        mode: 'lines',
        line: {
          color: 'black',
          dash: 'dash',
          width: 2,
        },
      },
      {
        name: 'Floor',
        x: forecastData.map((item) => item.ds),
        y: forecastData.map((item) => item.floor),
        mode: 'lines',
        line: {
          color: 'black',
          dash: 'dash',
          width: 2,
        },
      },
      
    ];

    const layout = {
      showlegend: false,
      // width: "100%",
      // height: "100%",
      yaxis: {
        title: 'Price',
      },
      xaxis: {
        title: 'Date',
        type: 'date',
        rangeselector: {
          buttons: [
            {
              count: 7,
              label: '1w',
              step: 'day',
              stepmode: 'backward',
            },
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward',
            },
                
            // {
            //   count: 6,
            //   label: '6m',
            //   step: 'month',
            //   stepmode: 'backward',
            // },
            // {
            //   count: 1,
            //   label: '1y',
            //   step: 'year',
            //   stepmode: 'backward',
            // },
            {
              step: 'all',
            },
          ],
        },
        rangeslider: {
          visible: true,
        },
      },
    };

    Plotly.newPlot(plotRef.current, plotData, layout);
  }, [forecastData, actualData]);

  return <div ref={plotRef} className="w-full md:h-[600px]" />;
};

export default ForecastPlot;