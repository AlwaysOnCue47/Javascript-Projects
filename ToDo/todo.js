// To Do App script

function getTodos() {
  var todos = new Array;
  var todosStr = localStorage.getItem('todo');
  if (todosStr !== null) {
    todos = JSON.parse(todosStr);
  }
  return todos;

}

function add() {
  var task = document.getElementById('task').value;

  var todos = getTodos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  document.getElementById("task").value = "";
  show();
  return false;

}

function show() {
  var todos = getTodos();
  var html = '<ul>';

  for (i = 0; i < todos.length; i++) {
    html += '<li>' + todos[i] + '<button class="remove" id="' + i + '">X</button><li>';
  };
  html += '</ul>';
  document.getElementById("todos").innerHTML = html;

  var buttons = document.getElementsByClassName('remove');
  if (buttons.length > 0) { // added this if statement because I was getting an undefined error if there were no items on the list yet. It still worked just wanted to address the error in the console
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', remove);
    };
  }
  
}

function remove() {
  var id = this.getAttribute('id');
  var todos = getTodos();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  show();
   return false;
}

function clearAll() {
  localStorage.clear();
  var todos = [];
  document.getElementById("todos").innerHTML = todos;
}

document.getElementById('add').addEventListener('click', add);
show();