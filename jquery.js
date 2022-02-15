$(document).ready(function() {
    'use strict';
    
    $(".rotate").click(function () {
    $(this).toggleClass("out"); // rotate arrow when panel is out
});
 
    $('#arrow').hover(function() {
        $(this).addClass('magnify'); // magnify arrow on mouse hover

    }, function() {
        $(this).removeClass('magnify');
    });
});
