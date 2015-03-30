var chart;
var draw = function () {
  var highcharts_data = [],
      series  = datahub.getData();

  // preparing the data
  for(var name in series) {
    var data = series[name];

    // Highcharts expects an x and y value for each data point
    for(var i = data.length - 1; i >= 0; i-- ) {
      data[i].y = data[i].weight;
      data[i].x = data[i].date;
    }

    highcharts_data.push({
      name: series[name][0].sample_id, 
      data: data,
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
      text: 'Sample Weight History'
    },
    series: highcharts_data, // initial data point
    xAxis: {
      type: 'datetime'
    },
    tooltip: {
      valueSuffix: ' mol',
      pointFormat: 'sample: <b>{series.name}</b><br/>' +
                   'weight: <b>{point.y}</b><br/>' +
                   'experiment: <b>{point.experiment}</b><br/>' +
                   'subsatnce: <b>{point.substance}</b>'
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