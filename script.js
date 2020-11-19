window.addEventListener("load", main);

function main() {
  fetchDaysFromApi();

  // Visar aktuell dag, månad och tid men borde nog sättas i en egen funktion?
  document.getElementById("dayOfTheWeek").innerHTML = today.getDay();
  document.getElementById("dateAndTime").innerHTML = today.toLocaleString();

}

// Hämtar aktuell månad och år
let today = new Date();
let days = today.getDay(["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"]);
let year = today.getFullYear();
let month = today.getMonth() + 1;


// Nånting
async function fetchDaysFromApi() {
  let days = await getDays(year, month);
  buildCalendar(days);

  let nextMonth = document.getElementById("nextMonth");
  nextMonth.addEventListener("click", goToNextMonth);
}

// Hämtar dagar från API
async function getDays(year, month) {
  let url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

// Går till nästa månad
async function goToNextMonth() {
  month++;
  let days = await getDays(year, month);
  buildCalendar(days);
}

// Bygger upp kalendern
function buildCalendar(days) {
  for (const day of days.dagar) {

    
   // console.log(day);

    let newDay = document.createElement("div");
    newDay.innerHTML = day.datum;

    let main = document.querySelector("main");
    main.append(newDay);
  }
}

//Försökte få den att skriva vilken dag det är, blir rätt i console-loggen

/** function daysToString() {
  const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[today.getDay()]
}

console.log(daysToString()) */

