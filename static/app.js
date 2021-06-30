function Buildpage(cid) {


d3.json("data/samples.json").then(function(data) {
    console.log(data);
    var dropdown = d3.select("#selDataset");
    data.names.forEach(x => {
        dropdown.append("option").text(x).property(x)
    })
    var samples = data.samples.filter(x => x.id==cid)[0];

    var meta = data.metadata.filter(x => x.id==cid)[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(meta).forEach(([k,v])=>{
        panel.append("h4").text(`${k}: ${v}`)
    })

    var sample_values = samples.sample_values.slice(0,10);
    var otu_ids = samples.otu_ids.slice(0,10).map(otu => `id ${otu}`);
    console.log(sample_values);
    console.log(otu_ids);

    var rev_sample_values = sample_values.reverse();
    var rev_otu_ids = otu_ids.reverse();


    var trace1 = {
        x: rev_sample_values,
        y: rev_otu_ids,
        type: "bar",
        orientation: "h"
    };

    var data1 = [trace1];

    var layout1 = {
        title: "Top 10 OTUs Found",
        yaxis: { title: "OTU IDs"}
    };

    var config = {
        responsive: true
    }

    Plotly.newPlot("bar", data1, layout1, config);


    var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        text: samples.otu_labels,
        marker: { 
            color: samples.otu_ids,
            size: samples.sample_values
        }
    };

    var data2 = [trace2];

    var layout2 = {
        xaxis: { title: "OTU ID"}

    };

    Plotly.newPlot("bubble", data2, layout2, config);

});

}

function init() {

    var dropdown = d3.select("#selDataset")
    Buildpage(940);


    dropdown.on("change", updatePage);

    function updatePage() {
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");
        console.log(dataset)
        Buildpage(dataset)
    }
}

init();