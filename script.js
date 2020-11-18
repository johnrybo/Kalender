window.addEventListener("load", main);

function main() {
  fetchDaysFromApi();
}

async function fetchDaysFromApi() {
  
  let year = 2020;
  let month = 11;
  let days = await testFunction(year, month);

  let nextMonth = document.getElementById('nextMonth');
  nextMonth.addEventListener('click', nextMonthFuction);

  async function testFunction(year, month) {
    let url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
}

function nextMonthFuction() {

    testFunction(year, month);
    
    url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month++}`
    console.log(url);
}

    console.log(days);


 function buildCalendar(days) {
    for (const day of days.dagar) {
        console.log(day);
        let newDay = document.createElement('div');
        let main = document.querySelector('main');
        main.append(newDay);
      }
 }
}
