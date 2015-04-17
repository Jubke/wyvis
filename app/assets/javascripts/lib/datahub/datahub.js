;(function (window, $, Chance) {

  'use strict';

  // default options
  var DEFAULTS = {},
      SINGLE_MODE = 0,
      MULTI_MODE = 1;

  // Constructor
  function DataHub (series, options) {
    if (!(this instanceof DataHub)) {
      return new DataHub(series, options);
    }
    
    this._options = $.extend(true, {}, DEFAULTS, options);

    this.series = undefined;
    this.mode = undefined;

    this.interval = 0;
    this.initSeries(series);
  }
  
  DataHub.prototype.initSeries = function(series) {

    // normalize the input
    if ( !(series instanceof Array) && typeof series === 'object') {
      series = [series];
    }

    // handle the array
    // note: if series is no array by now there is a mistake
    if ( series instanceof Array ) {

      // iterate over each series definition
      for (var i = series.length - 1; i >= 0; i--) {

        // check for the copies attribute
        var numberOfCopies = series[i].copies;
        if (typeof numberOfCopies === 'number' && numberOfCopies >= 1) {
          var duplicates = [];

          // duplicate the series
          duplicates = this.copySeries(series[i], numberOfCopies);

          duplicates.map(this.addSeries, this);
        
        } else {

          // since no numberOfCopies have to be made, create the series as is
          this.addSeries(series[i]);

        }
      }
    }
  };

  DataHub.prototype.copySeries = function (series, numberOfCopies) {
    var copies = [];

    // the series is supposed to be duplicated 
    // into the number of series specified by numberOfCopies
    for (var i = numberOfCopies; i >= 0; i--) {

      copies.unshift({
        name: series.name + "_" + i,
        tweak: series.tweak,
        interval: series.interval,
        timeout: series.timeout,
        data: this.construct(series.data,series.data)
      });

    }

    return copies;
  };

  DataHub.prototype.addSeries = function(series) {
    switch(this.mode) {

    case SINGLE_MODE:
      var first_series = this.series;
      this.series = {};
      this.series[first_series.name] = first_series;
      this.series[series.name] = new DataHub.Series(this, series);
      this.mode = MULTI_MODE;
      break;

    case MULTI_MODE:
      this.series[series.name] = new DataHub.Series(this, series);
      break;

    case undefined:
      this.series = new DataHub.Series(this, series);
      this.mode = SINGLE_MODE;
      break;

    }
    
    return series.name;
  };

  DataHub.prototype.seriesToArray = function() {
    return $.map(this.series, function (value,index) {
      return [value];
    });
  };

  DataHub.prototype.callSeries = function(filter, call, args) {
    var data = {};

    switch (this.mode) {
    case SINGLE_MODE:

      data = this.series[call](args);

      break;
    case MULTI_MODE:

      for (var key in this.series) {
        if ( filter === undefined || (key === filter || $.inArray(key,filter) > -1) ) {
          data[key] = this.series[key][call](args);
        }
      }

      break;
    case undefined:
      return null;
    }

    return data;
  };

  /**
   * Recursively generates a new object based on the current
   * and the specified twaek.
   * @param  {object} current The initial object that should serve as base.
   * @param  {object} tweak  The tweak specifies how values of the new object will be generated.
   * @return {object}        The newly constructed object.
   */
  DataHub.prototype.construct = function(current, tweak, original) {
    original = original || current;

    // is our tweak neither object (, array), nor function?
    if ( typeof tweak !== 'object' && typeof tweak !== 'function' ) {
      // then we just return that value
      return tweak;
    }

    // is tweak a function?
    if ( typeof tweak === 'function') {
      // then we evaluate the function, passing the 
      // current current, and return the result
      return tweak(current, original);
    }

    // tweak is either array or object
    // from here on we decide by the type of current

    // is the current an array?
    if (current instanceof Array) {
      var new_array = [];

      // if tweak is also an Array and is of length 1,
      // then that 1 element is passed as tweak 
      // to each element of the array current
      if(tweak instanceof Array && tweak.length === 1) {
        // we recursively call tweak for each element
        for (var i = current.length - 1; i >= 0; i--) {
          new_array.unshift( this.construct(current[i], tweak[0], original) );
        }
      }
      // or tweak is an array with the same length,
      // then current and tweak elements are mapped
      else if (tweak instanceof Array && tweak.length === current.length) {
        // we recursively call tweak for each element
        for (var j = current.length - 1; j >= 0; j--) {
          new_array.unshift( this.construct(current[j], tweak[j], original) );
        }
      }
      // or tweak is an object, then that object is
      // passed as tweak to each element of the current array
      else if (typeof tweak === 'object') {
        // we recursively call tweak for each element
        for (var k = current.length - 1; k >= 0; k--) {
          new_array.unshift( this.construct(current[k], tweak, original) );
        }
      }
      // in any other case something went wrong
      // we just return the previous value
      else {
        new_array = current;
      }

      return new_array;
    }
    
    // if we have reached this point our current
    // is an object and we can iterate its properties
    if (typeof current === 'object' && typeof tweak === 'object') {
      var new_current = {};

      for (var prop in current) {
        // for each property we check if there
        // is a tweak defined
        if (tweak[prop] !== undefined) {
          // enter recursion if so
          new_current[prop] = this.construct(current[prop], tweak[prop], original);
        }
        // if no tweak is defined we might have to deep copy
        else if ( current[prop] instanceof Array ) {
          // deep copy array
          new_current[prop] = $.extend(true, [], current[prop]);
        
        } else if ( typeof current[prop] === 'object' ) {
          // deep copy object
          new_current[prop] = $.extend(true, {}, current[prop]);
        
        } else {
          // or pass on any symbols, numbers, strings
          new_current[prop] = current[prop];
        }
      }
      
      return new_current;
   }
   
   // There are still unattended cases?! Lets return...
   return current;
  };

  DataHub.prototype.destroy = function() {
    this.clearInterval();
  };

  DataHub.prototype.toggleInterval = function(filter) {
    if (this.interval > 0) {
      this.clearInterval(filter);
    } else {
      this.setInterval(filter);
    }
  };

  //*******************
  //* wrapper methods
  //*******************

  DataHub.prototype.getData = function(filter) {
    return this.callSeries(filter, 'getData');
  };

  DataHub.prototype.getLatestData = function(filter) {
    return this.callSeries(filter, 'getLastPoint');
  };

  DataHub.prototype.generatePoints = function(numberOfPoints, filter) {
    var points = this.callSeries(filter, 'generatePoints', numberOfPoints);
    $(this).trigger('afterGeneratePoints', points);
    return  points;
  };

  DataHub.prototype.setInterval = function(timeout, filter) {
    return this.callSeries(filter, 'setInterval', timeout);
  };

  DataHub.prototype.clearInterval = function(filter) {
    return this.callSeries(filter, 'clearInterval');
  };

  DataHub.prototype.getTimeout = function(filter) {
    return this.callSeries(filter, 'getTimeout');
  };


  window.DataHub = DataHub;
})(window, jQuery, Chance);