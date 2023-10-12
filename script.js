document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${taskText}</span><button class="delete-button">Delete</button>`;
            taskList.appendChild(li);
            taskInput.value = "";

            // Save the tasks to local storage when a new task is added
            saveTasksToLocalStorage();

            li.querySelector(".delete-button").addEventListener("click", function() {
                taskList.removeChild(li);

                // Save the tasks to local storage after deleting a task
                saveTasksToLocalStorage();
            });
        }
    });

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Function to load tasks from local storage

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(taskText) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${taskText}</span><button class="delete-button">Delete</button>`;
            taskList.appendChild(li);

            li.querySelector(".delete-button").addEventListener("click", function() {
                taskList.removeChild(li);
                saveTasksToLocalStorage();
            });
        });
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.querySelectorAll("li")).map(li => li.querySelector("span").textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
