function lineDataSet(data) {
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