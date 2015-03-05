(function () {
  var data = {
    "nodes" : [
      {
        "name" : "Home"
      },
      {
        "name" : "Details"
      },
      {
        "name" : "Warenkorb"
      },
      {
        "name" : "Product XYZ"
      },
      {
        "name" : "Payment Details"
      },
      {
        "name" : "Aboard"
      },
      {
        "name" : "Finished"
      }
    ],
    "links" : [
      {
        "source" : 0,
        "target" : 1,
        "value" : 50
      },
      {
        "source" : 0,
        "target" : 2,
        "value" : 50
      },
      {
        "source" : 3,
        "target" : 2,
        "value" : 50
      },
      {
        "source" : 3,
        "target" : 5,
        "value" : 50
      },
      {
        "source" : 2,
        "target" : 4,
        "value" : 100
      },
      {
        "source" : 4,
        "target" : 5,
        "value" : 50
      },
      {
        "source" : 4,
        "target" : 6,
        "value" : 100
      },
      {
        "source" : 1,
        "target" : 4,
        "value" : 50
      }
    ]
  };


  dweak.addData(data, true);
  
  dweak.defineTweak({
    value : function (pre) {
      return chance.weighted([
        chance.integer({
          min: Math.max(pre - (pre * 0.2), 1), 
          max: Math.min(pre + (pre * 0.25), 500)
        }),
        pre
      ],[20,80]);
    },
  });

  dweak.setInterval({timeout: 1500});
})();