import React from "react";
import Line from "../components/line";
import {
  lineDataSet,
} from "../util/dataStructures";

const dataPoints = [
  { "2020-08-05T16:00:00-05:00": 10 },
  { "2020-08-05T16:00:00-05:10": 1 },
  { "2020-08-05T16:00:00-05:20": 2 },
  { "2020-08-05T16:00:00-05:30": 3 },
  { "2020-08-05T16:00:00-05:40": 4 },
];

function Dashboard() {



  return (
    <div>
      <Line
        title="Nivel"
        xlabel="Tiempo"
        tooltipDecimals={0}
        ylabel="Nivel [mV]"
        dataSet={lineDataSet(dataPoints)}
      />
    </div>
  );
}

export default Dashboard;
