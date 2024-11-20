document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM({ name: taskText });
        saveTaskToLocalStorage(taskText);
        taskInput.value = ''; // Limpiar el campo de entrada
    }
});

function addTaskToDOM(item) {
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    taskDiv.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" id="${item.name.replace(' ', '_')}" onchange="toggleTaskCompletion(this)">
        </div>
        <div class="task-info">
            <span class="task-name">${item.name}</span>
        </div>
        <div class="task-icon" onclick="removeTask(this, '${item.name}')">
            <i class="fas fa-trash-alt"></i>
        </div>
    `;

    completedTasksContainer.appendChild(taskDiv);
}

function toggleTaskCompletion(checkbox) {
    const taskNameElement = checkbox.closest('.task-item').querySelector('.task-name');
    if (checkbox.checked) {
        taskNameElement.classList.add('completed');
    } else {
        taskNameElement.classList.remove('completed');
    }
}

function saveTaskToLocalStorage(taskName) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: taskName });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(element, taskName) {
    const taskDiv = element.parentElement;
    taskDiv.remove();
    removeTaskFromLocalStorage(taskName);
}

function removeTaskFromLocalStorage(taskName) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}
