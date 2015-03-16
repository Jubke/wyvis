;(function () {

  var data = {
      "x" : new Date(),
      "y" : 100,
    };

  datahub.addData(data, true);

  datahub.defineTweak({
    y : function (pre) {
      return chance.integer({
        min: Math.max(pre - 5, 1), 
        max: Math.min(pre + 5, 200)
      });
    },
    x : function (pre) {
      return new Date();
    },
  });

  datahub.setInterval({timeout: 100});

})();