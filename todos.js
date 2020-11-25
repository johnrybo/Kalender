window.addEventListener("load", main);

function main() {
  addEventListeners();
}

function addEventListeners() {
  let addTodo = document.getElementById("addTodo");
  addTodo.addEventListener("click", newListItem);
}

const todosState = [];

function buildList() {
  let todoList = document.getElementById("todoList");
  let todoListItem = document.createElement("li");
  todoListItem.classList.add("todoListItemStyle");
  todoList.innerHTML = "";

  for (const todo of todosState) {
    let todoListText = document.createElement("span");
    todoListText.innerHTML = todo.title;

    let todoListDate = document.createElement("span");
    todoListDate.innerHTML = todo.date;

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.classList.add("removeButton");

    todoList.append(todoListItem);
    todoListItem.append(todoListDate);
    todoListItem.append(todoListText);
    todoListItem.append(removeButton);

    removeButton.addEventListener("click", function (event) {
      // Tar bort todo från listan
      console.log(event.target);
      event.target.parentElement.remove();

      // Tar bort todo med index 0 från todosState
      const index = todosState.indexOf(todo);
      todosState.splice(index, 1);
      console.log(todosState);

      buildCalendar();
      buildList();
    });
  }
}

// Funktionen som körs när man klickar på +
function newListItem(event) {
  event.preventDefault();

  let dateInput = document.getElementById("dateInput").value;
  let textInput = document.getElementById("textInput").value;

  // Lägger till input i arrayen
  if (dateInput !== "" || textInput !== "") {
    todosState.push({
      title: textInput,
      date: dateInput,
    });

    console.log(todosState);
  }

  buildCalendar();
  buildList();
}
