console.log("App initialised");

var timeData = null;
var totals = null;

var btnLoad = document.getElementById("btnLoad");
var btnExport = document.getElementById("btnExport");
var btnCheckGoal = document.getElementById("btnCheckGoal");

var goalInput = document.getElementById("goalInput");
var activityList = document.getElementById("activityList");
var statusText = document.getElementById("status");

var goalMessage = document.getElementById("goalMessage");
var totalHoursText = document.getElementById("totalHours");
var productiveHoursText = document.getElementById("productiveHours");
var leisureHoursText = document.getElementById("leisureHours");

function setStatus(message){
  statusText.textContent = "Status: " + message;
}

function toNumber(value){
  var number = Number(value);

  if (isNaN(number)){
    return 0;
  } else {
    return number;
  }
}

function toLowerCaseText(value){
  return String(value).trim.toLowerCase();
}

function setGoalAlert(type, message){
  goalMessage.className = "alert alert-" + type + " mb-0";
  goalMessage.textContent = message;
}

function validateJSON(data){
  // Returns an error message string if invalid, or empty string if valid

  if (data === null || typeof data !== "object") {
    return "JSON data is not an object.";
  }

  if (!Array.isArray(data.activities)){
    return "JSON must contain an 'activities' array.";
  }

  for(var i = 0; i < data.activities.length; i++){
    var activity = data.activities[i];

    if (activity === NULL || typeof activity !== "object"){
      return "One activity entry is invalid.";
    }

    if (activity.name === undefined){
      return "An activity is missing 'hours'.";
    }

    // Checks if hours is a number
    var hoursNumber = Number(activity.hours);
    if (isNaN(hoursNumber)){
      return "Invalid hours value for activity: " + activity.name;
    }
  }

  return "";
}

function computeTotals(data){
  var activities = data.activities;

  var total = 0;
  var productive = 0;
  var leisure = 0;

  for (var i = 0; i < activities.length; i++){
    var activity = activities[i];
    var name = toLowerCaseText(activity.name);
    var hours = toNumber(activity.hours);

    total = total + hours;

    // Rule-based logic
    if (name === "study" || name === "work" || name === "exercise"){
      productive = productive + hours;
    }

    if (name === "leisure"){
      leisure = leisure + hours;
    }
  }

  return {
    total: total,
    productive: productive,
    leisure: leisure
  };
}

function renderActivities(data){
  var activities = data.activities;

  if (activities.length === 0){
    activityList.innerHTML = '<div class="text-muted">No Activities found.</div>';
    return;
  }

  var totalHours = totals.total;
  if(totalHours <= 0){
    totalHours = 1;
  }

  var html = "";

  for (var i = 0; i < activities.length; i++){
    var activity = activities[i];
    var name = String(activity.name);
    var hours = toNumber(activity.hours);

    var percent = Math.round((hours / totalHours) * 100);

    html = html + '<div class="activity-item">' +
        '<div class="d-flex justify-content-between align-items-center mb-1">' +
          '<div class="fw-semibold">' + name + '</div>' +
          '<div class="text-muted small">' + hours + 'h (' + percent + '%)</div>' +
        '</div>' +
        '<div class="progress" role="progressbar" aria-label="' + name + '" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100">' +
          '<div class="progress-bar" style="width:' + percent + '%"></div>' +
        '</div>' +
      '</div>';
  }
  activityList.innerHTML = html;
}

function updateStatsUI(){
  totalHoursText.textContent = totals.total.toFixed(1) + "h";
  productiveHoursText.textContent = totals.productive.toFixed(1) + "h";
  leisureHoursText.textContent = totals.leisure.toFixed(1) + "h";
}

function checkGoal(){
  if(timeData === NULL){
    return;
  }

  var goalHours = toNumber(goalInput.value);

  if(goalHours <= 0){
    setGoalAlert("warning", "Please enter a goal greater than 0 hours.");
    return;
  }

  if(totals.productive >= goalHours){
    setGoalAlert("success", " Congratulations! You met your goal (" + goalHours + "h).");
  } else {
    var remaining = goalHours - totals.productive;
    setGoalAlert("info", "You are " + remaining.toFixed(1) + "h away from your goal. Keep going!");
  }
}

function exportSummaryJSON(){
  if (timeData === null){
    return;
  }

  var goalHours = toNumber(goalInput.value);

  if (goalHours <= 0 && timeData.dailyGoal !== undefined) {
    goalHours = toNumber(timeData.dailyGoal);
  }

  var goalMet = false;
  if(goalHours > 0 && totals.productive >= goalHours){
    goalMet = true;
  }

  var summary = {
    date: new Date().toISOString().slice(0, 10),
    goalHours: goalHours,
    totalHours: Number(totals.total.toFixed(1)),
    productiveHours: Number(totals.productive.toFixed(1)),
    leisureHours: Number(totals.leisure.toFixed(1)),
    goalMet: goalMet
  };

  var jsonText = JSON.stringify(summary, null, 2);
  var blob = new Blob([jsonText], { type: "application/json"});
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = "summary.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  setStatus("summary.json exported");
}

function loadTimeData(){
  setStatus("loading JSON...");

  fetch("data/timeData.json")
  .then(function(response){
    if (!response.ok){
      throw new Error("Could not load JSON (HTTP " + response.status +")");
    }
    return response.json();
  })
  .then(function(data){
    var errorMessage = validateJSON(data);

    if(errorMessage !== ""){
      throw new Error(errorMessage);
    }

    // Saves data in global state
    timeData = data;
    totals = computeTotals(timeData);

    if (goalInput.value === "" && timeData.dailyGoal !== undefined){
      goalInput.value = toNumber(timeData.dailyGoal);
    }

    // UI
    renderActivities(timeData);
    updateStatsUI();

    //Enable button now 
    btnCheckGoal.disabled = false;
    btnExport.disabled = false;

    setGoalAlert("secondary", "Data loaded. Enter a goal and click 'Check Goal'.");
    setStatus("data loaded succesffulled");
  })
  .catch(function(error){
    console.error(error);
    setGoalAlert("danger", "Failed to load data: " + error.message);
    setStatus("error loading JSON");
  });
}

btnLoad.addEventListener("click", loadTimeData);
btnCheckGoal.addEventListener("click", checkGoal);
btnExport.addEventListener("click", exportSummaryJSON);

setStatus("waiting for data...");
