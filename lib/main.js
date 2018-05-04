$(document).ready(function() {
  var $arrival = $("#arrival");
  var $departure = $("#departure");
  var $startBtn = $('#startBtn');
  var $weight = $("#weight");
  var $continueBtn = $("#continueBtn");
  $continueBtn.prop("disabled",true);
  $continueBtn.css("opacity", "0.65");

  var weight = 0;
  var isMale = true;
  var $userdescription = $("#user-description");
  var $userdescription2 = $("#user-description2");
  var chart =  generateRealTimeBarGraph();

  $startBtn.click(function(){
    var arrivalValue = $arrival.val();
    var departureValue = $departure.val();
    var originalWeight = $weight.val();
    var units =  $("#units:checked").val();
    var gender =  $("#genderRB:checked").val();
    var startHour = getClockHour(arrivalValue);
    var endHour = getClockHour(departureValue);
    if(!originalWeight) {
      alert("Please put in a weight!");
      return;
    }


    isMale = true;
    var unitsStr = "kgs";

    originalWeight = parseInt(originalWeight);

    weight = originalWeight;
    if(units === "lbs") {
      weight = convertToKilos(originalWeight);
      unitsStr = "lbs";
    }
    if(gender === "female") {
      isMale = false;
    }

    setTimer(startHour);




    $(this).prop("disabled",true);
    $(this).css("opacity", "0.65");
    var $drink = $("#frame").contents().find("#drink");
    var $soberBtn = $("#frame").contents().find("#btn");
    $($drink).css("opacity", "1");
    $($soberBtn).prop("disabled",false);
    $($soberBtn).css("opacity", "1");
    $userdescription.html("We are simulating a " + originalWeight + unitsStr +
        " " + gender +"'s BAC throughout a night.");
    $userdescription2.html("They arrived to the party at " + startHour
    + "pm and will be leaving at " + endHour +"am.");
    startEnvironment(endHour, chart, weight, isMale);
  });

  $arrival.change(function() {
    var newArrivalValue = $arrival.val();
    var departureValue = $departure.val();
    var startHour = getClockHour(newArrivalValue);
    setTimer(startHour);
    console.log("Changed, arrival now: " + startHour);
  });
  $continueBtn.click(function() {
    continueTimer(chart,  weight, isMale)
  });

  // getGenderResults();
  // getWeightResults();
  // getDrinkResults();
  // getTimeResults();

});

function startEnvironment(endHour, chart,  weight, isMale) {
  startTimer(endHour, chart,  weight, isMale);
  console.log("button clicked!");
}

function setTimer(startHour) {
  var $hour = $("#frame").contents().find("#hours");
  console.log("Arrival hour is " + startHour);
  $hour.html(pad(startHour, "hour"));
  console.log($hour.val());
}

