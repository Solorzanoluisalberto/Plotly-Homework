// Init

// samples();

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  })
}

function namesTest(Test){
d3.json("../../data/samples.json").then(function(data) {
let new_plot = true;
if (Test.length == 0){
  let Test_1 = data.names[0];
  console.log(Test_1)
  var Selection_Samples = data["samples"].filter(function(sample) {
  return sample.id == Test_1;
  });
  var Selection_metadata = data["metadata"].filter(function(meta) {
    return meta.id == Test_1;
  });
  console.log(Selection_Samples);
  console.log(Selection_metadata);
  // Print_Test(Selection_metadata, Selection_Samples, new_plot)
} else{
    new_plot = false;
    console.log("new dato from funtion button")
    let New_Test = Test
    console.log(New_Test)
    var Selection_Samples = data["samples"].filter(function(sample) {
      return sample.id == New_Test;
      });
    var Selection_metadata = data["metadata"].filter(function(meta) {
      return meta.id == New_Test;
    });
    console.log(Selection_Samples);
    console.log(Selection_metadata);
    // Print_Test(Selection_metadata, Selection_Samples, new_plot)
}
Print_Test(Selection_metadata, Selection_Samples, new_plot)

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
namesTest(init);

function Print_Test(params1, params2, plot) {
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

var text = params2[0].otu_labels.slice(0,10).reverse();
var x_axis = params2[0].sample_values.slice(0,10).reverse();
var y_axis = params2[0].otu_ids.slice(0,10).map(ID => `OTU → ${ID}`).reverse();
console.log(x_axis)
console.log(y_axis)
console.log(text)

//  ========================================================
var trace1 = {
  x: x_axis,
  y: y_axis,
  type: 'bar',
  text: text,
  orientation: 'h'
  // marker: {
  //   color: 'rgb(142,124,195)'
  // }
};
console.log(trace1.x)

var data = [trace1];

var layout = {
  title: 'Top 10 OTUs found',
  margin: { t: 30, l: 150 }
  // font:{
  //   family: 'Raleway, sans-serif'
  // },
  // showlegend: false,
  // xaxis: {
  //   tickangle: -15
  // },
  // yaxis: {
  //   zeroline: false,
  //   gridwidth: 2
  // },
  // // bargap :0.05
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
function optionChanged(Test) {
  console.log(Test)

  namesTest(Test)
}


