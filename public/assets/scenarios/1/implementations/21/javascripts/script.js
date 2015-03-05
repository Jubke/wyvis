/*global d3*/
/*global $*/
/*global colorbrewer*/
var init = function () {
  var margin = {top: 1, right: 1, bottom: 6, left: 1},
    width = $("#vis").width() - margin.left - margin.right,
    height = $("#vis").height() - margin.top - margin.bottom;

  // formatting of strings for labels and color scale
  var formatNumber = d3.format(",.0f"),
    format = function (d) {
      'use strict';
      return formatNumber(d) + " Users";
    },
    color = d3.scale.ordinal()
      .range(colorbrewer.Spectral[7]);

  // setup basic svg
  var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // prepair link and node groups
  var link_group = svg.append("g")
    .attr("id", "links");

  var node_group = svg.append("g")
    .attr("id", "nodes");

  // create a new sankey layout
  var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

  var path = sankey.link();

  function update(data) {
    'use strict';
    sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(32);

    /*
     * LINKS
     */
    var link = link_group
      .selectAll(".link")
      .data(data.links);

    // Remove exiting links
    link.exit().remove();

    // Add new links
    link
      .enter()
      .append("path")
      .attr("class", "link")
      .append("title");

    // Update all links
    link
      .transition()
      .duration(1000)
      .attr("d", path)
      .style("stroke-width", function (d) { return Math.max(1, d.dy); })
      .sort(function (a, b) { return b.dy - a.dy; })
      .select("title")
      .text(function (d) { return d.source.name + " to " + d.target.name + "\n" + format(d.value); });

    /*
     * NODES
     */
    function dragmove(d) {
      d.y = Math.max(0, Math.min(height - d.dy, d3.event.y));
      d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
      sankey.relayout();
      link.attr("d", path);
    }

    var node = node_group
      .selectAll(".node")
      .data(data.nodes, function (d) {
        return d.name;
      });

    // Remove exiting nodes
    node.exit().remove();

    // Add new nodes
    var new_nodes = node
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.behavior.drag()
        .origin(function (d) { return d; })
        .on("dragstart", function () { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

    new_nodes.append("rect")
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        d.color = color(d.name);
        return d.color;
      })
      .style("stroke", function (d) { return d3.rgb(d.color).darker(2); });

    new_nodes.append("text")
      .attr("x", -6)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) { return d.name; })
      .filter(function (d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    // Update all nodes
    node
      .transition()
      .duration(1000)
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    // node height
    node.select("rect")
      .transition()
      .duration(1000)
      .attr("height", function (d) { return d.dy; });

    // adding node labels + formatting
    node.select("text")
      .transition()
      .duration(1000)
      .attr("y", function (d) { return d.dy / 2; });
  }

  function random_data(data) {
    'use strict';
    var i;
    for (i = data.links.length - 1; i >= 0; i--) {
      data.links[i].value = Math.floor(Math.random() * 100);
    }

    return data;
  }

  var $data = data;
  update($data);

  $("#update").on("click", function () {
    'use strict';
    $data = random_data($data);
    update($data);
  });
};