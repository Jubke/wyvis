var chart;
var draw = function () {

  var totalHeight = $("#vis").height(),
      totalWidth = $("#vis").width();

  // set up margins
  var margin  = {top:  10, right: 40, bottom: totalHeight * 0.2, left: 40},
      width   = totalWidth - margin.left - margin.right,
      height  = totalHeight - margin.top  - margin.bottom,
      margin2 = {top: height + margin.top + 30, right: 40, bottom:  20, left: 40},
      height2 = totalHeight - margin2.top - margin2.bottom;

  // a function to parse dates
  var parseDate = d3.time.format("%h:%m:%s:%ms").parse;

  // scales
  var x = d3.time.scale().range([0, width]),
      x2 = d3.time.scale().range([0, width]),
      yt = d3.scale.linear().range([height, 0]),
      yt2 = d3.scale.linear().range([height2, 0]),
      yp = d3.scale.linear().range([height, 0]),
      yp2 = d3.scale.linear().range([height2, 0]);

  // prepare axis objects
  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
      x2Axis = d3.svg.axis().scale(x2).orient("bottom"),
      ytAxis = d3.svg.axis().scale(yt).orient("right");
      ypAxis = d3.svg.axis().scale(yp).orient("left");

  // helper for brush interaction
  var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

  // zoom behavior
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 100000])
    .on("zoom", zoomed);

  // function to draw the line
  // pressure
  var lineP = d3.svg.line()
      .x(function(d) { return x(d.t); })
      .y(function(d) { return yp(d.pressure); });

  // temperature
  var lineT = d3.svg.line()
      .x(function(d) { return x(d.t); })
      .y(function(d) { return yt(d.temp); });

  // pressure
  var lineP2 = d3.svg.line()
      .x(function(d) { return x2(d.t); })
      .y(function(d) { return yp2(d.pressure); });

  // temperature
  var lineT2 = d3.svg.line()
      .x(function(d) { return x2(d.t); })
      .y(function(d) { return yt2(d.temp); });
  
  // setup svg container
  var svg = d3.select("#vis")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  // add a clip path so our line doesn't go off the chart
  svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

  var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  svg.append("rect")
    .attr("class", "pane")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);


  var data = datahub.getData(),
      allSeries = [],
      allMaxTemp,
      allMaxPres;

  $.each(data, function(key, value){
    value.map(function(element) {
      allSeries.push(element);
    });
  });

  x.domain(d3.extent(allSeries.map(function(d) { return d.t; })));
  yt.domain([-10, 1.1 * d3.max(allSeries.map(function(d) { return d.temp; }))]);
  yp.domain([-10, 1.1 * d3.max(allSeries.map(function(d) { return d.pressure; }))]);
  x2.domain(x.domain());
  yt2.domain(yt.domain());
  yp2.domain(yp.domain());

  zoom.x(x);

  function drawLine (data) {
    // focused graph 
    focus.append("path")
          .datum(data)
          .attr("class", "temp line line-focus")
          .attr("d", lineT);

    focus.append("path")
          .datum(data)
          .attr("class", "pres line line-focus")
          .attr("d", lineP);

    // context graph
    context.append("path")
            .datum(data)
            .attr("class", "pres line line-context")
            .attr("d", lineP2);

    context.append("path")
            .datum(data)
            .attr("class", "temp line line-context")
            .attr("d", lineT2);
  }

  function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.selectAll(".temp.line").attr("d", lineT);
    focus.selectAll(".pres.line").attr("d", lineP);
    focus.select(".x.axis").call(xAxis);
  }

  function zoomed() {
    svg.selectAll(".line-focus.temp").attr("d", lineT);
    svg.selectAll(".line-focus.pres").attr("d", lineP);
    svg.select(".yp.axis").call(ypAxis);
    svg.select(".yt.axis").call(ytAxis);
    svg.select(".x.axis ").call(xAxis);
  }


  $.each(data, function(key, value) {
    drawLine(value);
  });

  focus.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  focus.append("g")
    .attr("class", "yp axis")
    .call(ypAxis);

  focus.append("g")
    .attr("class", "yt axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(ytAxis);

  context.append("g")
    .attr("class", "x2 axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(x2Axis);

  context.append("g")
    .attr("class", "x brush")
    .call(brush)
  .selectAll("rect")
    .attr("y", -6)
    .attr("height", height2 + 7);

};