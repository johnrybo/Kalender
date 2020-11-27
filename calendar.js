window.addEventListener("load", main);

let days;

function main() {
  fetchDaysFromApi();
  welcomeUser();
  daysToString();
  monthToString(today.getMonth());
  showYear(today.getFullYear());
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
  
  let monthInHeader = document.getElementById('monthInHeader');
  if (monthInHeader.innerHTML === 'December') {
  
  month-10;
  days = await getDays(year, month);
  monthToString(today.getMonth() -10);
  goToNextYear();

  } else {
  month++;
  days = await getDays(year, month);
  monthToString(today.getMonth() +1);
  }

  buildCalendar();
}

async function goToNextYear(){
 // om månaden är december så ska året ökas med 1
 let monthInHeader = document.getElementById('monthInHeader');

  if ( monthInHeader.innerHTML === "January") {
    year++;
    month -11;
    days = await getDays(year++, month -11);
    showYear(today.getFullYear() +1);
    
 } else {
   year;
   month;
   days = await getDays(year, month);
   showYear(today.getFullYear());
 }

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



