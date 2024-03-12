console.log("hello hello");

document.querySelector("#mood").addEventListener("click", function(){
    document.querySelector("#mood").style.visibility = "hidden";
});

document.querySelector("#mood2").addEventListener("click", function(){
    document.querySelector("#mood2").style.visibility = "hidden";
});

document.querySelector("#mood3").addEventListener("click", function(){
    document.querySelector("#mood3").style.visibility = "hidden";
});



let pageTitle = document.querySelector("#page-title");

let headerClicked = false;

document.querySelector("header").onclick = function() { 
    if (headerClicked) {
        document.querySelector("header").style.color = ""; // Resets to default color
    } else {
        document.querySelector("header").style.color = "yellow";
    }
    headerClicked = !headerClicked; // Toggles the headerClicked variable
    console.log("clicked on header");
};

let h3Clicked = false;

document.querySelector("h3").onclick = function() { 
    if (headerClicked) {
        document.querySelector("h3").style.color = ""; // Resets to default color
    } else {
        document.querySelector("h3").style.color = "orange";
    }
    headerClicked = !headerClicked; // Toggles the headerClicked variable
    console.log("clicked on h3");
};


