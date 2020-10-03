const width = 1000;
const height = 600;
const padding = 50;
const dotRadius = 7;

const parseTime = (time) => new Date(`2020 01 01 00:${time}`);

const svg = d3
  .select('#root')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const tooltip = d3
  .select('#root')
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('visibility', 'hidden');

const tooltipTemplate = ({ Time, Name, Year, Nationality, Doping }) => {
  return `
    <p>${Name}: ${Nationality}</p>
    <p>Year: ${Year}, Time: ${Time}</p>
    <p>${Doping || ''}</p>
  `;
};

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
).then((data) => {
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year + 1)])
    .range([padding, width - padding]);

  const yScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => parseTime(d.Time)))
    .range([padding, height - padding]);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.Year))
    .attr('cy', (d) => yScale(parseTime(d.Time)))
    .attr('r', dotRadius)
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => parseTime(d.Time))
    .attr('class', (d) => (d.Doping ? 'dot alert' : 'dot'))
    .on('mouseover', (e, d) => {
      tooltip
        .attr('data-year', d.Year)
        .style('top', () => +e.currentTarget.getAttribute('cy') - 35 + 'px')
        .style('left', () => +e.currentTarget.getAttribute('cx') + 10 + 'px')
        .style('visibility', 'visible')
        .html(tooltipTemplate(d));
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
});
