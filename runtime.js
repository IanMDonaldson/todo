let submit = byId("newtodo-submit");

let todolist = byId("todolist");

let newtodoTitle = byId('newtodo-title')
let newtodoDate =  byId('newtodo-date')
let newtodoTime = byId('newtodo-time')

let newtodoSaveButton = byId('newtodo-save-button')

let removeButtons = byClass("minus-root");
let deleteDialog = byId("deleteConfirmDialog");
let confirmDeleteButton = byId("confirmDeleteButton");
let todoElements = byTag("todo");
let toastExits = byClass('close-icon');
var pageData = {
    input: {},
    todos: [],
    todoElements: []
}
for (let x of toastExits) {
    x.addEventListener('click', (e) => {
        toggleDisplay(e.target.parentElement);
    });
}
function setNewTodoTime() {
  let todaysDate = new Date()
  let dateIn15mins = new Date(todaysDate.getTime()+(15*60*1000))
  setStandardizedDate(dateIn15mins, newtodoDate, newtodoTime)
}

function Init() {
  console.log('init ran', performance.now())
  setNewTodoTime()
};
Init();