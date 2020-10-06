const width = 600;
const height = 600;

// Data set

const DATA_SET =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

// Color scheme

const colorScheme = [];

// Main canvas

const svg = d3
  .select('#root')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Tooltip

const tooltip = d3
  .select('#root')
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('visibility', 'hidden');

// Fetching data
