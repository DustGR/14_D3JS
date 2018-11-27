// from data.js
var tableData = data;

// YOUR CODE HERE!
//Initialize variables for the filters
var dateFilter = "";
var cityFilter = "";
var stateFilter = "";
var countryFilter = "";
var shapeFilter = "";
//Declare toggle buttons
var toggleButtons = d3.selectAll(".toggler");
//Declare dropdown menus
var cityMenu = d3.select("#city-menu");
var stateMenu = d3.select("#state-menu");
var countryMenu = d3.select("#county-menu");
var shapeMenu = d3.select("#shape-menu");

//Function for toggling menu visibility
function toggleVis(elemName) {
    var elem = d3.select(elemName)
    var classes = elem.attr("class"); //Retrieves classes
    console.log(classes);
    console.log(classes.search("invis"));
    if (classes.search("invis") >= 0) {
        console.log(classes.search("invis"))
        classes = classes.replace(" invis", ""); //takes the invis class out
        elem.attr("class", classes);
        console.log("toggle on "+elem);
    }
    else {
        elem.attr("class", classes + " invis"); //adds the invis class
        console.log("toggle off "+elem);
    }
}

toggleButtons.on("click", function() {//causes buttons to toggle filter option visibility
    //transforms #name-toggle to #name.sort
    toggleVis("#" + d3.select(this).attr("id").replace("-toggle","-sort"));
})