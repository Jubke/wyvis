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

  // default options
  var DEFAULTS = {
        tweak: {
          backwards_allowed: true,
        },
        interval: {
          timeout: 1000,
          auto_switch_data: true,          
        }
      };

  // Constructor
  function DataHub (opts) {
    if (!(this instanceof DataHub)) {
      return new DataHub(opts);
    } 
    
    this._data = {};
    this._data_set = [];
    this._data_index = null;
    this._tweak_options = {};
    this._tweak_available = false;
    this._tweak_set = {};
    this._has_interval = false;
    this._interval = {
      id: null,
    };

    this._options = $.extend(true, {}, DEFAULTS, opts);
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
    this._data_set.push(data);

    if ( typeof(set_data) === 'boolean' && set_data ) {
      this.setData(this._data_set.length - 1);
    }
  };

  /**
   * Sets the active data object
   * @param {int} index of the data object in the data set array
   */
  DataHub.prototype.setData = function (index) {
    this._data_index = index;
    this._data = this._data_set[this._data_index];

    // Trigger global event for new data being set as current
    $( this ).trigger('new.data', [this.getData()]);
  };

  /**
   * Returns the active data
   * @return {Object} active data object
   */
  DataHub.prototype.getData = function () {
    var r = $.extend(true, {}, this._data);
    return r;
  };

  /**
   * Returns current datas index within the data set
   * @return {int} index
   */
  DataHub.prototype.getIndex = function () {
    return this._data_index;
  };

  /**
   * Returns the next data in the data_set
   * or tries to create the same if a tweak is available.
   * If neither applies the active data is returned.
   * @return {Object} a data object
   */
  DataHub.prototype.getNextData = function () {
    // if there is more data vailable,
    // return that data
    if (this._data_index + 1 <= this._data_set.length - 1) {
      this.setData(this._data_index + 1);
      return this.getData();
    } 
    // if no more data is available,
    // is there a tweak for the latest data?
    else if ( this._tweak_available ) {
      this.tweak();
      return this.getData();
    }
    // if neither is possible,
    // return the active data
    else {
      return this.getData();
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
    // return that data
    if (this._data_index - 1 >= 0) {
      this.setData(this._data_index - 1);
      return this.getData();
    } 
    // if no earlier data is available,
    // is there a tweak for the earliest data?
    else if ( this._tweak_available && this._tweak_options.backwards_allowed ) {
      this.tweak({backwards: true});
      return this.getData();
    }
    // if neither is possible,
    // return the active data
    else {
      return this.getData();
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
    this._tweak_options = $.extend(true, {}, this._options.tweak, opts);

    // create mixin from definitions
    // and prepare tweak_set
    var that = this;
    $.each(definitions, function (key, value) {
      var name = 'datahub_' + key,
          obj = {};

      obj[''+name] = value;
      chance.mixin(obj);

      that._tweak_set[key] = function (param) { return chance[name](param); };

      // we now have at least one definition so a tweak is available
      that._tweak_available = true;
    });

    return this._tweak_available;
  };

  /**
   * executes all tweaks defined in the tweak set
   * @param  {object} options additional objects to be set before execution
   * @return {object or boolean}  returns the tweaked data or 
   *                              false if no tweak is available         
   */
  DataHub.prototype.tweak = function (options) {
    var tweaked_data = false;

    if (this._tweak_available) {
      for (var key in this._tweak_set ) {
        tweaked_data = tweak(this._data, key, this._tweak_set[key]);
      }
    }

    return tweaked_data;
  };

  /**
   * Returns weather an automated tweak is scheduled
   * @return {boolean} true if set false otherwise
   */
  DataHub.prototype.hasInterval = function () {
    return this._has_interval;
  };

  /**
   * Returns the currently set timeout, if an interval is set
   * @return {[type]} [description]
   */
  DataHub.prototype.getIntervalTimeout = function () {
    if (this._has_interval) {
      return this._interval.timeout;
    } else {
      return false;
    }
  };

  DataHub.prototype.setInterval = function (opts) {
    var tweaked_data;

    this._interval = $.extend(true, {}, this._options.interval, this._interval, opts);

    var that = this;
    this._interval.id = window.setInterval( function () {
      tweaked_data = that.tweak();

      if (that._interval.auto_switch_data) {
        that.addData(tweaked_data, true);
      } else {
        that.addData(tweaked_data);
      }

      // trigger event for tweaked data
      $( this ).trigger('tweak.data');

    }, this._interval.timeout);

    this._has_interval = true;
  };

  DataHub.prototype.clearInterval = function () {
    window.clearInterval(this._interval.id);
    this._has_interval = false;
  };

  DataHub.prototype.toggleInterval = function () {
    if (this.hasInterval()) {
      this.clearInterval();
    } else {
      this.setInterval();
    }
  };

  DataHub.prototype.destroy = function () {
    this.clearInterval();
    
    $(this).off();

    this._data = {};
    this._data_set = [];
    this._data_index = null;
    this._tweak_options = {};
    this._tweak_available = false;
    this._tweak_set = {};
    this._has_interval = false;
    this._interval = {
      id: null,
    };
  };


  window.DataHub = DataHub;
  window.datahub = new DataHub();
})(window, jQuery, Chance);