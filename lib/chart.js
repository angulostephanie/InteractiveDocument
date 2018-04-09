$(document).ready(function() {

});

// function createChart(array) {
//   google.charts.load('current', {'packages':['corechart']});
//   // Set a callback to run when the Google Visualization API is loaded.
//   google.charts.setOnLoadCallback(drawChart);
//   console.log(typeof array);
//   console.log("hey there " + array);
//   // Callback that creates and populates a data table,
//   // instantiates the pie chart, passes in the data and
//   // draws it.
//   function drawChart() {
//     var chartSec = $("#chart");
//     var x = Object.values(array);
//
//     var data = google.visualization.arrayToDataTable(x);
//
//     var options = {
//       title: 'BAC',
//       legend: { position: 'bottom' },
//       'width': chartSec.width(),
//       'height': chartSec.height(),
//       animation:{
//         duration: 1000,
//         startup: true,
//         easing: 'out'
//       }
//     };
//
//
//     var iframe = document.getElementById('graphiFrame');
//     var frameDoc = iframe.contentDocument || iframe.contentWindow.document;
//     var el = frameDoc.getElementById('chart');
//     var chart = new google.visualization.LineChart(el);
//     chart.draw(data, options);
//
//
//
//   }


}
