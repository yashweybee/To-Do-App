let taskInput = document.getElementById("new-task"); //new-task
let btnAdd = document.getElementsByTagName("button")[0]; //first button
let incompleteTasks = document.getElementById("incomplete-tasks"); //incomplete-tasks
let btnAll = document.getElementById("btn-all")
let btnActive = document.getElementById("btn-active");
let btnCompleted = document.getElementById("btn-completed");
// let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

let sortSelect = document.getElementById("select-sort");
let selectActions = document.getElementById("select-actions")

// data
let allTasks = [];   //contains all tasks
let selectedTasks = [];  //contains selected tasks only
let unselected = [];
let count = 0;

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

        listItem.id = count

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
        alert("Please add Task Name!!!");
    }
}

//Add a new task
let addTask = function () {
    count++
    //Create a new list item
    let listItem = createNewTaskElement(taskInput.value.trim());
    allTasks.push(listItem)
    // console.log(allTasks);


    showTaskList(allTasks);

    // append to ul element
    // incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem);
    taskInput.value = "";
}

// show all tasks
function showTaskList() {
    // console.log(allTasks);
    incompleteTasks.innerHTML = "";
    for (const listItem of allTasks) {
        incompleteTasks.appendChild(listItem);
    }
}

// show - task is seleted, completed
function showSelectedTasks() {
    // for (const listItem of allTasks) {
    //     incompleteTasks.removeChild(listItem);
    // }
    incompleteTasks.innerHTML = ""
    for (const listItem of selectedTasks) {
        incompleteTasks.appendChild(listItem);
    }
}

// show - task is not completed
function showActivatedTasks() {
    // for (const listItem of allTasks) {
    //     incompleteTasks.removeChild(listItem);
    // }
    incompleteTasks.innerHTML = ""
    for (const listItem of unselected) {
        incompleteTasks.appendChild(listItem);
    }
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
    // let ul = listItem.parentNode;

    console.log(listItem);
    updateAllTaskListArrays(listItem);

    showTaskList()
}

// updates all arrays that having task information  accourding to new filtered array 
function updateAllTaskListArrays(listItem) {
    let filteredArray = allTasks.filter(item => listItem.id !== item.id)
    allTasks = [...filteredArray];

    let filteredArray2 = selectedTasks.filter(item => listItem.id !== item.id)
    selectedTasks = [...filteredArray2];

    let filteredArray3 = unselected.filter(item => listItem.id !== item.id)
    unselected = [...filteredArray3];
}


const handleCheckbox = function () {
    selectedTasks = [];
    unselected = [];
    for (const listItem of allTasks) {
        let checkBox = listItem.querySelector("input[type=checkbox]").checked

        if (checkBox === true) {
            selectedTasks.push(listItem);
            // console.log(selectedTasks);
        } else {
            unselected.push(listItem);
            console.log(unselected.map(a => a.querySelector("label").innerText));
        }
    }
    // let listItem = this.parentNode;
    // let checkBox = listItem.querySelector("input[type=checkbox]")
    // let checkBoxValue = checkBox.checked;
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

function taskAction() {
    console.log(selectActions.value);
    if (selectActions.value === "Select All") {
        for (const listItem of allTasks) {
            listItem.querySelector("input[type=checkbox]").checked = true;
        }
        selectedTasks = [...allTasks]
        unselected = []

    } else if (selectActions.value === "Unselect All") {
        for (const listItem of allTasks) {
            listItem.querySelector("input[type=checkbox]").checked = false;
        }
        unselected = [...allTasks]
        selectedTasks = [];
    } else if (selectActions.value === "delete selected") {
        if (selectedTasks.length > 0) {
            let filtered = allTasks.filter(item => !selectedTasks.includes(item))
            allTasks = [...filtered]

            let filtered2 = selectedTasks.filter(item => !selectedTasks.includes(item))

            selectedTasks = [...filtered2]
            showTaskList();
        }
    }
    selectActions.value = "action"
}

btnAdd.addEventListener("click", addTask)
taskInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})
btnAll.addEventListener("click", showTaskList)
btnActive.addEventListener("click", showActivatedTasks)
btnCompleted.addEventListener("click", showSelectedTasks)




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