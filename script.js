let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "done" : ""}`;
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description || ""}
        <br>
        Due: ${task.dueDate || "N/A"} |
        <span class="priority-${task.priority}">${task.priority}</span>
      </div>
      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "active" && task.completed) ||
      (filter === "completed" && !task.completed)
    ) return;

    const li = document.createElement("li");
    li.className = `task ${task.completed ? "done" : ""}`;
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description || ""}
        <br>
        Due: ${task.dueDate || "N/A"} |
        <span class="priority-${task.priority}">${task.priority}</span>
      </div>
      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}
function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "active" && task.completed) ||
      (filter === "completed" && !task.completed)
    ) return;

    const li = document.createElement("li");
    li.className = `task ${task.completed ? "done" : ""}`;
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description || ""}
        <br>
        Due: ${task.dueDate || "N/A"} |
        <span class="priority-${task.priority}">${task.priority}</span>
      </div>
      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}


function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function sortTasks() {
  const sortBy = document.getElementById("sort-option").value;
  if (sortBy === "due") {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }
  renderTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}


function editTask(index) {
  const task = tasks[index];
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-date").value = task.dueDate;

  tasks.splice(index, 1); // Remove to re-add on submit
}

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = {
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-desc").value,
    priority: document.getElementById("task-priority").value,
    dueDate: document.getElementById("task-date").value,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  this.reset();
});

renderTasks();
