window.addEventListener("load", main);

function main() {
  addEventListeners();
}

function addEventListeners() {
  let addTodo = document.getElementById("addTodo");
  addTodo.addEventListener("click", newListItem);
}

const todosState = [];

// Funktionen som körs när man klickar på +
function newListItem(event) {
  event.preventDefault();

  let dateInput = document.getElementById("dateInput").value;
  let textInput = document.getElementById("textInput").value;

  // Lägger till input i arrayen
  if (dateInput !== '' || textInput !== '') {
    todosState.push({
      title: textInput,
      date: dateInput,
    });
  
    console.log(todosState);
  
    let todoList = document.getElementById("todoList");
    let todoListItem = document.createElement("li");
    todoListItem.classList.add("todoListItemStyle");
  
    todoList.append(todoListItem);
    todoListItem.innerHTML = dateInput + ' ' + textInput;

    buildCalendar();
  }
}