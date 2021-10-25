console.log("client code go here haha");

var newDrinkButton = document.getElementById('testBtn');
socket = io();
newDrinkButton.addEventListener("click", function() {
    var lightRum = getElementById('sl1').value;
    socket.emit('newDrink', lightRum);

    
})