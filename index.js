//delete the task
function closeTask(close){
    close.parentElement.remove();
}

//cross out task
function checkTask(box){
    if(box.checked == true){
        let header = box.nextSibling.nextSibling;
        header.style.textDecoration = "line-through"
    }
    else{
        let header = box.nextSibling.nextSibling;
        header.style.textDecoration = "none"
    }

}

//delete the list
function closeList(button){
    button.parentElement.remove();
}

//opens new list form collapsible
function newForm(){
    var content = document.getElementById("newListDiv");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}

//create the new list
function createList(form){
    let input = form.listName.value;
    if(input == ""){
        alert("List name must be filled out!");
        return false;
    }
    else if (document.getElementById(input)){
        alert("That list already exists!");
        return false;
    }
    else{
        let container = document.getElementsByClassName("container");
        console.log(container);
        let html = `
                    <div class="list">
                        <span onclick="closeList(this)" class="closeList">X</span>
                        <h3 class="listTitle">${input}</h3>
                        <div>
                            <form class="newTask">
                                <h4>Add New Task</h4>
                                <input type="hidden"  name="ulName" readonly value=${input}>
                                <div class="formField">
                                    <label for="taskName">Name:</label>
                                    <input type="text" name="taskName" placeholder="Task..." required>
                                </div>
                                <div class="formField">
                                <label for="dueDate">Due Date:</label>
                                    <input type="date" name="dueDate" required> 
                                </div>
                                <div class="formField">
                                <p>Priority Level:</p>
                                <label for="highPrio">High</label>
                                    <input type="radio" value="highPrio" name="priority" checked>
                                <label for="mediumPrio">Medium</label>
                                    <input type="radio" value="mediumPrio" name="priority">
                                <label for="lowPrio">Low</label>
                                    <input type="radio" value="lowPrio" name="priority">  
                                </div>
                                <button onclick="createTask(this.form)" class="addBtn" type="button">Add</button>
                            </form>
                        </div>    
                        <div class="innerCard">
                            <ul class="myUL" id="${input}" >
                            </ul>
                        </div>
                    </div>
                `   
        container[0].insertAdjacentHTML("afterbegin", html);
    }
}

function createTask(form){
    let listName = form.ulName.value;
    let prio = form.priority.value;
    let taskName = form.taskName.value;
    let date = form.dueDate.value;
    let prioText = "";
    let rank = 0;

    if(taskName == ""){
        alert("Task name must be filled out!");
        return false;
    }
    else if(date == ""){
        alert("Please enter a due date!");
        return false;
    }
    else {
        if(prio == "highPrio"){
            prioText = "High Priority";
            rank = 1;
        }
        else if(prio == "mediumPrio"){
            prioText = "Medium Priority";
            rank = 2;
        }
        else{
            prioText = "Low Priority"
            rank = 3;
        }
        //console.log(listName, prio, taskName, date)
        let list = document.getElementById(listName)
        let html = ` <li class="${rank}">
                        <input type="checkbox" onclick="checkTask(this)" class="checkBoxTask">
                            <h4 class="taskTitle">${taskName}</h4>
                            <span onclick="closeTask(this)" class="closeTask">X</span>
                            <p class="date">Due: ${date}</p>
                            <p class="${prio}">${prioText}</p> 
                
                    </li>`

        list.insertAdjacentHTML("afterbegin", html);
    }
}

function filter(){
    let choice = document.getElementById("filter").value;
    if(choice == "byPrio"){
        byPrio();
    }
    else if(choice == "byDate"){
        byDate();
    }
    else{
        return;
    }
}

function byPrio(){
    let lists = document.getElementsByClassName("myUL");

    for(let i = 0; i < lists.length; i++){
        let sort = [];
        let tasks = lists[i].getElementsByTagName('li');

        for(let j = 0; j < tasks.length; j++){
            //console.log(tasks[j]);
            sort.push({"prio": parseInt(tasks[j].className), "html": tasks[j].outerHTML});
        }
        sort.sort((a, b) => (a.prio > b.prio) ? 1 : -1);
        lists[i].innerHTML="";
        for(let j = 0; j < sort.length; j++){
            lists[i].insertAdjacentHTML("beforeEnd", sort[j].html);
        }
    }

}

function byDate(){
    let lists = document.getElementsByClassName("myUL");
    for(let i = 0; i < lists.length; i++){
        let sort = [];
        let tasks = lists[i].getElementsByTagName('li');

        for(let j = 0; j < tasks.length; j++){
            //console.log(tasks[j]);
            let datetag = tasks[j].getElementsByClassName("date");
            let date = datetag[0].innerText.slice(4);
            sort.push({"date": new Date(date), "html": tasks[j].outerHTML});
        }
        sort.sort((a, b) => (a.date > b.date) ? 1 : -1);
        lists[i].innerHTML="";
        for(let j = 0; j < sort.length; j++){
            lists[i].insertAdjacentHTML("beforeEnd", sort[j].html);
        }
    }
}