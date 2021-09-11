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

// Define pump GPIO pins (High is due to relay board being triggered on low value)
var pump1 = new GPIO(5, 'high');
// var pump2 = new GPIO(6, 'high');
// var pump3 = new GPIO(13, 'high');
// var pump4 = new GPIO(19, 'high');

function testPump()
{
    console.log("turning on pump...");
    pump1.writeSync(1); // turn on pump

    setTimeout(function() {
        pump1.writeSync(0); // turn off pump after 5 seconds
        console.log("turning off pump...");
    }, 2000);
}

// Cleanup GPIO
process.on('SIGINT', _ => {
  pump1.unexport();
  pump2.unexport();
  pump3.unexport();
  pump4.unexport();
});


server.listen(port, () => console.log(`Server running at http://localhost:${port}`));