import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { CHART_COLORS } from "./utils/COLORS";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },

  },
  scales: {
    x: {
      grid: {
        color: CHART_COLORS.gridColor,
        borderColor: 'rgba(0,0,0,0.0)',
        borderDash: [4, 4],

      }
    },
    y: {
      grid: {
        color: CHART_COLORS.gridColor,
        borderColor: 'rgba(0,0,0,0.0)',
        borderDash: [4, 4],
      }
    }
  }
};


const BarChart = ({
  label, data, labels
}) => {
  /*  
    labels: [xAxes labels]
    data: [yAxes data]
    label: tooltip title
  */

  const chartData = useMemo(() => {


    return {
      labels,
      datasets: [
        {
          label: label || '',
          data: data || [],
          borderColor: CHART_COLORS.borderColor,
          backgroundColor: CHART_COLORS.borderColor,
          borderWidth: 1,
          borderRadius: { topLeft: 9, topRight: 9 },
          barPercentage: 0.3,
        },
      ],
    }
  }, [data, labels, label]);


  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  )
}

export default BarChart