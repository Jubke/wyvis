var App = App || {};

App.scenarios.compare = function() {
  // set the full window height
  resizeFullHeight();
  $( window ).on("resize", resizeFullHeight);

  var container = $( ".implementation-container" );
  
  // initialize full-screen toggle
  container.delegate(".top-controls .btn-full-screen", "click", toggleFullScreen);

  // initialize lib-info toggle
  container.delegate(".top-controls .btn-lib-info", "click", toggleLibInfo);
  
  // initialize scenario details
  $( ".scenario-container" ).click(toggleScenarioDetails);

  // initialize scenario select
  $("form#form-scenario-select").on('change', loadScenario);

  // initialize selector links
  $("a.impl-link").click(selectImplementation);

  /**
   * Toggles the full-screen mode for an implementation container.
   * @param  {object} e jQuery event that triggered the handler.
   */
  function toggleFullScreen(e) {
    $( e.currentTarget ).toggleClass("active");
    $( e.delegateTarget ).toggleClass("full-screen");
    container.not(e.delegateTarget).toggleClass("not-full-screen");
  }

  /**
   * Toggles the library information overlay.
   * @param  {object} e jQuery event that triggered the handler.
   */
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

  /**
   * Toggles the scenario details.
   * @param  {object} e jQuery event that triggered the handler.
   */
  function toggleScenarioDetails (e) {
    if (e.target.nodeName !== "SELECT") {
      $(".scenario-details").slideToggle();
    }
  }

  /**
   * Resizes the .compare-container element on a 
   * window resize to fill the current screen height.
   */
  function resizeFullHeight() {
    $( ".compare-container" ).height( $( window ).height() - $( ".navbar" ).height() - $( "select#form-scenario-select" ).height() );
  }

  function loadScenario() {    
    var id = $("form#form-scenario-select select").val();
    window.location.replace("/scenarios/" + id + "/compare");
  }

  /**
   * Sets the implementation in the select element when
   * a library was loaded from the server.
   * @param  {object} e jQuery event that triggered the handler. 
   */
  function selectImplementation (e) {
    var link = $(e.currentTarget),
        id = link.data("id"),
        i = link.data("index");
    $("#container-" + i + " .form-impl-select select" ).val(id);
  }
};