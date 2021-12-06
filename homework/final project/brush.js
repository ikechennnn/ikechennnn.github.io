if(!d3.chart) d3.chart = {};

d3.chart.brush = function() {
  var g;
  var data;
  var width = 600;
  var height = 30;
  var dispatch = d3.dispatch(chart, "filter");

  function chart(container) {
    g = container;
    
    var extent = d3.extent(data, function(d) {
      return d.Year
    })

    // var yeardata = data.forEach(function(d) {
    //   return d.Year;
    // });
    // console.log(yeardata);

    var scale = d3.scaleOrdinal()
      .domain(extent)
      .range([0, width])

    var brush = d3.brushX()
                  .extent([[0, 0], [width, height]]);
    brush(g);
    g.selectAll("rect").attr("height", height);
    g.selectAll(".background")
      .style("fill","#fff");
    g.selectAll(".extent")
      .style("fill","#ddd");
    g.selectAll(".resize rect")
      .style("fill","#000");

    var rects = g.selectAll("rect.events")
    .data(data)
    rects
      .attr("x", function(d) { return scale(d.Year);})
      .attr("y", 0)
      .attr("width", 2)
      .attr("height", height)
      .style("pointer-events", "none")
      .style("fill", "aqua")
      

    rects.exit().remove()

    brush.on("end", function() {
      var ext = brush.extent()
      var filtered = data.filter(function(d) {
        return (d.Year > ext[0] && d.Year < ext[1])
      })
      g.selectAll("rect.events")
      .style("stroke", "")
      
      g.selectAll("rect.events")
      .data(filtered, function(d) { return d.id })
      .style("stroke", "#999")

      //emit filtered data
      dispatch.filter(filtered)
    })

    var axis = d3.axisBottom(scale)
    // .scale(scale)
    // .orient("bottom")
    // .tickValues([new Date(extent[0]), new Date(extent[0] + (extent[1] - extent[0])/2) , new Date(extent[1])])
    // .tickFormat(d3.time.format("%x %H:%M"))

    var agroup = g.append("g")
    agroup.attr("transform", "translate(" + [0, height] + ")")
    axis(agroup)
    agroup.selectAll("path")
      .style({ fill: "none", stroke: "#ddd"})
    agroup.selectAll("line")
      .style({ stroke: "#000"})
  }

  chart.highlight = function(data) {
    var rects = g.selectAll("rect.events")
    .style("stroke", "")
    .style("stroke-width", "")

    rects.data(data, function(d) { return d.id })
    .style("stroke", "black")
    .style("stroke-width", 1)
  }

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