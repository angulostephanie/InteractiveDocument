$(document).ready(function() {
  setInitalTimer();
  var chart = makeChart();
  onStartButton(chart);
});


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
    addData(chart, minutesElapsed, bac);

    if(hours === endHour || hours === (endHour+12)) {
      clearInterval(interval);
      showLabels(chart);
    }
  }, 100);
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

  return Number(Math.round((first - second)+'e4')+'e-4');
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
  // chart.options.scale =  {
  //     xAxes: [{
  //       ticks: {
  //         display: true
  //         callback: function(value, index, values) {
  //           if(parseInt(value) % 30 === 0) {
  //             console.log(value);
  //             return value;
  //           }
  //         }
  //       }
  //       // afterTickToLabelConversion: function(data) {
  //       //   var xLabels = data.ticks;
  //       //   console.log("hello" + xLabels);
  //       //   xLabels.forEach(function (labels, i) {
  //       //     if (i % 30 != 1){
  //       //       xLabels[i] = '';
  //       //     }
  //       //   });
  //       // }
  //     }]
  // }

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

  function convertToKilos(pounds) {
    return parseInt(pounds*(.4536))
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
