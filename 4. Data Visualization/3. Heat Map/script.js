const width = 1000;
const height = 600;
const padding = 50;

const svg = d3
  .select('#root')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Dataset:
// https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json
