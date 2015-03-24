//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

//= require lib/wyvis/messageBroker

//= require chance/chance
//= require colorbrewer2/colorbrewer

//= require lib/wyvis/datahub


var setOnLoad = function (argument) {
  window.hasLoaded = true;
  draw();
};

$(document).ready(setOnLoad);

$(document).on("page:load", setOnLoad);