;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "frame",
  defaults = {
    data_object: "datahub",
    draw_function: "draw"
  };

  // The actual plugin constructor
  function Frame ( element, options ) {    
    this.$element = $( element );
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    _init.apply(this);
  }

  // private methods

  /**
   * Initialize the frame instance and set basic options
   * @return {undefined}
   */
  var _init = function () {
    this.$iframe = this.$element.find( "iframe" );
    var context = this;
    this.$iframe.load(function () {
      _build.apply(context);
    });
  };

  /**
   * Build the controlls and setup event listeners
   * @return {[type]} [description]
   */
  var _build = function () {
    this.iframeWindow = this.$iframe[0].contentWindow;
    this.$document = $( this.iframeWindow.document );
    this.$contents = this.$iframe.contents();

    // prepare style container
    this.$styles = this.$contents.find("#styles");
    this.$vis = this.$contents.find("#vis");
  };

  // public methods
  /**
   * Inject css styles into the iframe of the Frame
   * @param  {[type]} styles Styles as pure Text
   * @return {[type]}        [description]
   */
  Frame.prototype.injectStyles = function (styles) {
    this.$styles.html(styles);
  };

  Frame.prototype.injectScript = function (script) {
    if ( this.iframeWindow.hasLoaded ) {
      this.iframeWindow.eval(script);
    } else {
      $( this.iframeWindow ).ready( function () { eval(script); } );
    }
  };

  Frame.prototype.destroy = function () {
    this.iframeWindow[this.options.data_object].destroy();

    var new_vis = $( "<div id='vis'></div>" );
    this.$vis.replaceWith(new_vis);
    this.$vis = new_vis;

    this.iframeWindow.$(document).off("new.data");
  };

  Frame.prototype.callDraw = function () {
    this.iframeWindow[this.options.draw_function]();
  };

  Frame.prototype.refresh = function () {
    this.$iframe.attr("src", this.$iframe.attr("src"));
  };

  Frame.prototype.togglePause = function (e) {
    this.iframeWindow[this.options.data_object].toggleInterval();
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Frame( this, options ));
      }
    });
  };

})( jQuery, window, document );