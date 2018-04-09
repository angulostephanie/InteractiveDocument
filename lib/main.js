$(document).ready(function() {
  getGenderResults();
  getWeightResults();
  getDrinkResults();
  getTimeResults();
});

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

// things i didn't get to
function onStartButton(chart) {
  $("#btnSubmit").click(function(){
    var weight = $("#weight").val();

    var units =  $("#units:checked").val();
    var gender =  $("#gender:checked").val();
    var arrival = $("#arrival").val();
    var departure = $("#departure").val();
    var endHour = getClockHour(departure);

    if(weight && arrival && departure) {
      if($.isNumeric(weight)) {
        var weightInt = parseInt(weight);
        if(units === "lbs") {
          weightInt = convertToKilos(weightInt);
        }
        if(weightInt > 0) {
          // set up chart scale
          startClock(endHour, weightInt, chart);
        }
      } else {
        // weight needs to be a number
      }
    } else {
      //alert("PLEASE FILL OUT EVERYTHING");
    }

    // startClock(2, chart);
  });
}
function startClock(endHour, weight, chart) {
  console.log("Will end at hour: " + endHour);
  var hoursLabel = $("#hours").text();
  var minutesLabel = $("#minutes").text();
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

    $("#hours").html(pad(hours, "hour"));
    $("#minutes").html(pad(minutes, ""));
    $("#am_pm").html(str);

    var bac = computeBAC(2, weight, minutesElapsed/60, true);
    if(bac < 0) {
      bac = 0;
    }

    $("#bac").html(bac + " ");
    if(minutesElapsed % 5 === 0) {
        addData(chart, minutesElapsed, bac);
    }


    if(hours === endHour || hours === (endHour+12)) {
      clearInterval(interval);
      showLabels(chart);
    }
  }, 100);
}
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

  // helper functions
  function setInitalTimer() {
    var arrival = $("#arrival").val();
    var hour = getClockHour(arrival);
    $("#hours").html(pad(hour, ""));
    arrivalUpdated();
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
  function arrivalUpdated() {
    $( "#arrival" ).change(function() {
      var arrival = $("#arrival").val();
      var hour = getClockHour(arrival);
      $("#hours").html(pad(hour, "hour"));
      console.log("Changed, arrival now: " + hour);
    });
  }
