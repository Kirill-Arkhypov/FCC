const width = 1350;
const height = 500;
const margin = { top: 5, right: 30, bottom: 100, left: 90 };

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
  '#313695',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#ffffbf',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
  '#a50026',
  '#7c001b',
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

const round = (num) => Math.round(num * 100) / 100;

function tooltipTemplate(year, month, base, variance) {
  return `<p>${year} - ${months[month - 1]}</p>
          <p>${round(base + variance)}℃</p>
          <p>${round(variance)}℃</p> `;
}

// Fetching and parsing data

d3.json(dataSet).then(({ baseTemperature, monthlyVariance }) => {
  const data = monthlyVariance.map((e) => {
    return { ...e, temperature: baseTemperature + e.variance };
  });

  // Description rendering

  const [minYear, maxYear] = d3.extent(data, (d) => d.year);

  d3.select('#description').html(
    `<h3>${minYear} - ${maxYear}: base temperature ${baseTemperature}℃</h3>`
  );

  // Scales

  const xScale = d3
    .scaleLinear()
    .domain([minYear - 0.25, maxYear])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([margin.top, height - margin.bottom]);

  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.temperature))
    .range([0, colors.length - 1]);

  // Axes

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(20, 'd')
    .tickSize(10)
    .tickSizeOuter(0);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickSize(10).tickSizeOuter(0);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis);

  // Data cells

  const cellWidth = width / (data.length / 12);
  const cellHeight = (height - margin.top - margin.bottom) / months.length;

  const cell = svg.selectAll('rect').data(data).enter().append('rect');

  cell
    .attr('x', (d) => xScale(d.year))
    .attr('y', (d) => yScale(months[d.month - 1]))
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('data-month', (d) => d.month - 1)
    .attr('data-year', (d) => d.year)
    .attr('data-temp', (d) => d.temperature.toPrecision(3))
    .attr('fill', (d) => colors[Math.floor(colorScale(d.temperature))])
    .attr('class', 'cell');

  // Show tooltip on cell hover

  cell
    .on('mouseover', (e, d) => {
      const x = +e.currentTarget.getAttribute('x');
      const y = +e.currentTarget.getAttribute('y');

      tooltip
        .attr('data-year', d.year)
        .style('top', () => (y < 80 ? y + 35 + 'px' : y - 74 + 'px'))
        .style('left', () =>
          x < 175 ? x + 5 + 'px' : x > 1250 ? x - 155 + 'px' : x - 76 + 'px'
        )
        .style('visibility', 'visible')
        .html(tooltipTemplate(d.year, d.month, baseTemperature, d.variance));
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });

  // Legend

  const legendWidth = 500;
  const legendHeight = 30;
  const rectWidth = legendWidth / colors.length;

  const legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .attr(
      'transform',
      `translate(${margin.left}, ${height - margin.bottom + 45})`
    );

  legend
    .selectAll('rect')
    .data(colors)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * rectWidth)
    .attr('y', 0)
    .attr('width', rectWidth)
    .attr('height', legendHeight)
    .attr('fill', (d) => d);

  // Legend axis

  const legendScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.variance))
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale).tickSizeOuter(0);

  legend
    .append('g')
    .attr('id', 'legend-axis')
    .attr('transform', `translate(0, ${legendHeight})`)
    .call(legendAxis);
});
