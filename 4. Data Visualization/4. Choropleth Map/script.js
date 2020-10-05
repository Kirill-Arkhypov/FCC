const width = 960;
const height = 600;

const path = d3.geoPath();

// Data sets

const EDUCATION =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const COUNTIES =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

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

// Rendering data

function render([education, counties]) {
  const county = (d) => education.filter((e) => e.fips === d.id)[0];

  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(counties, counties.objects.counties).features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', 'red')
    .attr('data-fips', (d) => d.id)
    .attr('data-education', (d) => county(d).bachelorsOrHigher)
    .attr('class', 'county')
    .on('mouseover', (e, d) => {
      const { state, area_name, bachelorsOrHigher } = county(d);

      tooltip
        .attr('data-education', bachelorsOrHigher)
        .style('top', e.offsetY - 25 + 'px')
        .style('left', e.offsetX + 25 + 'px')
        .style('visibility', 'visible')
        .html(`<p>${area_name}, ${state}: ${bachelorsOrHigher}%</p>`);
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
}
