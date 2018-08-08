// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1BU3CEKnkamzMpUF7sy_8XoQaZ3Y4MFw",
    authDomain: "train-schedule-ef602.firebaseapp.com",
    databaseURL: "https://train-schedule-ef602.firebaseio.com",
    projectId: "train-schedule-ef602",
    storageBucket: "",
    messagingSenderId: "1092064675854"
};
firebase.initializeApp(config);

// variable for convience
var db = firebase.database();

// Capture Button Click
$(document).on("click", "#submit", function(e){
    //To prevent refreshing
    e.preventDefault();

    //Grab text values from textboxes
    var trainName = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    console.log(trainName)
    console.log(destination)
    console.log(firstTrainTime)
    console.log(frequency)

    //Push it up to the firebase database
    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });
});

db.ref().on("child_added", function(snap){
    // Made sv for convience
    var sv = snap.val()
    // Create a table row
    var row = $("<tr>")
    // append td info into table row
    row.append($("<td>" + sv.trainName +"</td>"))
    row.append($("<td>" + sv.destination +"</td>"))
    row.append($("<td>" + sv.frequency +"</td>"))

    //convert firstTrainTime from military time to AM/PM
    var timeConverted = moment(sv.firstTrainTime, "HH:mm");
    var convert = (moment(timeConverted).format("hh:mm a"));
    //append the converted time
    row.append($("<td>" + convert +"</td>"));
    row.append($("<td>" + "###" +"</td>"))
    // append table row into HTML in #trains ID
    $("#trains").append(row)
})