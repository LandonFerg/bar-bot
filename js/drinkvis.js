// Drink visualization
let cup;
let cup_mask;
let layerSize = 40;
let mLayerSize = 20; // Mixer layer size
let yPadding = layerSize;

let liquorNames = ["Light Rum", "Dark Rum", "Vodka", "Tequila", "Gin", "Triple Sec"];
let layers = [];


function preload() {
  cup = loadImage('../assets/img/cup.png');
  cup_mask = loadImage('../assets/img/cup_mask.png');
}

function setup() 
{
    var myCanvas = createCanvas(window.innerWidth, 400);
    myCanvas.parent("drinkvis");
    noLoop();
}

function updateVis()
{
  // update vis here
}

function draw() 
{
    var currentDrink = drinks[drinkIndex];

    print("current drink: ", currentDrink);
    background(0);

    rectMode(CENTER);

    shotCount = 0; // used to begin cup layer lines
    

    // initial rect
    for(let i = 0; i < drinkVals.length; i++)
    {
      // drink vals
      dd1 = currentDrink.d1;
      dd2 = currentDrink.d2;
      dd3 = currentDrink.d3;
      dd4 = currentDrink.d4;

      // mixer vals
      mm1 = currentDrink.m1;

      if(i == 0 && dd1 > 0)  // Vodka (initial layer)
      {
        fill(random(100) + 10, random(100) + 10, random(100) + 10);
        rect(window.innerWidth/2, 278 + layerSize, 300, layerSize * dd1);
        // Make label
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(255);
        text(liquorNames[0], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
        shotCount++;
        console.log("updating vodka vis...");
      }

      else if(i == 1 && dd2 > 0) // Tequila
      {
        fill(random(100) + 10, random(100) + 10, random(100) + 10);
        rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd2, layerSize * dd2);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(255);
        text(liquorNames[1], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
        shotCount++;
      }

      else if(i == 2 && dd3 > 0) // RUM
      {
        fill(random(100) + 10, random(100) + 10, random(100) + 10);
        rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd3, layerSize * dd3);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(255);
        text(liquorNames[2], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
        shotCount++;
      }

      else if(i == 3 && dd4 > 0) // KAHLUA
      {
        fill(random(100) + 10, random(100) + 10, random(100) + 10);
        rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd4, layerSize * dd4);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(255);
        text(liquorNames[3], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
        shotCount++;
      }

      else if(i == 4 && mm1 > 0) // COKE
      {
        fill(random(100) + 10, random(100) + 10, random(100) + 10);
        rect(window.innerWidth/2, (278 + mLayerSize) -  (layerSize * shotCount), 300, mLayerSize * mm1);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(255);
        text(mixerNames[0], window.innerWidth/2, (278 + mLayerSize) -  (layerSize * shotCount));
        shotCount++;
      }
    }

    imageMode(CENTER);
    image(cup, window.innerWidth/2, 200);

    // Draw cup mask
    imageMode(CENTER);
    image(cup_mask, window.innerWidth/2, 200);
}

// When a preset drink is clicked redraw
$('#drinkSelect').on('click', '.clickable-row', function(event) 
{
  redraw();
});

// Also redraw when dragging fields
$('.range-field').change(function () {
  redraw();
});


// iterate through drink amount array
// if amount is 0, we can ignore it and not create a layer
// if our layer array is 0 then we create a layer objects at bottom
// else, we can move our layer to a suitable position based on the previous layer's size (layerArray[i-1])


class Layer {
  constructor() {
    this.x = window.innerWidth/2;
    this.y = 278;
    this.size = 40; // layer size
    this.drinkAmount = 1; // amount of drink
    this.name = "drinkName"
  }
  display() {
    // Make layer
    fill(random(100) + 10, random(100) + 10, random(100) + 10);
    rect(this.x, this.y, 300, this.layerSize * this.drinkAmount); // x, y, width, height

    // Make label
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255);
    text(this.name, this.x, this.y + this.size - (this.size * this.drinkAmount));
  }
}