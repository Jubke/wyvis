;(function ( $, window, document, undefined ) {

  'use strict';

  // Create the defaults once
  var pluginName = "frame",
  defaults = {
    data_object: "datahub",
    draw_function: "draw"
  };

  // The actual plugin constructor
  function Frame ( element, wyvis, options ) {    
    this.$element = $( element );
    this.wyvis = wyvis;
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    init.apply(this);
  }

  // private methods

  /**
   * Initialize the frame instance and set basic options
   * @return {undefined}
   */
  var init = function () {
    this.$iframe = this.$element.find( "iframe" );
    var context = this;
    this.$iframe.load(function () {
      build.apply(context);
    });
  };

  /**
   * Build the controlls and setup event listeners
   * @return {[type]} [description]
   */
  var build = function () {
    this.iframeWindow = this.$iframe[0].contentWindow;
    this.$document = $( this.iframeWindow.document );
    this.$contents = this.$iframe.contents();

    // cache container
    this.$styles = this.$contents.find("#styles");
    this.$vis = this.$contents.find("#vis");

    this.updateStats();
  };

  // public methods
  /**
   * Fetches the stats from the iframe and updates
   * the values in the user interface
   */
  Frame.prototype.setStats = function(exe_time, avg_exe_time) {
    var $target = this.$element
                      .closest(".implementation-container")
                      .find(".drawing-stats");

    // round to two decimals for display
    exe_time = Math.round(exe_time * 100) / 100;
    $target.find(".exe.time").html("now executed in " + exe_time + " ms");
    
    // set avg if defined
    if (avg_exe_time) {
      // round to two decimals for display
      avg_exe_time = Math.round(avg_exe_time * 100) / 100;
      $target.find(".avg-exe.time").html("on avg. in " + avg_exe_time + " ms");
    }
  };

  Frame.prototype.getExecutionTime = function() {
    // get the execution time from frame
    var stats = this.iframeWindow.stats,
        exe_time = stats.endDraw - stats.beginDraw;

    return exe_time;
  };

  Frame.prototype.updateStats = function() {
    var exe_time = this.getExecutionTime();
    
    $.ajax({
      url: "/implementations/" + this.wyvis.implementation.id + "/add_stats",
      data: {
        implementation: {
          new_value: exe_time
        }
      },
      content: "script",
      method: "PUT",
      context: this
    }).success(function (data){
      var avg_exe_time = data.execution_time;
      this.setStats(exe_time, avg_exe_time);
    });

  };

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
  };

  Frame.prototype.callDraw = function () {
    this.iframeWindow.stats.beginDraw = this.iframeWindow.performance.now();
    // call draw function in iframe
    this.iframeWindow[this.options.draw_function]();
    this.iframeWindow.stats.endDraw = this.iframeWindow.performance.now();

    var exe_time = this.getExecutionTime();
    this.setStats(exe_time);
  };

  Frame.prototype.refresh = function () {
    this.$iframe.attr("src", this.$iframe.attr("src"));
  };

  Frame.prototype.togglePause = function (e) {
    this.iframeWindow[this.options.data_object].toggleInterval();
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( wyvis, options ) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName )) {
        $.data( this, "plugin_" + pluginName,
          new Frame( this, wyvis, options ));
      }
    });
  };

})( jQuery, window, document );