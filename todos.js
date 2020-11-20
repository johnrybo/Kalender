window.addEventListener('load', main);

function main() {

    addEventListeners();
}

function addEventListeners(){

    let addTodo = document.getElementById('addTodo');
    addTodo.addEventListener('click', newListItem);

}

function newListItem(event) {

    event.preventDefault();
    
    let dateInput = document.getElementById('dateInput').value;
    let dateTextNode = document.createTextNode(dateInput);

    let textInput = document.getElementById("textInput").value;
    let textNode = document.createTextNode(textInput);

    let todoList = document.getElementById('todoList');
    let todoListItem = document.createElement("li");
    todoListItem.classList.add('todoListItemStyle');
    
    todoList.appendChild(todoListItem);
    todoListItem.appendChild(dateTextNode);
    todoListItem.appendChild(textNode);

    let newDay = document.querySelectorAll('.newDay');
    if (newDay.innerHTML = dateTextNode) {
        newDay.appendChild(textNode);
    }

  }