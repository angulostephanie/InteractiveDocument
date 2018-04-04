$(document).ready(function() {
  setInitalTimer();
  buttonClick();
  // startClock();
  // //console.log("Timer is at this value: " + $("#hours").text());
  // var hoursLabel = $("#hours").val();
});

function convertHour(str) {
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
    var hour = convertHour(arrival);
    $("#hours").html(pad(hour, "hour"));
    console.log("Changed, arrival now: " + hour);
  });
}

function setInitalTimer() {
  var arrival = $("#arrival").val();
  var hour = convertHour(arrival);
  $("#hours").html(pad(hour, ""));
  arrivalUpdated();
}

function buttonClick() {
  $("#btnSubmit").click(function(){
    var weight = $("#weight").val();
    var arrival = $("#arrival").val();
    var departure = $("#departure").val();

    if(weight && arrival && departure) {
      //alert("Weight " + weight + ", arrival " + arrival + ", departure " + departure);
    } else {
      //alert("PLEASE FILL OUT EVERYTHING");
    }

    startClock(convertHour(departure));
  });
}

function startClock(endHour) {
  console.log("Will end at hour: " + endHour);
  var hoursLabel = $("#hours").text();
  var minutesLabel = $("#minutes").text();
  var totalMinutes = parseInt(hoursLabel)*60 + parseInt(minutesLabel);
  console.log(hoursLabel);

  var interval = setInterval(function() {
    ++totalMinutes;
    var minutes = totalMinutes % 60;
    var hours = parseInt(totalMinutes / 60);
    $("#hours").html(pad(hours, "hour"));
    $("#minutes").html(pad(minutes, ""));

    if(hours === endHour) {
      clearInterval(interval);
    }
    //if(hours is equal to end hour, break)
  }, 150);
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
