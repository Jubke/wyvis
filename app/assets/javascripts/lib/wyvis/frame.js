;(function ( $, window, document, undefined ) {

  'use strict';

  // variables
  var pluginName = "frame",
      self,
      changes = {},
      defaults = {
        host: "http://localhost:5000",
        path: "",
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
      self.window = self.$iframe[0].contentWindow;
    });

    setUpListeners();
  
  };

  /**
   * Sets up event handlers for global events
   */
  var setUpListeners = function() {

    $( window ).on('message', receiveMessage);

    $( app ).on({
      'resetButton': self.refresh,
      'redrawButton': onRedraw,
      'changeEditor': onChange,
      'startButton pauseButton': self.toggleInterval,
    });
  
  };

  var receiveMessage = function(e) {

    if(e.source === self.window && e.origin === self.$iframe.attr("src")) {

    }

  };

  var sendMessage = function(message) {
    self.window.postMessage(message, "*");
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
      $( self ).trigger('pendingChanges' + self.options.id);
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
    $.publish('noPendingChanges' + self.options.id);

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

    sendMessage({
      type: 'injectStyles',
      content: styles
    });
    $.publish( 'injectAsset' + self.options.id , 'styles' );
  
  };

  /**
   * Injects the given script into the visualization frame.
   * @param  {String} name   Identifier of the contents.
   * @param  {String} script Content of the script to be injected.
   * @return {undefined}
   */
  Frame.prototype.injectScript = function (name, script) {

    sendMessage({
      type: 'injectScript',
      content: script
    });
    $.publish('injectAsset' + self.options.id, name);
  
  };

  /**
   * Calls the destroy() method on the data object in the frame.
   * @return {undefined}
   */
  Frame.prototype.destroyData = function () {

    sendMessage({
      type: 'destroyData',
    });
  
  };

  /**
   * Destroys the visualization in the frame.
   * @return {undefined}
   */
  Frame.prototype.destroyVisualization = function () {
    
    sendMessage({
      type: 'destroyVisualization',
    });

  };

  /**
   * Calls the Draw function in the frame.
   * @return {undefined}
   */
  Frame.prototype.callDraw = function () {

    sendMessage({
      type: 'draw',
    });
  
  };

  /**
   * Completely resets the frame by reinserting the source url.
   * @return {undefined}
   */
  Frame.prototype.refresh = function () {

    self.$iframe.attr("src", self.$iframe.attr("src"));
    $.publish('startInterval' + self.options.id);
  
  };

  /**
   * Toggles the interval on the data object in the frame.
   * @return {undefined}
   */
  Frame.prototype.toggleInterval = function () {

    sendMessage({
      type: 'toggleInterval',
    });
  
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( app, options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Frame( this, app, options ));
      }
    });
  };

})( jQuery, window, document );