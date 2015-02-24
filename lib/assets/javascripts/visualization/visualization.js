/**
 * visualization.js
 *
 * Build on top of chance.js by Victor Quinn
 * http://chancejs.com
 * 
 * (c) 2014 Julian Lübke
 * Distributed under MIT License
 */
(function () {
  "use strict";
  // Constants
  
  // Default options
  var defaults = {
    realtime_enabled: false,
    realtime_type: 'generate',
    realtime_interval: 1000,

    javascript_container: '#script-container',
    stylesheet_container: '#style-container',

    editor: "editor"
  };

  // Properties
  var properties = {
    original_javascript: "",
    javascript: "",

    original_stylesheet: "",
    stylesheet: "",

    origianl_data: "",
    data: ""
  };

  // Constructor
  function Visualization (options) {
    if (!(this instanceof Visualization)) {
        return new Visualization(options);
    }

    console.log(this);

    // Initialize chance
    this.chance = new Chance();

    // Initialize options
    this.options = extend(this, defaults, options, properties);

    // fetch the implementation specific files
    if (stylesheet_path) loadStylesheet(stylesheet_path);
    if (javascript_path) loadJavascript(javascript_path);
    if (data_path) loadData(data_path);

    // Setup the editor
    setupEditor();
    

    return this;
  }

  // Helper functions
  function extend(){
    for(var i=1; i<arguments.length; i++){
      for(var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  }

  function loadStylesheet(path) {
    if (path) {
      $.ajax({
        url: path,
        dataType: 'text',
        success: function (data) {
          this.original_stylesheet = this.stylesheet = data;
        }
      });
    }
  }

  function loadJavascript(path) {
    if (path) {
      $.ajax({
        url: path,
        dataType: 'text',
        success: function (data) {
          this.original_javascript = this.javascript = data;
        }
      });
    }
  }

  function loadData(path) {
    if (path) {
      $.ajax({
        url: path,
        dataType: 'text',
        success: function (data) {
          this.original_data = this.data = data;
        }
      });
    }
  }

  function setupEditor (argument) {
    if (this.options.editor === {}) return;

    this.editor.setTheme('ace/theme/github');
    this.editor.getSession().setMode('ace/mode/javascript');
  }
}());

