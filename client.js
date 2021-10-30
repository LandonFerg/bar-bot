console.log("client code go here haha");

var newDrinkButton = document.getElementById('testBtn');
var saveDrinkButton = document.getElementById('saveBtn');


socket = io();
newDrinkButton.addEventListener("click", function() {

    // grab shot values
    var d1 = document.getElementById('sl1').value;
    var d2 = document.getElementById('sl2').value;
    var d3 = document.getElementById('sl3').value;
    var d4 = document.getElementById('sl4').value;
    var d5 = document.getElementById('sl5').value;
    var d6 = document.getElementById('sl6').value;

    // grab mixer values
    var m1 = document.getElementById('sl7').value;
    var m2 = document.getElementById('sl8').value;
    var m3 = document.getElementById('sl9').value;
    var m4 = document.getElementById('sl10').value;

    /* FAILSAFE AND WARNINGS */
    function f(x){
        return parseFloat(x);
    }

    // check if drink (in oz) is greater than hard limit:
    var warningLimit = 6;
    var errorLimit = 12;
    var totalLiquor = (f(d1) + f(d2) + f(d3) + f(d4) + f(d5) + f(d6)) * 1.5; // shots in oz
    var totalMixers = f(m1) + f(m2) + f(m3) + f(m4);	// mixers in oz

    var totalDrinkvol = totalLiquor + totalMixers

    console.log(totalLiquor + totalMixers);

    if(totalLiquor + totalMixers >= errorLimit)
    {
      Swal.fire({
          icon: 'error',
          title: 'Overflow Error',	
          text: 'Dude thats a lot of drink, no can do',
        })
    }
  
    else if(totalLiquor + totalMixers >= warningLimit)
    {
      Swal.fire({
          icon: 'warning',
          title: 'Overflow Warning',	
          html: 'Make sure you know what you are doing and have a large enough cup to fit the alcohol ' + '<br>' + '<b>Total drink volume: ' + totalDrinkvol.toString() + 'oz</b>',
          confirmButtonText: 'Continue',
          showCancelButton: true,
        }).then((canGo) => {
            if(canGO)
            {
                socket.emit('newDrink', d1, d2, d3, d4, d5, d6, m1, m2, m3, m4);
            }
        })
    }

    else
    {
        socket.emit('newDrink', d1, d2, d3, d4, d5, d6, m1, m2, m3, m4);
    }
    
})

// Tell server to save drink & pass drink params
saveDrinkButton.addEventListener("click", function() {
    // grab shot values
    var d1 = document.getElementById('sl1').value;
    var d2 = document.getElementById('sl2').value;
    var d3 = document.getElementById('sl3').value;
    var d4 = document.getElementById('sl4').value;
    var d5 = document.getElementById('sl5').value;
    var d6 = document.getElementById('sl6').value;

    // grab mixer values
    var m1 = document.getElementById('sl7').value;
    var m2 = document.getElementById('sl8').value;
    var m3 = document.getElementById('sl9').value;
    var m4 = document.getElementById('sl10').value;
    
    var newDrinkName = "";
    Swal.fire({
        title: 'Save Drink Form',
        html: `<input type="text" id="saveName" class="swal2-input" placeholder="Untitled">`,
        confirmButtonText: 'Save Drink',
        focusConfirm: false,
        preConfirm: () => {
          const saveName = Swal.getPopup().querySelector('#saveName').value
          if (!saveName) {
            Swal.showValidationMessage(`Please enter a drink name`)
          }
          return { saveName: saveName}
        }
      }).then((result) => {
        Swal.fire(`
          Saved drink: ${result.value.saveName}!
        `.trim())
        newDrinkName = result.value.saveName.trim();
        console.log("drink name: " , newDrinkName);

        socket.emit('saveDrink', d1, d2, d3, d4, d5, d6, m1, m2, m3, m4, newDrinkName);
      })

})