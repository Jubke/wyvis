//= require jquery/dist/jquery
//= require jquery-ujs/src/rails
//= require turbolinks

//= require chance/chance
//= require colorbrewer2/colorbrewer

//= require d3/d3
//= require d3-plugins/sankey/sankey
//= require highcharts/highcharts


var setOnLoad = function (argument) {
  window.hasLoaded = true;
  init();
};

$(document).ready(setOnLoad);

$(document).on("page:load", setOnLoad);