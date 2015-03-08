;(function () {

  var data = {
      "x" : new Date(),
      "y" : 100,
    };

  dweak.addData(data, true);

  dweak.defineTweak({
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

  dweak.setInterval({timeout: 100});

})();