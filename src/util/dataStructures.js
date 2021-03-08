
function dateFixFormat(dateString){
  const [date, time] = dateString.split("T");
  const dateArray = date.split("-").map((val) => parseInt(val, 10));
  const timeArray = time.split(":").map((val) => parseInt(val, 10));
  return dateArray.concat(timeArray);
}

function lineDataSet(data) {
  if (data.length === 0 || !Object.keys(data[0])[0]) {
    return { dataPoints: 0, xMin: 0, xMax: 0, yMin: 0, yMax: 0 };
  }
  let xArray = [];
  let yArray = [];

  let dataPoints = data.map((value) => {
    const keyDate = Object.keys(value)[0];

    const x = new Date(...dateFixFormat(keyDate));
    const y = Number(value[Object.keys(value)[0]]);

    xArray.push(x);
    yArray.push(y);

    return { x, y };
  });
  let xMin = Math.min(...xArray);
  let xMax = Math.max(...xArray);
  let yMin = Math.min(...yArray);
  let yMax = Math.max(...yArray);

  return { dataPoints, xMin, xMax, yMin, yMax };
}

export {lineDataSet};