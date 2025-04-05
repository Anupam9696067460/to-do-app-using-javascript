let todos = [];

window.onload = function () {
  const saved = localStorage.getItem("todos");
  if (saved) {
    todos = JSON.parse(saved);
    renderTodos();
  }
};

document.getElementById("addBtn").addEventListener("click", addTodo);

function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (task !== "") {
    todos.push({ text: task, completed: false });
    input.value = "";
    saveAndRender();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.onclick = () => toggleTodo(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
