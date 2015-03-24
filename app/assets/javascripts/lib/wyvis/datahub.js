/**
 * Build on top of chance.js: http://chancejs.com
 *
 * Provides some basic functionalities to easily create time series.
 * 
 * date: 2015/02
 * version: v1.0
 * author: Julian Lübke
 */

;(function (window, $, Chance) {

  'use strict';

  // variables
  var DEFAULTS = {
        tweak: {
          backwards_allowed: true,
        },
        interval: {
          timeout: 1000,
          auto_switch_data: true,          
        }
      };

  // constructor
  function DataHub (opts) {
    if (!(this instanceof DataHub)) {
      return new DataHub(opts);
    } 

    // self, different than this, is available through out the 
    // script pointing at the instance
    self = this;
    
    self._data = {};
    self._data_set = [];
    self._data_index = null;
    self._tweak_options = {};
    self._tweak_available = false;
    self._tweak_set = {};
    self._has_interval = false;
    self._interval = {
      id: null,
    };

    self._options = $.extend(true, {}, DEFAULTS, opts);
  
  }

  /**
   * Recursively searches an object and calls the 
   * mixin function on any node, where the key matches
   * @param  {object} node      object or array to search
   * @param  {string} key       name of the nodes to replace
   * @param  {function} nextValue(previous) returning the value to replace the previous
   * @return {int}           the number of values changed
   */
  function tweak(node, key, nextValue) {

    // is the object an array?
    if ( Object.prototype.toString.call(node) === "[object Array]" ) {
      // the current node can not hold the key of 
      // interest so we`ll tweak among array elements
      for (var i = node.length - 1; i >= 0; i--) {
        node[i] = tweak(node[i], key, nextValue);
      }

    // is the current node a object?  
    } else if ( typeof(node) === 'object' && node !== {} ) {

      // does the node have the key we are looking for?
      if ( node.hasOwnProperty(key) ) {
        // then apply the nextValue function
        node[key] = nextValue( node[key] );
      }

      // tweak among children, but not the key
      for (var prop in node) {
        if (prop !== key) node[prop] = tweak(node[prop], key, nextValue);
      }

    }
    // if neither apllies the current node
    // is a string or number and we go back up the tree
    return node;
  } 

  /**
   * Adds a new data object to the data set array
   * @param {Object} data object to be added to the end of the array
   */
  DataHub.prototype.addData = function (data, set_data) {

    self._data_set.push(data);

    if ( typeof(set_data) === 'boolean' && set_data ) {
      self.setData(self._data_set.length - 1);
    }
  
  };

  /**
   * Sets the active data object
   * @param {int} index of the data object in the data set array
   */
  DataHub.prototype.setData = function (index) {

    self._data_index = index;
    self._data = self._data_set[self._data_index];

    // Trigger global event for new data being set as current
    $( self ).trigger('new.data', [self.getData()]);
  
  };

  /**
   * Returns the active data
   * @return {Object} active data object
   */
  DataHub.prototype.getData = function () {

    var r = $.extend(true, {}, self._data);
    return r;
  
  };

  /**
   * Returns current datas index within the data set
   * @return {int} index
   */
  DataHub.prototype.getIndex = function () {

    return self._data_index;
  
  };

  /**
   * Returns the next data in the data_set
   * or tries to create the same if a tweak is available.
   * If neither applies the active data is returned.
   * @return {Object} a data object
   */
  DataHub.prototype.getNextData = function () {

    // if there is more data vailable,
    // return self data
    if (self._data_index + 1 <= self._data_set.length - 1) {
      self.setData(self._data_index + 1);
      return self.getData();
    } 
    // if no more data is available,
    // is there a tweak for the latest data?
    else if ( self._tweak_available ) {
      self.tweak();
      return self.getData();
    }
    // if neither is possible,
    // return the active data
    else {
      return self.getData();
    }
  
  };

  /**
   * Returns the previous data in the data_set
   * or tries to create the same if a backwards
   * tweak is available and allowed.
   * If neither applies the active data is returned.
   * @return {Object} data object
   */
  DataHub.prototype.getPreviousData = function () {

    // if there is earlier data vailable,
    // return self data
    if (self._data_index - 1 >= 0) {
      self.setData(self._data_index - 1);
      return self.getData();
    } 
    // if no earlier data is available,
    // is there a tweak for the earliest data?
    else if ( self._tweak_available && self._tweak_options.backwards_allowed ) {
      self.tweak({backwards: true});
      return self.getData();
    }
    // if neither is possible,
    // return the active data
    else {
      return self.getData();
    }
  
  };

  /**
   * Define the tweaks to be applied after
   * to alter the data and generate a new set of data
   * Definitions are chance.js mixin definitions.
   * See http://chancejs.com/#mixin
   * @param  {object} definitions Definitions object
   * @param  {object} opts        Additional options to be applied to all tweaks
   * @return {boolean}             returns the value of 'tweak_available'
   */
  DataHub.prototype.defineTweak = function (definitions, opts) {

    self._tweak_options = $.extend(true, {}, self._options.tweak, opts);

    // create mixin from definitions
    // and prepare tweak_set
    $.each(definitions, function (key, value) {
      var name = 'datahub_' + key,
          obj = {};

      obj[''+name] = value;
      chance.mixin(obj);

      self._tweak_set[key] = function (param) { return chance[name](param); };

      // we now have at least one definition so a tweak is available
      self._tweak_available = true;
    });

    return self._tweak_available;
  
  };

  /**
   * executes all tweaks defined in the tweak set
   * @param  {object} options additional objects to be set before execution
   * @return {object or boolean}  returns the tweaked data or 
   *                              false if no tweak is available         
   */
  DataHub.prototype.tweak = function (options) {

    var tweaked_data = false;

    if (self._tweak_available) {
      for (var key in self._tweak_set ) {
        tweaked_data = tweak(self._data, key, self._tweak_set[key]);
      }
    }

    return tweaked_data;
  
  };

  /**
   * Returns weather an automated tweak is scheduled
   * @return {boolean} true if set false otherwise
   */
  DataHub.prototype.hasInterval = function () {

    return self._has_interval;
  
  };

  /**
   * Returns the currently set timeout, if an interval is set
   * @return {[type]} [description]
   */
  DataHub.prototype.getIntervalTimeout = function () {

    if (self._has_interval) {
      return self._interval.timeout;
    } else {
      return false;
    }
  
  };

  /**
   * Set an interval after which new data is generated automatically
   * @param {Obejct} opts An object conaining possible options
   */
  DataHub.prototype.setInterval = function (opts) {

    var tweaked_data;

    self._interval = $.extend(true, {}, self._options.interval, self._interval, opts);

    self._interval.id = window.setInterval( function () {
      tweaked_data = self.tweak();

      if (self._interval.auto_switch_data) {
        self.addData(tweaked_data, true);
      } else {
        self.addData(tweaked_data);
      }

      // trigger event for tweaked data
      $( self ).trigger('tweak.data');

    }, self._interval.timeout);

    self._has_interval = true;
  
  };

  /**
   * Clears the interval to stop generating data automatically.
   * @return {undefined}
   */
  DataHub.prototype.clearInterval = function () {

    window.clearInterval(self._interval.id);
    self._has_interval = false;
  
  };

  /**
   * Starts or stops the interval depedning on the current state.
   * @return {undefined}
   */
  DataHub.prototype.toggleInterval = function () {

    if (self.hasInterval()) {
      self.clearInterval();
    } else {
      self.setInterval();
    }
  
  };

  /**
   * Completely resets the datahub to default values and
   * removes any open intervals.
   * @return {undefined}
   */
  DataHub.prototype.destroy = function () {

    self.clearInterval();
    
    $(self).off();

    self._data = {};
    self._data_set = [];
    self._data_index = null;
    self._tweak_options = {};
    self._tweak_available = false;
    self._tweak_set = {};
    self._has_interval = false;
    self._interval = {
      id: null,
    };
  
  };


  window.DataHub = DataHub;
  window.datahub = new DataHub();
})(window, jQuery, Chance);