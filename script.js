let submit = byId("newtodo-submit");

const textInput = byId("newtodo-text");
const dateInput = byId("newtodo-date");

let todolist = byId("todolist");

let removeButtons = byClass("minus-root");
let deleteDialog = byId("deleteConfirmDialog");
let confirmDeleteButton = byId("confirmDeleteButton");
let todoElements = byTag("todo");
var pageData = {
    input: {},
    todos: []
}

window.addEventListener("load", () => {
  console.log("window.onload", performance.now());
  pageData.todos = readFromLocalStorage();
  for (let todo of pageData.todos) {
    createTodoElement(todo);
  }
});
document.addEventListener('load', feather.replace());
// submit.addEventListener("click", () => {
//   let todoText = byId("newtodo-text").value;
//   let todoDate = byId("newtodo-date").value;
//   let index = findTodoIndexByDate(todoDate);
//   saveToStorage(index, todoText, todoDate);
//   //now that localstorage is sorted, insert the new one in the right place(create refreshes)
//   createTodo(index, index, todoText, todoDate);
// });



const createTodoElement = (todo) => {
  let timetill = timeTillDue(todo.duedate);
  console.log('createTodoElement')
  let todoElement = create("todo", ["todo-model"]);
  let hiddenId = create('input', [], [['type', 'hidden'], ['value', todo.id]])
  let textWrapper = create('div', ['text-wrapper']);
  let titleDueWrapper = create('div', ['titledue-wrapper'] )
  let todoTitle = create('p', ['todo-title'], null, todo.title);
  let todoTitleInput = create('input', ['midtext', 'display-none', 'title-input'], 
    [['type','text'], ['value', todo.title]])
  let todoDueDate = create('p', ['todo-duedate', 'duedate-good'], null, formatTodoDate(timetill));
  let todoDueDateInput = create('input', ['normaltext', 'display-none', 'date-input'], 
      [['type', 'datetime-local']], formatTodoDate(timetill))
  let todoDescription = create('p',[ 'todo-description'], [], todo.description);
  // let todoDescriptionInput = create('textarea', ['normaltext', 'display-none', 'description-input'],
  //     [['value', todo.description],['rows', '6']])
  let todoDescriptionInput = create('textarea', ['normaltext', 'display-none', 'description-input'],
  [['rows', '6']], todo.description)
  let iconWrapper = create('div', ['icon-wrapper']);
  let deleteIcon = create('i', ['todo-icon', 'delete'], [['data-feather', 'trash-2']])
  let saveIcon = create('i', ['todo-icon', 'save', 'disabled'], [['data-feather', 'save']])
  let editIcon = create('i', ['todo-icon', 'edit'], [['data-feather', 'edit-3']])
  let addIcon = create('i', ['todo-icon', 'add'], [['data-feather', 'plus']])
  insertTodo(todolist, todoElement, hiddenId, textWrapper, titleDueWrapper,
    todoTitle, todoTitleInput, todoDueDate, todoDueDateInput,
    todoDescription, todoDescriptionInput, iconWrapper, 
    deleteIcon, saveIcon, editIcon, addIcon);

  feather.replace();
  colorcodeDueDate(todoDueDate, timetill);

  addButtonEventListeners(textWrapper, iconWrapper, hiddenId);
};

