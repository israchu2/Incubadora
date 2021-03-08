import React, { useState, useEffect } from "react";
import Line from "../components/line";
import Datos from "../Firebase/consultas";
import { lineDataSet } from "../util/dataStructures";
// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mcontainer: {
    padding: 50,
  },
  paper: {
    padding: 10,
    height: 340,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


function Dashboard() {
  const classes = useStyles();

  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const updateArrayData = (array, newValue, lengthLimit = 15) => {
    let arrayData = newValue ? [...array, newValue] : [...array];
    if (arrayData.length > lengthLimit) arrayData.shift();
    return arrayData;
  };

  useEffect(() => {
    let canceled = false;

    const humidityObserver = Datos.HudedadTR();
    const temperatureObserver = Datos.TemperaturaTR();

    humidityObserver.on("value", (snapshot) => {
      if (!canceled) {
        setCurrentHumidity(snapshot.val());
      }
    });

    temperatureObserver.on("value", (snapshot) => {
      if (!canceled) {
        setCurrentTemperature(snapshot.val());
      }
    });

    return () => {
      canceled = true;
      humidityObserver.off();
      temperatureObserver.off();
    };
  }, []);

  useEffect(() => {
    let canceled = false;
    const newHumidity = updateArrayData(humidity, currentHumidity);
    if (!canceled) setHumidity(newHumidity);

    return () => {
      canceled = true;
    };
  }, [currentHumidity]);

  useEffect(() => {
    let canceled = false;
    const newTemp = updateArrayData(temperature, currentTemperature);
    if (!canceled) setTemperature(newTemp);

    return () => {
      canceled = true;
    };
  }, [currentTemperature]);

  return (
    <div className={classes.mcontainer}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Line
              title="Humedad"
              xlabel="Tiempo"
              tooltipDecimals={0}
              ylabel="Nivel [mV]"
              dataSet={lineDataSet(humidity)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Line
              title="Temperatura"
              xlabel="Tiempo"
              tooltipDecimals={2}
              ylabel="Grados [ºC]"
              dataSet={lineDataSet(temperature)}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
