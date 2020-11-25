window.addEventListener("load", main);

let days;

function main() {
  fetchDaysFromApi();
  welcomeUser();
  daysToString();
  monthToString();
  showYear();
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
  console.log(data);
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



