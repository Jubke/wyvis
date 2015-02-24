;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "wyvis",
  defaults = {
    target_id: 'usecase-app',
    code_wrapper_class: 'code-wrapper',
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

    // initialize the editor plugin
    this.$code.editor();
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
    var cb_this = this;
    // add css live updates
    this.$element.on('css.change', function (e, styles) {
      cb_this.frame.injectStyles(styles);
    });

    // initialize redraw button
    this.$element.delegate('#redraw', 'click', function (e) {
      var scripts = cb_this.editor.getScripts();
      $.each(scripts, function (i, script) {
        cb_this.frame.injectScript(script);
      });
      cb_this.frame.redraw();
    });

    // initialize reset button
    this.$element.delegate('#reset', 'click', function (e) {
      cb_this.frame.injectScript(cb_this.usecase.javascript_content);
      cb_this.frame.injectScript(cb_this.implementation.javascript_content);
      cb_this.editor.reset();
      cb_this.frame.reset();
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

// var VisComp = (function ($) {

//   'use strict';

//   // default options
//   var defaults = {
//     target_id: 'usecase-app',
//     implementation_wrapper_class: 'implementation',
//     code_wrapper_class: 'code-wrapper',
//     visualization_wrapper_class: 'vis-wrapper',
//   };

//   // properties
//   var properties = {
//     implementations: [],
//   };


//   VisComp = $.extend(true, {}, VisComp, defaults, properties);

//   // private functions
//   // e.g. var myFunction = function () {}
  

//   /**
//    * Initialize all implementations being compared
//    * @param  {object} options hash of all components and the specific options
//    * @return {array}          [description]
//    */
//   VisComp.init = function (options) {

//     this.$target = $( '#' + this.target_id );
//     this.$implementations = this.$target.find('.' + VisComp.implementation_wrapper_class);

//     // fetch JSON representation of each implementations
    

//     // Initialize moduls for each implementation
//     $.each(this.$implementations, function (i, impl) {
//       var data = $( impl ).data("implementation");
//       data.$element = $( impl );
//       data.usecase = data.$element.data("usecase");
//       data.library = data.$element.data("library");

//       // buffer jQuery objects for each modul
//       data.$code = data.$element.find( '.' + VisComp.code_wrapper_class );
//       data.$visuals = data.$element.find( '.' + VisComp.visualization_wrapper_class );

//       // initialize the editor plugin
//       data.$code.editor();
//       data.editor = data.$code.data("plugin_editor");

//       // initialize the visualization plugin
//       data.$visuals.visualization();
//       data.vis = data.$visuals.data("plugin_visualization");

//       // add tabs to editor
//       data.editor.createTab(data.javascript_content, 'javascript', 'javascript');
//       data.editor.createTab(data.stylesheet_content, 'styles', 'css');
//       data.editor.createTab(data.usecase.javascript_content, 'data', 'javascript');

//       // set javascript as default tab
//       data.editor.setTab("javascript");

//       // add css live updates
//       data.$element.on('css.change', function (e, styles) {
//         data.vis.injectStyles(styles);
//       });

//       // initialize redraw button
//       data.$element.delegate('#redraw', 'click', function (e) {
//         var scripts = data.editor.getScripts();
//         $.each(scripts, function (i, script) {
//           data.vis.injectScript(script);
//         });
//         data.vis.redraw();
//       });

//       // initialize reset button
//       data.$element.delegate('#reset', 'click', function (e) {
//         data.vis.injectScript(data.usecase.javascript_content);
//         data.vis.injectScript(data.javascript_content);
//         data.editor.reset();
//         data.vis.reset();
//       });
//     });
//   };

//   return VisComp;
// }(jQuery));
