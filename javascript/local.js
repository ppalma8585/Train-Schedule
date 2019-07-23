(function() {
    'use strict';
    window.addEventListener('load', function() {
      
      var forms = document.getElementsByClassName('needs-validation');
      
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
           }
           form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
        
  
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

  var name = "";
    var destination = "";
    var firstTime = 0;
    var frequency = "";
  
  
  
    $("#submit-button").on("click", function(event) {
    event.preventDefault();
  
              
        var input = $("input");
        var tName = $("#train-name").val().trim();
        var tDestination = $("#train-destination").val().trim();
        var tFirstTime = moment($("#train-first-time").val().trim(), "HH:mm");
        var tFrequency = parseInt($("#train-frequency").val().trim());

        if (tName.length === 0) {
         tName = "";
         $("#train-name").val("");
          $("#train-name").attr("class", "form-control is-invalid");
            $("#invalid-name").text("Please enter a Train name")
         }
         else {
                    $("#train-name").attr("class", "form-control");
                    $("#invalid-name").text("");
            }

         if (tDestination.length === 0) {
                    tDestination = "";
                    $("#train-destination").val("");
                    $("#train-destination").attr("class", "form-control is-invalid");
                    $("#invalid-destination").text("Please enter a destination");
                    
            }
        else {
                    $("#train-destination").attr("class", "form-control");
                    $("#invalid-destination").text("");
                }

         if (Number.isInteger(tFrequency) === false) {
                    $("#train-frequency").val("");
                    $("#train-frequency").attr("class", "form-control is-invalid");
                    $("#invalid-frequency").text("Please enter a valid frequency");
         }
         else {
                    $("#train-frequency").attr("class", "form-control");
                    $("#invalid-frequency").text("");
                }
            
              if (moment(tFirstTime).isValid() === false) {
                tFirstTime = "";
                $("#train-first-time").val("");
                $("#train-first-time").attr("class", "form-control is-invalid");
                $("#invalid-time").text("Please enter a valid time");

                return    
            }
            
            $("#train-first-time").attr("class", "form-control");
            $("#invalid-time").text("");
  
        var newTrain = {
                  name: tName,
                  destination: tDestination,
                  firstTime: tFirstTime.format("HH:mm"),
                  frequency: tFrequency
              };
              $("#train-first-Time").attr("class", "form-group");
              
              $("#helpBlock").text("");
  
  
              
              database.ref().push(newTrain);
  
              console.log(newTrain.name);
              console.log(newTrain.destination);
              console.log(newTrain.firstTime);
              console.log(newTrain.frequency);
  
              
              $("#train-name").val("");
              $("#train-destination").val("");
              $("#train-first-time").val("");
              $("#train-frequency").val("");
  
          });
  
          
          database.ref().on("child_added", function(childSnapshot) {
  
              var tName = (childSnapshot.val().name);
              var tDestination = (childSnapshot.val().destination);
              var tFirstTime = (childSnapshot.val().firstTime)
              var tFrequency = (childSnapshot.val().frequency);
              
  
              var convertedTime = moment(tFirstTime, "HH:mm").subtract(1, "years");
              console.log(convertedTime);
  
             
              var currentTime = moment();
  
             
              var diffTime = moment().diff(moment(convertedTime), "minutes");
              console.log("Differennce in time: " + diffTime);
  
              
              var tRemainder = diffTime % tFrequency;
              console.log(tRemainder);
  
              var minutesAway = tFrequency - tRemainder;
              console.log("Minutes until train: " + minutesAway);
  
              var nextArrival = moment().add(minutesAway, "minutes");
              console.log("Arrival time: " + moment(nextArrival).format("HH:mm"));
  
  
            
              var newRow = $("<tr>").append(
                  $("<td>").text(tName),
                  $("<td>").text(tDestination),
                  $("<td>").text(tFrequency),
                  $("<td>").text(nextArrival.format("HH:mm")),
                  $("<td>").text(minutesAway)
              );
  
              
              $("#full-table").append(newRow);
          })
  
      