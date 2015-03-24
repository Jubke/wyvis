;(function ( $, window, document, undefined ) {

  'use strict';

  // variables
  var pluginName = "wyvis",
      self,
      defaults = {
        target_id: 'scenario-app',
        code_wrapper_class: 'code-wrapper',
        controls_wrapper_class: 'controls-wrapper',
        visualization_wrapper_class: 'vis-wrapper'
      };

  // the constructor
  function Wyvis ( element, options ) {
    
    self = this;

    self.element = element;
    self.options = $.extend( {}, defaults, options) ;

    self._defaults = defaults;
    self._name = pluginName;

    init();
  
  }
  


  //*****************
  // private methods
  //*****************
  

  /**
   * Initializes all the main moduls for the implementation.
   * The data is retrieved from the main wrapper, editor and frame
   * moduls are intialized, tabs are created and defaults set.
   * @return {[type]} [description]
   */
  var init = function () {

    self.$element = $( self.element );

    // find data inputs
    self.implementation = self.$element.data("implementation");
    self.scenario = self.$element.data("scenario");
    self.library = self.$element.data("library");
    
    // buffer jQuery objects for each modul
    self.$code = self.$element.find( '.' + self.options.code_wrapper_class );
    self.$visuals = self.$element.find( '.' + self.options.visualization_wrapper_class );
    self.$controls = self.$element.find( '.' + self.options.controls_wrapper_class);

    // initialize the editor plugin
    self.$code.editor( self );
    self.editor = self.$code.data("plugin_editor");

    // initialize the frame plugin
    self.$visuals.frame();
    self.frame = self.$visuals.data("plugin_frame");

    // add tabs to editor
    self.editor.createTab(self.implementation.script, 'javascript', 'JS', 'javascript');
    self.editor.createTab(self.implementation.styles, 'styles','CSS', 'css');
    self.editor.createTab(self.scenario.script, 'data', 'Data' , 'javascript');

    // set javascript as default tab
    self.editor.setTab("javascript");

    setUpListeners();
    setUpControls();
  
  };

  /**
   * Sets up the event handlers.
   */
  var setUpListeners = function() {

    $.subscribe({
      'startButton': onPlay,
      'pauseButton': onPause,
      'pendingChanges': self.enableRedraw,
      'noPendingChanges': self.disableRedraw,
    });
  
  };

  /**
   * Sets up the events published on control interaction.
   */
  var setUpControls = function () {

    var $self = $(self);

    // initialize buttons
    self.$element.delegate('button', 'click', function(e){
      var type = $( e.currentTarget ).attr('id');
      $.publish(type + 'Button', type);
    });
  
  };

  /**
   * Sets the pause button to replace the play button.
   * @return {undefined}
   */
  var onPlay = function () {

    self.$controls.find("#start").attr("id", "pause");
  
  };

  /**
   * Sets the play button to replace the pause button.
   * @return {undefined}
   */
  var onPause = function () {

    self.$controls.find("#pause").attr("id", "start");
  
  };



  //*****************
  // public methods
  //*****************

  /**
   * Enables the redraw button.
   * @return {undefined}
   */
  Wyvis.prototype.enableRedraw = function() {

    self.$controls.find("#redraw").prop("disabled", false);
  
  };

  /**
   * Disables the redraw button.
   * @return {undefined}
   */
  Wyvis.prototype.disableRedraw = function() {

    self.$controls.find("#redraw").prop("disabled", true);
  
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Wyvis( this, options ));
      }
    });
  };

})( jQuery, window, document );
