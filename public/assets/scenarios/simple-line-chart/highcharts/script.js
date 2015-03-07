var chart;
var draw = function () {
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'vis',
      type: 'line',
      animation: false,
    },
    title: {
      text: 'Simple Line Chart'
    },
    series: [{
      data: [dweak.getData()],
    }],
    xAxis: {
      type: 'datetime'
    },
  });

  // insert new data points
  function update (data_point) {
    var series = chart.series[0], // set series to add the point to
        shift = series.data.length > 200; // shift with > 200 points in the series
    
    series.addPoint(data_point, true, shift);
  }

  // call update on the new.data event
  $( dweak ).on("new.data", function (e, data) {
    update(data);
  });
};