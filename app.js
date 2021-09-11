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

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  console.log("client connected");

  socket.on('newDrink', function(/* data go here */) { // get button from client
    // lightvalue = data;
    // if (lightvalue) {
    //   console.log(lightvalue); // clickec button
    // }
    console.log("button clicked by client!")
  });
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));