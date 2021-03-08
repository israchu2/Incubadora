import React, { useState, useEffect } from "react";
import Line from "../components/line";
import Datos from "../Firebase/consultas";
import { lineDataSet } from "../util/dataStructures";
// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Images
import onIcon from "../assets/onIcon.png";
import offIcon from "../assets/offIcon.png";
import lightsImg from "../assets/lights.png";
import valveImg from "../assets/valve.png";
import fanImg from "../assets/fan.png";


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
  paperSmall: {
    padding: 10,
    height: 180,
    textAlign: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
  actuatorImg: {
    display: "block",
    "max-width": 100,
    "max-height": 100,
    width: "auto",
    height: "auto",
    margin: "auto",
  },
  statusImg: {
    display: "block",
    "max-width": 25,
    "max-height": 25,
    width: "auto",
    height: "auto",
    margin: "auto",
  },
}));

function Dashboard() {
  const classes = useStyles();

  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [valve, setValve] = useState(false);
  const [ligth, setLigth] = useState(false);
  const [fan, setFan] = useState(false);

  const updateArrayData = (array, newValue, lengthLimit = 30) => {
    let arrayData = newValue ? [...array, newValue] : [...array];
    if (arrayData.length > lengthLimit) arrayData.shift();
    return arrayData;
  };

  useEffect(() => {
    let canceled = false;

    const humidityObserver = Datos.HudedadTR();
    const temperatureObserver = Datos.TemperaturaTR();
    const valveObserver = Datos.ValvulaTR();
    const ligthObserver = Datos.LucesTR();
    const fanObserver = Datos.VentiladorTR();

    humidityObserver.on("value", (snapshot) => {
      if (!canceled) setCurrentHumidity(snapshot.val());
    });

    temperatureObserver.on("value", (snapshot) => {
      if (!canceled) setCurrentTemperature(snapshot.val());
    });

    valveObserver.on("value", (snapshot) => {
      if (!canceled) setValve(snapshot.val() === "1" ? true : false);
    });

    ligthObserver.on("value", (snapshot) => {
      if (!canceled) setLigth(snapshot.val() === "1" ? true : false);
    });

    fanObserver.on("value", (snapshot) => {
      if (!canceled) setFan(snapshot.val() === "1" ? true : false);
    });

    return () => {
      canceled = true;
      humidityObserver.off();
      temperatureObserver.off();
      valveObserver.off();
      ligthObserver.off();
      fanObserver.off();
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
              ylabel="Humedad relativa [%]"
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
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperSmall}>
            <Typography variant="h5" component="h2">
              Válvula
            </Typography>
            <img className={classes.actuatorImg} src={valveImg} alt="valve" />
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h2">
                  Estado:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img
                  className={classes.statusImg}
                  src={valve ? onIcon : offIcon}
                  alt="status"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperSmall}>
            <Typography variant="h5" component="h2">
              Luces
            </Typography>
            <img className={classes.actuatorImg} src={lightsImg} alt="ligths" />
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h2">
                  Estado:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img
                  className={classes.statusImg}
                  src={ligth ? onIcon : offIcon}
                  alt="status"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperSmall}>
            <Typography variant="h5" component="h2">
              Ventilador
            </Typography>
            <img className={classes.actuatorImg} src={fanImg} alt="fan" />
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h2">
                  Estado:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img
                  className={classes.statusImg}
                  src={fan ? onIcon : offIcon}
                  alt="status"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
