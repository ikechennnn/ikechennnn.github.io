if(!d3.chart) d3.chart = {};

d3.chart.symbol_map = function() {
  var g;
  
  var width = 400;
  var height = 400;
  var cx = 10;
  var size_scale = 30;
  var dispatch = d3.dispatch(chart, "hover");
    
  var projection = d3.geoMercator()
  // .translate([700, 230])
  // .scale([500]);
  .fitSize([chart1Width, chart1Height],Vis.data);
    
  function chart(container) {
    g = container;
    update();
  }
  
  chart.update = update;

    function update() {
      
     var symbols = g.selectAll("circle")
      .data(data);

      symbols.enter().append("circle")
            //  .attr("transform", function(d){
            //       return "translate(" + projection([+d.Longtitude,+d.Latitude]) + ")";
            //   })
            //   .attr("fill","red")
            //   .attr("r", 0.7)
      
     
      symbols
      .transition()
      .attr("cx", function(d) {
            return projection([d.Longtitude, d.Latitude])[0];
            })
      .attr("cy", function(d) {
            return projection([d.Longtitude, d.Latitude])[1];
            })
      .attr("r", 1)
      .style("fill", "red")
      .style("opacity", 0.75)
      .attr("class", "symbol")
      .attr("title", function(d) { return "Productivity for " + d.id + ": " + d.agprod; });
  
    
    symbols.exit()
      //.transition()
      .remove();
     

    symbols.on("mouseover", function(d) {
      d3.select(this).style("stroke", "black")
      dispatch.hover([d])
    })

    symbols.on("mouseout", function(d) {
      d3.select(this).style("stroke", "")
      dispatch.hover([])
    })
    }

  chart.highlight = function(data) {
        var symbols = g.selectAll("circle.symbol")
        .style("stroke", "")
        .style("stroke-width", "")
        
        symbols.data(data, key)
        .style("stroke", "black")
        .style("stroke-width", 3)
    }
  
    
  // change data/width/height
  chart.data = function(value) {
    if(!arguments.length) return data;
    data = value;
    return chart;
  }
  chart.width = function(value) {
    if(!arguments.length) return width;
    width = value;
    return chart;
  }
  chart.height = function(value) {
    if(!arguments.length) return height;
    height = value;
    return chart;
  }
    
   var key = function(d) {
        return d.id;
   };

  // achieve d3.rebind in v4
  function rebind(target, source) {
    var i = 1,
      n = arguments.length,
      method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }

  return rebind(chart, dispatch, "on");
}