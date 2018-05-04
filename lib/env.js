$(document).ready(function() {
  var $soberBtn = $("#btn");
  var $drink = $('#drink');
  $soberBtn.prop("disabled",true);
  $soberBtn.css("opacity", "0.65");
  $drink.css("opacity", "0.65");

  var drinkCount = 0;
  var drinks = [
    "src/beer.png",
    "src/shot.png",
    "src/wine.png"];


    $soberBtn.click(function(){
      console.log("clicked woo");
      $drink.prop("disabled",true);
      $drink.css("opacity", "0.65");
    });
    $drink.click(function(){
      if ($drink.css("opacity") != "1") {
          console.log("drinks are disabled");
      } else {
        
          newDrinkCount = changeDrinks($drink, drinks, drinkCount);
          drinkCount = newDrinkCount;
      }
    });
  });

  function changeDrinks($drink, drinks, drinkCount) {
    if ($drink.is(':animated')) return drinkCount;

    ++drinkCount;
    console.log(drinkCount);

    if(drinkCount == 1) {
      $("#drinkCount").html(drinkCount + " drink");
    } else {
      $("#drinkCount").html(drinkCount + " drinks");
    }

    var rand = parseInt(Math.random() * Math.floor(drinks.length));
    var current = $drink.attr("src");

    $drink.fadeOut(500, "linear", function() {
      $drink.fadeIn(500,"linear").attr("src",drinks[rand]);
    });

    return drinkCount;
  }


  function pad(val, str) {
    if(str === "hour" && val > 12) {
      val = val - 12;
    }
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    }
    return valString;
  }

  function getClockHour(str) {
    var hour = parseInt(str);
    hour = str/100;
    if(hour > 12) {
      hour = hour - 12;
    }
    return hour;
  }
