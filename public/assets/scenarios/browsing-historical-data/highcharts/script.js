var chart;
var draw = function () {
  var highcharts_data = [],
      series  = datahub.getData();

  // preparing the data
  for(var name in series) {
    var pres = [],
        temps = [],
        data = series[name];

    // Highcharts expects an x and y value for each data point
    for(var i = data.length - 1; i >= 0; i-- ) {
      temps.unshift([data[i].t, data[i].temp]);
      pres.unshift([data[i].t, data[i].pressure]);
    }

    highcharts_data.push({
      name: name + " Temperatur", 
      data: temps,
      color: "steelblue",
      turboThreshold: 0,
      yAxis: 0
    });

    highcharts_data.push({
      name: name + " Pressure", 
      data: pres,
      color: "orange",
      turboThreshold: 0,
      yAxis: 1
    });
  }

  // draw the chart
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'vis',
      type: 'line',
      animation: true,
      zoomType: 'x',
      panning: true
    },
    series: highcharts_data, // initial data point
    xAxis: {
      type: 'datetime'
    },
    yAxis: [{
      type: 'linear',
      label: 'Temperature'
    },{
      type: 'linear',
      label: 'Pressure',
      opposite: true
    }
    ]
  });
};