const width = 960;
const height = 600;

const path = d3.geoPath();

// Data sets

const EDUCATION =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const COUNTIES =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

// Color scheme

const colorScheme = [
  '#ffffcc',
  '#ffeda0',
  '#fed976',
  '#feb24c',
  '#fd8d3c',
  '#fc4e2a',
  '#e31a1c',
  '#bd0026',
  '#800026',
];

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

const data = [d3.json(EDUCATION), d3.json(COUNTIES)];
Promise.all(data).then(render);

// Data display

function render([education, counties]) {
  const county = (d) => education.filter((e) => e.fips === d.id)[0];

  const [min, max] = d3.extent(education, (d) => d.bachelorsOrHigher);
  const step = (max - min) / colorScheme.length;

  // Colors scale

  const colors = d3
    .scaleThreshold()
    .domain(d3.range(min, max, step))
    .range(colorScheme);

  // Map rendering

  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(counties, counties.objects.counties).features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => colors(county(d).bachelorsOrHigher))
    .attr('data-fips', (d) => d.id)
    .attr('data-education', (d) => county(d).bachelorsOrHigher)
    .attr('class', 'county')
    .on('mousemove', (e, d) => {
      const { state, area_name, bachelorsOrHigher } = county(d);
      const x = e.offsetX;
      const y = e.offsetY;

      tooltip
        .attr('data-education', bachelorsOrHigher)
        .style('top', y - 50 + 'px')
        .style('left', () => (x > 720 ? x - 150 : x) + 'px')
        .style('visibility', 'visible')
        .html(
          `<p>${area_name.slice(0, -7)}, ${state}: ${bachelorsOrHigher}%</p>`
        );
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });

  //States borders

  svg
    .append('path')
    .datum(topojson.mesh(counties, counties.objects.states, (a, b) => a !== b))
    .attr('d', path)
    .attr('class', 'state');

  // Legend

  const x = d3
    .scaleLinear()
    .domain([min, max])
    .range([height, width - 50]);

  const legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', 'translate(-30, 25)');

  legend.append('text').attr('x', height).attr('y', -5).text('Bachelors');

  const legendData = colors.range().map((d) => {
    d = colors.invertExtent(d);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
  });

  legend
    .selectAll('rect')
    .data(legendData)
    .enter()
    .append('rect')
    .attr('height', 8)
    .attr('x', (d) => x(d[0]))
    .attr('width', (d) => x(d[1]) - x(d[0]))
    .attr('fill', (d) => colors(d[0]));

  const legendAxis = d3
    .axisBottom(x)
    .tickSize(12)
    .tickFormat((x) => Math.round(x) + '%')
    .tickValues(colors.domain());

  legend.call(legendAxis).select('.domain').remove();
}
