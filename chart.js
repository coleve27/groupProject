
//initializes Firebase
  var config = {
    apiKey: "AIzaSyAuiVqiLt875PySC-huWlPsFCbyOzP_9YU",
    authDomain: "test5678-40e7e.firebaseapp.com",
    databaseURL: "https://test5678-40e7e.firebaseio.com",
    projectId: "test5678-40e7e",
    storageBucket: "test5678-40e7e.appspot.com",
    messagingSenderId: "978261248123"
      };


  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName

  google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

$("#submit").click(function(event){
    event.preventDefault();

    console.log("I work!");

    trainName = $("#train-name").val().trim();

    console.log(trainName);

    var newTrain = {
      name: trainName
    }

    database.ref().push(newTrain);

    $("#train-name").val("");
  });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    
    let TrainName = snapshot.val().name;

  });


      function drawChart() {
        var firebaseData = $.ajax({
          url: "https://test5678-40e7e.firebaseio.com",
          datatype: "variable",
        }).responseText;

        var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          bars: 'horizontal', // Required for Material Bar Charts.
          hAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var data = new google.visualization.Bar(firebaseData);

        var chart = new google.charts.Bar(document.getElementById('chart_div'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      };
  





