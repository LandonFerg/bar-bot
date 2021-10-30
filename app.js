/* Server side code for bar-bot */
const http = require('http');
var fs = require('fs'); //require filesystem module
let {PythonShell} = require('python-shell'); // module for python script exec.
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

var testCount = 1;

// Setup python-shell arguments
var options = {
	scriptPath: './',
	args: ['-v','0','0','0','0','0','0'],
}

// python arguments for pumps
var pump_options = {
	scriptPath: './',
	args: ['-v','0','0','0','0'],
}

function runPyValves()
{
	
	console.log("running python valve code");
	PythonShell.run('test1.py', options, function (err, results) {
		if (err) throw err;
		console.log('finished valve python code');
		console.log('starting pump python script...');
		runPyPumps();
	});

}

function runPyPumps()
{
	console.log("running python code");
	PythonShell.run('test.py', pump_options, function (err, results) {
		if (err) throw err;
		console.log('finished pumping python code :)');
		
	});
}

io.sockets.on('connection', function (socket) {
  // check if we have saved drink values and load them into the drinks table
  //savedDrinks.json

	// var file = 'savedDrinks.json';
	// var content = '';

	// // Check that the file exists locally
	// if(!fs.existsSync(file)) {
	// 	console.log("File not found");
	// }

	// // The file *does* exist
	// else {
	// 	// Read the file and do anything you want
	// 	content = fs.readFileSync(file, 'utf-8');

	// 	// load drink stuff
	// 	console.log(content);
	// }
  
  /// foreach d in loadedDrink


  var drinkValue = 0; //static variable for current status
  console.log("client connected");

  socket.on('newDrink', function(drink1, drink2, drink3, drink4, drink5, drink6, mixer1, mixer2, mixer3, mixer4) { // get button from client
    // lightvalue = data;
    // if (drinkValue) {
    //   console.log(lightvalue); // clickec button
    // }
  console.log("button clicked by client!")
  console.log("client wants " + drink1 + " shots of LIGHTRUM" )


  // apply our selected values to python arguments
  options.args[1] = drink1;
  options.args[2] = drink2;
  options.args[3] = drink3;
  options.args[4] = drink4;
  options.args[5] = drink5;
  options.args[6] = drink6;

  // pass in mixer args
  pump_options.args[1] = mixer1;
  pump_options.args[2] = mixer2;
  pump_options.args[3] = mixer3;
  pump_options.args[4] = mixer4;

  //console.log("pump options: " + pump)
	
  // run our python code

  // 1 shot: 1.5 oz
  // 1.5 shot: 2oz
  

   runPyValves();

  });

  // Save Drink
  // adds drink to drink class for local storage and adds to saved json
  
//   socket.on('saveDrink', function(drink1, drink2, drink3, drink4, drink5, drink6, mixer1, mixer2, mixer3, mixer4, dName) {
  
//   var createdDrink = new Drink(dName, drink1,drink2,drink3,drink4,drink5,drink6,
// 	  mixer1,mixer2,mixer3,mixer4);

//   drinks.push(createdDrink);

//   // RefreshTable(); cant use client

//   let newSavedDrink = {
// 	  d1: drink1,
// 	  d2: drink2,
// 	  d3: drink3,
// 	  d4: drink4,
// 	  d5: drink5,
// 	  d6: drink6,

// 	  m1: mixer1,
// 	  m2: mixer2,
// 	  m3: mixer3,
// 	  m4: mixer4
//   };

//   let data = JSON.stringify(newSavedDrink);
//   fs.writeFileSync('savedDrinks.json', data);
// })
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
	var secondsBetween = 2000;
	
	for (let i = 0; i < pumps.length; i++)
	{
		setTimeout(function(){
			runPump(i, 2000)
		}, secondsBetween + secondsBetween);    
		secondsBetween += secondsBetween;
	}
	// setTimeout(() => {
	// 	runPump(1, 2000);
	// }, secondsBetween);
	
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
