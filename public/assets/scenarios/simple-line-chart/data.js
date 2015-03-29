var datahub = (function (DataHub) {

  var template = {
    y : function (pre) {
      return chance.integer({
        min: Math.max(pre - 5, 1), 
        max: Math.min(pre + 5, 200)
      });
    },
    x : function (pre) {
      return moment().valueOf();
    },
  };

  var datahub = new DataHub({
      tweak: template,
      interval: true,
      timeout: 100,
      data: [{
        "x" : moment().valueOf(),
        "y" : 100        
      }]
    });

  return datahub;
})(DataHub);