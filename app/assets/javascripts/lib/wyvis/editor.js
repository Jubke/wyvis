;(function ( $, window, document, undefined ) {

  'use strict';

  // variables
  var pluginName = "editor",
      self,
      defaults = {
        theme: 'chrome',
      };

  // constructor
  function Editor ( element, app, options ) {

    // self, different than this, is available through out the 
    // script pointing at the instance
    self = this;

    self.$element = $( element );
    self.app = app;
    self.options = $.extend( {}, defaults, options) ;

    self._defaults = defaults;
    self._name = pluginName;

    init();
    
  }
  


  //*****************
  // private methods
  //*****************
  

  /**
   * Initialize the editor instance and set basic options
   * @return {undefined}
   */
  var init = function () {

    self.tabs = {};

    build();

    self.ace = ace.edit( self.$textarea[0] );
    self.ace.setTheme('ace/theme/' + self.options.theme);
    self.ace.setOption("scrollPastEnd", 0.5);

    setUpListeners();
  
  };

  /**
   * Build editor elements
   * @return {undefined}
   */
  var build = function () {

    self.$textarea = $( '<textarea></textarea>' );
    self.$element.append(self.$textarea);
  
  };

  /**
   * Sets up the global event listeners
   */
  var setUpListeners = function() {

    $(app).on({
      'resetButton': self.resetTabs,
      'stylesButton javascriptButton dataButton': onTabChange,
      'injectAsset': onInject,
    });
  
  };

  /**
   * Called internally sets the hasPendingChange flag
   * and adds a class to the button
   * @param  {[String]} name Name of the tab that changed
   * @return {undefined}
   */
  var onChange = function(name) {

    if (!self.tabs[name].hasPendingChanges) {
      self.tabs[name].hasPendingChanges= true;
      self.tabs[name].$btn.addClass('changes-pending');
    }
  
  };

  /**
   * Listens for the 'injectAsset' event of the frame.
   * Marks tab as no longer pending.
   * @param  {Object} e    jQuery event object
   * @param  {string} name Name of the tab that has been resolved
   * @return {undefined}
   */
  var onInject = function(e, name) {

    self.tabs[name].hasPendingChanges = false;
    self.tabs[name].$btn.removeClass('changes-pending');
  
  };

  /**
   * Listens for the global 'tabChange' event. Sets the
   * appropriate tab as the current.
   * @param  {Object} e    jQuery event object
   * @param  {String} name Name of the tab to set active
   * @return {undefined}
   */
  var onTabChange = function(e, name) {

    self.setTab(name);
  
  };



  //*****************
  // public methods
  //*****************

  /**
   * Activates the editSession of the given ID
   * @param {integer} tab_id ID of the Tab to activate
   */
  Editor.prototype.setTab = function (name) {

    var tab = self.tabs[name];
    if (tab !== undefined) {
      self.ace.setSession( tab.session );
      $(".btn-editor-tab").removeClass("active");
      tab.$btn.addClass("active");
    }
  
  };

  /**
   * Create a new EditSession with the specified
   * document, name, label and mode.
   * @param  {String | Document} doc  Content of the created tab, 
   * @param  {String} name Label for the tab button, e.g. 'Press Me'
   * @param  {String} mode The documents content type, e.g. 'javascript', 'css'
   */
  Editor.prototype.createTab = function (doc, name, label, mode) {

    self.tabs[name] = {};
    self.tabs[name].mode = mode;
    self.tabs[name].doc = doc;    
    self.tabs[name].label = label;    
    // store the session object
    self.tabs[name].session = ace.createEditSession( doc, 'ace/mode/' + mode);
    // general settings
    self.tabs[name].session.setUseWorker(true);
    self.tabs[name].session.setTabSize(2);
    self.tabs[name].session.setUseWrapMode(true);

    // bubble change events
    self.tabs[name].session.on('change', function (e) {
      onChange(name);
      $(self).trigger( 'changeEditor', {
        name: name,
        doc: self.tabs[name].session.getValue()
      });
    });

    // add tab controlls
    var html = '<button id="' + name + '" class="btn btn-default btn-editor-tab" role="button">' + label + '</button>';
    self.tabs[name].$btn = $( html );
    $(".btn-group-editor").append(self.tabs[name].$btn);
  
  };

  /**
   * Restores the default documents passed to the tabs.
   * @return {undefined}
   */
  Editor.prototype.resetTabs = function () {

    $.each( self.tabs, function (name, tab) {
      tab.session.setValue(tab.doc);
    });
  
  };

  /**
   * Returns all the content of all tabs in mode 'javascript'.
   * @return {Array} Array of string objects with the content.
   */
  Editor.prototype.getScripts = function () {

    var scripts = [];
    $.each( self.tabs, function (name, tab) {
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