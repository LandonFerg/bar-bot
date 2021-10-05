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

// Pump settings
const pumpGPIO = [5,6,13,19];
let pumps = []; // array to hold all our pumps
initPumps(pumpGPIO); // initialize pumps for the gpio

io.sockets.on('connection', function (socket) {
  var drinkValue = 0; //static variable for current status
  console.log("client connected");

  // TODO: pass client data for drink selection
  socket.on('newDrink', function(/* data go here */) { // get button from client
    // lightvalue = data;
    // if (drinkValue) {
    //   console.log(lightvalue); // clickec button
    // }
    console.log("button clicked by client!")
    testPump();
  });
});

// initialize pump values
function initPumps(vals)
{
	vals.forEach(pn => {
		var p = new GPIO(pn, 'high'); // create new pump
		p.writeSync(1); // turn pump off
		pumps.push(p);
	});
}

// async with promise
function resolvePump(pn, s)
{
	return new Promise(resolve => {
		setTimeout(() => {
			pumps[pn].writeSync(1); // turn off pump
			resolve('resolved');
		}, s);
	});
}

async function runPump(pn, s)
{
	pumps[pn].writeSync(0); // turn on pump
	var result = await resolvePump(pn, s); // wait for pump to turn off

}


function testPump()
{


	//runPump(0, 2000);

	var secondsBetween = 2000;
	var i = 0;
	pumps.forEach(p => {
		setTimeout(() => {
			runPump(i, 2000);
		}, secondsBetween + secondsBetween);
		secondsBetween += secondsBetween; // add another go to the offset
		i = i + 1;
	});
	
	//then(runPump(1,2000)); // run pump 1 for 2 seconds
	//runPump(1, 5000); // run pump 1 for 5 seconds
	// for (let i = 0; i < pumps.length; i++)
	// {
	// 	pumps[i].writeSync(0); // turn on pump
	// 	console.log("turning on pump...");

	// 	setTimeout(function() {
	// 		pumps[i].writeSync(1); // turn off pump after 2 seconds
	// 		console.log("turning off pump...");
	// 	}, 2000);
	// }
}

// Cleanup GPIO
process.on('SIGINT', _ => {
	// cleanup pumps gpio
	pumps.forEach(p => {
		p.unexport();
	});
});


server.listen(port, () => console.log(`Server running at http://localhost:${port}`));