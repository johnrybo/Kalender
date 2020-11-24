window.addEventListener("load", main);

let days;

function main() {
  fetchDaysFromApi();
  welcomeUser();
  daysToString();
  monthToString();
  showYear();
}

// Hämtar aktuell månad och år
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;


// ----------- Kanske flytta dessa nedan till egen fil? (today.js)

// Visar aktuellt datum 
function welcomeUser() {
  document.getElementById("dateAndTime").innerHTML = today.toLocaleString();
}

// Visar aktuell veckodag
function daysToString() {
  const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('dayOfTheWeek').innerHTML = daysOfWeek[today.getDay()];
}

// Visar aktuell månad i header ovanför kalendern
function monthToString() {
  const monthOfYear = ['January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('monthInHeader').innerHTML = monthOfYear[today.getMonth()];
}

// Visar aktuellt år i header ovanför kalendern
function showYear() {
  document.getElementById("yearInHeader").innerHTML = today.getFullYear();
}


// ------------------------------------- KALENDERN ------------------------------------- 


// Nånting
async function fetchDaysFromApi() {
  days = await getDays(year, month);
  buildCalendar();

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
  days = await getDays(year, month);
  buildCalendar();
}

// Bygger upp kalendern
function buildCalendar() {
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
    
    // Kolla igenom alla todos och räkna ihop antalet för aktuell dag
    let todos = todosState.filter( (todo)=> todo.date === day.datum )

    let newDay = document.createElement("div");
    let newDayDate = document.createElement('span');
    let todoCount = document.createElement('span');
    todoCount.style.fontSize = '1.5rem';

    newDay.append(newDayDate);
    newDay.append(todoCount);
    newDayDate.append(day.datum);

    if (todos.length > 0) {
      todoCount.append(todos.length);
    }

    main.append(newDay);
  }
}



