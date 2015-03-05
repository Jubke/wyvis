//= require jquery/dist/jquery
//= require jquery-ujs/src/rails
//= require turbolinks

//= require chance/chance
//= require colorbrewer2/colorbrewer

//= require d3/d3
//= require d3-plugins/sankey/sankey
//= require highcharts/highcharts
//= require lib/wyvis/dweak


var setOnLoad = function (argument) {
  window.hasLoaded = true;
  draw();
};

$(document).ready(setOnLoad);

$(document).on("page:load", setOnLoad);