const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const emptyList = document.getElementById('emptyList');

let tasks = [];


if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
    
}

tasks.forEach((task) => {
    renderTask(task);
});


checkEmptyList()
form.addEventListener('submit', addTask);


tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


function addTask(e) {
    e.preventDefault();
     
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTask(newTask);
    taskInput.value = '';
    taskInput.focus();
    checkEmptyList()
}

function deleteTask(e){

    if(e.target.dataset.action !== 'delete'){
        return;
    }
    
    const parrentNode = e.target.closest('.list-group-item');
    parrentNode.remove();

    const ID = parrentNode.id;
    const index = tasks.findIndex((item) => { return item.id == ID; });

    tasks.splice(index, 1);
    saveToLocalStorage();
    checkEmptyList();
}

function doneTask (e){
    if(e.target.dataset.action !== 'done'){
        return;
    }
    const parrentNode = e.target.closest('.list-group-item');
    const ID = parrentNode.id;

    const task = tasks.find((item) => { return item.id == ID; });
    task.done = !task.done;

    const taskTitle = parrentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
    saveToLocalStorage();
}

function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListEl = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/clean.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">The to-do list is empty</div>
				</li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListEl);
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task){
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    
    const taskHTML = `<li id = "${task.id}"class="list-group-item d-flex justify-content-between task-item">
                     <span class="${cssClass}">${task.text}</span>
                     <div class="task-item__buttons">
                         <button type="button" data-action="done" class="btn-action">
                             <img src="./img/tick.svg" alt="Done" width="18" height="18">
                         </button>
                         <button type="button" data-action="delete" class="btn-action">
                             <img src="./img/cross.svg" alt="Done" width="18" height="18">
                         </button>
                     </div>
                 </li>`
 
     tasksList.insertAdjacentHTML('beforeend', taskHTML);
}