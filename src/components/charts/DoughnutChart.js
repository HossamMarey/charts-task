import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Doughnut } from 'react-chartjs-2';
import { CHART_COLORS } from "./utils/COLORS";
import { CircleLegendPlugin, textInsideDoughnutPlugin } from "./utils/plugins";




ChartJS.register(ArcElement, Tooltip, Legend);



const options = {
  cutout: 0,
  plugins: {
    legend: {
      position: 'bottom',

    },
  },
};
const DoughnutChart = ({ label, labels, data, colors, afterInsideText = '', beforeInsideText = '' }) => {

  const chartData = useMemo(() => {

    return {
      labels,
      datasets: [
        {
          label: label || '',
          data: data || [],
          backgroundColor: colors || CHART_COLORS.colors,
          borderWidth: 1,
        },
      ],
    }
  }, [data, labels, label, colors]);

  const percentageTextInsideDoughnutPlugin = useMemo(() => textInsideDoughnutPlugin({ afterText: afterInsideText, beforeText: beforeInsideText }), [afterInsideText, beforeInsideText])


  return (
    <div>
      <Doughnut data={chartData} options={options} plugins={[percentageTextInsideDoughnutPlugin, CircleLegendPlugin]} />
    </div>
  )
}

export default DoughnutChart