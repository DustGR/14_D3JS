// from data.js
var tableData = data;

// YOUR CODE HERE!
//An object to store the filter settings
var filter = {
    date : "",
    city : "",
    state : "",
    country : "",
    shape: "",
}

//An object to store what items go in each dropdown menu
var menuItems = { 
    city : [],
    state : [],
    country : [],
    shape : []
}

// ------ Dropdowns ------ //

//Fills menuItems with unique entries from data
data.forEach(encounter => {
    Object.keys(menuItems).forEach(k=>{ //iterate through each category (city, state, country, shape)
        if (!(menuItems[k].includes(encounter[k]))) {
            menuItems[k].push(encounter[k]);  //push entries that aren't already in the menu
        }
    })
})
//menuItems prettying
Object.values(menuItems).forEach(v=> v.sort())  //sorts each set of menu items alphabetically
Object.keys(menuItems).forEach(k=>{
    if (k === 'state' || k === 'country') { //States and countries are capitalized
        menuItems[k] = menuItems[k].map(newVal => newVal.toUpperCase())
    }
    else { //Cities, Countries get first letter capitalized
        menuItems[k] = menuItems[k].map(newVal => {
        let valueWords = newVal.split(" "); //splits words into arrays
        valueWords = valueWords.map(word=> 
            (word.slice(0,1).toUpperCase() + word.slice(1))) //capitalizes the first letter
            .join(" ")
        console.log(valueWords)
        })
    }
})
//Note that we will need to .toLowerCase everything when we use the .filter() later - this cleaning
//was just to make the UI prettier without having to run this every time.
//Cleaner data would save this, but I don't want to touch the UFO data table.

// @@TODO: make this into a function and rework the filter into a new country-state-city hierarchy
//Actually populate dropdowns
Object.entries(menuItems).forEach(k=> { //Runs for each key (city, state, country, shape)
    var currentMenu = d3.select("#" + k[0] + "-menu"); //Selects the dropdown for the current menu
    k[1].forEach(item=> { //within the current key/filter category, appends a list item for each value
        currentMenu.append("li").attr("class", k[0] + '-select').attr("id",k[0] + "-" + item).append("a").text(item) //Adds new list item with id 
    })
})

// Selecting a dropdown item populates the filter
d3.selectAll(".dropdown-menu>li").on("click", function() {
    let selection = d3.select(this).attr("id").split("-")[1];
    let category = d3.select(this).attr("id").split("-")[0];
    filter[category] = selection;
    updateButtons()
})

// Prevent reloading the page when form items are used
d3.select("#filter-form").on("submit", function() {
    d3.event.preventDefault(); 
    }
)

//Update filter when date field is changed
d3.select("#date-text").on("change", function() {
    filter['date'] = d3.select(this).property("value")
    }
);

//Function for updating dropdown menu button text with current filter settings
function updateButtons() {
    Object.entries(filter).forEach(entry => {
        //I'm not sure if declaring variables for each of these is more efficient, but it's more readable
        let key = entry[0];  
        let value = entry[1];
        let currentButton = d3.select("#"+key+"-button-text");
        if (value === "none") {
            value = key.slice(0,1).toUpperCase() + key.slice(1);
            }
        currentButton.text(value);
        }
    )
}

// ------ Filter UI visibility toggling ------ //

//Function for toggling menu visibility by toggling CSS class on <li> tags for each form item
function toggleVis(elemName) {
    let elem = d3.select(elemName)
    let classes = elem.attr("class"); //Retrieve the class list for the element
    if (classes.search("invis") >= 0) { // If there's an invis class present,
        classes = classes.replace(" invis", ""); //takes the invis class out of the class list
        elem.attr("class", classes);
    }
    else {  //If there's no invis class on the class list,
        elem.attr("class", classes + " invis"); //adds the invis class to the class list
    }
}

d3.selectAll(".toggler").on("click", function() {//causes buttons to toggle filter option visibility
    //transforms #name-toggle to #name.sort - so each button affects the correct ID
    toggleVis("#" + d3.select(this).attr("id").replace("-toggle","-sort"));
})


// ------ Filtering ------ //



// ------ Populate Table ------ //

// function populateTable(filters) {
//     var table = d3.select("#ufo-table");
//     if(filters){
//         var tableData = data.filter(runFilters(filters));
//         }
//     else{
//         var tableData = data;
//     }
//     Object.entries("data").forEach(entry =>
//         {
//         if(filters){
            
//             }
//         })
// }