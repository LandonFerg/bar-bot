// Global Drink class

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

  exports.Drink = Drink;
  exports.drinks = drinks;