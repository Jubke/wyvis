var App = App || {};

App.scenarios.compare = function() {
  // set the full window height
  resizeFullHeight();
  $( window ).on("resize", resizeFullHeight);

  // initialize full-screen toggle
  var container = $( ".implementation-container" );
  container.delegate(".top-controls .btn-full-screen", "click", toggleFullScreen);
  container.delegate(".top-controls .btn-lib-info", "click", toggleLibInfo);
  
  $( ".scenario-container" ).click(toggleScenarioDetails);

  // initialize scenario select
  $("form#form-scenario-select").on('change', function() {
    var id = $("form#form-scenario-select select").val();
    window.location.replace("/scenarios/" + id + "/compare");
  });

  // initialize selector links
  $("a.impl-link").on('click', selectImplementation);

  /**
   * Toggles the full-screen mode for an implementation container.
   * @param  {Object} e event that caused the action
   * @return {undefined}
   */
  function toggleFullScreen(e) {
    $( e.currentTarget ).toggleClass("active");
    $( e.delegateTarget ).toggleClass("full-screen");
    container.not(e.delegateTarget).toggleClass("not-full-screen");
  }

  function toggleLibInfo(e) {
    var $delegate = $(e.delegateTarget);

    $( e.currentTarget ).toggleClass("active");
    $delegate.find( ".library-container" ).toggleClass("show");

    if( $delegate.find( ".library-container .participation-graph" ).html() === "" ) {
      $.ajax({
        url: "/libraries/participation/" + $delegate.find( ".details-container-library" ).data("lib") + ".js",
        accepts: "script",
        dataType: "script", 
      });
    }
  }

  function toggleScenarioDetails (e) {
    if (e.target.nodeName !== "SELECT") {
      $(".scenario-details").slideToggle();
    }
  }

  /**
   * Resizes the .compare-container element on a window resize.
   * @return {undefined}
   */
  function resizeFullHeight() {
    $( ".compare-container" ).height( $( window ).height() - $( ".navbar" ).height() - $( "select#form-scenario-select" ).height() );
  }

  function selectImplementation (e) {
    var link = $(e.currentTarget),
        id = link.data("id");
        i = link.data("index");
    $("#container-" + i + " .form-impl-select select" ).val(id);
  }
};