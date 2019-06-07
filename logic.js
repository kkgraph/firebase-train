// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAfY1ijxlUc9eTqD_Ehd2t1L64BY8n2iH4",
    authDomain: "train-firebasehw.firebaseapp.com",
    databaseURL: "https://train-firebasehw.firebaseio.com",
    projectId: "train-firebasehw",
    storageBucket: "",
    messagingSenderId: "31134495801",
    appId: "1:31134495801:web:ccc7c5ab8ee61d28"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database & other vars
var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0
  
$(".btnTrain").on("click", function (event) {
    event.preventDefault();
  
    trainName = $("#trainName").val().trim();
    destination = $("#dest").val().trim();
    firstTrain = $("#firstTrain").val();
    frequency = $("#freq").val().trim();
  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  
//CHILD FUNCTION
database.ref().on("child_added", function (childSnapshot) {
// stores all elements into child variable
    var childTrainName = childSnapshot.val().trainName;
    var childDest = childSnapshot.val().destination;
    var childFrequency = childSnapshot.val().frequency;
    var childFirstTrain = childSnapshot.val().firstTrain;
  
// Console Log the train info 
    console.log(childTrainName);
    console.log(childDest);
    console.log(childFirstTrain);
    console.log(childFrequency);

//TIME
// Push back first time so that it comes before current time
    var firstTimeConv = moment(childFirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConv);
  
    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));
  
 // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConv), "minutes");
    console.log("time diff: " + diffTime);
  
// Time apart (remainder)
    var timeRemaining = diffTime % childFrequency
    console.log(timeRemaining);
  
// Minutes until train
    var minAway = childFrequency - timeRemaining;
    console.log("Mins Away: " + minAway);
  
// Time of next arriving train
    var nextArrival = moment().add(minAway, 'minutes').format("hh:mm a");
    console.log("Next: " + nextArrival);

//ADDING ROWS
// Creating new row to display
    var newRow = $("<tr scope='row'>").append(
      $("<td>").text(childTrainName),
      $("<td>").text(childDest),
      $("<td>").text(childFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway),
  
  );
  
// Appends new row to the table
  $(".trainTable").append(newRow);
  
  });