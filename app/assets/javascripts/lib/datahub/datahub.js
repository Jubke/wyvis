;(function (window, $, Chance) {

  'use strict';

  // default options
  var DEFAULTS = {};

  // Constructor
  function DataHub (series, options) {
    if (!(this instanceof DataHub)) {
      return new DataHub(series, options);
    }
    
    this._options = $.extend(true, {}, DEFAULTS, options);

    this.series = {};

    this.interval = 0;
    this.mode = this.initSeries(series);
  }

  DataHub.prototype.initSeries = function(series) {
    // if series is a single object, 
    // DataHub will operate in Single Mode
    if ( !(series instanceof Array) && typeof series === 'object') {
      this.series = new DataHub.Series(this, series);
      return 'single';
    }

    // if series is a single object, 
    // DataHub will operate in Multi Mode
    if ( series instanceof Array ) {
      // create a Series for each element of the array
      for (var i = series.length - 1; i >= 0; i--) {
        this.series[series[i].name] = new DataHub.Series(this, series[i]);
      }
      return 'multi';
    }
  };

  DataHub.prototype.seriesToArray = function() {
    return $.map(this.series, function (value,index) {
      return [value];
    });
  };

  DataHub.prototype.callSeries = function(filter, call, args) {
    var data = {};

    switch (this.mode) {
    case 'single':

      data = this.series[call](args);

      break;
    case 'multi':

      for (var s in this.series) {
        if ( filter === undefined || (s === filter || $.inArray(s,filter) > -1) ) {
          data[s] = this.series[s][call](args);
        }
      }

      break;
    }

    return data;
  };

  DataHub.prototype.destroy = function() {
    this.clearInterval();
  };

  //*******************
  //* wrapper methods
  //*******************

  DataHub.prototype.generatePoints = function(numberOfPoints, filter) {
    var points = this.callSeries(filter, 'generatePoints', numberOfPoints);
    $(this).trigger('afterGeneratePoints', points);
    return  points;
  };

  DataHub.prototype.getData = function(filter) {
    return this.callSeries(filter, 'getData');
  };

  DataHub.prototype.getLatestData = function(filter) {
    return this.callSeries(filter, 'getLastPoint');
  };

  DataHub.prototype.setInterval = function(interval, filter) {
    return this.callSeries(filter, 'setInterval', interval);
  };

  DataHub.prototype.clearInterval = function(filter) {
    return this.callSeries(filter, 'clearInterval');
  };

  DataHub.prototype.toggleInterval = function(filter) {
    if (this.interval > 0) {
      this.clearInterval(filter);
    } else {
      this.setInterval(filter);
    }
  };

  DataHub.prototype.getTimeout = function(filter) {
    return this.callSeries(filter, 'getTimeout');
  };


  window.DataHub = DataHub;
})(window, jQuery, Chance);