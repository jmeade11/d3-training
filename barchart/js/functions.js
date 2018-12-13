function getMaxVal(data, prop) {
  return data.reduce((max, currentVal) => currentVal[prop] > max ? currentVal[prop] : max, data[0][prop]);
}

function getMinVal(data, prop) {
  return data.reduce((min, currentVal) => currentVal[prop] < min ? currentVal[prop] : min, data[0][prop]);
}
