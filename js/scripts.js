/*   MAIN JS FILE FOR ALL PAGES   */

var drinkIndex = 0;
var drinkName = "N/A";

var drinkVals = [];
var drinks = [];

// Drink class
class Drink {
  constructor(name, d1,d2,d3,d4) {
    this.name = name;
    this.d1 = d1;
    this.d2 = d2;
    this.d3 = d3;
    this.d4 = d4;
  }
}

// Example drinks
const MM = new Drink("MoscowMule", 10,20,0,0);
const KF = new Drink("Kevin's Favorite", 90,0,75,5);
drinks.push(MM);
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
});


// Update slider values
$(document).ready(function() {

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
    drinkVals[2] = $value2.val

    const $valueSpan4 = $('.valueSpan4');
    const $value4 = $('#sl4');
    $valueSpan4.html($value4.val());
    $value4.on('input change', () => {

    $valueSpan4.html($value4.val());
    });
    drinkVals[3] = $value2.val
});