import { CHART_COLORS } from "./COLORS";
export const lineBackgroundColorPlugin = {
  id: 'lineBackgroundColorPlugin',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    const datasets = chart.data.datasets;

    for (let i = 0; i < datasets.length; i++) {
      const meta = chart.getDatasetMeta(i);

      if (meta.type === 'line') {
        const firstPoint = meta.data[0];
        const lastPoint = meta.data[meta.data.length - 1];
        const gradient = ctx.createLinearGradient(
          chartArea.left,
          chartArea.bottom,
          chartArea.left,
          chartArea.top
        );
        gradient.addColorStop(0, CHART_COLORS.backgroundColor);
        gradient.addColorStop(1, CHART_COLORS.backgroundColor);

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(firstPoint.x, chartArea.bottom);
        for (let j = 0; j < meta.data.length; j++) {
          const point = meta.data[j];
          ctx.lineTo(point.x, point.y);
        }
        ctx.lineTo(lastPoint.x, chartArea.bottom);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  },
};

export const textInsideDoughnutPlugin = ({ beforeText = '', afterText = '' }) => {

  return {
    id: 'textInsideDoughnutPlugin',
    afterDatasetsDraw: function (chart, easing) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach(function (dataset, i) {
        const meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function (element, index) {
            const centerX = element.getCenterPoint().x;
            const centerY = element.getCenterPoint().y;
            const value = dataset.data[index];
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const dataString = beforeText + value.toString() + afterText;
            ctx.fillText(dataString, centerX, centerY);
          });
        }
      });
    },
  }

}


export const CircleLegendPlugin = {
  id: 'CircleLegendPlugin',

  afterUpdate(chart, args, options) {
    const legend = chart.legend;
    if (legend) {
      const legendItems = legend.legendItems;
      console.log('afterUpdate', legendItems)
      legend.legendItems = legendItems.map((legendItem) => {
        // legendItem.fillStyle = options.fillStyle;
        // legendItem.strokeStyle = options.strokeStyle;
        // legendItem.borderWidth = options.borderWidth;
        // legendItem.pointStyle = options.pointStyle;
        // legendItem.rotation = options.rotation;
        legendItem.pointStyle = 'circle';
        legendItem.radius = 5;
        return legendItem;
      });

    }
  },
};
