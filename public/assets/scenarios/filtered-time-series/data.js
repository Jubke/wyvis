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
      return moment(pre).add(chance.integer({min: 1, max: 2}), 'days').valueOf();
    },
    // previous weight +/- 10, within range 0 to 333
    weight: function (pre) {
      return chance.integer({
                min: Math.max(pre - 10, 0),
                max: Math.min(pre + 10, 333),
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
      name: "sample_1",
      tweak: template,
      data: [
        {
          sample_id: "00123978",
          substance: "C14H9BrF3NO",
          date: +moment(),
          weight: chance.integer({min: 7, max: 333}),
          experiment_id: chance.pick(["ex-4389","ex-2035"])
        }
      ]
    },{
      name: "sample_2",
      tweak: template,
      data: [
        {
          sample_id: "00219383",
          substance: "C15H22O5S",
          date: +moment(),
          weight: chance.integer({min: 7, max: 333}),
          experiment_id: chance.pick(["ex-4389","ex-2035"])
        }
      ],
    },{
      name: "sample_3",
      tweak: template,
      data: [
        {
          sample_id: "00023455",
          substance: "C15H22O5S",
          date: +moment(),
          weight: chance.integer({min: 7, max: 333}),
          experiment_id: chance.pick(["ex-4389","ex-2035"])
        }
      ],
    },{
      name: "sample_4",
      tweak: template,
      data: [
        {
          sample_id: "01328501",
          substance: "C14H9BrF3NO",
          date: +moment(),
          weight: chance.integer({min: 7, max: 333}),
          experiment_id: chance.pick(["ex-4389","ex-2035"])
        }
      ],
    }
  ]);
  
  // generates 999 new points based on the seed
  // each series now holds 1000 weight measurement points
  datahub.generatePoints(999);

  // return the datahub to the global variable
  return datahub;
})(DataHub);

/**
 * @scenario    Filtered Time Series
 * @tasks       [overview, zoom, filter]
 * @data        [nD/Multidimensional, Temporal]
 * @type        [time series]
 * 
 * @author      Julian Luebke
 * @date        15-03-29
 */