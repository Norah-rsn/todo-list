
window.addEventListener('load', () => {
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list_element = document.querySelector("#tasks");
const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];

function updateList() {
  list_element.innerHTML = '';

  for (const key in toDoArray) {
    const task_element = document.createElement("div");
    task_element.classList.add("task");  

    const span = document.createElement('span');
    span.innerText = toDoArray[key];
    task_element.appendChild(span);

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    task_element.appendChild(task_content_element);

    const task_input_element = document.createElement("input");
    task_input_element.classList.add("text");
    task_input_element.type = "text";
    task_input_element.setAttribute("readonly", "readonly");

    task_content_element.appendChild(task_input_element);

    const task_actions_element = document.createElement("div");
    task_actions_element.classList.add("actions");

    const task_delete_element = document.createElement("button");
    task_delete_element.setAttribute('key', key);
    task_delete_element.classList.add("delete");
    task_delete_element.innerHTML = "حذف";

    task_actions_element.appendChild(task_delete_element);

    task_element.appendChild(task_actions_element);

    list_element.appendChild(task_element);

    input.value = '';

  }

  localStorage.setItem('to-do-list', JSON.stringify(toDoArray));
}

function addToList(value) {
  if (value === ''){
    alert("Please fill out the task");
    return;
  } 

  toDoArray.push(value);

  updateList();
  input.value = '';
  input.focus();
}

function deleteFromList(key) {
  toDoArray.splice(Number(key), 1);

  updateList();
  input.value = '';
  input.focus();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addToList(input.value);
  const task = input.value;
});

document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('delete')) {
    deleteFromList(el.getAttribute('key'));
  }
});

updateList();

});