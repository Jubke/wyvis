
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "usecase",
    defaults = {
      propertyName: "value"
    };

    // The actual plugin constructor
    function Usecase ( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options) ;

      this._defaults = defaults;
      this._name = pluginName;

      _private.apply(this);
      this.init();
    }

    var _private = function () {

    };

    Usecase.prototype.init = function () {
      
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if ( !$.data(this, "plugin_" + pluginName )) {
          $.data( this, "plugin_" + pluginName,
            new Usecase( this, options ));
        }
      });
    };

  })( jQuery, window, document );