let input = document.getElementById("input");
let inputAdd = document.getElementById("add")
let mainTasks = document.querySelector(".tasks");

// Array Empty To Add In It Tasks
// window.localStorage.clear()
let arrTasks = [];

if (window.localStorage.getItem("task")) {
    arrTasks = JSON.parse(window.localStorage.getItem("task"));
}

// Get Data From Local Storage 
getData();

// Delete Task
mainTasks.addEventListener("click",(e) => {
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        removeData(e.target.parentElement.getAttribute("data-id"));
        // Remove Task
        e.target.parentElement.remove();
    }   

    if (e.target.getAttribute("data-id")) {
        // Add Complete At Task
        finishTask(e.target.getAttribute("data-id"));
        // Add Done Class In Task
        e.target.classList.toggle("done");
    }
});

inputAdd.onclick = function() {
    if (input.value !== "") {
        addTasksInArr(input.value);
        input.value = "";
    }
}

// Add Tasks Into Array
function addTasksInArr(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        complete: false,
    }
    arrTasks.push(task);
    addTaskForPage(arrTasks);
    addTaskInLocalStorage(arrTasks);
}

function addTaskForPage(arrTasks) {
    mainTasks.innerHTML = "";
    arrTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // check if task done
        if (task.complete) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        mainTasks.appendChild(div);
    })
}

// Add Task In Local Storage
function addTaskInLocalStorage(task) {
    window.localStorage.setItem("task",JSON.stringify(task));
}

// Get Data From Local Storage 
function getData() {
    let data = window.localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskForPage(tasks);
    }
} 

// Remove Task From Local Storage
function removeData(taskId) {
    arrTasks = arrTasks.filter((task) => task.id != taskId);
    addTaskInLocalStorage(arrTasks);
}

// Add Complete Task
function finishTask(taskId) {
    for(let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == taskId) {
            arrTasks[i].complete == false ? arrTasks[i].complete = true : arrTasks[i].complete = false;
        }
    }
    addTaskInLocalStorage(arrTasks);
}