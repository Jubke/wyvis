var datahub = (function(DataHub){

  var template = {
    date: function (pre) {
      return moment(pre).add(chance.integer({min: 1, max: 2}), 'days').valueOf();
    },
    weight: function (pre) {
      return chance.integer({
                min: Math.max(pre - 10, 0),
                max: Math.min(pre + 10, 333),
              });
    },
    experiment_id: function(pre) {
      return chance.weighted([pre,chance.pick(["ex-4389","ex-2035"])],[90,10]);
      }
  };


  var datahub = new DataHub([
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
    }
  ]);

  datahub.generatePoints(999);

  return datahub;
})(DataHub);