import React from "react";
import { Scatter } from "react-chartjs-2";
/**
 * Grafica de linea.
 * @param {string} title - Titulo de la grafica.
 * @param {string} xlabel - Etiqueta eje x.
 * @param {string} ylabel - Etiqueta eje y.
 * @param {array} dataSet - Estructura de datos de grafica de.
 */
export default function Line(props) {
  const { title, xlabel, ylabel, dataSet, tooltipDecimals } = props;
  const { dataPoints, xMin, xMax, yMin, yMax } = dataSet;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 300, 0, 75);

    gradient.addColorStop(1, "rgba(8, 117, 249, 1)");
    gradient.addColorStop(0.2, "rgba(39, 183, 255, 0)");

    return {
      datasets: [
        {
          label: "",
          fill: true,
          lineTension: 0,
          backgroundColor: gradient,
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(58,66,73,1)",
          pointBackgroundColor: "#4895d4",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          type: "line",
          data: dataPoints,
        },
      ],
    };
  };

  return (
    <Scatter
      data={data}
      options={{
        title: {
          display: true,
          text: title,
          fontColor: "#757575",
          fontSize: 20,
          fontFamily: "Helvetica",
          fontStyle: "normal",
        },
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        legend: {
          display: false,
          position: "right",
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: xlabel,
              },
              gridLines: {
                color: "#757575",
              },
              ticks: {
                min: xMin,
                max: xMax,
                maxTicksLimit: 7,
                maxRotation: 0,
                fontColor: "#757575",
              },
              type: "time",
              time: {
                displayFormats: {
                  quarter: "h:mm",
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: ylabel,
                fontColor: "#757575",
              },
              gridLines: {
                color: "#757575",
              },
              ticks: {
                min: yMin,
                max: yMax,
                fontColor: "#757575",
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              let newValue = parseFloat(tooltipItem.value).toFixed(
                tooltipDecimals
              );
              let date_val = tooltipItem.xLabel + ": ";

              return date_val + newValue;
            },
          },
        },
      }}
    />
  );
}
