var chart;
var draw = function () {
  chart = AmCharts.makeChart("vis", {
    "type": "serial",
    "theme": "none",
    "dataProvider": datahub.getData(),
    "valueAxes": [{
        "position": "left",
        "title": "Values"
    }],
    "graphs": [{
        "valueField": "y"
    }],
    "categoryField": "x",
    "categoryAxis": {
        "minPeriod": "fff",
        "parseDates": true
    }
  });

  // insert new data points
  function update (data_point) {
    var series = chart.dataProvider; // set series to add the point to
        shift = series.length > 200; // true with > 200 points in the series
    series.push(data_point);
    
    chart.dataProvider = series;
    chart.validateData();

    if(shift) series.shift();
  }

  // call update on the new.data event
  $( datahub ).on("newPoint", function (e, data) {
    update(data);
  });
};