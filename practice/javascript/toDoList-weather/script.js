const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items')); // 다시 배열, 객체로 변환

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');
  
  newBtn.addEventListener("click", () => {
    newLi.classList.toggle('complete');
    saveItemsFn ()
  })

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn ();
  })

  if (storageData?.complete) { // '?' storageData가 있을 경우에만 if문 실행, ? 없으면 에러발생, storageData가 null이나 undefined면 실행하지 않음음
    newLi.classList.add('complete');
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn); // newLi안에 태그를 추가
  newLi.appendChild(newSpan); // newLi안에 태그를 추가
  todoList.appendChild(newLi);
  
  todoInput.value = ''; // input 비워주기

  saveItemsFn ()
}

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value) { // enter keyCode값이 13
    createTodo ()
  }
}

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn ()
}

// 새로고침 해도 사라지지 않게 저장
const saveItemsFn = function () {
  const saveItems = [];
  for(let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents : todoList.children[i].querySelector('span').textContent,      
      complete : todoList.children[i].classList.contains('complete'),
    }
    saveItems.push(todoObj);
  }

  saveItems.length === 0 ? localStorage.remove('saved-items') : localStorage.setItem('saved-items', JSON.stringify(saveItems)) //배열이나 객체를 문자데이터로 추출하려면 JSON 데이터 포맷 사용해야함

};

if (savedTodoList) {
  for(let i = 0; i < savedTodoList.length; i++) {
    createTodo (savedTodoList[i]);
  }
}