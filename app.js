let todoArray = [];

const todos = document.getElementById("todos");
const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");
const remTask = document.getElementById("rem-task");
const searchBar = document.getElementById("search-bar");

const clearInput = document.getElementById("clear-input");
const clearAllBtn = document.getElementById("clear-all-btn");
const noData = document.getElementById("no-data");

let render = (array) => {
  todos.innerHTML = "";
  addInput.value = "";
  if (array.length > 0) {
    for (let obj of array) {
      let list = `
    <div id="${obj.id}-container" class="todo-task">
      <p id="${obj.id}-name" class="todo-name">${obj.todo}</p>
      <button id="${obj.id}-delete-btn" class="delete-icon"><i class="fa-regular fa-trash-can"></i></button>
    </div>
  `;
      todos.innerHTML += list;
    }
  } else {
    noData.innerText = "No Data Found";
  }

  for (let obj of array) {
    const deleteBtn = document.getElementById(`${obj.id}-delete-btn`);
    let taskContainer = document.getElementById(`${obj.id}-container`);

    deleteBtn.addEventListener("click", () => {
      todoArray = array.filter((e) => e.id !== obj.id);
      remTask.innerHTML = todoArray.length;
      render(todoArray);
    });

    clearAllBtn.addEventListener("click", () => {
      taskContainer.classList.add("hide");
      remTask.innerHTML = "0";
    });
  }

  window.addEventListener("load", () => {
    remTask.innerHTML = array.length;
  });
};

render(todoArray);

addBtn.addEventListener("click", () => {
  todoArray.push({
    id: todoArray.length + 1,
    todo: addInput.value,
  });
  remTask.innerHTML = todoArray.length;
  render(todoArray);
});

clearInput.addEventListener("click", () => {
  searchBar.value = "";
  render(todoArray);
});

searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const newTodoArrays = todoArray.filter((todo) => {
    return todo.todo.toLowerCase().includes(value);
  });
  render(newTodoArrays);
});


