const svg = d3.select('body').append('svg'),
      tooltip = d3.select('body')
        .append('div')
        .classed('tooltip', true),
      bardata = [38, 60, 25, 52, 66],
      margin = {top: 15, right: 15, bottom: 15, left: 30},
      w = 400,
      h = 300,
      height = h - margin.top - margin.bottom,
      width = w - margin.left - margin.right,
      // colors = d3.scaleOrdinal()
      //   .range([
      //    'yellowgreen',
      //    'darkorange',
      //    'deepskyblue',
      //    'darkviolet',
      //    'deeppink'
      // ]),
      colors = d3.scaleOrdinal(d3.schemeAccent);
      yScale = d3.scaleLinear()
        .domain([0, d3.max(bardata)])
        .range([0, height]),
      xScale = d3.scaleBand()
        .domain(bardata)
        .paddingInner(.3)
        .range([0, width])

      yAxisValues = d3.scaleLinear()
        .domain([0, d3.max(bardata)])
        .range([height,0]),
      yAxisTicks = d3.axisLeft(yAxisValues)
        .ticks(3);

function mousemove() {
  tooltip
    .style('left', (d3.event.pageX - 14) + 'px')
    .style('top', (d3.event.pageY - 34) + 'px');
}

const chart = svg
  .attr('viewBox', `0 0 ${w} ${h}`)
  .append('g')
  .attr('transform', 'translate('+margin.left+','+margin.top+')')
  .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', function(d,i){
        return colors(i);
      })
      .attr('width', function(d,i){
        return xScale.bandwidth();
      })
      .attr('x', function(d,i){
        return xScale(d);
      })
      .attr('height', 0)
      .attr('y', height)
      .on('mouseover', function(d){
        tooltip
          .text(d)
          .transition()
          .duration(200)
          .style('opacity', .9);
        defaultColor = d3.color(this.style.fill);
        let highlightColor = defaultColor.brighter(.75).hex();
        d3.select(this).style('fill', highlightColor);
      })
      .on('mousemove', mousemove)
      .on('mouseout', function(){
        tooltip.style('opacity', 0);
        d3.select(this).style('fill', defaultColor);
      });

  chart.transition()
      .duration(5000)
      .delay(function(d,i){
        return i * 500;
      })
      .ease(d3.easeBounceOut)
      .attr('height', function(d,i){
        return yScale(d);
      })
      .attr('y', function(d){
        return height - yScale(d);
      });

svg.append('g')
  .attr('transform', 'translate('+margin.left+','+margin.top+')')
       .call(yAxisTicks);

/* Codepen Example: https://codepen.io/jme11/pen/eLVgoZ */