function startTimer(endHour, chart,  weight, isMale) {
  console.log("Will end at hour: " + endHour);
  var $hour = $("#frame").contents().find("#hours");
  var $minutes = $("#frame").contents().find("#minutes");
  var $am_pm = $("#frame").contents().find("#am_pm");
  var $drinkCount = $("#frame").contents().find("#drinkCount");
  var $drink = $("#frame").contents().find("#drink");
  var $soberBtn = $("#frame").contents().find("#btn");

  var $bac = $("#bac");
  var $symptoms = $("#symptoms");
  var $continueBtn = $("#continueBtn");
  var hoursLabel = $hour.text();
  var minutesLabel = $minutes.text();
  var minutesElapsed = 0;

  var interval = setInterval(function() {
    ++minutesElapsed;

    var totalMinutes = parseInt(hoursLabel)*60 + parseInt(minutesLabel) + minutesElapsed;
    var minutes = totalMinutes % 60;
    var hours = parseInt(totalMinutes / 60);
    var str = "PM";

    if(hours > 11) {
      str = "AM"
    }

    $hour.html(pad(hours, "hour"));
    $minutes.html(pad(minutes, ""));
    $am_pm.html(str);

    var drinksLabel = $drinkCount.text();
    var drinkArr = drinksLabel.split(" ");
    var drinks = parseInt(drinkArr[0]);

    var bac = computeBAC(drinks, weight, minutesElapsed/60, isMale);
    if(bac < 0) {
      bac = 0;
    }
    $bac.html("Your Realtime BAC is " + bac);
    if(minutesElapsed % 3 === 0) {
      //console.log("My bac " +bac);
      replaceData(chart, bac)

    }

    if(minutesElapsed % 10 == 0) {
      updateSymptoms(bac, $symptoms);
    }
    if(hours === endHour || hours === (endHour+12)) {
      clearInterval(interval);
      $("#startBtn").prop("disabled",false);
      $("#startBtn").css("opacity", "1");
      //console.log("REMAINING HOURS = " + computeRemainingHours(bac, drinks, weight, minutesElapsed/60, isMale));
      $soberBtn.prop("disabled",true);
      $soberBtn.css("opacity", "0.65");
      $drink.css("opacity", "0.55");
      $continueBtn.prop("disabled",false);
      $continueBtn.css("opacity", "1");
    }
  }, 175);
}

function continueTimer(chart,  weight, isMale) {

  var $hour = $("#frame").contents().find("#hours");
  var $minutes = $("#frame").contents().find("#minutes");
  var $am_pm = $("#frame").contents().find("#am_pm");
  var $drinkCount = $("#frame").contents().find("#drinkCount");
  var $drink = $("#frame").contents().find("#drink");
  var $soberBtn = $("#frame").contents().find("#btn");
  var $bac = $("#bac");
  var $symptoms = $("#symptoms");
  var hoursLabel = $hour.text();
  var minutesLabel = $minutes.text();
  var minutesElapsed = 0;

  var interval = setInterval(function() {
    ++minutesElapsed;

    var totalMinutes = parseInt(hoursLabel)*60 + parseInt(minutesLabel) + minutesElapsed;
    var minutes = totalMinutes % 60;
    var hours = parseInt(totalMinutes / 60);
    var str = "PM";

    if(hours > 11) {
      str = "AM"
    }

    $hour.html(pad(hours, "hour"));
    $minutes.html(pad(minutes, ""));
    $am_pm.html(str);

    var drinksLabel = $drinkCount.text();
    var drinkArr = drinksLabel.split(" ");
    var drinks = parseInt(drinkArr[0]);

    console.log("num of drinks [" + drinks + "]");
    var bac = computeBAC(drinks, weight, minutesElapsed/60, isMale);
    if(bac < 0) {
      bac = 0;
    }
    $bac.html("Your Realtime BAC is " + bac);
    if(minutesElapsed % 3 === 0) {
      //console.log("My bac " +bac);
      replaceData(chart, bac)

    }

    // if(minutesElapsed % 10 == 0) {
    //   updateSymptoms(bac, $symptoms);
    //   //update symptoms$symptoms
    // }
    if(bac == 0) {
      clearInterval(interval);
      $continueBtn.prop("disabled",true);
      $continueBtn.css("opacity", "0.65");
    }
  }, 50);
}

function computeRemainingHours(bac, drinkCount, weight, hoursCount, isMale) {
  var waterConstant = .49;
  var metabolismConstant = .017;

  if(isMale) {
    waterConstant = .58;
    metabolismConstant = .015;
  }

  var top = (.806)*(drinkCount)*(1.2);
  var bottom = waterConstant*weight;

  var first = top / bottom;
  var second = first - bac;

  var answer = second/metabolismConstant;
  if(answer < 0) {
    return 0;
  }
  return Number(Math.round((answer)+'e4')+'e-4');
}
function computeBAC(drinkCount, weight, hoursCount, isMale) {
  // Returns BAC as a percentage
  // Equation taken from Wikipedia
  // https://en.wikipedia.org/wiki/Blood_alcohol_content#Estimated_blood_alcohol_content_by_intake

  var waterConstant = .49;
  var metabolismConstant = .017;

  if(isMale) {
    waterConstant = .58;
    metabolismConstant = .015;
  }

  var top = (.806)*(drinkCount)*(1.2);
  var bottom = waterConstant*weight;

  var first = top / bottom;
  var second = metabolismConstant*hoursCount;

  var answer = Number(Math.round((first - second)+'e4')+'e-4');
  if(answer < 0) {
    return 0;
  }
  return Number(Math.round((first - second)+'e4')+'e-4');
}

