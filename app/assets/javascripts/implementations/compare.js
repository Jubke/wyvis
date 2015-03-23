var App = App || {};

App.implementations.compare = function() {
  // set the full window height
  resizeFullHeight();
  $( window ).on("resize", resizeFullHeight);

  // initialize full-screen toggle
  var container = $( ".implementation-container" );
  container.delegate(".top-controls .btn-full-screen", "click", toggleFullScreen);

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
    $( ".compare-container" ).height( $( window ).height() - $( ".navbar" ).height() );
  }
};