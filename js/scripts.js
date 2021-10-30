/*   MAIN JS FILE FOR ALL PAGES   */

var drinkIndex = 0;
var drinkName = "N/A";

var drinkVals = [];
var mixerNames = ['Coke']

class Drink {
    constructor(name, d1, d2, d3, d4, d5, d6, m1, m2, m3, m4) {
      this.name = name;
  
      // LIQUOR
      this.d1 = d1; // Light rum
      this.d2 = d2;
      this.d3 = d3;
      this.d4 = d4;
      this.d5 = d5;
      this.d6 = d6;
  
      // MIXERS
      this.m1 = m1; // Coke
      this.m2 = m2;
      this.m3 = m3;
      this.m4 = m4;
    }
  }

  var drinks = [];


// let liquorNames = ["Light Rum", "Dark Rum", "Vodka", "Tequila", "Gin", "Triple Sec"];
// let mxrNames = ["Coke", "Sprite", "Ginger Beer", "Margarita mix"];

// Example drinks TODO: Read from json instead
const RC = new Drink("Rum & Coke", 0,1.5,0,0,0,0,  3,0,0,0);
const MM = new Drink("Moscow Mule", 0,0,1.5,0,0,0,  0,0,3,0);
const MA = new Drink("Margarita", 0,0,0,1,0,0.5,  0,0,0,0.5);
const DS = new Drink("Dark & Stormy", 0,1.5,0,0,0,0,  0,0,3,0);
const GM = new Drink("Gin Mule", 0,0,0,0,1.5,0,  0,0,3,0);
const LI = new Drink("Long Island Iced Tea", 0.5,0,0.5,0.5,0.5,0.5,  1,0,0,0.5);
const RS = new Drink("Rum & Sprite", 1.5,0,0,0,0,0,  0,3,0,0);
const TM = new Drink("Tequila Mule", 0,0,0,1.5,0,0,  0,0,3,0);

// Load saved drinks from saved json

drinks.push(RC);
drinks.push(MM);
drinks.push(MA);
drinks.push(DS);
drinks.push(GM);
drinks.push(LI);
drinks.push(RS);
drinks.push(TM);


//console.log(drinks[1].name);

function RefreshTable() 
{
    // clear past table
    $('#drinkSelect tbody').empty();

    // Populate drink table
    drinks.forEach((d) => {
    $("#drinkSelect").find('tbody')
        .append($('<tr>')
            .attr('class', 'clickable-row')
                .append($('<th>')
                    .text(d.name)
                )
            );
        });
}
RefreshTable();


// Make drink selector clickable
$('#drinkSelect').on('click', '.clickable-row', function(event) {

    $(this).addClass('active').siblings().removeClass('active');
    drinkIndex = $(this).index();
    drinkName = $(this).text();

    // debug
    // console.log(drinkIndex);
    // console.log(drinkName);

    // Get references to slider values
    var $vs1 = $('.valueSpan1');
    var $vs2 = $('.valueSpan2');
    var $vs3 = $('.valueSpan3');
    var $vs4 = $('.valueSpan4');
    var $vs5 = $('.valueSpan5');
    var $vs6 = $('.valueSpan6');

    var $vs7 = $('.valueSpan7');
    var $vs8 = $('.valueSpan8');
    var $vs9 = $('.valueSpan9');
    var $vs10 = $('.valueSpan10');

    // Get current selected drink
    var cd = drinks[drinkIndex];

    // Set drink values on drink select
    $vs1.html(cd.d1);
    $vs2.html(cd.d2);
    $vs3.html(cd.d3);
    $vs4.html(cd.d4);
    $vs5.html(cd.d5);
    $vs6.html(cd.d6);

    $vs7.html(cd.m1);
    $vs8.html(cd.m2);
    $vs9.html(cd.m3);
    $vs10.html(cd.m4);

    // Set slider positions on drink select
    $("#sl1").val(cd.d1);
    $("#sl2").val(cd.d2);
    $("#sl3").val(cd.d3);
    $("#sl4").val(cd.d4);
    $("#sl5").val(cd.d5);
    $("#sl6").val(cd.d6);

    // Set mixer slider positions on drink select
    $("#sl7").val(cd.m1);
    $("#sl8").val(cd.m2);
    $("#sl9").val(cd.m3);
    $("#sl10").val(cd.m4);
});


// Update slider values & drinkVals array
$(document).ready(function() {

    // SHOTS
    const $valueSpan1 = $('.valueSpan1');
    const $value1 = $('#sl1');
    $valueSpan1.html($value1.val());
    $value1.on('input change', () => {
    // update drinikval array
    drinkVals[0] = $value1.val()
    $valueSpan1.html($value1.val());
    });
    drinkVals[0] = $value1.val() // get initial drinkval

    const $valueSpan2 = $('.valueSpan2');
    const $value2 = $('#sl2');
    $valueSpan2.html($value2.val());
    $value2.on('input change', () => {
    drinkVals[1] = $value2.val()
    $valueSpan2.html($value2.val());
    });
    drinkVals[1] = $value2.val()

    const $valueSpan3 = $('.valueSpan3');
    const $value3 = $('#sl3');
    $valueSpan3.html($value3.val());
    $value3.on('input change', () => {
    drinkVals[2] = $value3.val()
    $valueSpan3.html($value3.val());
    });
    drinkVals[2] = $value3.val()

    const $valueSpan4 = $('.valueSpan4');
    const $value4 = $('#sl4');
    $valueSpan4.html($value4.val());
    $value4.on('input change', () => {
    drinkVals[3] = $value4.val()
    $valueSpan4.html($value4.val());
    });
    drinkVals[3] = $value4.val()

    const $valueSpan5 = $('.valueSpan5');
    const $value5 = $('#sl5');
    $valueSpan5.html($value5.val());
    $value5.on('input change', () => {
    drinkVals[4] = $value5.val()
    $valueSpan5.html($value5.val());
    });
    drinkVals[4] = $value5.val()

    const $valueSpan6 = $('.valueSpan6');
    const $value6 = $('#sl6');
    $valueSpan6.html($value6.val());
    $value6.on('input change', () => {
    drinkVals[5] = $value6.val()
    $valueSpan6.html($value6.val());
    });
    drinkVals[5] = $value6.val()

    // Update mixer sliders...
    const $valueSpan7 = $('.valueSpan7');
    const $value7 = $('#sl7');
    $valueSpan7.html($value7.val());
    $value7.on('input change', () => {
    drinkVals[6] = $value7.val()
    $valueSpan7.html($value7.val());
    });
    drinkVals[6] = $value7.val()

    const $valueSpan8 = $('.valueSpan8');
    const $value8 = $('#sl8');
    $valueSpan8.html($value8.val());
    $value8.on('input change', () => {
    drinkVals[7] = $value8.val()
    $valueSpan8.html($value8.val());
    });
    drinkVals[7] = $value8.val()

    const $valueSpan9 = $('.valueSpan9');
    const $value9 = $('#sl9');
    $valueSpan9.html($value9.val());
    $value9.on('input change', () => {
    drinkVals[8] = $value9.val()
    $valueSpan9.html($value9.val());
    });
    drinkVals[8] = $value9.val()

    const $valueSpan10 = $('.valueSpan10');
    const $value10 = $('#sl10');
    $valueSpan10.html($value10.val());
    $value10.on('input change', () => {
    drinkVals[9] = $value10.val()
    $valueSpan10.html($value10.val());
    });
    drinkVals[9] = $value10.val()
    
});