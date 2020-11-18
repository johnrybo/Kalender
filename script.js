window.addEventListener("load", main);

function main() {
  fetchDaysFromApi();
}

// Hämtar aktuell månad och år
const today = new Date();
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

    console.log(day);

    let newDay = document.createElement("div");
    newDay.innerHTML = day.datum;

    let main = document.querySelector("main");
    main.append(newDay);
  }
}
