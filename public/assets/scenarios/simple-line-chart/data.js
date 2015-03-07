;(function () {

  var data = {
      "x" : new Date(),
      "y" : 100,
    };

  dweak.addData(data, true);

  dweak.defineTweak({
    y : function (pre) {
      return chance.integer({
        min: Math.max(pre - (pre * 0.02), 1), 
        max: Math.min(pre + (pre * 0.025), 200)
      });
    },
    x : function (pre) {
      return new Date();
    },
  });

  dweak.setInterval({timeout: 100});

})();