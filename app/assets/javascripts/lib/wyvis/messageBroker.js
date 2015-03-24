;(function (window, $) {

  var setUpListeners = function() {

    window.addEventListener('message', receiveMessage);

  };

  var receiveMessage = function(e) {
    if(e.source === window.parent ) {
      switch(e.data.type) {
        case "injectStyles":
          injectStyles(e.data.content);
          break;
        case "injectScript":
          injectScript(e.data.content);
          break;
        case "destroyData":
          datahub.destroy();
          break;
        case "destroyVisualization":
          destroyVisualization();
          break;
        case "toggleInterval":
          console.log("broker");
          datahub.toggleInterval();
          break;
        case "draw":
          draw();
          break;
      }
    }

  };

  var injectStyles = function (styles) {

    $("style#styles").html(styles);

  };

  var injectScript = function(script) {

    try {
      window.eval(script);
    }
    catch (Error) {

    }

  };

  var destroyVisualization = function() {   

    var new_vis = $( "<div id='vis'></div>" );
    $( "div#vis" ).replaceWith(new_vis);

    $( document ).off("new.data");

  };


  setUpListeners();

})(window, jQuery);