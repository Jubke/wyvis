var chart;
var draw = function () {
  var categories = {category: ""},
      dataset = [],
      series  = datahub.getData();

  // preparing the data
  for(var name in series) {
    var pres = {"seriesname": name + " pressure", data: []},
        temps = {"seriesname": name + " temperature", data: []},
        times = "";
        data = series[name];

    // Highcharts expects an x and y value for each data point
    for(var i = data.length - 1; i >= 0; i-- ) {
      times = times + "|" + moment(data[i].t).format("MMMM DD YY, h:mm:ss");
      temps.data = temps.data + "|" + data[i].temp;
      pres.data = pres.data + "|" + data[i].pressure;
    }

    categories.category = categories.category + "|" + times;
    dataset.push(temps,pres);

  }

  console.log(categories);
  console.log(dataset);

  FusionCharts.ready(function () {
    var visitChart = new FusionCharts({
        "type": "zoomline",
        "renderAt": "vis",
        "width": "100%",
        "height": "100%",
        "dataFormat": "json",
        "dataSource":  {
            "chart": {
                "yaxisname": "Unique Visitors",
                "xaxisname": "Date",
                "yaxisminValue": "800",
                "yaxismaxValue": "1400",
                "forceAxisLimits" : "1",
                "pixelsPerPoint": "0",
                "pixelsPerLabel": "30",
                "lineThickness": "1",
                "compactdatamode" : "1",
                "dataseparator" : "|",
                "labelHeight": "30",
                "theme": "fint"
            },
            "categories": [categories],
            "dataset": dataset
        }
    });
    visitChart.render();
});
};