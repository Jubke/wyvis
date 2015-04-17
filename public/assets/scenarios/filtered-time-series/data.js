var datahub = (function(DataHub){

  'use strict';
  var chance, template, datahub;
  
  // seed a chance instance
  // => results in the same data each time
  chance =  new Chance(43);

  // template for each new data point
  template = {
    // add 1-2 days to the previous date
    date: function (pre) {
      return moment(pre).add(chance.integer({min: 12, max: 48}), 'hours').valueOf();
    },
    // previous weight +/- 10, within range 0 to 333
    weight: function (pre) {
      return chance.integer({
                min: Math.max(pre - 10, 0),
                max: Math.min(pre + 10, 350),
              });
    },
    // 5% chance to switch experiment
    experiment_id: function(pre) {
      return chance.weighted([pre,chance.pick(["ex-4389","ex-2035"])],[90,10]);
    }
  };

  // the basic structure & initial values
  // 4 series, random weight, two possible experiments
  // all initialised with our template as tweak 
  datahub = new DataHub([
    {
      name: "sample",
      tweak: template,
      copies: 3,
      data: [
        {
          sample_id: function() { return chance.guid(); },
          substance: function() { return chance.pick(["C14H9BrF3NO","C15H22O5S"]); },
          date: function() { return +moment(); },
          weight: function() { return chance.integer({ min: 7, max: 333}); },
          experiment_id: function() { return chance.pick(["ex-4389","ex-2035"]); },
        }
      ]
    }
  ]);
  
  // generates 999 new points each
  // each series now holds 1000 weight measurement points
  datahub.generatePoints(999);

  // return the datahub to the global variable
  return datahub;
})(DataHub);
