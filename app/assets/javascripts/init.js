var App = App || {};
App.common = {};
App.implementations = {};
App.libraries = {};
App.types = {};

App.common.init = function () {
  $('[data-toggle="tooltip"]').tooltip();

  // $( document ).on('page:change', function() {
  //       $( '#content' ).addClass('rollIn') ; 
  // });
  // $( document ).on('page:fetch', function() {
  //       $( '#content' ).addClass('hinge') ;
  // });
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
    UTIL.exec("common");
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  }
};

$(document).ready(UTIL.init);

$(document).on("page:load", UTIL.init);