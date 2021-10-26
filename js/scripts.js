/*   MAIN JS FILE FOR ALL PAGES   */

var drinkIndex = 0;
var drinkName = "N/A";

var drinkVals = [];
var mixerNames = ['Coke']
var drinks = [];

// Drink class
class Drink {
  constructor(name, d1,d2,d3,d4, m1) {
    this.name = name;
    // LIQUOR
    this.d1 = d1;
    this.d2 = d2;
    this.d3 = d3;
    this.d4 = d4;

    // MIXERS
    this.m1 = m1; // coke
  }
}

// Example drinks TODO: Read from json instead
const RC = new Drink("Rum & Coke", 0,0,1,0,4,0);
const KF = new Drink("Kevin's Favorite", 1,1,0,0,0,0);
drinks.push(RC);
drinks.push(KF);

console.log(drinks[1].name);

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


// Make drink selector clickable
$('#drinkSelect').on('click', '.clickable-row', function(event) {

    $(this).addClass('active').siblings().removeClass('active');
    drinkIndex = $(this).index();
    drinkName = $(this).text();

    // debug
    console.log(drinkIndex);
    console.log(drinkName);


    // Get references to slider values
    var $vs1 = $('.valueSpan1');
    var $vs2 = $('.valueSpan2');
    var $vs3 = $('.valueSpan3');
    var $vs4 = $('.valueSpan4');
    var $vs5 = $('.valueSpan5');

    // Get current drink
    var cd = drinks[drinkIndex];

    // Set drink values on drink select
    $vs1.html(cd.d1);
    $vs2.html(cd.d2);
    $vs3.html(cd.d3);
    $vs4.html(cd.d4);

    $vs5.html(cd.m1);

    // Set slider positions on drink select
    $("#sl1").val(cd.d1);
    $("#sl2").val(cd.d2);
    $("#sl3").val(cd.d3);
    $("#sl4").val(cd.d4);

    $("#sl5").val(cd.m1);
});


// Update slider values
$(document).ready(function() {

    // SHOTS
    const $valueSpan1 = $('.valueSpan1');
    const $value1 = $('#sl1');
    $valueSpan1.html($value1.val());
    $value1.on('input change', () => {

    $valueSpan1.html($value1.val());
    });
    drinkVals[0] = $value1.val

    const $valueSpan2 = $('.valueSpan2');
    const $value2 = $('#sl2');
    $valueSpan2.html($value2.val());
    $value2.on('input change', () => {

    $valueSpan2.html($value2.val());
    });
    drinkVals[1] = $value2.val

    const $valueSpan3 = $('.valueSpan3');
    const $value3 = $('#sl3');
    $valueSpan3.html($value3.val());
    $value3.on('input change', () => {

    $valueSpan3.html($value3.val());
    });
    drinkVals[2] = $value3.val

    const $valueSpan4 = $('.valueSpan4');
    const $value4 = $('#sl4');
    $valueSpan4.html($value4.val());
    $value4.on('input change', () => {

    $valueSpan4.html($value4.val());
    });
    drinkVals[3] = $value4.val

    const $valueSpan5 = $('.valueSpan5');
    const $value5 = $('#sl5');
    $valueSpan5.html($value5.val());
    $value5.on('input change', () => {

    $valueSpan5.html($value5.val());
    });
    drinkVals[4] = $value5.val

    const $valueSpan6 = $('.valueSpan6');
    const $value6 = $('#sl6');
    $valueSpan6.html($value6.val());
    $value6.on('input change', () => {

    $valueSpan6.html($value6.val());
    });
    drinkVals[5] = $value6.val

    // Update mixer sliders...
    const $valueSpan7 = $('.valueSpan7');
    const $value7 = $('#sl7');
    $valueSpan7.html($value7.val());
    $value7.on('input change', () => {

    $valueSpan7.html($value7.val());
    });
    drinkVals[6] = $value7.val

    const $valueSpan8 = $('.valueSpan8');
    const $value8 = $('#sl8');
    $valueSpan8.html($value8.val());
    $value8.on('input change', () => {

    $valueSpan8.html($value8.val());
    });
    drinkVals[7] = $value8.val

    const $valueSpan9 = $('.valueSpan9');
    const $value9 = $('#sl9');
    $valueSpan9.html($value9.val());
    $value9.on('input change', () => {

    $valueSpan9.html($value9.val());
    });
    drinkVals[8] = $value9.val

    const $valueSpan10 = $('.valueSpan10');
    const $value10 = $('#sl10');
    $valueSpan10.html($value10.val());
    $value10.on('input change', () => {

    $valueSpan10.html($value10.val());
    });
    drinkVals[9] = $value10.val
    
});