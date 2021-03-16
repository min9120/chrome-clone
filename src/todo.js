const todoForm = document.querySelector('.js-todoForm'),
todoInput = todoForm.querySelector('input'),
todoList = document.querySelector('.js-todoList');


const TODOS_LS = "todos"
const todoData = [];

function deleteHandler(){

}
function saveTodos(){
  //localStorage.setItem(TODOS_LS, todoData); -> localStorage 에는 자바스크립트의 data를 저장할 수 없음 
  //확인해보면 todoData : [object object] -> 이렇게 뜸  오직 string만 저장 가능
  localStorage.setItem(TODOS_LS, JSON.stringify(todoData));

}

function paintTodo(text){ 
  const list = document.createElement('li');
  const delButton = document.createElement('button');
  const newId = todoData.length +1;

  delButton.innerText = "❌"
  const span = document.createElement('span');
  
  span.innerText=text;
 
  list.appendChild(span)
  list.appendChild(delButton)//appendChild() : father ele 에 넣는 것. 
  list.id = newId;
  todoList.appendChild(list);

  const todoObj = {
    text : text,
    id : newId
  }
  todoData.push(todoObj);
  saveTodos();
}
function submitHandler(event){
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}
function loadTodos(){
  const loadTodoData = localStorage.getItem(TODOS_LS);
  if(loadTodoData!==null){
    const parseTodoData = JSON.parse(loadTodoData);
    parseTodoData.forEach(function(todo){
      paintTodo(todo.text)
    })

  }
}

function init(){
  loadTodos()
  todoForm.addEventListener("submit", submitHandler);

}
init();
