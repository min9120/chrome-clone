const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList"),
  finList = document.querySelector(".js-finList"),
  submitButton = todoForm.querySelector("button");

const TODOS_LS = "todos";
let todoData = [];
let idNum = 1;
const PENDING = "pending";
const FINISHED = "finished";

// function filterFn(todo){
//   return todo.id ===1;
// }
function finishHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;

  todoList.removeChild(li);
  todoData.forEach(function (fin) {
    if (fin.id == parseInt(li.id)) {
      fin.type = FINISHED;
      paintFin(fin);
    }
  });

  saveLocalData();
}
function rollBackHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finList.removeChild(li);
  todoData.forEach(function (todo) {
    if (todo.id == parseInt(li.id)) {
      todo.type = PENDING;
      paintTodo(todo.text);
    }
  });

  saveLocalData();
}
function deleteHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;

  if (li.parentNode.className === "js-finList") {
    finList.removeChild(li);
  } else {
    todoList.removeChild(li);
  }
  //const cleanTodos = todoData.filter(filterFn) //return이 true인 것만 filtering 함
  //cleanTodo와 filter가 하는 것은 filterFn이 체크된 아이템의 arry를 주는 것
  const cleanTodos = todoData.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todoData = cleanTodos;
  saveLocalData();
}
function saveLocalData() {
  //localStorage.setItem(TODOS_LS, todoData); -> localStorage 에는 자바스크립트의 data를 저장할 수 없음
  //확인해보면 todoData : [object object] -> 이렇게 뜸  오직 string만 저장 가능
  localStorage.setItem(TODOS_LS, JSON.stringify(todoData));
}

function paintTodo(text) {
  const list = document.createElement("li");
  const delButton = document.createElement("button");
  const finButton = document.createElement("button");
  const span = document.createElement("span");

  const newId = idNum;
  delButton.className = "listBt";
  finButton.className = "listBt";
  delButton.innerText = "삭제 ❌";
  delButton.addEventListener("click", deleteHandler);
  finButton.innerText = "완료 ✅";
  finButton.addEventListener("click", finishHandler);
  span.innerText = text;

  list.appendChild(span);
  list.appendChild(delButton); //appendChild() : father ele 에 넣는 것.
  list.appendChild(finButton);
  list.id = newId;
  idNum += 1;
  todoList.appendChild(list);

  const todoObj = {
    text: text,
    id: newId,
    type: PENDING,
  };
  todoData.push(todoObj);
  saveLocalData();
}
function paintFin(data) {
  const list = document.createElement("li");
  const delButton = document.createElement("button");
  const rollBackButton = document.createElement("button");
  const span = document.createElement("span");

  delButton.className = "listBt";
  rollBackButton.className = "listBt";
  delButton.innerText = "삭제 ❌";
  delButton.addEventListener("click", deleteHandler);
  rollBackButton.innerText = "되돌리기 ⏪";
  rollBackButton.addEventListener("click", rollBackHandler);
  span.innerText = data.text;
  list.id = data.id;

  list.appendChild(span);
  list.appendChild(delButton);
  list.appendChild(rollBackButton);

  finList.appendChild(list);
}

function submitHandler(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}
function loadTodos() {
  const loadTodoData = localStorage.getItem(TODOS_LS);
  if (loadTodoData !== null) {
    const parseTodoData = JSON.parse(loadTodoData);
    parseTodoData.forEach(function (todo) {
      if (todo.type === "pending") {
        paintTodo(todo.text);
      } else if (todo.type === "finished") {
        paintFin(todo);
      }
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", submitHandler);
  submitButton.addEventListener("click", submitHandler);
}
init();
