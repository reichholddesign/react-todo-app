// Event listeners
document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#all-todos').addEventListener('click', function(){
  makeReq('all')
})
document.querySelector('#add-task').addEventListener('click', addTask)

async function addTask(){
  // Get user inputs
  const newTaskDate = document.querySelector("#new-task-date").value;
  const newTaskName = document.querySelector("#new-task-name").value;
  
  // Check if user has entered data in both inputs
  if(!newTaskDate || !newTaskName) return alert('Missing task name or date')
  
  // Send server request with user data
  const res = await fetch(`/api?new-task-date=${newTaskDate}&new-task-name=${newTaskName}`)
  const data = await res.json()

  const confirmation = document.querySelector("#confirmation")
  confirmation.textContent = 'Task added'
  setTimeout(()=>{
    confirmation.textContent = ""
  }, 500)
}


async function makeReq(requestType){  

// Get user date selection
let taskDate = document.querySelector("#taskDate").value

// Check if user has entered a date
if(!taskDate && requestType !== 'all') return alert('Please select a date')

// Check if user wants to return all tasks
if(requestType !== "all")requestType = taskDate

// Fetch data from Server
const res = await fetch(`/api?date=${requestType}`)  
const data = await res.json()

// Construct todo list
createTodoList(data)

}



async function changeStatus(todo){
  const res = await fetch(`/api?todo-date=${todo.date}&todo-task=${todo.todo}`)
  const data = await res.json()
  return data
}

async function deleteTodo(todo){
  const res = await fetch(`/api?delete-date=${todo.date}&delete-task=${todo.todo}&delete=yes`)
  const data = await res.json()
  console.log(data)
  createTodoList(data)
  return data
}



function createTodoList(data){
  const checkCtn = document.querySelector("#check-todos-ctn")
  checkCtn.innerHTML = "";
  if(data.length === 0){
    alert('No todos')
  } else{
  data.forEach(todo => {
    const todoCtn = document.createElement("div")
     const dateOfTodo = document.createElement("p")
     const nameOfTodo = document.createElement("h2")
     const updateBtn = document.createElement("button");
     const closeIcon = document.createElement("h3");
     checkCtn.appendChild(todoCtn)
     todoCtn.appendChild(dateOfTodo)
     todoCtn.appendChild(nameOfTodo)
     todoCtn.appendChild(updateBtn)
     todoCtn.appendChild(closeIcon)

     todoCtn.classList.add('todo-ctn')
     updateBtn.setAttribute('id','updateBtn')
     closeIcon.setAttribute('id','close-icon')
    
     dateOfTodo.textContent = `${todo.date}`
     nameOfTodo.textContent = `${todo.todo}`
     closeIcon.textContent = `X`
    //  checkStatus(todo)
    updateTaskStyle(todo, todoCtn,nameOfTodo,updateBtn)
   
      updateBtn.addEventListener("click", function(){
        todo.status = !todo.status
        changeStatus(todo)
        updateTaskStyle(todo, todoCtn,nameOfTodo,updateBtn)
      })
      closeIcon.addEventListener("click", function(){
        deleteTodo(todo)
      })


    })
  }
}

function updateTaskStyle(todo, todoCtn,nameOfTodo,updateBtn){
  if(todo.status === false){
  todoCtn.style.backgroundColor = "rgb(142 81 130)"
  nameOfTodo.style.textDecoration = "line-through"
  updateBtn.textContent = "Mark incomplete"
  } else {
    updateBtn.textContent = "Mark complete"
    todoCtn.style.backgroundColor = "#4f8181"
    nameOfTodo.style.textDecoration = "unset"
  }

}