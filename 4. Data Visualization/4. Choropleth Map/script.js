const width = 1400;
const height = 600;
const margin = { top: 5, right: 30, bottom: 100, left: 90 };

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

function tooltipTemplate(props) {
  return `<p>tooltip</p> `;
}
