let taskInput = document.getElementById("new-task"); //new-task
// let btnAdd = document.getElementsByTagName("button")[0]; //first button
let btnAdd = document.querySelector(".add-task");
let btnSearch = document.querySelector(".search-btn");
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
    //Create List Item
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("img");
    let deleteButton = document.createElement("img");

    //Each element needs modifying

    listItem.id = count

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.src = "./assets/edit-icon.svg";
    editButton.alt = "edit-icon.svg"
    editButton.className = "edit";

    deleteButton.src = "./assets/delete-icon.svg";
    deleteButton.alt = "delete-icon.svg"
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

//Add a new task
let addTask = function () {
    count++
    //Create a new list item
    const inputTask = taskInput.value.trim();
    if (inputTask !== "") {

        let listItem = createNewTaskElement(inputTask);

        allTasks.push(listItem);
        unselected = [...allTasks]; //add task is also uncompleted or unselected

        bindTaskEvents(listItem);
        showTaskList(allTasks);
        taskInput.value = "";
    } else {
        alert("Enter valid task");
    }
}

// show all tasks
function showTaskList(e, list1 = allTasks) {
    console.log(list1);
    incompleteTasks.innerHTML = "";
    list1.forEach(item => {
        incompleteTasks.appendChild(item);
    })
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
var editTask = function () {
    console.log("Edit task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
        editInput.value = ""
    } else {
        //Switch to .editMode
        //input value becomes the label's text
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

    showTaskList(undefined)
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
    let editButton = taskListItem.querySelector(".edit");
    let deleteButton = taskListItem.querySelector(".delete");

    // bind editTask to edit button
    editButton.addEventListener('click', editTask);

    //bind deleteTask to delete button
    deleteButton.addEventListener('click', deleteTask);

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = handleCheckbox;
}

function sortTasks() {
    const selectedValue = sortSelect.value
    console.log(selectedValue);
    const copyAllTasks = [...allTasks];


    // copyAllTasks.map(item => {
    //     console.log(item.querySelector("label").innerText)
    // })


    if (selectedValue === "A-Z") {
        copyAllTasks.sort((a, b) => {
            return a.querySelector("label").innerText.localeCompare(b.querySelector("label").innerText)
        })
        showTaskList(undefined, copyAllTasks);
    } else if (selectedValue === "Z-A") {
        copyAllTasks.sort((a, b) => {
            return a.querySelector("label").innerText.localeCompare(b.querySelector("label").innerText)
        })
        showTaskList(undefined, copyAllTasks.reverse());
    } else if (selectedValue === "Newest") {
        showTaskList(undefined, copyAllTasks.reverse());
    } else if (selectedValue === "Oldest") {
        showTaskList(undefined);
    }
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
            showTaskList(undefined);
        }
    }
    selectActions.value = "action"
}

function handeleEnterKey(e) {
    if (e.key === "Enter") {
        addTask()
    }
}

btnSearch.addEventListener('click', () => {
    console.log("search");

    btnAdd.removeEventListener("click", addTask)
    taskInput.removeEventListener('keydown', handeleEnterKey)
})

btnAdd.addEventListener("click", () => {
    addTask()
})
taskInput.addEventListener('keydown', handeleEnterKey)


btnAll.addEventListener("click", showTaskList)
btnActive.addEventListener("click", showActivatedTasks)
btnCompleted.addEventListener("click", showSelectedTasks)