;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "editor",
  defaults = {
    theme: 'chrome',
  };

  // The actual plugin constructor
  function Editor ( element, app, options ) {    
    this.$element = $( element );
    this.app = app;
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    _init.apply(this);
  }

  // private methods

  /**
   * Initialize the editor instance and set basic options
   * @return {undefined}
   */
  var _init = function () {
    this.tabs = {};

    _build.apply(this);

    this.ace = ace.edit( this.$textarea[0] );
    this.ace.setTheme('ace/theme/' + this.options.theme);
    this.ace.setOption("scrollPastEnd", 0.5);

  };

  /**
   * Build editor elements
   * @return {[type]} [description]
   */
  var _build = function () {
    // add the event handler
    var context = this;
    this.app.$controls.delegate('.btn-editor-tab', 'click', function (e) {
      var name = $( e.currentTarget ).attr("id");
      _setTab.call(context, name);
    });

    this.$textarea = $( '<textarea></textarea>' );
    this.$element.append(this.$textarea);
  };



  /**
   * Activates the editSession of the given ID
   * @param {integer} tab_id ID of the Tab to activate
   */
  var _setTab = function (name) {    
    var tab = this.tabs[name];
    if (tab !== undefined) {
      this.ace.setSession( tab.session );
      this.app.$controls.find(".btn-editor-tab").removeClass("active");
      tab.$btn.addClass("active");
    }
  };



  // public methods
  Editor.prototype.setTab = function (name) {
    _setTab.call(this, name);
  };

  /**
   * Create a new EditSession with the specified document, name and mode
   * @param  {String | Document} doc  Content of the created tab
   * @param  {String} name name by which the tab is labeled
   * @param  {String} mode document content type
   */
  Editor.prototype.createTab = function (doc, name, label, mode) {
    this.tabs[name] = {};
    this.tabs[name].mode = mode;
    this.tabs[name].doc = doc;    
    this.tabs[name].label = label;    
    // store the session object
    this.tabs[name].session = ace.createEditSession( doc, 'ace/mode/' + mode);
    // general settings
    this.tabs[name].session.setUseWorker(true);
    this.tabs[name].session.setTabSize(2);
    this.tabs[name].session.setUseWrapMode(true);


    // bubble style change events
    if(mode === 'css') {
      var context = this;
      this.tabs[name].session.on('change', function (e) {
        context.$element.trigger("css.wyvis", context.tabs[name].session.getValue());
      });
    }

    // add tab controlls
    var html = '<button id="' + name + '" class="btn btn-default btn-editor-tab" role="button">' + label + '</button>';
    this.tabs[name].$btn = $( html );
    this.app.$controls.find(".btn-group-editor").append(this.tabs[name].$btn);
  };

  Editor.prototype.setTab = function (name) {
    _setTab.call(this, name);
  };

  Editor.prototype.reset = function () {
    $.each( this.tabs, function (name, tab) {
      tab.session.setValue(tab.doc);
    });
  };

  Editor.prototype.getScripts = function () {
    var scripts = [];
    $.each( this.tabs, function (name, tab) {
      if( tab.mode == "javascript" ) {
        scripts.push(tab.session.getValue());
      }
    });
    return scripts;
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( app, options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Editor( this, app, options ));
      }
    });
  };

})( jQuery, window, document );