import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CHART_COLORS } from "./utils/COLORS";
import { lineBackgroundColorPlugin } from "./utils/plugins";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },

    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
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


const LineChart = ({
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
          backgroundColor: CHART_COLORS.backgroundColor,
          borderWidth: 1,
        },
      ],
    }
  }, [data, labels, label]);


  return (
    <div>
      <Line options={options} data={chartData} plugins={[lineBackgroundColorPlugin]} />
    </div>
  )
}

export default LineChart