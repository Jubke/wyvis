;(function(DataHub) {
  
  "use strict";
  /**
   * A series represents a set of data, that can be manipulated.
   * @class Series
   * @param {object} datahub The datahub object that manages this series.
   * @param {object} options An object holding additional options.
   */
  function Series (datahub, options) {
    options = options || {};

    this.datahub = datahub;
    this.name = options.name || "";
    this.data = options.data || [];
    this.tweak = options.tweak || {};

    this.timeout = options.timeout;
    this.interval = options.interval || false;
    this.intervalReference = null;

    if (this.interval) {
      this.setInterval(this.timeout);
    }
  }

  /**
   * Recursively generates a new object based on the target
   * and the specified twaek.
   * @param  {object} target The initial object that should serve as base.
   * @param  {object} tweak  The tweak specifies how values of the new object will be generated.
   * @return {object}        The newly constructed object.
   */
  var construct = function(target, tweak) {
    // is our tweak neither object (, array), nor function?
    if ( typeof tweak !== 'object' && typeof tweak !== 'function' ) {
      // then we just return that value
      return tweak;
    }

    // is tweak a function?
    if ( typeof tweak === 'function') {
      // then we evaluate the function, passing the 
      // current target, and return the result
      return tweak(target);
    }

    // tweak is either array or object
    // from here on we decide by the type of target

    // is the target an array?
    if (target instanceof Array) {
      var new_array = [];

      // if tweak is also an Array and is of length 1,
      // then that 1 element is passed as tweak 
      // to each element of the array target
      if(tweak instanceof Array && tweak.length === 1) {
        // we recursively call tweak for each element
        for (var i = target.length - 1; i >= 0; i--) {
          new_array.unshift( construct(target[i], tweak[0]) );
        }
      } 
      // or tweak is an object, then that object is
      // passed as tweak to each element of the target array
      else if (typeof tweak === 'object') {
        // we recursively call tweak for each element
        for (var j = target.length - 1; j >= 0; j--) {
          new_array.unshift( construct(target[j], tweak) );
        }
      }
      // in any other case something went wrong
      // we just return the previous value
      else {
        new_array = target;
      }

      return new_array;
    }
    
    // if we have reached this point our target
    // is an object and we can iterate its properties
    if (typeof target === 'object' && typeof tweak === 'object') {
      var new_target = {};

      for (var prop in target) {
        // for each property we check if there
        // is a tweak defined
        if (tweak[prop] !== undefined) {
          // enter recursion if so
          new_target[prop] = construct(target[prop], tweak[prop]);
        } 
        // if no tweak is defined we might have to deep copy
        else if ( target[prop] instanceof Array ) {
          // deep copy any arrays without defined tweak
          new_target[prop] = $.extend(true, [], target[prop]);
        
        } else if ( typeof target[prop] === 'object' ) {
          // deep copy any objects without defined tweak
          new_target[prop] = $.extend(true, {}, target[prop]);
        
        } else {
          // or pass on any symbols, numbers, strings
          new_target[prop] = target[prop];
        }
      }
      
      return new_target;
   }
   // I missed a case... lets return
   return target;
  };

  /**
   * Returns a deep copy of the data in this series
   * @method getData
   * @memberOf Series
   * @return {Array} The complete array of data points. Each object in the array represents a data point or column in a table.
   */
  Series.prototype.getData =  function() {
    return $.extend(true, [], this.data);
  };
  
  /**
   * Returns the point at 'index' from the data array.
   * @method getPointAt
   * @memberOf Series
   * @param  {int} index The index of the data point to return.
   * @return {object}   Data object at index index.
   */
  Series.prototype.getPointAt = function(index) {
    if(index < this.data.length) {
      return $.extend(true, {}, this.data[index]);
    } else {
      return 'false';
    }
  };

  /**
   * Returns the last data point from the data series.
   * This is just a wrapper for getPointAt(data.length-1).
   * @method getLastPoint
   * @memberOf Series
   * @return {object} Last data object in the series.
   */
  Series.prototype.getLastPoint = function() {
    return this.getPointAt(this.data.length - 1);
  };

  /**
   * Retruns the first data point from the data series.
   * This is just a wrapper for getPointAt(0).
   * @method getFirstPoint
   * @memberOf Series
   * @return {object} First data object in the series.
   */
  Series.prototype.getFirstPoint = function() {
    return this.getPointAt(0);
  };

  /**
   * Generates new points, each based on the last point. If no number of points is defined, one point is generated by default. The last generated point is returned.
   * @method generatePoints
   * @memberOf Series
   * @param  {integer} numberOfPoints The number of points to generate.
   * @return {object}                Returns the last generated data point.
   */
  Series.prototype.generatePoints = function(numberOfPoints) {
    numberOfPoints = numberOfPoints || 1;
    var last;

    // loop over da
    for (var i = numberOfPoints; i >= 1; i = i - 1) {
      // a generated point is alway based on 
      // the last point in the series
      var point = this.getLastPoint();

      // tweak the latest point to generate a new one
      point = construct(point, this.tweak);
      
      // add the point to the series
      this.data.push(point);

      // update last and fire 'newPoint' event
      last = this.getLastPoint();
      $(this.datahub).trigger("newPoint", last);
    }

    // Fire 'afterPoints' event and return the last point
    $(this.datahub).trigger("afterPoints", last);
    return last;
  };

  /**
   * Set an interval in which new data points are generated automatically.
   * @method setInterval
   * @memberOf Series
   * @param {integer} interval The timeout in milliseconds.
   * @return {integer} Returns the timeout that was set
   */
  Series.prototype.setInterval = function(timeout) {
    timeout = timeout || this.timeout || 1000;

    if( this.intervalReference !== null ) {
      this.clearInterval();
      this.setInterval(timeout);     
    } else {
      var that = this;
      this.intervalReference = window.setInterval(function() {
        that.generatePoints();
      }, timeout);
      this.timeout = timeout;
      this.datahub.interval += 1;
    }
    return this.intervalReference;
  };

  /**
   * Clears the interval currently set on this series.
   * @method clearInterval
   * @memberOf Series
   */
  Series.prototype.clearInterval = function() {
    if(this.intervalReference !== null) {
      window.clearInterval(this.intervalReference);
      this.intervalReference = null;
      this.datahub.interval -= 1;
    }
  };

  /**
   * Returns the timeout set on this series. This does 
   * not give any inforamtion whether an interval is set or not.
   * @method getTimeout
   * @memberOf Series
   * @return {integer} Timeout in milliseconds between automated point generation, if the interavl is set.
   */
  Series.prototype.getTimeout = function() {
    return this.timeout;
  };

  DataHub.Series = Series;
})(DataHub);