/*   MAIN JS FILE FOR ALL PAGES   */

var drinkIndex = 0;
var drinkName = "N/A"

// Make drink selector clickable
$('#drinkSelect').on('click', '.clickable-row', function(event) {
  $(this).addClass('active').siblings().removeClass('active');
  drinkIndex = $(this).index();
  drinkName = $(this).text();

  // debug
  console.log(drinkIndex);
  console.log(drinkName);
});