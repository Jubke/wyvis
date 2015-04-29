var datahub = (function(DataHub){

  'use strict';
  var chance, template, datahub, starting_time;
  
  // seed a chance instance
  // => results in the same data each time
  chance =  new Chance(224);

  // template for each new data point
  template = {
    // add 1.5s to the previous date
    t: function (pre, obj) {
      return moment(pre).add(10, "s").valueOf();
    },
    // temperature curve
    temp: function (pre, obj) {
      if(pre < 450 && obj.heating) {
        return (pre + (450/pre) + chance.integer({min: -5, max:5}));
      } else {
        return (21 + ((pre - 21) * chance.floating({min: 0.99, max: 0.999, fixed: 6})));
      }
    },
    // pressure curve
    pressure: function(pre, obj) {
      if(obj.temp < 450 && obj.heating && pre <= 300) {
        return (1 + ((pre - 1) * chance.floating({min: 1.00001, max: 1.1, fixed: 6})));
      } else {
        return (1 + ((pre - 1) * chance.floating({min: 0.9, max: 0.99999, fixed: 6})));
      }
    },
    // switching from heating to cooling phase
    heating: function(pre, obj) {
      if (pre && obj.temp < 450) {
        return pre;
      } else if (pre && obj.temp >= 450) {
        return false;
      } else {
        return  pre;
      }
    }
  };


  starting_time = moment();
  // the basic structure & initial values
  // 9 series, room temp, standard pressure
  datahub = new DataHub([
    {
      name: "experiment",
      tweak: template,
      copies: 9,
      data: [
        {
          t: function () { 
            starting_time = starting_time.add(15,"d");
            return starting_time.valueOf();
          },
          temp: 21,
          pressure: 1.01325,
          heating: true
        }
      ]
    }
  ]);
  
  // generates 999 new points each
  // each series now holds 1000 data points
  datahub.generatePoints(999);

  // return the datahub to the global variable
  return datahub;
})(DataHub);
