function lineDataSet(data) {
  if(data.length < 0){
    return { dataPoints:0, xMin:0, xMax:0, yMin:0, yMax:0 };
  }
  let xArray = [];
  let yArray = [];

  let dataPoints = data.map((value) => {
    const x = new Date(Object.keys(value)[0]);
    const y = value[Object.keys(value)[0]];

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