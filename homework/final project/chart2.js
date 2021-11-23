d3.select("#chart2")
  .on("mousemove", function() {
    var tooltip = d3.select("#tooltip")
      .style("display", "block")
      .style("top", d3.event.pageY + 20 + "px")
      .style("left", d3.event.pageX + 20 + "px")
    
    tooltip.select("#title").html("A Chart Here");
    tooltip.select("#value").html("");
    // tooltip.select("#title")

    //   .("Welcome to the first chart!");
  })
  .on("mouseout", function() {
    d3.select("#tooltip")
      .style("display", "none");
  });