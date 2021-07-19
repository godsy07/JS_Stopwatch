// Declaring variables for time values for hour, minutes, seconds and centiseconds
let hour = 0;
let minute = 0;
let second = 0;
let centiSecond = 0;

// Declaring variables for displaying changing time
let displayHour = 0;
let displayMinutes = 0;
let displaySeconds = 0;
let displayCenti = 0;

// Declaring variables for changing status of stopwatch
let interval = null;
let watchStatus = "stopped";

// Declaring variables for storing time info
let stopwatchTime = [];
let arrayTime = [];

function stopWatchStarts() {
  centiSecond++;

  if (centiSecond / 100 === 1) {
    centiSecond = 0;
    second++;

    if (second / 60 === 1) {
      second = 1;
      minute++;

      if (minute / 60 === 1) {
        minute = 1;
        hour++;
      }
    }
  }
  displayTime();

  stopwatchTime = {
    hours: displayHour,
    minutes: displayMinutes,
    seconds: displaySeconds,
    centiseconds: displayCenti,
  };
}

// Reset values
function resetValues() {
  if (watchStatus === "started") {
    // If the stopwatch is running
    window.clearInterval(interval);
    watchStatus = "stopped";
  }
  hour = minute = second = centiSecond = 0;
}
// Function to display time
function displayTime() {
  displayCenti = centiSecond < 10 ? "0" + centiSecond.toString() : centiSecond;
  displaySeconds = second < 10 ? "0" + second.toString() : second;
  displayMinutes = minute < 10 ? "0" + minute.toString() : minute;
  displayHour = hour < 10 ? "0" + hour.toString() : hour;

  document.getElementById("centi-data").innerHTML = displayCenti;
  document.getElementById("sec-data").innerHTML = displaySeconds;
  document.getElementById("min-data").innerHTML = displayMinutes;
  document.getElementById("hour-data").innerHTML = displayHour;
}

// Funtion for starting the stopwatch
function startWatch() {
  if (watchStatus === "stopped") {
    interval = window.setInterval(stopWatchStarts, 10);
    // document.getElementById("pause-play").innerHTML = "Pause";
    watchStatus = "started";
  }
}

// Funtion for playing or pausing the stopwatch
function pausePlayWatch() {
  if (watchStatus === "paused") {
    interval = window.setInterval(stopWatchStarts, 10);
    // document.getElementById("pause-play").innerHTML = "Pause";
    watchStatus = "started";
  } else if (watchStatus === "started") {
    window.clearInterval(interval);
    // document.getElementById("pause-play").innerHTML = "Play";
    watchStatus = "paused";
  }
}

// Function for stopping the watch
function stopWatch() {
  if (watchStatus === "started") {
    window.clearInterval(interval);
  }
  watchStatus = "stopped"; // If the status is paused or started
  resetValues();
  //   displayTime();
}

// Function for resetting the watch
function resetWatch() {
  resetValues();
  watchStatus = "stopped"; // If the status is paused or started
  displayTime();
}

// Function for record the stopwatch time
function saveTime() {
  if (stopwatchTime) {
    arrayTime = arrayTime.concat(stopwatchTime);
    stopwatchTime = null;
  }
  if (arrayTime.length === 11) {
    // Retain upto 10 values
    arrayTime.splice(0, 1);
  }
  // Display the saved data in Page
  if (arrayTime.length > 0) {
    let textContent = "";
    for (let i = arrayTime.length - 1; i >= 0; i--) {
      textContent +=
        arrayTime[i].hours +
        " hour : " +
        arrayTime[i].minutes +
        " min : " +
        arrayTime[i].seconds +
        " sec : " +
        arrayTime[i].centiseconds +
        "\n";
    }
    document.getElementById("record-details").innerHTML =
      arrayTime.length + " records saved \n" + textContent;
  }
  //   resetValues();
  //   displayTime();
}
