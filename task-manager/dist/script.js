const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');


document.addEventListener('DOMContentLoaded', loadTasks);


taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask(taskInput.value);
    taskInput.value = '';
});


function addTask(task) {
    if (task === '') return;

    const li = document.createElement('li');
    li.textContent = task;

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);

    
    li.addEventListener('click', () => {
        li.classList.toggle('task-completed');
        saveTasks();
    });

    
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    
    taskList.appendChild(li);

    
    saveTasks();
}


function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('Delete', '').trim(),
            completed: li.classList.contains('task-completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const li = taskList.lastChild;
            li.classList.add('task-completed');
        }
    });
}