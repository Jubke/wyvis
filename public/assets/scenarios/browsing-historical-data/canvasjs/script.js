var chart;
var draw = function () {
  var canvasjs_data = [],
      series  = datahub.getData();

  // preparing the data
  for(var name in series){
    var pres = [],
        temps = [],
        data = series[name];

    // Highcharts expects an x and y value for each data point
    for(var i = data.length - 1; i >= 0; i-- ) {
      temps.unshift({x: data[i].t, y: data[i].temp});
      pres.unshift({x: data[i].t, y: data[i].pressure});
    }

    canvasjs_data.push({
      title: name + " Temperatur",
      type: "line",
      color: "steelblue",
      dataPoints: temps,
      xValueType: "dateTime",
    });

    canvasjs_data.push({
      title: name + " Pressure",
      type: "line",
      color: "orange",
      axisYType: "secondary",
      dataPoints: pres,
      xValueType: "dateTime",
    });
  }

  var chart = new CanvasJS.Chart("vis",
    {
      axisY2: {
        title:"Pressure (bar)"
      },
      axisY: {
        title: "Temperatur (deg)"
      },
      zoomEnabled: true,
      data: canvasjs_data
    });

    chart.render();
};