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

  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  useEffect(() => {
    let canceled = false;

    const humidityObserver = Datos.HudedadTR();
    const temperatureObserver = Datos.TemperaturaTR();

    humidityObserver.on("value", (snapshot) => {
      let arraydata = [];

      arraydata.push(...humidity);
      if (arraydata.length > 15) arraydata.shift();
      arraydata.push(snapshot.val());

      if (!canceled) {
        setHumidity(arraydata);
      }
    });

    temperatureObserver.on("value", (snapshot) => {
      let arraydata = [];
      
      arraydata.push(...temperature);
      if (arraydata.length > 15) arraydata.shift();
      arraydata.push(snapshot.val());

      if (!canceled) {
        setTemperature(arraydata);
      }
    });

    return () => {
      canceled = true;
      humidityObserver.off();
      temperatureObserver.off();
    };
  }, []);

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
