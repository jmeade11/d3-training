const data = [1,2];
const section = d3.select('section');

runUpdate(data);

function removeData() {
  data.pop();
  runUpdate(data);
}

function addData() {
  if (data.length) {
    data.push(data[data.length - 1] + 1);
  } else {
    data.push(1);
  }
  runUpdate(data);
}

function runUpdate(data) {
  console.log(data);
  // DATA JOIN
  // Join new data with old elements, if any.
  const div = section.selectAll('div')
                .data(data);

  // UPDATE
  // Update old elements as needed.
  div
    .text(function(d,i){
      return d;
    })
    .classed('update', true)
    .classed('enter', false)
    .classed('exit', false);

  // ENTER
  // Create new elements as needed.
  div
    .enter().append('div')
    .classed('update', false)
    .classed('enter', true)
    .classed('exit', false)

  // ENTER + UPDATE
  // Merge the entered elements with the update selection.
  // Apply operations to both.
  .merge(div)
    .text(function(d,i){
      return d;
    });

  // EXIT
  // To remove these instead, replace the
  // .classed() methods with .remove().
  div.exit()
    .classed('update', false)
    .classed('enter', false)
    .classed('exit', true);

}

function clearExitSelection() {
  const selection = section.selectAll('div')
                      .data(data)
                      .exit();

  // Adding some nice transitions here for fun.
  // To make the elements change color and fade
  // from right to left instead, we call the
  // .size() method (sort of like .length of an array)
  // and subtract the current iteration count.
  selection
    .transition()
      .duration(1000)
      .delay(function(d,i){
        return (selection.size() - i) * 100;
      })
      .style('color', 'red')
      .style('background-color', 'rgba(255,0,0,.1)')
    .transition()
      .style('opacity',0)
    .remove();
}


/* General Update Pattern:
   https://bl.ocks.org/mbostock/3808218 */
