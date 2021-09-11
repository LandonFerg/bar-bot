console.log("client code go here haha");

var newDrinkButton = document.getElementById('testBtn');
socket = io();
newDrinkButton.addEventListener("click", function() {
    socket.emit('newDrink');
})