const width = 800;
const height = 600;

// Data set

const DATA_SET =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

// Color scheme

const colors = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
];

const colorScale = d3.scaleOrdinal(colors);

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

function tooltipTemplate(category, name, value) {
  return `<p>${name}</p>
          <i>${category}</i>
          <p>value: ${value.toString().slice(0, -6)}M</p>`;
}

// Fetching data

d3.json(DATA_SET).then((data) => render(data));

// Data rendering

function render(data) {
  const hierarchy = d3.hierarchy(data).sum((d) => d.value);
  const treemap = d3.treemap().size([width, height]).padding(1);

  const root = treemap(hierarchy);

  const leaf = svg
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  leaf
    .append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => colorScale(d.data.category))
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    .attr('class', 'tile');

  //Show tooltip on mouseover

  leaf
    .on('mousemove', (e, d) => {
      const {
        data: { category, name, value },
      } = d;

      tooltip
        .attr('data-value', value)
        .style('top', e.offsetY - 25 + 'px')
        .style('left', () => e.offsetX + 360 + 'px')
        .style('visibility', 'visible')
        .html(tooltipTemplate(category, name, value));
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });

  // Tile text

  leaf
    .append('text')
    .selectAll('tspan')
    .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join('tspan')
    .attr('x', 3)
    .attr('y', (d, i) => 13 + 10 * i)
    .text((d) => d);

  // Legend

  const legend = d3.select('#root').append('svg').attr('id', 'legend');
  const x = 15;

  const categories = data.children.map((d) => d.name);

  legend
    .append('g')
    .selectAll('rect')
    .data(categories)
    .join('rect')
    .attr('y', (d, i) => (x + 10) * i)
    .attr('width', x)
    .attr('height', x)
    .attr('fill', (d) => colorScale(d))
    .attr('class', 'legend-item');

  legend
    .append('g')
    .attr('transform', 'translate(20, 14)')
    .selectAll('text')
    .data(categories)
    .join('text')
    .text((d) => d)
    .attr('y', (d, i) => (x + 10) * i);
}
