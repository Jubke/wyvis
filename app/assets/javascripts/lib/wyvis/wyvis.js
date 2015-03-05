;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "wyvis",
  defaults = {
    target_id: 'usecase-app',
    code_wrapper_class: 'code-wrapper',
    controls_wrapper_class: 'controls-wrapper',
    visualization_wrapper_class: 'vis-wrapper'
  };

  // The actual plugin constructor
  function Wyvis ( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    _private.apply(this);
    this.init();
  }

  var _private = function () {

  };

  Wyvis.prototype.init = function () {
    this.$element = $( this.element );

    // Try loading data inputs
    this.implementation = this.$element.data("implementation");
    this.usecase = this.$element.data("usecase");
    this.library = this.$element.data("library");
    
    // buffer jQuery objects for each modul
    this.$code = this.$element.find( '.' + this.options.code_wrapper_class );
    this.$visuals = this.$element.find( '.' + this.options.visualization_wrapper_class );
    this.$controls = this.$element.find( '.' + this.options.controls_wrapper_class);

    // initialize the editor plugin
    this.$code.editor( this );
    this.editor = this.$code.data("plugin_editor");

    // initialize the visualization plugin
    this.$visuals.frame();
    this.frame = this.$visuals.data("plugin_frame");

    // add tabs to editor
    this.editor.createTab(this.implementation.javascript_content, 'javascript', 'JS', 'javascript');
    this.editor.createTab(this.implementation.stylesheet_content, 'styles','CSS', 'css');
    this.editor.createTab(this.usecase.javascript_content, 'data', 'Data' , 'javascript');

    // set javascript as default tab
    this.editor.setTab("javascript");

    // cache this to use inside callback functions
    var that = this;

    // add css live updates
    this.$element.on('css.change', function (e, styles) {
      that.frame.injectStyles(styles);
    });

    // initialize redraw button
    this.$element.delegate('#redraw', 'click', function (e) {
      var scripts = that.editor.getScripts();
      that.frame.resetData();
      $.each(scripts, function (i, script) {
        that.frame.injectScript(script);
      });
      that.frame.callDraw();
    });

    // initialize reset button
    this.$element.delegate('#reset', 'click', function (e) {
      that.editor.reset();
      that.frame.refresh();
    });

    // intialize pause/play button
    this.$element.delegate('#toggle-pause', 'click', function (e) {
      $(e.currentTarget).toggleClass( 'active' );
      that.frame.togglePause();
    });
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