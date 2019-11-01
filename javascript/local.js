var firebaseConfig = {
  apiKey: "AIzaSyBn7VMdR4WtWU_6_IZIz8TDhJaNiuoqMm4",
  authDomain: "train-scheduler-dfde0.firebaseapp.com",
  databaseURL: "https://train-scheduler-dfde0.firebaseio.com",
  projectId: "train-scheduler-dfde0",
  storageBucket: "",
  messagingSenderId: "413132785643",
  appId: "1:413132785643:web:a0910b60f1b37ba7"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


// / 2. Button for adding Employees
$("#submit-button").on("click", function(event) {
  event.preventDefault();
 console.log('hi')

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainFirstTime = $("#train-first-time").val().trim()
  var trainFrequency = $("#train-frequency").val().trim();




  
// Assumptions

// Time is 3:30 AM
// var firstTime = "03:30";
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);
// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

nextTrain = nextTrain.toLocaleString()





   // Creates local "temporary" object for holding employee data
   var newTrain = {
    trainName: trainName,
    trainDestination: trainDestination,
    nextTrain: nextTrain,
    tMinutesTillTrain: tMinutesTillTrain,
    trainFirstTime: trainFirstTime,
    trainFrequency: trainFrequency
  };

    // Uploads train data to the database
    database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.trainDestination);
  console.log(newTrain.trainFirstTime);
  console.log(newTrain.trainFrequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-first-time").val("");
  $("#train-frequency").val("");
});




// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var trainFrequency = childSnapshot.val().trainFrequency;
    var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
    var nextTrain = moment(childSnapshot.val().nextTrain).format("HH:mm")

      // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTime);
  console.log(trainFrequency);
  console.log(nextTrain)

    // // Prettify the employee start
    // var trainStartPretty = moment.unix(trainFirstTime).format("MM/DD/YYYY");

      // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
   
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
    // $("<td>").text(trainStartPretty)
  )
    $(".table > tbody").append(newRow)

  });
