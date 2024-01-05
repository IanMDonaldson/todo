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
});

newtodoSaveButton.addEventListener('click', () => {
  handleNewTodo(newtodoTitle, newtodoDate, newtodoTime);
});