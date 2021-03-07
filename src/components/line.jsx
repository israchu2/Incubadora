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
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
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
          fontColor: "#ffffff",
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
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: xlabel,
              },
              gridLines: {
                color: "#ffffff",
              },
              ticks: {
                min: xMin,
                max: xMax,
                maxTicksLimit: 7,
                maxRotation: 0,
                fontColor: "#fff",
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
                fontColor: "#fff",
              },
              gridLines: {
                color: "#ffffff",
              },
              ticks: {
                min: yMin,
                max: yMax,
                fontColor: "#fff",
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
