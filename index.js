let taskInput = document.getElementById("new-task"); //new-task
let btnAdd = document.querySelector(".add-task");
let btnSearch = document.querySelector(".search-btn");
let incompleteTasks = document.getElementById("incomplete-tasks"); //incomplete-tasks
let btnAll = document.getElementById("btn-all")
let btnActive = document.getElementById("btn-active");
let btnCompleted = document.getElementById("btn-completed");

let sortSelect = document.getElementById("select-sort");
let selectActions = document.getElementById("select-actions");

let messageDiv = document.querySelector(".message");

// data
let allTasks = [];   //contains all tasks
let selectedTasks = [];  //contains selected tasks only
let unselectedTasks = [];
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
        unselectedTasks = [...allTasks]; //add task is also uncompleted or unselectedTasks

        bindTaskEvents(listItem);
        showTaskList(allTasks);
        taskInput.value = "";
    } else {
        alert("Enter valid task");
    }
}

// show all tasks
function showTaskList(e, list1 = allTasks) {
    // console.log(list1);
    incompleteTasks.innerHTML = "";
    list1.forEach(item => {
        incompleteTasks.appendChild(item);
    })
}

//Edit an existing task
var editTask = function (e) {
    console.log("Edit task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");



    console.log(containsClass);
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
        editInput.value = ""
        listItem.classList.remove("editMode")
    } else {
        //Switch to .editMode
        //input value becomes the label's text

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (editInput.value === "") {
                    alert("Please Enter Task Name")
                } else {
                    label.innerText = editInput.value;
                    listItem.classList.remove("editMode")
                }
            } else if (e.key === 'Escape') {
                editInput.value = label.innerText;
                listItem.classList.remove("editMode")
            }
        })
        editInput.value = label.innerText;
        listItem.classList.add("editMode")
        editInput.focus()
    }
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

    let filteredArray3 = unselectedTasks.filter(item => listItem.id !== item.id)
    unselectedTasks = [...filteredArray3];
}


const handleCheckbox = function () {
    selectedTasks = [];
    unselectedTasks = [];
    for (const listItem of allTasks) {
        let checkBox = listItem.querySelector("input[type=checkbox]").checked

        if (checkBox === true) {
            selectedTasks.push(listItem);
            // console.log(selectedTasks);
        } else {
            unselectedTasks.push(listItem);
            // console.log(unselectedTasks.map(a => a.querySelector("label").innerText));
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
    let selectedValue = selectActions.value;
    console.log(selectedValue);
    if (selectedValue === "Select All") {
        for (const listItem of allTasks) {
            listItem.querySelector("input[type=checkbox]").checked = true;
        }
        selectedTasks = [...allTasks]
        unselectedTasks = []

    } else if (selectedValue === "Unselect All") {
        for (const listItem of allTasks) {
            listItem.querySelector("input[type=checkbox]").checked = false;
        }
        unselectedTasks = [...allTasks]
        selectedTasks = [];
    } else if (selectedValue === "delete selected") {
        if (selectedTasks.length > 0) {
            let filtered = allTasks.filter(item => !selectedTasks.includes(item))
            allTasks = [...filtered]

            let filtered2 = selectedTasks.filter(item => !selectedTasks.includes(item))

            selectedTasks = [...filtered2]
            showTaskList(undefined);
        }
    }
    selectedValue = "action"
}


function handleSearch() {
    console.log("search");

    btnAdd.style.width = "20px"
    btnSearch.style.width = "25px"

    taskInput.removeEventListener('keydown', handeleEnterKey)

    taskInput.addEventListener('keydown', searchItems);
}

function searchItems(e) {
    if (e.key === "Enter") {
        let copyAllTasks = [];
        let searchInput = taskInput.value;
        copyAllTasks = allTasks.filter(item => {
            return item.querySelector('label').innerText.includes(searchInput);
        })

        if (copyAllTasks.length === 0) {
            messageDiv.classList.remove("hide");
            incompleteTasks.innerHTML = ""
            // showTaskList(undefined)
        } else {
            messageDiv.classList.add("hide")
            showTaskList(undefined, copyAllTasks);
        }

        taskInput.value = ""
    }
}

function handeleEnterKey(e) {
    if (e.key === "Enter") {
        addTask()
        btnAll.classList.add("btn-clicked")
        btnActive.classList.remove("btn-clicked")
        btnCompleted.classList.remove("btn-clicked")
    }
}

function handelAdd() {
    messageDiv.classList.add("hide")
    taskInput.classList.remove("hide")
    btnSearch.style.width = "20px"
    btnAdd.style.width = "25px"

    showTaskList(undefined)
    taskInput.removeEventListener('keydown', searchItems);
    taskInput.focus()
    taskInput.addEventListener('keydown', handeleEnterKey)
}

btnAdd.addEventListener("click", handelAdd)

btnSearch.addEventListener('click', handleSearch)


btnAll.addEventListener("click", () => {
    btnAll.classList.add("btn-clicked")
    btnActive.classList.remove("btn-clicked")
    btnCompleted.classList.remove("btn-clicked")
    showTaskList(undefined)
})

btnActive.addEventListener("click", () => {
    btnActive.classList.add("btn-clicked")
    btnAll.classList.remove("btn-clicked")
    btnCompleted.classList.remove("btn-clicked")
    showTaskList(undefined, unselectedTasks)
})

btnCompleted.addEventListener("click", () => {
    btnCompleted.classList.add("btn-clicked")
    btnActive.classList.remove("btn-clicked")
    btnAll.classList.remove("btn-clicked")

    showTaskList(undefined, selectedTasks)
})