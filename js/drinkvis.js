// Drink visualization
let cup;
let cup_mask;
let layerSize = 40;
let mLayerSize = 20; // Mixer layer size
let yPadding = layerSize;

let liquorNames = ["Light Rum", "Dark Rum", "Vodka", "Tequila", "Gin", "Triple Sec"];
let mxrNames = ["Coke", "Sprite", "Ginger Beer", "Margarita Mix"];

let layers = [];


function preload() {
  cup = loadImage('../assets/img/cup.png');
  cup_mask = loadImage('../assets/img/cup_mask_L.png');
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
    

    // Setup liquor layers
    for(let i = 0; i < liquorNames.length; i++)
    {
      if(drinkVals[i] > 0)
      {
        // already layers -- ensure we are above the last layer
        if(layers.length > 0)
        {
          var lastLayer = layers[layers.length - 1];
          if(lastLayer.yOffset == 0)
          {
            layers.push(new Layer(drinkVals[i], liquorNames[i], lastLayer.y2 - lastLayer.y)); // set yOffset to last element's y value
          }

          else
          {
            layers.push(new Layer(drinkVals[i], liquorNames[i], lastLayer.yOffset + (lastLayer.y2 - lastLayer.y)));
          }
          
        }

        // no new layers, make level 0 layer
        else
        {
          // Bottom layer
          layers.push(new Layer(drinkVals[i], liquorNames[i], 0));
        }
        
      }
    }

    // Setup mixer layers (rest of drink vals)
    // start from mixr part of array

    let mixerSize = 20;

    for(let i = liquorNames.length; i < drinkVals.length; i++)
    {
      if(drinkVals[i] > 0)
      {
        // already layers -- ensure we are above the last layer
        if(layers.length > 0)
        {
          var lastLayer = layers[layers.length - 1];
          
          if(lastLayer.yOffset == 0) // if the last layer was our 0 layer (has no offset)
          {
            layers.push(new Layer(drinkVals[i], mxrNames[i - liquorNames.length], lastLayer.y2 - lastLayer.y, 20)); // add no additional offset
          }

          else // our last layer has an offset -- apply offset
          {
            layers.push(new Layer(drinkVals[i], mxrNames[i - liquorNames.length], lastLayer.yOffset + (lastLayer.y2 - lastLayer.y), 20));
          }
          
        }

        // no new layers, make level 0 layer
        else
        {
          layers.push(new Layer(drinkVals[i], mxrNames[i - liquorNames.length], 0, 20));
        }
        
      }
    }

    // Display layers
    for(let i = 0; i < layers.length; i++)
    {
      layers[i].display();
    }

    // Draw cup
    imageMode(CENTER);
    image(cup, window.innerWidth/2, 200);

    // Draw cup mask
    imageMode(CENTER);
    image(cup_mask, window.innerWidth/2, 200);
}

// When a preset drink is clicked redraw
$('#drinkSelect').on('click', '.clickable-row', function(event) 
{
  layers = [];
  var d = drinks[drinkIndex];
  drinkVals = [d.d1, d.d2, d.d3, d.d4, d.d5, d.d6, d.m1, d.m2, d.m3, d.m4];
  redraw();
});

// Also redraw when dragging fields
$('.range-field').change(function () {
  layers = [];
  redraw();
});


// iterate through drink amount array
// if amount is 0, we can ignore it and not create a layer
// if our layer array is 0 then we create a layer objects at bottom
// else, we can move our layer to a suitable position based on the previous layer's size (layerArray[i-1])


class Layer {
  constructor(drinkAmount, name, yOffset, size=10) {
    this.size = size; // layer size

    this.x2 = window.innerWidth * 0.8;
    this.y2 = 340 - yOffset; // bottom of cup

    this.x = window.innerWidth * 0.2;
    this.y = (300 - (drinkAmount * this.size)) - yOffset; // height (closer to 0 = higher)

    this.drinkAmount = drinkAmount; // amount of drink
    this.name = name;

    this.yOffset = yOffset;
  }
  display() {

    rectMode(CORNERS);
    // Make layer
    fill(random(100) + 10, random(100) + 10, random(100) + 10);
    rect(this.x, this.y, this.x2, this.y2); // x, y, width, height

    // Make label
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255);
    text(this.name, window.innerWidth/2, (this.y + this.y2) / 2);
  }
}