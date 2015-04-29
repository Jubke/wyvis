var chart;
var draw = function () {
  var data = [],
      series = datahub.getData();

  $.each(series, function (key, ele) {
    data = data.concat(ele);
  });

  // draw the chart
  chart = AmCharts.makeChart("vis", {
    "type": "serial",
    "theme": "light",
    "pathToImages": "http://www.amcharts.com/lib/3/images/",
    "legend": {
        "useGraphSettings": true 
    },
    "dataProvider": data,
    "valueAxes": [{
      "id": "v1",
      "position": "left",
    },{
      "id": "v2",
      "position": "right"
    }],
    "graphs": [{
        "valueField": "temp",
        "valueAxis": "v2",
        "title": "Temperature",
    },{
        "valueField": "pressure",
        "valueAxis": "v1",
        "title": "Pressure",
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "t",
    "categoryAxis": {
        "minPeriod": "fff",
        "parseDates": true
    }
  });
};