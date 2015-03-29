//= require jquery/dist/jquery
//= require jquery-ujs/src/rails
//= require turbolinks

//= require chance/chance
//= require colorbrewer2/colorbrewer
//= require moment/moment

//= require_tree ./lib/datahub


var setOnLoad = function (argument) {
  window.hasLoaded = true;
  draw();
};

$(document).ready(setOnLoad);

$(document).on("page:load", setOnLoad);