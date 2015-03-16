var draw = function() {
  'use strict';

  // set up margins
  var margin = {top: 10, right: 10, bottom: 40, left: 40},
      width = $("#vis").width() - margin.left - margin.right,
      height = $("#vis").height() - margin.top - margin.bottom,
      timeout = datahub.getIntervalTimeout(); // retrieves the timeout interval set on the data object

  // a function to parse dates
  var parseDate = d3.time.format("%h:%m:%s:%ms").parse;

  // scales
  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  // prepare axis objects
  var x_axis_helper = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var y_axis_helper = d3.svg.axis()
      .scale(y)
      .orient("left");

  // function to draw the line
  var line = d3.svg.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });
  
  // setup svg container
  var svg = d3.select("#vis")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add a clip path so our line doesn't go off the chart
  svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

  // prepare groups for axis
  var x_axis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

  var y_axis = svg.append("g")
        .attr("class", "y axis");

  // data will hold our set of data points
  var data = [];

  // create a path to represent the data as a line
  var path = svg.append("g")
                  .attr("clip-path", "url(#clip)")
                .append("path")
                  .datum(data)
                  .attr("class", "line");

  
  /**
   * Adds a new data point to the graph
   * @param  {object} new_data A data point to append to the line
   */
  function update(new_data) {
    // add the data to the data object
    data.push(new_data);

    // upadte the domains of the scales
    x.domain(d3.extent(data, function(d) { return d.x; }));

    var extend = d3.extent(data, function(d) { return d.y; }),
        diff = extend[1] - extend[0];
    y.domain([
      extend[0] - 0.1 * diff,
      extend[1] + 0.1 * diff
    ]);

    // update axis helpers
    x_axis_helper.scale(x);
    y_axis_helper.scale(y);

    // redraw the axis
    x_axis.call(x_axis_helper);
    y_axis.call(y_axis_helper);

    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .duration(timeout)
        .ease("linear")
        .attr("transform", "translate(-1,0)");

    // remove the oldest data point
    if(data.length > 200) data.shift(); 
  }

  // initialize the graph
  update( datahub.getData() );

  // listen for new data points
  $( datahub ).on("new.data", function (e, data) {
    update(data);
  });
};