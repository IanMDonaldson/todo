// byId('newtodo-date').setAttribute('placeholder', todaysDate());

window.addEventListener("load", () => {
  console.log("window.onload", performance.now());
  if (!readFromLocalStorage()) {
    console.log("No Storage")
    return false;
  }
  pageData.todos = readFromLocalStorage()
  for (let todo of pageData.todos) {
    let newTodo = new TodoElement(todo);
    pageData.todoElements.push(newTodo);
    if (todo.subtasks.length !== 0) {
      for (let subtask of todo.subtasks) {
        let newSubtask = new TodoElement(subtask);
        pageData.todoElements.push(newSubtask);
      }
    }
  }
  // feather.replace();
});

newtodoSaveButton.addEventListener('click', () => {
  handleNewTodo(newtodoTitle, newtodoDate, newtodoTime);
});

function renderTodos() {
  let output = false;
  let todoWrapper = byId('todoWrapper')
  try {
    let outTodos = pageData.todos
    pageData.todos.forEach(t => todoWrapper.insertAdjacentElement('beforeend', new TodoElement(t)))
    return output = true;
  }
  catch(e) {
    handleError(e)
    return output
  }
}


// function isDateValid(dateElem, timeElem) {
//   let dateRegex = new RegExp(/^(((0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2})|((0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2}) (1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM))$/);
//   return dateRegex.test(completeDate.toISOString());
// }

// feather.replace();