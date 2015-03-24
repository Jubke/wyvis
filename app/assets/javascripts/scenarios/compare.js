var App = App || {};

App.scenarios.compare = function() {
  // set the full window height
  resizeFullHeight();
  $( window ).on("resize", resizeFullHeight);

  // initialize full-screen toggle
  var container = $( ".implementation-container" );
  container.delegate(".top-controls .btn-full-screen", "click", toggleFullScreen);

  // initialize scenario select
  $("form#form-scenario-select").on('change', function() {
    var id = $("form#form-scenario-select select").val();
    window.location.replace("/scenarios/" + id + "/compare");
  });

  // initialize selectors
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