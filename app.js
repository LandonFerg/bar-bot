/* Server side code for bar-bot */
const http = require('http');
var fs = require('fs'); //require filesystem module
const static = require('node-static');
const file = new static.Server('./');
const server = http.createServer((req, res) => {
  req.addListener('end', () => file.serve(req, res)).resume();
});
const io = require('socket.io')(server) //require socket.io module and pass the http object (server)
const port = 8080;

// Raspi stuff
var GPIO = require('onoff').Gpio; //include onoff to interact with the GPIO

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  console.log("client connected");

  socket.on('newDrink', function(/* data go here */) { // get button from client
    // lightvalue = data;
    // if (lightvalue) {
    //   console.log(lightvalue); // clickec button
    // }
    console.log("button clicked by client!")
    testPump();
  });
});

var pump1 = new GPIO(5, 'out'); //use GPIO pin 4, and specify that it is output
var pump2 = new GPIO(5, 'out'); //use GPIO pin 4, and specify that it is output
var pump3 = new GPIO(5, 'out'); //use GPIO pin 4, and specify that it is output
var pump4 = new GPIO(5, 'out'); //use GPIO pin 4, and specify that it is output

function testPump()
{
    console.log("turning on pump...");
    pump1.writeSync(1); // turn on pump

    setTimeout(function() {
        pump1.writeSync(0); // turn off pump after 5 seconds
        console.log("turning off pump...");
    }, 5000);
}

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));