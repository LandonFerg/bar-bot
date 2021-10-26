console.log("client code go here haha");

var newDrinkButton = document.getElementById('pourBtn');
socket = io();
newDrinkButton.addEventListener("click", function() {

    // grab shot values
    var d1 = document.getElementById('sl1').value;
    var d2 = document.getElementById('sl2').value;
    var d3 = document.getElementById('sl3').value;
    var d4 = document.getElementById('sl4').value;
    var d5 = document.getElementById('sl5').value;
    var d6 = document.getElementById('sl6').value;

    // grab mixer values
    var m1 = document.getElementById('sl7').value;
    var m2 = document.getElementById('sl8').value;
    var m3 = document.getElementById('sl9').value;
    var m4 = document.getElementById('sl10').value;
    socket.emit('newDrink', d1, d2, d3, d4, d5, d6, m1, m2, m3, m4);

    
})