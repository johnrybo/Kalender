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
    
    // Nytt

    let todoListText = document.createElement('span');
    todoListText.innerHTML = textInput;

    let todoListDate = document.createElement('span');
    todoListDate.innerHTML = dateInput;

    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.classList.add('removeButton');
  
    todoList.appendChild(todoListItem);
    todoListItem.appendChild(todoListDate);
    todoListItem.appendChild(todoListText);
    todoListItem.appendChild(removeButton);

    removeButton.addEventListener('click', function() {

      // Tar bort todo från listan
      todoList.removeChild(todoListItem);

      // Tar bort todo med index 0 från todosState
      todosState.splice(0, 1);
      console.log(todosState);

      // Tar bort todo från kalendern
      console.log(':(')

    });

    buildCalendar();
  }
}