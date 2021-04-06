d3.json("../../data/samples.json").then(function(data){
  
  var name = data.names;
  var metadata = data.metadata[0].ethnicity;
  var samples = data.samples;

  console.log(name);
  console.log(metadata);
  console.log(samples);
  
});
