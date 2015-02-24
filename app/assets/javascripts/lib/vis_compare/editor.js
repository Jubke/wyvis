;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "editor",
  defaults = {
    theme: 'chrome',
  };

  // The actual plugin constructor
  function Editor ( element, options ) {    
    this.$element = $( element );
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

    this.ace = ace.edit( this.$element.find("textarea").get(0) );
    this.ace.setTheme('ace/theme/' + this.options.theme);

    this.ace.on('change', function (e) {
      
    });
  };

  /**
   * Build editor elements
   * @return {[type]} [description]
   */
  var _build = function () {
    var html = '<div class="btn-group btn-group-sm" role="group"></div>';
    this.$controls = $(html);
    this.$element.prepend(this.$controls);

    // add the event handler
    var context = this;
    this.$controls.delegate('.btn', 'click', function (e) {
      var name = $( e.currentTarget ).attr("id");
      _setTab.call(context, name);
    });

    var $textarea = $( '<textarea></textarea>' );
    this.$element.append($textarea);
  };

  /**
   * Activates the editSession of the given ID
   * @param {integer} tab_id ID of the Tab to activate
   */
  var _setTab = function (name) {
    var tab = this.tabs[name];
    if (tab !== undefined) {
      this.ace.setSession( tab.session );
      this.$controls.find(".btn").removeClass("active");
      tab.$btn.addClass("active");
    }
  };

  var _buildTab = function (doc) {

  };

  // public methods

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

    // bubble style change events
    if(mode === 'css') {
      var context = this;
      this.tabs[name].session.on('change', function (e) {
        context.$element.trigger("css.change", context.tabs[name].session.getValue());
      });
    }

    // add tab controlls
    var html = '<button id="' + name + '" class="btn btn-default" role="button">' + label + '</button>';
    this.tabs[name].$btn = $( html );
    this.$controls.append(this.tabs[name].$btn);
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
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Editor( this, options ));
      }
    });
  };

})( jQuery, window, document );