var chart;
var draw = function () {
  var highcharts_data = [],
      series  = datahub.getData();

  // preparing the data
  for(var name in series) {
    var data_points = [],
        data = series[name];

    for(var i = data.length - 1; i >= 0; i-- ) {
      data_points.unshift({x: data[i].date, y: data[i].weight, experiment: data[i].experiment_id});
    }

    highcharts_data.push({
      name: series[name][0].sample_id, 
      data: data_points,
    });
  }

  // draw the chart
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'vis',
      type: 'line',
      animation: true,
      zoomType: 'x'
    },
    title: {
      text: 'Simple Line Chart'
    },
    series: highcharts_data, // initial data point
    xAxis: {
      type: 'datetime'
    },
    tooltip: {
      valueSuffix: ' mol',
      pointFormat: '{series.name}<br/>weight: {point.y}<br/>experiment: {point.experiment}'
    }
  });

  function dash (e) {
    switch(e) {
    case "ex-4389":
      return 'dot';
    case "ex-2035":
      return 'solid';
    }
  }
};