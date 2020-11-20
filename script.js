window.addEventListener("load", main);

function main() {
  fetchDaysFromApi();
  welcomeUser();
  daysToString();
}


// Hämtar aktuell månad och år
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;


// Visar aktuellt datum 
function welcomeUser() {
  document.getElementById("dateAndTime").innerHTML = today.toLocaleString();
}

// Visar aktuell veckodag
function daysToString() {
  const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('dayOfTheWeek').innerHTML = daysOfWeek[today.getDay()];
}

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
  let main = document.querySelector("main");
  main.innerHTML = "";
  
  const weekday = days.dagar[0]["dag i vecka"]
  //loop skapa tomma divvar för veckodagarna
    for (let i = 0; i < weekday -1; i++) {
      let emptyDay = document.createElement("div");
      emptyDay.style.backgroundColor = "white";
      main.append(emptyDay);
    }

    for (const day of days.dagar) {

    let newDay = document.createElement("div");
    newDay.innerHTML = day.datum;
    main.append(newDay);
  }
}



