var App = App || {};
App.shared = {};
App.implementations = {};
App.scenarios = {};
App.libraries = {};
App.types = {};

App.shared.init = function () {
  $('[data-toggle="tooltip"]').tooltip();
};

App.shared.windowHeight = function() { 
  return $(window).height();
};

App.shared.initLiveSearch = function () {
  // initialize live-search
  window.liveSearch = $.liveSearch({
    selectorContainer: "#thumb-container",
    selectorElementsToSearch: ".search-tile",
    attributeToSearch: false,
    selectorInputSearch: "#search-query",
    minCharacters: 1,
    typeDelay: 200,
  });
};

App.shared.initDetailsView = function () {
  // cache library thumbs and containers
  var thumbs = $( '.thumbnail' );
  var containers = $( '.details-container' );

  // set first library as active
  thumbs.first().addClass("active");
  containers.first().addClass("active");

  // initialize affix for side panel with library containers
  $( '#affix' ).height(App.shared.windowHeight() - 100).affix({
    offset: {
      top: containers.offset().top - 160,
      bottom: $( "footer" ).outerHeight(true)
    }
  });

  // bind selectio
  $("#thumb-container").on("click", '.thumbnail', selectDetail);

  /**
   * Sets the 'active' class on the library thumb
   * and the container.
   * @param  {Event} e the event that tiggered the action
   * @return {undefined}
   */
  function  selectDetail(e) {
    var that = $( e.currentTarget ),
        lib = $( "#" + that.data("name") );

    containers.removeClass("active");
    thumbs.removeClass("active");

    that.addClass("active");
    lib.addClass("active");

    if( lib.find( ".participation-graph" ).html() === "" ) {
      $.ajax({
        url: "/libraries/participation/" + lib.data("lib") + ".js",
        accepts: "script",
        dataType: "script", 
      });
    }
  }
};

var UTIL = {
  exec: function(controller, action) {
    var ns = App;
    if (action === undefined) {
      action = 'init';
    }
    if (controller !== '' && ns[controller] && typeof ns[controller][action] === "function") {
      ns[controller][action]();
    }
  },
  init: function() {
    var action, body, controller;
    body = document.body;
    controller = body.getAttribute("data-controller");
    action = body.getAttribute("data-action");
    UTIL.exec("shared");
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  }
};

$(document).ready(UTIL.init);

$(document).on("page:load", UTIL.init);