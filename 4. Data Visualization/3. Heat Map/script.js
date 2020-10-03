const width = 1400;
const height = 600;
const { paddingX, paddingY } = { paddingX: 65, paddingY: 30 };

const dataSet =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const colors = [
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#ffffbf',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
];

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

function tooltipTemplate(year, month, baseTemperature, variance) {
  return `<p>${year} - ${months[month - 1]}</p>
      <p>${baseTemperature - variance}</p>
      <p>${variance}</p>`;
}

d3.json(dataSet).then(({ baseTemperature, monthlyVariance }) => {
  const cellWidth = width / (monthlyVariance.length / 12);
  const cellHeight = (height - paddingY * 2) / months.length;

  const [minYear, maxYear] = d3.extent(monthlyVariance, (d) => +d.year);

  d3.select('#description').html(
    `<h3>${minYear} - ${maxYear}: base temperature ${baseTemperature}℃</h3>`
  );

  const xScale = d3
    .scaleLinear()
    .domain([minYear - 0.25, maxYear])
    .range([paddingX, width - paddingX]);

  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([paddingY, height - paddingY]);

  // const colorScale = d3
  //   .scaleLinear()
  //   // .domain([1, 20])
  //   .domain(d3.extent(monthlyVariance, (d) => baseTemperature - d.variance))
  //   .range(['white', 'orange']);
  const colorScale = d3
    .scaleBand()
    .domain(colors)
    .range([0, colors.length - 1]);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(20, 'd')
    .tickSize(10)
    .tickSizeOuter(0);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - paddingY})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickSize(10).tickSizeOuter(0);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${paddingX}, 0)`)
    .call(yAxis);

  const cell = svg
    .selectAll('rect')
    .data(monthlyVariance)
    .enter()
    .append('rect');

  cell
    .attr('x', (d) => xScale(d.year))
    .attr('y', (d) => yScale(months[d.month - 1]))
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('data-month', (d) => d.month - 1)
    .attr('data-year', (d) => d.year)
    .attr('data-temp', (d) => baseTemperature - d.variance)
    // .attr('fill', (d) => {
    //   // console.log(colorScale(colors[Math.round(d.variance)]));
    //   return colorScale(baseTemperature - d.variance * 2);
    // })
    .attr(
      'fill',
      // (d) => colors[Math.round(colorScale(baseTemperature - d.variance))]
      (d) => {
        console.log(colorScale(colors[d.variance]));
        return colors[colorScale(Math.floor(baseTemperature - d.variance))];
      }
    )
    .attr('class', 'cell')
    .on('mouseover', (e, d) => {
      tooltip
        .attr('data-year', d.year)
        .style('top', () => +e.currentTarget.getAttribute('y') - 35 + 'px')
        .style('left', () => +e.currentTarget.getAttribute('x') + 10 + 'px')
        .style('visibility', 'visible')
        .html(tooltipTemplate(d.year, d.month, baseTemperature, d.variance));
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
});
