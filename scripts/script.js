// JavaScript Document
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove('show');
    }
});



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
