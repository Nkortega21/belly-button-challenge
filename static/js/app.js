function buildMetadata(sample) {
  // Fetch the data from the provided URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.find(sampleData => sampleData.id == sample);

    // Select the panel with id `#sample-metadata` and clear any existing content
    let metadataPanel = d3.select("#sample-metadata").html("");

    // Append new tags for each key-value pair in the filtered metadata
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      metadataPanel.append("h5").text(`${key}: ${value}`);
    });
  }); 
}

function buildCharts(sample) {
  // Fetch the data from the provided URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredSample = samples.find(sampleObject => sampleObject.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSample.otu_ids;
    let otu_labels = filteredSample.otu_labels;
    let sample_values = filteredSample.sample_values;

    // Build the Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: [
          [0, 'blue'],   
          [1, 'brown']   
        ]
      }
    };

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" },
      hovermode: 'closest'
    };
    
    // Render the Bubble Chart
    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

    // Prepare the top 10 OTU data for the Bar Chart
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" }, // Fixed typo 'Numbrt' -> 'Number'
      yaxis: { title: "OTU ID" }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', [barTrace], barLayout);
  });
}

function init() {
  // Fetch the data on page load
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the list of sample names
    let sampleNames = data.names;

    // Populate the dropdown menu with sample names
    let dropdownMenu = d3.select("#selDataset");
    sampleNames.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list and build the initial charts and metadata
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener when a new sample is selected
function optionChanged(newSample) {
  // Rebuild charts and metadata panel with the selected sample
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
