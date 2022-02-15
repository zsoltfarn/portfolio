// JavaScript Document



/*
function menu(){
    let w = window.innerWidth; // checks the browser window width
    let y = document.getElementById("home");

    if (w <= 768) { // if width is 768px or less, the text "home" will change to "menu"
        y.textContent = "Menu";
    } else {
        y.textContent = "Home";
    }
}
window.onresize = menu;

*/

function burgerMenu() {
    "use strict";
    let x = document.getElementById("myTopnav");
    

    if (x.className === "topnav") {
        x.className += " responsive";
        
    } else {
        x.className = "topnav";
        
    };
}


function social() {
    "use strict";
    let a = document.getElementById("social");
    let b = document.getElementById("gode");

    if (a.className === "down") {
        a.className += "up"; //social panel pulls out when arrow clicked
        
        
    } else {
        a.className = "down"; // pulls back when clicked again
        
    }
    
};
