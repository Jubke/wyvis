;(function ( $, window, document, undefined ) {

  'use strict';

  // variables
  var pluginName = "frame",
      self,
      changes = {},
      defaults = {
        data_object: "datahub",
        draw_function: "draw",
      };

  // constructor
  function Frame ( element, options ) {

    // self, different than this, is available through out the 
    // script pointing at the instance
    self = this;

    self.$element = $( element );
    self.options = $.extend( {}, defaults, options) ;

    self._defaults = defaults;
    self._name = pluginName;

    init();
  
  }
  


  //*****************
  // private methods
  //*****************
  

  /**
   * Initialize the frame instance and set basic options
   * @return {undefined}
   */
  var init = function () {

    self.$iframe = self.$element.find( "iframe" );
    self.$iframe.load(function () {
      build();
    });

    setUpListeners();
  
  };

  /**
   * Build the controlls and setup event listeners
   * @return {[type]} [description]
   */
  var build = function () {

    self.iframeWindow = self.$iframe[0].contentWindow;
    self.$document = $( self.iframeWindow.document );
    self.$contents = self.$iframe.contents();

    // prepare style container
    self.$styles = self.$contents.find("#styles");
    self.$vis = self.$contents.find("#vis");
  
  };

  /**
   * Sets up event handlers for global events
   */
  var setUpListeners = function () {

    $.subscribe({
      'resetButton': self.refresh,
      'redrawButton': onRedraw,
      'changeEditor': onChange,
      'startButton pauseButton': self.toggleInterval,
    });
  
  };

  /**
   * Listens to the 'onChange' event emitted by the editor.
   * Depending on the type of content that has changed, 
   * the changed document is either buffered or directly 
   * injected.
   * @param  {Object} e    jQuery event object.
   * @param  {Object} data An object with two properties. 'data.name' holds the content identifier. 'data.doc' holds the changed document.
   * @return {undefined}
   */
  var onChange = function(e, data) {

    if(data.name === "styles") {
      self.injectStyles(data.doc);
    } else if (data.name === "javascript" || data.name === "data" ) {
      changes[data.name] = data.doc;
      $.publish('pendingChanges');
    }
  
  };

  /**
   * Callback for gloabl 'redrawButton' event. Detects which 
   * documents have changed and calls to destroy corresponding
   * scripts in the frame. Then injects the changed objects and
   * calls the draw functions to restart the visualization.
   * @param  {Object} e jQuery event object.
   * @return {undefined}
   */
  var onRedraw = function(e) {

    if(changes.data !== undefined) {
      self.destroyData();
      self.injectScript('data', changes.data);
    }

    self.destroyVisualization();
    if(changes.javascript !== undefined) {
      self.injectScript('javascript', changes.javascript);
    }

    self.callDraw();
    $.publish('noPendingChanges');

  };



  //*****************
  // public methods
  //*****************
  
  
  /**
   * Inject css styles into thevisualization frame.
   * @param  {[type]} styles Styles as pure Text
   * @return {[type]}        [description]
   */
  Frame.prototype.injectStyles = function (styles) {

    self.$styles.html(styles);
    $.publish( 'injectAsset', "styles" );
  
  };

  /**
   * Injects the given script into the visualization frame.
   * @param  {String} name   Identifier of the contents.
   * @param  {String} script Content of the script to be injected.
   * @return {undefined}
   */
  Frame.prototype.injectScript = function (name, script) {

    if ( self.iframeWindow.hasLoaded ) {
      self.iframeWindow.eval(script);
    } else {
      $( self.iframeWindow ).ready( function () { eval(script); } );
    }
    $.publish('injectAsset', name);
  
  };

  /**
   * Calls the destroy() method on the data object in the frame.
   * @return {undefined}
   */
  Frame.prototype.destroyData = function () {

    self.iframeWindow[self.options.data_object].destroy();
  
  };

  /**
   * Destroys the visualization in the frame.
   * @return {undefined}
   */
  Frame.prototype.destroyVisualization = function () {

    var new_vis = $( "<div id='vis'></div>" );
    self.$vis.replaceWith(new_vis);
    self.$vis = new_vis;

    self.iframeWindow.$(document).off("new.data");
  
  };

  /**
   * Calls the Draw function in the frame.
   * @return {undefined}
   */
  Frame.prototype.callDraw = function () {

    self.iframeWindow[self.options.draw_function]();
  
  };

  /**
   * Completely resets the frame by reinserting the source url.
   * @return {undefined}
   */
  Frame.prototype.refresh = function () {

    self.$iframe.attr("src", self.$iframe.attr("src"));
    $.publish('startInterval');
  
  };

  /**
   * Toggles the interval on the data object in the frame.
   * @return {undefined}
   */
  Frame.prototype.toggleInterval = function () {

    self.iframeWindow[self.options.data_object].toggleInterval();
  
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