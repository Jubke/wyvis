
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "scenario",
    defaults = {
      propertyName: "value"
    };

    // The actual plugin constructor
    function Scenario ( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options) ;

      this._defaults = defaults;
      this._name = pluginName;

      _private.apply(this);
      this.init();
    }

    var _private = function () {

    };

    Scenario.prototype.init = function () {
      
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if ( !$.data(this, "plugin_" + pluginName )) {
          $.data( this, "plugin_" + pluginName,
            new Scenario( this, options ));
        }
      });
    };

  })( jQuery, window, document );