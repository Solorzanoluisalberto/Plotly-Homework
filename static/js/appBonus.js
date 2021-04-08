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
  Print_Test(Selection_metadata, Selection_Samples, new_plot)
   });
}

function Print_Test(metadata, samples, new_plot) {
  console.log(metadata)
  console.log(samples[0].sample_values)
  console.log("new Plot? " + new_plot)
  
var sample_metadata1 = d3.select("#sample-metadata")
sample_metadata1.html("")
Object.entries(metadata[0]).forEach(([key, value]) => {
  var Paragraph = sample_metadata1.append("p");
  Paragraph.text(`${key} : ${value}`)
  .attr("class","text-success")
});

var sample_values = samples[0].sample_values.slice(0,10).reverse();
var otu_ids = samples[0].otu_ids.slice(0,10).map(ID => `OTU → ${ID}`).reverse();
var otu_labels = samples[0].otu_labels.slice(0,10).reverse();

console.log("sample_values " + sample_values);
console.log("otu_ids " + otu_ids);
console.log("otu_labels " + otu_labels);

// Create a horizontal bar chart
//  ========================================================

var trace1_bar = {
  x: sample_values,
  y: otu_ids,
  type: 'bar',
  text: otu_labels,
  orientation: 'h',
  marker: {
    color: 'rgb(142,124,195)'
  }
};

var data_bar = [trace1_bar];

var layout_bar = {
  title: 'Top 10 OTUs ',
  orientation: 'h',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: false,
  xaxis: {
    tickangle: -45
  },
  yaxis: {
    zeroline: false,
    gridwidth: 2
  },
  bargap :0.05
};
// ============================================================================
// Create a bubble chart that displays each sample.
let otu_ids_bubble = samples[0].otu_ids
let sample_values_bubble = samples[0].sample_values
let otu_labels_bubble = samples[0].otu_labels

var trace1_bubble = {
  x: otu_ids_bubble,
  y: sample_values_bubble,
  mode: 'markers',
  marker: {
    color: otu_ids_bubble,
    opacity: [1, 0.8, 0.6, 0.4],
    size: sample_values_bubble
  }
};

var data_bubble = [trace1_bubble];

var layout_bubble = {
  title: 'Marker Size and Color',
  showlegend: false
  // height: 600,
  // width: 600
};

// ========================================================================
if (new_plot) {
  Plotly.newPlot('bar', data_bar, layout_bar);
  Plotly.newPlot('bubble', data_bubble, layout_bubble);
} else { 
  Plotly.restyle("bar", "x", [trace1_bar.x]);
  Plotly.restyle("bar", "y", [trace1_bar.y]);
  Plotly.newPlot('bubble', data_bubble, layout_bubble);
}

};

// nombres("940");
function optionChanged(Test) {
  console.log(Test)
  namesTest(Test)
}

var init = ""
namesTest(init);
