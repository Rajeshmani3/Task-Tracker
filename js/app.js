//Get HTML Elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterButton = document.querySelectorAll('.filter-btn');
const clearCompletedButton = document.getElementById('clear-completed-btn');
const activeCount = document.getElementById('active-count');
//store selected filter
let currentFilter = 'all';
//function to filter tasks
function filterTasks() {
    const tasks=document.querySelectorAll('.task-item');
    tasks.forEach(function(task) {
        const checkbox = task.querySelector('.task-checkbox');  
        const isCompleted = checkbox.checked;
        if (currentFilter === 'all') {
            task.classList.remove('hidden');
        } else if (currentFilter === "active") {
            task.classList.toggle('hidden', isCompleted);
        }   else if (currentFilter === "completed") {
            task.classList.toggle('hidden', !isCompleted);
        }});
    }
//edit and delete task functionality
function addTaskEvents(listItem) {
const checkbox = listItem.querySelector('.task-checkbox');
const deleteButton = listItem.querySelector('.delete-btn');
const editButton = listItem.querySelector('.edit-btn');
const taskText = listItem.querySelector('.task-text'); 

//checkbox Functionality
checkbox.addEventListener('change', function() {
    filterTasks();
    updateActiveCount();
});

   // Edit Task Functionality
editButton.addEventListener('click', function() {
    const updatedTask = prompt('Edit your Task:', taskText.textContent);
    if (updatedTask !== null && updatedTask.trim() !== '') {
        taskText.textContent = updatedTask.trim();
    }
});

 // Delete Task Functionality
deleteButton.addEventListener('click', function() {
   const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        listItem.remove();
        filterTasks();
        updateActiveCount();
    }
});

}
//Add Click Event
addTaskButton.addEventListener('click', function() {
//GetTask Input Value
    const taskName = taskInput.value;
 //Check if Task Input is Empty
    if (taskName === '') 
    {    
        alert('Please enter a task ');
        return;
    }   
//Create Task Item
    const listItem = document.createElement('li');
listItem.className = 'task-item';
// Create Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
//Create Task Text
    const taskText = document.createElement('span');
    taskText.textContent = taskName;
    taskText.className = 'task-text';
//Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
deleteButton.innerHTML='<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/trash.svg" alt="Delete">';
//Add Edit Button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
editButton.innerHTML='<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/pencil.svg"  alt="Edit">';
  //Add Checkbox and Text
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText); 
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton); 

//Display Task in List
    taskList.appendChild(listItem);
    //Add Events to New Task
    addTaskEvents(listItem);
//Clear Input Field
    taskInput.value = '';
  //Apply Current Filter
    filterTasks();
});
//Default Filter Button Active
const existingTasks=document.querySelectorAll('.task-item');
existingTasks.forEach(function(task) {
    addTaskEvents(task);
});
//update active task count
function updateActiveCount() {
    const tasks = document.querySelectorAll('.task-item');
    let activeTasks = 0;
    tasks.forEach(function(task) {
        const checkbox = task.querySelector('.task-checkbox');
        if (!checkbox.checked) {
            activeTasks++;
        }
    });
    activeCount.textContent = activeTasks + (
activeTasks === 1 ? '  active task left' : '  active tasks left') ;
    
}

//Filter Button Click Event
filterButton.forEach(function(button) {
    button.addEventListener('click', function() {
//Get Selected Filter
        currentFilter = button.dataset.filter;
        filterTasks();
//Remove Active Class from All Buttons
        filterButton.forEach(function(filterBtn) {
            filterBtn.classList.remove('active');
        });
//Highlight Selected Filter Button
        button.classList.add('active');
//Filter Tasks
        filterTasks();
        updateActiveCount();
    });
});
//clear all completed tasks
clearCompletedButton.addEventListener('click', function() {
    const confirmClear = confirm('Are you sure you want to clear all completed tasks?');
    if (confirmClear) {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(function(task) {
            const checkbox = task.querySelector('.task-checkbox');
            if (checkbox.checked) {
                task.remove();
            }
        });
        updateActiveCount();
    }
});
// Display All Tasks by Default

filterTasks();
updateActiveCount();