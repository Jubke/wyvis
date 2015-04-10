var chart;
var draw = function () {
  var data = datahub.getData();

  // preparing the data
  for(var i = data.length - 1; i >= 0 ; i--) {
    data[i].x = moment(data[i].first_release + "-01-01").valueOf();
    data[i].category = data[i].name;
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
    series: [{
      name: 'Library Release Years',
      data: data
    }],
    xAxis: {
      type: 'datetime'
    },
    tooltip: {
    }
  });
};