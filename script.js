
let btn = document.querySelector('button');
let ul = document.querySelector('ul');
let input = document.querySelector('input');

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

btn.addEventListener('click', function () {
    if (input.value.trim() === "") return;


    addTask(input.value, false);
    saveTasks();

    input.value = '';
});

// Add task function
function addTask(text, completed) {
    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    let span = document.createElement('span');
    span.innerText = text;
    if (completed) span.classList.add("completed");

    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.classList.add("delete");

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    ul.appendChild(li);
}

// Delete task
ul.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        saveTasks();
    }
});

// Mark task completed
ul.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        let taskText = event.target.nextElementSibling;
        taskText.classList.toggle("completed");
        saveTasks();
    }
});

// Save tasks to localStorage
function saveTasks() {
    document.querySelector(".empty-msg").style.display =
    document.querySelectorAll("li").length ? "none" : "block";

    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        btn.click();
    }
});


