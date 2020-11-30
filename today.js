/** Hämtar aktuell månad och år */
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;

/** Visar aktuellt datum */
function welcomeUser() {
  document.getElementById("dateAndTime").innerHTML = today.toLocaleString();
}

/** Visar aktuell veckodag */
function daysToString() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('dayOfTheWeek').innerHTML = daysOfWeek[today.getDay()];
}

/** Visar aktuell månad i header ovanför kalendern */
function monthToString(month) {
  const monthOfYear = ['', 'January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('monthInHeader').innerHTML = monthOfYear[month];
}

/** Visar aktuellt år i header ovanför kalendern */
function showYear(year) {
  document.getElementById("yearInHeader").innerHTML = year;
}