function convertToKilos(pounds) {
  return parseInt(pounds*(.4536))
}

function updateSymptoms(bac, symptoms) {
  var text = "";
  if(bac < .05) {
    text = "You're feeling good! Just keep chilling.";
  } else if(bac > .05 && bac < .08) {
    text = "You're buzzed! Behavior is slightly exaggerated, less shy than usual.";
  } else if(bac > .08 && bac < .13) {
    text = "You can no longer illegally drive!! Slight impairment of all senses - you probably think you're less drunk than you really are. ";
  } else if(bac > .13 && bac < .2) {
    text = "You're a sloppy drunk - senses are becoming more impaired, nausea may start to appear.";
  } else if(bac > .2 && bac < .25) {
    text = "BE CAREFUL. You need help walking/standing. Vomiting/blackouts are very likely.";
  } else if(bac > .25 && bac < .3) {
    text = "Mental, physical, sensory functions ares seriously impaired - please stop drinking and go to the hospital."
  } else if(bac > .3 && bac < .4) {
    text = "Comas can happen."
  } else if(bac > .4 && bac < .41) {
    text = "Death is highly possible at this stage."
  } else {

  }

  symptoms.fadeOut(400, "linear", function() {
    symptoms.fadeIn(400,"linear").html(text);
  });
}


function generateRealTimeBarGraph() {
  var chart = $("#myChart").val();
  var ctx = document.getElementById('myChart').getContext('2d');
  ctx.canvas.width = 200;
  ctx.canvas.height = 300;
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["BAC"],
      datasets: [
        {
          backgroundColor:"#ffffff",
          borderColor:"#ff0000",
          borderWidth:1,
          data: [.0]
        }
      ]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: .1,
            max: .5
          }
        }]
      },
      animation : false
    }
  });
  return myBarChart;
}

function replaceData(chart, bac) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop()
    dataset.data.push(bac);
    var hex = changeColor(bac);
    dataset.backgroundColor = hex;
    dataset.fillColor = hex;
    });

    chart.update();
}

function changeColor(bac) {
  var n = bac*15;
  if(n == 0) {
    n = 1;
  }
  var color = Math.ceil(255/n);

  if(color > 255) {
    color = 255;
  }

  var hexcolor = componentToHex(color);
  var hex = "#" + componentToHex(255) + hexcolor + hexcolor;

  return hex;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}












