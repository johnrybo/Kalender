window.addEventListener("load", main);

let days;

function main() {
  fetchDaysFromApi();
  welcomeUser();
  daysToString();
  monthToString(today.getMonth() + 1);
  showYear(today.getFullYear());
}

// ------------------------------------- KALENDERN ------------------------------------- 


/** Returnerar ett löfte */
async function fetchDaysFromApi() {
  days = await getDays(year, month);
  buildCalendar();

  // Går till nästa månad när man klickar på högerpilen
  let nextMonth = document.getElementById("nextMonth");
  nextMonth.addEventListener("click", goToNextMonth);

  // Går till föregående månad när man klickar på vänsterpilen
  let prevousMonth = document.getElementById('previousMonth');
  prevousMonth.addEventListener('click', goToPreviousMonth);
}

/** Hämtar dagar från API */
async function getDays(year, month) {
  let url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

async function goToPreviousMonth() {
  if (month == 1) {
    year = year - 1;
    month = month + 11;
    days = await getDays(year, month);

    monthToString(month);
    showYear(year);
    buildCalendar();

  } else {
    month = month - 1;
    days = await getDays(year, month);

    monthToString(month);
    buildCalendar();
  }
}

/** Går till nästa månad */
async function goToNextMonth() {

  if (month == 12) {
    year++;
    month = month - 11;
    days = await getDays(year, month);

    monthToString(month);
    showYear(year);
    buildCalendar();

  } else {
    month++
    days = await getDays(year, month);

    monthToString(month);
    buildCalendar();
  }
}

/**  Bygger upp kalendern */
function buildCalendar() {

  let main = document.querySelector("main");
  main.innerHTML = "";

  const weekday = days.dagar[0]["dag i vecka"]

  //loop skapar tomma divvar för veckodagarna innan aktuell månad börjar
  for (let i = 0; i < weekday - 1; i++) {
    let emptyDay = document.createElement("div");
    emptyDay.style.backgroundColor = "white";
    main.append(emptyDay);
  }
  
  for (const day of days.dagar) {

    // Kollar igenom alla todos och räknar ihop antalet för aktuell dag
    let todos = todosState.filter((todo) => todo.date === day.datum)

    let newDay = document.createElement("div");
    let newDayDate = document.createElement('span');
    let todoCount = document.createElement('span');
    let holiday = document.createElement('span');
    todoCount.style.fontSize = '1.5rem';
    newDay.classList.add('newday');
    holiday.classList.add('holiday');

    newDay.append(newDayDate);
    newDay.append(todoCount);
    newDay.append(holiday);
    newDayDate.append(day.datum);

    if (day.helgdag !== undefined) {
      holiday.append(day.helgdag);
    }

    if (todos.length > 0) {
      todoCount.append(todos.length);
    }

    let todayBg = new Date();
    let todayBgYear = todayBg.getFullYear();
    let todayBgMonth = todayBg.getMonth() + 1;
    let todayBgDay = todayBg.getDate();
    let todayBgString = `${todayBgYear}-${todayBgMonth}-${todayBgDay}`;

    if (newDayDate.innerHTML === todayBgString) {
      newDay.style.backgroundColor = "#A36BFF";
      newDayDate.style.color = "white";
      newDayDate.style.fontWeight = "bold";
      todoCount.style.color = "#E6D7FF";

    }

    main.append(newDay);
  }
}