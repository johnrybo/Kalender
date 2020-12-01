window.addEventListener("load", main);

let todosState = [];

/** Kör dessa funktioner i main */
function main() {
  addEventListeners();
  getLocalStorage();
  buildList();
}

/** Sparar todos till LocalStorage */
function getLocalStorage() {
  const data = localStorage.getItem("data");
  if (data !== null) {
    todosState = JSON.parse(data);
  }
}

function updateLocalStorage() {
  localStorage.setItem("data", JSON.stringify(todosState));
}

/** Länkar till knappen som lägger till todo */
function addEventListeners() {
  let addTodo = document.getElementById("addTodo");
  addTodo.addEventListener("click", newListItem);
}

/** Funktionen som körs när man klickar på + */
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
  }

  // Sorterar todolistan i datumordning 
  todosState.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  })

  // Sparar todo till localstorage
  updateLocalStorage();
  buildCalendar();
  buildList();
}

/** Bygger och skapar todos med datum och text, i todolistan */
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

    let textAndDate = document.createElement("div");
    textAndDate.classList.add('textAndDate');
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.classList.add("removeButton");

    // Nollställer datum och inputfält när man har klickat på +
    textInput.value = "";
    dateInput.value = "";

    // Skapar en edit-knapp
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("editButton");

    todoList.append(todoListItem);
    todoListItem.append(textAndDate);
    todoListItem.append(buttons);
    textAndDate.append(todoListText);
    textAndDate.append(todoListDate);
    buttons.append(removeButton);
    buttons.append(editButton);

    //Tar bort todo från todolistan 
    removeButton.addEventListener("click", function (event) {
      event.target.parentElement.remove();

      // Tar bort todo med index 0 från todosState
      const index = todosState.indexOf(todo);
      todosState.splice(index, 1);

      // Lägger till todo i localstorage
      updateLocalStorage();

      // Uppdaterar statet
      buildCalendar();
      buildList();
    });

    /** Ändrar text och datum i todo-listan */
    editButton.addEventListener("click", function () {
      const index = todosState.indexOf(todo);

      let editInput = document.createElement("input");
      let editDate = document.createElement("input");
      editInput.classList.add('editInput');
      editInput.type = "text";
      editDate.classList.add('editDate');
      editDate.type = "date";

      let submitButton = document.createElement("button");
      submitButton.classList.add('submitbutton');
      submitButton.innerHTML = "Submit";

      let removeEdit = document.createElement("button");
      removeEdit.innerHTML = "X";
      removeEdit.classList.add("removeButton");

      let aside = document.querySelector("aside");
      aside.append(editInput);
      aside.append(editDate);
      aside.append(submitButton);
      aside.append(removeEdit);

      /** Ändrar texten och datumet på en todo */
      submitButton.addEventListener("click", function () {
        todosState[index].title = editInput.value;
        todosState[index].date = editDate.value;

        updateLocalStorage();
        // Uppdaterar tillståndet
        buildCalendar();
        buildList();

        // Döljer submit-fältet och submit-knappen
        submitButton.style.display = "none";
        editInput.style.display = "none";
        editDate.style.display = "none";
      });

      removeEdit.addEventListener('click', function() {
        removeEdit.style.display = "none";
        submitButton.style.display = "none";
        editInput.style.display = "none";
        editDate.style.display = "none";
      })

      // Uppdaterar tillståndet
      buildCalendar();
      buildList();
    });
  }
}
