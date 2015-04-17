;(function(DataHub) {

  "use strict";

  function Schedule (datahub, timeout, filter) {
    this.datahub = datahub;

    this.ID = this.datahub.schedules.getID;
    this.datahub.schedules.getID += 1;

    this.timeout = timeout || 1000;
    this.filter = filter;
    this.running = false;   
  }

  Schedule.prototype.run = function() {
    var that = this;
    setTimeout(function () {
      if(that.running) {
        that.datahub.callSeries(that.filter, "generatePoints");
        that.run();
      }
    }, this.timeout);
  };

  Schedule.prototype.stop = function() {
    this.running = false;
    this.datahub.schedules.running -= 1;
  };

  Schedule.prototype.start = function() {
    this.running = true;
    this.run(this);
    this.datahub.schedules.running += 1;
  };

  DataHub.Schedule = Schedule;
})(DataHub);