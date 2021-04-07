// Init

// samples();

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  })
}

function namesBelly(Belly){
d3.json("../../data/samples.json").then(function(data) {
let new_plot = true;
if (Belly.length == 0){
  let Belly_1 = data.names[0];
  console.log(Belly_1)
  var Selection_Samples = data["samples"].filter(function(sample) {
  return sample.id == Belly_1;
  });
  var Selection_metadata = data["metadata"].filter(function(meta) {
    return meta.id == Belly_1;
  });
  console.log(Selection_Samples);
  console.log(Selection_metadata);
  // Print_Belly(Selection_metadata, Selection_Samples, new_plot)
} else{
    new_plot = false;
    console.log("new dato from funtion button")
    let New_Belly = Belly
    console.log(New_Belly)
    var Selection_Samples = data["samples"].filter(function(sample) {
      return sample.id == New_Belly;
      });
    var Selection_metadata = data["metadata"].filter(function(meta) {
      return meta.id == New_Belly;
    });
    console.log(Selection_Samples);
    console.log(Selection_metadata);
    // Print_Belly(Selection_metadata, Selection_Samples, new_plot)
}
Print_Belly(Selection_metadata, Selection_Samples, new_plot)

  //  var newData = data.
  let names = data.names;
  let select_ = d3.select("#selDataset");
  d3.select(this).text("");
  var option_ = select_
      // .attr("id", id )
      .attr("width", "10")
      .attr("class", "custom-select")
      // .attr('onchange','F_change("'+id+'")')
      .selectAll('option')
      .data(names).enter()
      .append('option')
      .text(function (d) { return d; });
      // console.log(names);
   });
  }

var init = ""
namesBelly(init);

function Print_Belly(params1, params2, plot) {
  console.log(params1)
  console.log(params2[0].sample_values)
  params2.sort()
  params1.sort()
  console.log(params1)
  console.log(params2[0].sample_values)
  console.log("new Plot? " + plot)
  
var sample_metadata1 = d3.select("#sample-metadata")
sample_metadata1.html("")
Object.entries(params1[0]).forEach(([key, value]) => {
  var Paragraph = sample_metadata1.append("p");
  Paragraph.text(`${key} : ${value}`)
  .attr("class","text-success")

});
// var text = unpack(params2[0],0)
// console.log(params2)
// var text = params2.map(row => row[0]) // .otu_labels;
// console.log(text);

var text = params2[0].otu_labels.sort().slice(0,10);
var x_axis = params2[0].sample_values.sort().slice(0,10);
var y_axis = params2[0].otu_ids.sort().slice(0,10);
console.log(x_axis)
console.log(y_axis)
console.log(text)

//  ========================================================
var trace1 = {
  x: x_axis,
  y: y_axis,
  type: 'bar',
  text: text,
  orientation: 'h',
  marker: {
    color: 'rgb(142,124,195)'
  }
};
console.log(trace1.x)

var data = [trace1];

var layout = {
  title: 'Belly Button',
  margin: { t: 30, l: 150 },
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: true,
  xaxis: {
    tickangle: -15
  },
  yaxis: {
    zeroline: true,
    gridwidth: 2
  },
  // bargap :0.05
};

if (plot) {
  Plotly.newPlot('bar', data, layout);
} else {
  // Note the extra brackets around 'x' and 'y'
  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("bar", "x", [trace1.x]);
  Plotly.restyle("bar", "y", [trace1.y]);
}
// Plotly.newPlot('bar', data, layout);
// // // Plotly.newPlot('sample-metadata', data);

}

// nombres("940");
function optionChanged(Belly) {
  console.log(Belly)

  namesBelly(Belly)
}


