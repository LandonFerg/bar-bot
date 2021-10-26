// Drink visualization
let cup;
let cup_mask;
let layerSize = 40;
let mLayerSize = 20; // Mixer layer size
let yPadding = layerSize;

let liquorNames = ["Light Rum", "Dark Rum", "Vodka", "Tequila", "Gin", "Triple Sec"];
let mxrNames = ["Coke", "Sprite", "Ginger Beer", "Orange Juice"];

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
    

    // Setup liquor layers
    for(let i = 0; i < liquorNames.length; i++)
    {
      if(drinkVals[i] > 0)
      {
        // already layers -- ensure we are above the last layer
        if(layers.length > 0)
        {
          var lastLayer = layers[layers.length - 1];
          layers.push(new Layer(drinkVals[i], liquorNames[i], lastLayer.y + drinkVals[i] * lastLayer.size));
          
        }

        // no new layers, make level 0 layer
        else
        {
          layers.push(new Layer(drinkVals[i], liquorNames[i], 0));
        }
        
      }
    }

    // Setup mixer layers
    /*
    for(let i = 1; i < mxrNames.length + 1; i++)
    {
      if(drinkVals[i] > 0)
      {
        layers.push(new Layer(drinkVals[i + drinkVals.length], mxrNames[i - 1], 0))
      }
    }*/

    // Display layers
    for(let i = 0; i < layers.length; i++)
    {
      layers[i].display();
    }

    //   // drink vals
    //   dd1 = currentDrink.d1;
    //   dd2 = currentDrink.d2;
    //   dd3 = currentDrink.d3;
    //   dd4 = currentDrink.d4;

    //   // mixer vals
    //   mm1 = currentDrink.m1;

    //   if(i == 0 && dd1 > 0)  // Vodka (initial layer)
    //   {
    //     fill(random(100) + 10, random(100) + 10, random(100) + 10);
    //     rect(window.innerWidth/2, 278 + layerSize, 300, layerSize * dd1);
    //     // Make label
    //     textAlign(CENTER, CENTER);
    //     textSize(28);
    //     fill(255);
    //     text(liquorNames[0], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
    //     shotCount++;
    //     console.log("updating vodka vis...");
    //   }

    //   else if(i == 1 && dd2 > 0) // Tequila
    //   {
    //     fill(random(100) + 10, random(100) + 10, random(100) + 10);
    //     rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd2, layerSize * dd2);
    //     textAlign(CENTER, CENTER);
    //     textSize(28);
    //     fill(255);
    //     text(liquorNames[1], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
    //     shotCount++;
    //   }

    //   else if(i == 2 && dd3 > 0) // RUM
    //   {
    //     fill(random(100) + 10, random(100) + 10, random(100) + 10);
    //     rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd3, layerSize * dd3);
    //     textAlign(CENTER, CENTER);
    //     textSize(28);
    //     fill(255);
    //     text(liquorNames[2], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
    //     shotCount++;
    //   }

    //   else if(i == 3 && dd4 > 0) // KAHLUA
    //   {
    //     fill(random(100) + 10, random(100) + 10, random(100) + 10);
    //     rect(window.innerWidth/2, (278 + layerSize) -  (layerSize * shotCount), 300 * dd4, layerSize * dd4);
    //     textAlign(CENTER, CENTER);
    //     textSize(28);
    //     fill(255);
    //     text(liquorNames[3], window.innerWidth/2, 278 + layerSize - (layerSize * shotCount));
    //     shotCount++;
    //   }

    //   else if(i == 4 && mm1 > 0) // COKE
    //   {
    //     fill(random(100) + 10, random(100) + 10, random(100) + 10);
    //     rect(window.innerWidth/2, (278 + mLayerSize) -  (layerSize * shotCount), 300, mLayerSize * mm1);
    //     textAlign(CENTER, CENTER);
    //     textSize(28);
    //     fill(255);
    //     text(mixerNames[0], window.innerWidth/2, (278 + mLayerSize) -  (layerSize * shotCount));
    //     shotCount++;
    //   }
    // }

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
  constructor(drinkAmount, name, y) {
    this.size = 10; // layer size

    this.x2 = window.innerWidth;
    this.y2 = 340;

    this.x = 0;
    this.y = 300 - (drinkAmount * this.size); // height (closer to 0 = higher)

    this.drinkAmount = drinkAmount; // amount of drink
    this.name = name;
  }
  display() {

    rectMode(CORNERS);
    // Make layer
    fill(random(100) + 10, random(100) + 10, random(100) + 10);
    rect(this.x, this.y, this.x2, this.y2); // x, y, width, height

    // Make label
    textAlign(CENTER, TOP);
    textSize(28);
    fill(255);
    text(this.name, window.innerWidth/2, this.y * 1.02);
  }
}