function getGenderResults() {
  computeGenderBAC();
  $("#gender-weight").change(function() {
    computeGenderBAC();
  });
  $("#gender-drinks").change(function() {
    computeGenderBAC();
  });
  $("#gender-time").change(function() {
    computeGenderBAC();
  });

}
function computeGenderBAC() {
  var weight = $("#gender-weight").val();
  var drinks =  $("#gender-drinks").val();
  var time =  $("#gender-time").val();
  if(parseInt(weight) > 49) {
    var maleBAC = "<b id = 'malebac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight)),
    parseInt(time), true) + "%.</b>";
    var femaleBAC = "<b id = 'femalebac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight)),
    parseInt(time), false) + "%.</b>";

    $("#male-result").text("The male's bac is ");
    $("#female-result").text("The female's bac is ");
    $("#male-result").append(maleBAC);
    $("#female-result").append(femaleBAC);

    $('#malebac').css('color', '#B20000');
    $('#femalebac').css('color', '#B20000');
    console.log("male " + maleBAC);
    console.log("female " + femaleBAC);
  } else {
    $("#male-result").text("");
    $("#female-result").text("");
    //alert("Weight has to be higher than 50");
    console.log("Weight has to be higher than 50");
  }
}
function getWeightResults() {
  computeWeightResults();
  $("#weight-1").change(function() {
    computeWeightResults();
  });
  $("#weight-2").change(function() {
    computeWeightResults();
  });
  $("#weight-gender").change(function() {
    computeWeightResults();
  });
  $("#weight-drinks").change(function() {
    computeWeightResults();
  });
  $("#weight-time").change(function() {
    computeWeightResults();
  });
}
function computeWeightResults() {
  var weight1 = $("#weight-1").val();
  var weight2 = $("#weight-2").val();
  var drinks =  $("#weight-drinks").val();
  var time =  $("#weight-time").val();
  var gender = $("#weight-gender").val();
  $("#gender-1").text(gender);
  $("#gender-2").text(gender);
  if((weight1.length != 0) && weight2.length != 0) {
    if(parseInt(weight1) > 49 && parseInt(weight2) > 49) {
      var isMale = true;
      if(gender == "female") {
        isMale = false;
      }
      var weight1BAC = "<b id = 'weight-1bac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight1)),
      parseInt(time), isMale) + "%.</b>";
      var weight2BAC = "<b id = 'weight-2bac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight2)),
      parseInt(time), isMale) + "%.</b>";

      $("#weight1-result").text("The " + gender + " weighing " + weight1 + " lbs has a BAC of ");
      $("#weight2-result").text("The " + gender + " weighing " + weight2 + " lbs has a BAC of ");
      $("#weight1-result").append(weight1BAC);
      $("#weight2-result").append(weight2BAC);

      $('#weight-1bac').css('color', '#B20000');
      $('#weight-2bac').css('color', '#B20000');
      console.log("weight1 " + weight1BAC);
      console.log("weight2 " + weight2BAC);
    }
  }
  else {
    $("#weight1-result").text("");
    $("#weight2-result").text("");
    //alert("Weights have to be higher than 50");
    console.log("Weights have to be higher than 50");
  }
}
function getDrinkResults() {
  computeDrinkBAC();
  $("#drinks-weight").change(function() {
    computeDrinkBAC();
  });
  $("#drinks-time").change(function() {
    computeDrinkBAC();
  });
  $("#drinks-gender").change(function() {
    computeDrinkBAC();
  });
  $("#drinks-1").change(function() {
    computeDrinkBAC();
  });
  $("#drinks-2").change(function() {
    computeDrinkBAC();
  });
}
function computeDrinkBAC() {
  var weight = $("#drinks-weight").val();
  var time =  $("#drinks-time").val();
  var gender = $("#drinks-gender").val();
  $("#dgender-1").text(gender);
  $("#dgender-2").text(gender);
  var drinks1 =  $("#drinks-1").val();
  var drinks2 =  $("#drinks-2").val();
  if(parseInt(weight) > 49) {
    var isMale = true;
    if(gender == "female") {
      isMale = false;
    }
    var drinks1bac = "<b id = 'drinks1-bac'>" + computeBAC(parseInt(drinks1), convertToKilos(parseInt(weight)),
    parseInt(time), isMale) + "%.</b>";
    var drinks2bac = "<b id = 'drinks2-bac'>" + computeBAC(parseInt(drinks2), convertToKilos(parseInt(weight)),
    parseInt(time), isMale) + "%.</b>";

    $("#drinks1-result").text("The " + gender + " drinking " + drinks1 + " drinks has a BAC of ");
    $("#drinks2-result").text("The " + gender + " drinking " + drinks2 + " drinks has a BAC of ");
    $("#drinks1-result").append(drinks1bac);
    $("#drinks2-result").append(drinks2bac);

    $('#drinks1-bac').css('color', '#B20000');
    $('#drinks2-bac').css('color', '#B20000');
    console.log("drink1 " + drinks1bac);
    console.log("drink2 " + drinks2bac);
  } else {
    $("#drinks1-result").text("");
    $("#drinks2-result").text("");
    console.log(" # OF DRINKS - Weight has to be higher than 50");
  }
}
function getTimeResults() {
  computeTimeBAC();
  $("#time-weight").change(function() {
    computeTimeBAC();
  });
  $("#time-drinks").change(function() {
    computeTimeBAC();
  });
  $("#time-gender").change(function() {
    computeTimeBAC();
  });
  $("#time-1").change(function() {
    computeTimeBAC();
  });
  $("#time-2").change(function() {
    computeTimeBAC();
  });
}
function computeTimeBAC() {
  var weight = $("#time-weight").val();
  var drinks =  $("#time-drinks").val();
  var time1 =  $("#time-1").val();
  var time2 =  $("#time-2").val();
  var gender = $("#time-gender").val();
  $("#tgender-1").text(gender);
  $("#tgender-2").text(gender);
  if(parseInt(weight) > 49) {
    var isMale = true;
    if(gender == "female") {
      isMale = false;
    }
    var drinks1bac = "<b id = 'time1-bac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight)),
    parseInt(time1), isMale) + "%.</b>";
    var drinks2bac = "<b id = 'time2-bac'>" + computeBAC(parseInt(drinks), convertToKilos(parseInt(weight)),
    parseInt(time2), isMale) + "%.</b>";

    $("#time1-result").text("The " + gender + " drinking within a  " + time1 + " hour period has a BAC of ");
    $("#time2-result").text("The " + gender + " drinking within a  " + time2 + " hour period has a BAC of ");
    $("#time1-result").append(drinks1bac);
    $("#time2-result").append(drinks2bac);

    $('#time1-bac').css('color', '#B20000');
    $('#time2-bac').css('color', '#B20000');
    console.log("time1 " + drinks1bac);
    console.log("time2 " + drinks2bac);
  } else {
    $("#time1-result").text("");
    $("#time2-result").text("");
    console.log(" time period - Weight has to be higher than 50");
  }
}


