//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

//= require chance/chance
//= require colorbrewer2/colorbrewer
//= require moment/moment

//= require_tree ./lib/datahub

var stats = {beginDraw: 0, endDraw: 0, updates: []};

;(function() {
  var setOnLoad = function (argument) {
     window.hasLoaded = true;
    
    stats.beginDraw = performance.now();
    draw();
    stats.endDraw = performance.now();
  };

  $( document ).ready(setOnLoad);

  $( document ).on("page:load", setOnLoad);
})();