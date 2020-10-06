const width = 1000;
const height = 500;
const padding = 50;

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
  .style('bottom', '100px')
  .style('visibility', 'hidden');

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
).then(({ data }) => {
  const barWidth = Math.round(width / data.length);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d[0])))
    .range([padding, width - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height - padding, padding]);

  const xAxis = d3.axisBottom(xScale);
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', barWidth)
    .attr('height', (d) => height - yScale(d[1]) - padding)
    .attr('x', (d) => xScale(new Date(d[0])))
    .attr('y', (d) => yScale(d[1]))
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .attr('class', 'bar')
    .on('mouseover', (e, d) => {
      const x = +e.currentTarget.getAttribute('x');

      tooltip
        .attr('data-date', d[0])
        .style('left', () => (x > 760 ? x - 170 : x + 20) + 'px')
        .style('visibility', 'visible')
        .html(`<p>${d[0].slice(0, -3)}</p><p>$${d[1]} Billion</p>`);
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
});
