# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
library_list = [
  ["AMCharts","1","SVG, VML","","","Firefox, Chrome, Safari, Opera and Internet Explorer (since v.9)","",2014,"3.12.0",1,"http://www.amcharts.com/javascript-charts/","JavaScript/HTML5 charts for most of your needs"  ],
  ["AnyChart","1","SVG","","Commercial Licensing","",2004,2014,"v7.3.0",0,"http://anychart.com/products/anychart7/overview/",""  ],
  ["Axiis","0","Adobe Flex","Degrafa graphics framework","MIT License","Browser independent",2009,2011,"Beta 1.1","","http://www.axiis.org/index.html","Axiis is an open source data visualization framework designed for beginner and expert developers alike."  ],
  ["Backbone.d3","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2013,"",0,"https://github.com/adroll/backbone.d3","backbone.d3 is a Backbone.js plugin that provides a set of reusable charts using the D3.js visualization library."  ],
  ["Birdeye","0","Adobe Flex","","MIT License","Browser independent","",2009,"","","https://code.google.com/p/birdeye/","BirdEye is a community project to advance the design and development of a comprehensive open source information visualization and visual analytics library for Adobe Flex."  ],
  ["C3.js","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2014,2014,"v0.4.8",1,"http://c3js.org","D3-based reusable chart library"  ],
  ["CanvasJS","1","Canvas","","CC BY-NC 3.0","Internet Explorer 6+, Chrome, Firefox 2+, Safari 3+ and Opera 9.5+","","","v1.5.7",0,"http://canvasjs.com/",""  ],
  ["Chart.js","1","Canvas","","MIT License","Modern browser, IE 9+",2013,2014,"v1.0.1 beta-4",0,"",""  ],
  ["Chartkick","1","SVG, VML, Canvas","GoogleCharts, Highcharts","MIT License","Internet Explorer 6.0 +, Firefox 2.0 +, Chrome 1.0 +, Safari 4.0 +, Opera 9.0 +, iOS (Safari) 3.0 +, Android Browser 2.0 + *)",2013,2014,"v1.3.0",0,"http://ankane.github.io/chartkick/","Create beautiful Javascript charts with one line of Ruby"  ],
  ["Cubism","1","SVG","D3","Apache License v2.0","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2014,"v1.6.0",2,"http://square.github.io/cubism/","Cubism.js is a D3 plugin for visualizing time series. Use Cubism to construct better realtime dashboards, pulling data from Graphite, Cube and other sources. Cubism is available under the Apache License on GitHub."  ],
  ["D3","1","SVG","","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2011,2014,"v3.5.2",1,"http://d3js.org","D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG and CSS."  ],
  ["d3.chart","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2014,"v0.2.1",1,"http://misoproject.com/d3-chart/","d3.chart is a framework for building reusable charts with d3.js."  ],
  ["Dance.js","1","SVG","Data.js","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2012,"v0.1.1",1,"http://bl.ocks.org/michael/2172216","Dance.js is dancing based on data. It's much like Backbone.js, but with a foundation for building interactive visualizations in the spirit of D3.js."  ],
  ["dc.js ","1","SVG","D3","Apache License v2.0","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2014,"v1.7.0",1,"http://dc-js.github.io/dc.js/","dc.js is a javascript charting library with native crossfilter support and allowing highly efficient exploration on large multi-dimensional dataset (inspired by crossfilter's demo)"  ],
  ["dhtmlxChart","1","Canvas, VML","","GNU GPL v2"," IE, FF, Safari, Opera, Chrome, or any other browsers based on Mozilla or the Webkit engine","","","v4.1",0,"http://dhtmlx.com/docs/products/dhtmlxChart/",""  ],
  ["Dimple","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2014,"v2.1.2",0,"http://dimplejs.org","The aim of dimple is to open up the power and flexibility of d3 to analysts. It aims to give a gentle learning curve and minimal code to achieve something productive. It also exposes the d3 objects so you can pick them up and run to create some really cool stuff."  ],
  ["dojo GFX","1","SVG, VML, Canvas","Dojo","BSD 3-Clause License","Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+","",2014,"1.10.3",0,"http://dojotoolkit.org/features/graphics-and-charting",""  ],
  ["DVL","1","SVG","D3","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2014,"",1,"https://github.com/vogievetsky/DVL","DVL is a free functionally reactive library written in JavaScript. DVL is based on the idea that data, not control flow is the most important aspect of a program focused on data visualization."  ],
  ["Dynamic-Graphs","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2013,"v0.2",2,"https://github.com/mlarocca/Dynamic-Charts","This is a high-level lib built on D3js to allow for easy and quick development of dynamically populated charts, especially thought to represent live, real-time data."  ],
  ["elycharts","1","SVG, VML","Raphael, jQuery","MIT License","Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+","",2014,"v2.1.5",0,"http://elycharts.com/",""  ],
  ["Ember Charts","1","SVG","D3, Ember","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2014,2014,"v0.3.0",1,"http://addepar.github.io/#/ember-charts/overview","It includes time series, bar, pie, and scatter charts which are easy to extend and modify."  ],
  ["Envision","1","Canvas","Flotr2, underscore.js, bean, bonzo","MIT License","Modern Browsers, IE 6+",2012,2014,"",1,"http://www.humblesoftware.com/envision","Envision.js is a library for creating fast, dynamic and interactive HTML5 visualizations."  ],
  ["Epoch","1","SVG, Canvas","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2014,"v0.6.0",2,"https://fastly.github.io/epoch/","A general purpose real-time charting library for building beautiful, smooth, and high performance visualizations."  ],
  ["Flot","1","Canvas","jQuery","MIT License","Internet Explorer 6+, Chrome, Firefox 2+, Safari 3+ and Opera 9.5+",2007,2014,"v0.8.3",2,"http://www.flotcharts.org","Flot is a pure JavaScript plotting library for jQuery, with a focus on simple usage, attractive looks and interactive features."  ],
  ["Flotr","1","Canvas","Prototype","MIT License","","","","v2.0.1","","https://code.google.com/p/flotr/","Flotr is a javascript plotting library based on the Prototype Javascript Framework 1.6+."  ],
  ["Flotr2","1","Canvas","","MIT License","FF, Chrome, IE6+, Android, iOS",2011,2014,"",0,"http://www.humblesoftware.com/flotr2/documentation","Flotr2 is a library for drawing HTML5 charts and graphs. It is a branch of flotr which removes the Prototype dependency and includes many improvements."  ],
  ["Fusioncharts","1","SVG, VML","","Commercial Licensing ","Modern Browsers, IE 6+",2006,2014,"v3.5.1",2,"http://www.fusioncharts.com","JavaScript charts for web & mobile"  ],
  ["Google Charts","1","SVG, VML","Google JSAPI API, Google Visualization library","Google Usage Terms","Internet Explorer 6.0 +, Firefox 2.0 +, Chrome 1.0 +, Safari 4.0 +, Opera 9.0 +, iOS (Safari) 3.0 +, Android Browser 2.0 + *)","","","",2,"https://developers.google.com/chart/interactive/docs/","Google Charts provides a perfect way to visualize data on your website. From simple line charts to complex hierarchical tree maps, the chart gallery provides a large number of ready-to-use chart types."  ],
  ["Graphene","1","SVG","D3,Backbone","","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2014,"",2,"http://jondot.github.io/graphene/","Dashboard Toolkit"  ],
  ["Highcharts","1","SVG, VML, Canvas","jQuery, Mootools, Prototype","CC BY-NC 3.0","Internet Explorer 6.0 +, Firefox 2.0 +, Chrome 1.0 +, Safari 4.0 +, Opera 9.0 +, iOS (Safari) 3.0 +, Android Browser 2.0 + *)",2009,2014,"v4.0.4",2,"http://www.highcharts.com","Create interactive charts easily for your web projects."  ],
  ["InfoVis","1","Canvas","","MIT License","",2009,2013,"v2.0.1",1,"http://philogb.github.io/jit/","The JavaScript InfoVis Toolkit provides tools for creating Interactive Data Visualizations for the Web."  ],
  ["Insights","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2013,"v0.12",0,"https://github.com/ignacioola/insights","A JavaScript library to visualize and navigate graphs"  ],
  ["JointJS/Rappid","1","SVG","","Commercial Licensing","",2009,2014,"",0,"http://jointjs.com/rappid/docs",""  ],
  ["JSNetworkX","1","SVG","D3","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2013,"v0.2.0",1,"http://felix-kling.de/JSNetworkX/index.html","JSNetworkX aims to bring graph processing to JavaScript, client- and server-side, and to provide an easy way to visualize graphs in the browser."  ],
  ["morris.js","1","SVG, VML","Raphael, jQuery","BSD 3-Clause License","Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+",2012,2014,"v0.5.1",0,"http://morrisjs.github.io/morris.js/",""  ],
  ["nvd3","1","SVG","D3","Apache License v2.0","Chrome, Firefox, Opera, Safari and Internet Explorer 10+",2013,2013,"v1.1.15 -beta",1,"http://nvd3.org","This project is an attempt to build re-usable charts and chart components for d3.js without taking away the power that d3.js gives you. This is a very young collection of components, with the goal of keeping these components very customizeable, staying away from your standard cookie cutter solutions."  ],
  ["Parallel Coordinates","1","SVG","D3","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2014,"v0.5.0",0,"http://syntagmatic.github.io/parallel-coordinates/","A visual toolkit for multidimensional detectives."  ],
  ["Polychart2.js","1","SVG, VML","Raphael","CC BY-NC 3.0","",2013,2013,"v1.2","","https://www.polychart.com","Think of Polychart as a visual lens on top of your database. Using its drag-and-drop interface, you can get the answers you need with just a few clicks."  ],
  ["Prefuse Flare","0","Adobe Flex","","BSD 3-Clause License","Browser independet with Plugin",2008,2009,"","","flare.prefuse.org","ActionScript library for creating visualizations that run in the Adobe Flash Player"  ],
  ["Protovis","1","SVG","","BSD 3-Clause License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2009,2010,"v3.3.1",0,"",""  ],
  ["Raphael","1","SVG, VML","eve, grunt","MIT License","Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+",2009,2013,"v2.1.2",0,"http://raphaeljs.com","JavaScript library that should simplify your work with vector graphics on the web"  ],
  ["Raw","1","SVG","D3","LGPL License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2014,"v1.0.2",0,"http://raw.densitydesign.org","The missing link between spreadsheets and vector graphics."  ],
  ["rCharts","0","","Polychart, Morris, NVD3, xCharts, HighCharts, Leaflet, Rickshaw","","","","","","","http://ramnathv.github.io/rCharts/","rCharts is an R package to create, customize and publish interactive javascript visualizations from R using a familiar lattice style plotting interface."  ],
  ["Rickshaw","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2014,"v1.5.1",2,"http://code.shutterstock.com/rickshaw/","is a JavaScript toolkit for creating interactive time series graphs."  ],
  ["sqPlot","1","SVG","jQuery ","MIT License","IE 7, IE 8, Firefox, Safari, and Opera",2009,2013,"v1.0.0b2",0,"http://www.jqplot.com/info.php","jqPlot is a plotting and charting plugin for the jQuery Javascript framework. jqPlot produces beautiful line, bar and pie charts with many features:"  ],
  ["svgware","1","SVG","","Freeware License","Chrome, Firefox, Opera, Safari, IE9+, and most mobile browsers (with full touch support)","","","v2.7.beta",0,"svgware.com","With SVGware, various two-dimensional interactive charts can be created easily."  ],
  ["vis.js","1","SVG","","MIT License","Chrome, Firefox, Opera, Safari, IE9+, and most mobile browsers (with full touch support)",2013,2014,"v3.7.2",0,"http://visjs.org/","is a dynamic, browser based visualization library. The library is designed to be easy to use, to handle large amounts of dynamic data, and to enable manipulation of and interaction with the data. The library consists of the components DataSet, Timeline, Network, Graph2d, and Graph3d."  ],
  ["Visual Sedimentation","1","SVG","D3, Box2DWeb","GNU GPL","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2013,2013,"",2,"http://www.visualsedimentation.org","VisualSedimentation.js is a JavaScript library for visualizing streaming data, inspired by the process of physical sedimentation."  ],
  ["xCharts","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2012,2012,"v0.3.0",2,"http://tenxer.github.io/xcharts/","xCharts is a JavaScript library for building beautiful and custom data-driven chart visualizations for the web using D3.js. Using HTML, CSS, and SVG, xCharts are designed to be dynamic, fluid, and open to integrations and customization."  ],
  ["ZingCharts","1","SVG","","Commercial Licensing","",2010,2014,"",2,"http://www.zingchart.com/","With dozens of chart types, hundreds of variations, and simple CSS-inspired styling, it's easy to make beautiful JavaScript charts with ZingChart"  ],
  ["d3plus","1","SVG","D3","MIT License","Firefox, Chrome, Safari, Opera, IE9+, Android and iOS",2014,2015,"v1.6.8","","http://d3plus.org","d3plus is an extension to the D3 library that allows fast and easy creation of data visualizations. "  ]
]

library_list.each do |l|
  Library.create( :name => l[0], :short => l[11], :description => l[11], :web_standard => l[1], :latest_version => l[8], :license => l[4], :support => l[5], :url => l[10] )
  
end
