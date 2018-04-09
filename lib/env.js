$(document).ready(function() {
  var drinkCount = 0;
  var drinks = [
    "src/beer.png",
    "src/shot.png",
    "src/wine.png",
    "src/water.png"];
    var $drink = $('#drink');

    $drink.click(function(){
      if ($drink.is(':animated')) return;
      ++drinkCount;
      $("#drinkCount").html(drinkCount + "");
      var rand = parseInt(Math.random() * drinks.length);
      var current = $drink.attr("src");

      if(drinks[rand] === current) {
        rand = getNewIndex(rand, drinks.length);
      }
      $drink.fadeOut(800, "linear", function() {
          $drink.fadeIn(800,"linear").attr("src",drinks[rand]);
      });

    });

  });

function getNewIndex(index, end) {
  if(index === end) {
    return index - 1;
  }
  return index + 1;
}
