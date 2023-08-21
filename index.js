let taskInput = document.getElementById("new-task"); //new-task
let btnAdd = document.getElementsByTagName("button")[0]; //first button
let incompleteTasks = document.getElementById("incomplete-tasks"); //incomplete-tasks
let btnAll = document.getElementById("btn-all")
let btnActive = document.getElementById("btn-active");
let btnCompleted = document.getElementById("btn-completed");
// let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

let sortSelect = document.getElementById("select-sort");

// data
let allTasks = [];   //contains all tasks
const selectedTasks = [];  //contains selected tasks only
const unselected = [];

//New Task List Item
let createNewTaskElement = function (taskString) {
    if (taskString) {
        //Create List Item
        let listItem = document.createElement("li");
        let checkBox = document.createElement("input");
        let label = document.createElement("label");
        let editInput = document.createElement("input");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");


        //Each element needs modifying

        checkBox.type = "checkbox";
        editInput.type = "text";

        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        label.innerText = taskString;

        //Each element needs appending
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    } else if (taskString === "") {
        alert("Please add Task Name!!!")
    }
}

//Add a new task
let addTask = function () {
    //Create a new list item
    let listItem = createNewTaskElement(taskInput.value);
    allTasks.push(listItem)
    console.log(allTasks);


    showTaskList(allTasks);

    // append to ul element
    // incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem);
    taskInput.value = "";
}

// show all tasks
function showTaskList() {
    for (const listItem of allTasks) {
        // append to ul element
        incompleteTasks.appendChild(listItem);
    }
}

// show - task is seleted, completed
function showSelectedTasks() {
    for (const listItem of allTasks) {
        incompleteTasks.removeChild(listItem);
    }
    for (const listItem of selectedTasks) {
        incompleteTasks.appendChild(listItem);
    }
}

// show - task is not completed
function showActivatedTasks() {
    for (const listItem of selectedTasks) {
        incompleteTasks.removeChild(listItem);
    }
}

function show(arr) {


}

//Edit an existing task
let editTask = function () {
    console.log("Edit task...");
    let listItem = this.parentNode;


    let editInput = listItem.querySelector("input[type=text");
    let label = listItem.querySelector("label");

    let containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}

//Delete an existing task
let deleteTask = function () {
    console.log("Delete task...");
    let listItem = this.parentNode;
    let ul = listItem.parentNode;


    console.log(listItem);

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
}


const handleCheckbox = function () {
    let listItem = this.parentNode;
    let checkBox = listItem.querySelector("input[type=checkbox]")
    let checkBoxValue = checkBox.checked;
    if (checkBox.checked == true) {
        selectedTasks.push(listItem);
        console.log(selectedTasks);
    } else {
        console.log(checkBoxValue);
        console.log("unselected");
    }
}

let bindTaskEvents = function (taskListItem) {
    // select taskListItem's childrens
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    // bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = handleCheckbox;
}

function sortTasks() {
    const copyAllTasks = [...allTasks];
    // console.log(copyAllTasks.map(item => ));

    for (const listItem of allTasks) {
        incompleteTasks.removeChild(listItem);
    }
    if (sortSelect.value === "A-Z") {
        copyAllTasks.sort()
        for (const listItem of copyAllTasks) {
            incompleteTasks.appendChild(listItem);
        }
    }
    console.log(sortSelect.value);
}

btnAdd.addEventListener("click", addTask)
taskInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})
btnAll.addEventListener("click", showTaskList)
btnCompleted.addEventListener("click", showSelectedTasks)
btnActive.addEventListener("click", showActivatedTasks)




//Mark a task as complete
// let taskCompleted = function () {
//     console.log("Task complete...");
//     //Append the task list item to the #completed-tasks
//     let listItem = this.parentNode;
//     completedTask.push(listItem);
//     console.log(listItem.querySelector('label').innerText);
//     console.log(completedTask);

//     // completedTasksHolder.appendChild(listItem);
//     bindTaskEvents(listItem, taskIncomplete);
// }

//Mark a task as incomplete
// let taskIncomplete = function () {
//     console.log("Task incomplete...");
//     //Append the task list item to the #incomplete-tasks
//     let listItem = this.parentNode;
//     incompleteTasks.appendChild(listItem);
//     bindTaskEvents(listItem, taskCompleted);
// }