// things i didn't get to
// function onStartButton(chart) {
//   $("#btnSubmit").click(function(){
//     var weight = $("#weight").val();
//
//     var units =  $("#units:checked").val();
//     var gender =  $("#gender:checked").val();
//     var arrival = $("#arrival").val();
//     var departure = $("#departure").val();
//     var endHour = getClockHour(departure);
//
//     if(weight && arrival && departure) {
//       if($.isNumeric(weight)) {
//         var weightInt = parseInt(weight);
//         if(units === "lbs") {
//           weightInt = convertToKilos(weightInt);
//         }
//         if(weightInt > 0) {
//           // set up chart scale
//           startClock(endHour, weightInt, chart);
//         }
//       } else {
//         // weight needs to be a number
//       }
//     } else {
//       //alert("PLEASE FILL OUT EVERYTHING");
//     }
//
//     // startClock(2, chart);
//   });
// }

function showLabels(chart) {
  console.log(chart.data.labels);
  chart.options = {
        responsive: true,
        title: {
            display:true,
            text: 'Chart.js'
        },
        scales: {
            xAxes: [{
                display: true
            }]
        }
    }
  chart.update();
}
function addData(chart, time, bac) {
  chart.data.labels.push(time);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push({
      x: time,
      y: bac});
    });
    chart.update();
}
function makeChart(data) {
    var chart = $("#myChart").val();
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        datasets: [{
          label: "Test",
          borderColor: 'rgb(255, 99, 132)',
          data: []
        }]
      },

      // Configuration options go here
      options: {
        elements: {
          line: {
            tension: 0, // disables bezier curves
          }
        },
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        scales: {
          xAxes: [{
              ticks: {
                  display: false
              }
          }]
        }
      }
    });
    return chart;
  }
