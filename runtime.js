let submit = byId("newtodo-submit");

let todolist = byId("todolist");

let newtodoDescription = byId('newtodo-description')
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
function setNewTodoDate() {
  //sets to 15 minutes past the current time
  try {
    let date = new Date();
    let offset = date.getTimezoneOffset();
    date = new Date((date.getTime()+(15*60*1000)) - (offset*60*1000)).toISOString().split('T')
  
    let time = date[1].split(':');
    newtodoDate.value = date[0];
    newtodoTime.value = time[0]+":"+time[1];
  } catch (err) {
    handleError(err); 
  }
}
function Init() {
    console.log('init ran', performance.now())
    setNewTodoDate();
};
Init();