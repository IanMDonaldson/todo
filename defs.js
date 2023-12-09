//class space
class TodoElement extends HTMLElement{
  constructor(todo) {
    super();
    this.createTodo(todo);
    this.insertTodo();
    this.addButtonEventListeners();
    this.todo = todo;
    this.setTimeTill();
    // this.insertTodo();
    // this.addButtonEventListeners();
    // this.colorCodeDueDate();
  }
  createTodo(todo) {
    this.todoElement = create("todo", ["todo-model"]);
    this.hiddenId = create( "input", [], [ ["type", "hidden"], ["value", todo.id], ]);
    this.textWrapper = create("div", ["text-wrapper"]);
    this.titleDueWrapper = create("div", ["titledue-wrapper"]);
    this.todoTitle = create("p", ["todo-title"], null, todo.title);
    this.todoTitleInput = create( "input", ["midtext", "display-none", "title-input"],
     [ ["type", "text"], ["value", todo.title], ]);
    this.todoDueDate = create( "p", ["todo-dueDate", "dueDate-good"], null, this.formatTodoDate());
    this.todoDueDateInput = create( "input", ["normaltext", "display-none", "date-input"], 
      [["type", "datetime-local"]], this.formatTodoDate());
    this.todoDescription = create( "p", ["todo-description"], [], todo.description);
    this.todoDescriptionInput = create( "textarea", ["normaltext", "display-none", "description-input"],
      [["rows", "6"]], todo.description);
    this.iconWrapper = create("div", ["icon-wrapper"]);
    this.deleteIconButton = create('button', ['delete-icon-button'])
    this.deleteIcon = create( "i", ["todo-icon", "delete"], [["data-feather", "trash-2"]]);
    this.saveIconButton = create('button', ['save-icon-button'])
    this.saveIcon = create( "i", ["todo-icon", "save", "disabled"], [["data-feather", "save"]]);
    this.editIconButton = create('button', ['edit-icon-button'])
    this.editIcon = create( "i", ["todo-icon", "edit"], [["data-feather", "edit-3"]]);
    this.addIconButton = create('button', ['add-icon-button'])
    this.addIcon = create("i", ["todo-icon", "add"], [["data-feather", "plus"]]);
    
    //this causes stuff to be lost, and can't add event listeners to it
    // return this.insertTodo(todolist);
  }


 insertTodo() {
    if (todolist === undefined) {
      console.log("undefined todoList");
      handleError("todoList undefined");
      return;
    }
    console.log("insertTodo entered");
    try {
      this.todoElement.insert(this.hiddenId);
      this.todoElement.insert(this.textWrapper);
      this.textWrapper.insert(this.titleDueWrapper);
      this.titleDueWrapper.insert(this.todoTitle);
      this.titleDueWrapper.insert(this.todoTitleInput);
      this.titleDueWrapper.insert(this.todoDueDate);
      this.titleDueWrapper.insert(this.todoDueDateInput);
      this.textWrapper.insert(this.todoDescription);
      this.textWrapper.insert(this.todoDescriptionInput);
      this.todoElement.insert(this.iconWrapper);
      this.iconWrapper.insert(this.deleteIconButton)
      this.deleteIconButton.insert(this.deleteIcon);

      this.iconWrapper.insert(this.saveIconButton)
      this.saveIconButton.insert(this.saveIcon);
      
      this.iconWrapper.insert(this.editIconButton)
      this.editIconButton.insert(this.editIcon);

      this.iconWrapper.insert(this.addIconButton)
      this.addIconButton.insert(this.addIcon);
      //finally add it to the todolist
      todolist.insert(this.todoElement);
    } catch(e) {
      handleError(e);
    }
    // this.addButtonEventListeners();
  }


  addButtonEventListeners() {
    console.log("addButtonEventListeners activated");
    //delete handler
    // this.deleteIcon.addEventListener("click", this.handleDelete.bind(this));

    this.deleteIconButton.addEventListener("click", () => {
      console.log('Hell yeah brother')
      // this.handleDelete();
    });
    this.saveIcon.addEventListener("click", () => {
      handleSave();
    });

    this.editIcon.addEventListener("click", () => {
      handleEdit();
    });

    //add subtask handler
    this.addIcon.addEventListener("click", () => {
      handleAddSubtask();
    });
  }


  colorCodeDueDate() {
    //default dueDate has the dueDate-good class on it
    try {
      if (this.timeTillDue.days < 2) {
        this.todoDueDate.classList.remove("duedate-good");
        this.todoDueDate.classList.add("duedate-alert");
        return;
     }
      if (this.timeTillDue.days < 5 && this.timeTillDue.days >= 2) {
        this.todoDueDate.classList.remove("duedate-good");
        this.todoDueDate.classList.add("duedate-warning");
        return;
      }
    } catch (err) {
      handleError(err)  
    }
  }


  setTimeTill() {
    let dueDate = this.todo.dueDate;
    let total = Date.parse(dueDate) - Date.parse(new Date());
    let seconds = Math.floor((total / 1000) % 60);
    let minutes = Math.floor((total / 1000 / 60) % 60);
    let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    let days = Math.floor(total / (1000 * 60 * 60 * 24));

    this.timeTillDue = {
      total: [total],
      days: [days],
      hours: [hours],
      minutes: [minutes],
      seconds: [seconds],
    };

  }


  formatTodoDate() {
    try {
      if (this.timeTillDue.days < 1) {
        return "Due in: " + this.timeTillDue.hours + ":" + this.timeTillDue.minutes;
      }
      return "Due in: " + this.timeTillDue.days + " Days";
    }catch(e) {
      handleError(e);
    }
  }


  handleDelete = function() {
    console.log("is this even getting hit?");
    let indexOfTodo = pageData.todos
      .map(function (x) {
        return x.id;
      })
      .indexOf(Number.parseInt(this.hiddenId.value));
    if (indexOfTodo < 0) {
      handleError("Delete - index does not exist")
      return false;
    }
    pageData.todos.splice(indexOfTodo, 1);
    writeToLocalStorage(pageData.todos);
  }


  handleSave(
    textWrapper,
    iconWrapper,
    todoTitleInput,
    todoDateInput,
    todoDescriptionInput,
    hiddenId
  ) {
    let indexOfTodo = pageData.todos
      .map(function (x) {
        return x.id;
      })
      .indexOf(Number.parseInt(hiddenId.value));
    if (indexOfTodo < 0) {
      handleError('Save - index does not exist')
      return false;
    }

    try {
      let todo = pageData.todos[indexOfTodo];
      todo.title = this.todoTitleInput.value;
      todo.description = this.todoDescriptionInput.value;
      todo.dueDate = Date.parse(this.todoDueDateInput.value);
  
      writeToLocalStorage(pageData.todos); //sorts too!
      toggleDisabled(iconWrapper.childNodes[1]);
      toggleDisabled(iconWrapper.childNodes[2]);
      toggleInputs(textWrapper);
    } catch (err) {
      handleError(err) 
    }
  }


  handleEdit() {
    try {
      toggleDisabled(this.saveIcon);
      toggleDisabled(this.editIcon);
      toggleInputs(this.textWrapper);
      return true;
    } catch (err) {
      handleError(err)
    }
  }


  handleAddSubtask() {
    console.log("handleAddSubtask clicked");
  }
  

  toggleInputs(textwrapper) {
    // elems.forEach((e) => toggleDisplay(e));
    textwrapper.childNodes[0].childNodes.forEach((e) => toggleDisplay(e));
    toggleDisplay(textwrapper.childNodes[1]);
    toggleDisplay(textwrapper.childNodes[2]);
  }
}

class ErrorToast extends HTMLElement {
  constructor(message) {
    super();
    this.createToast(message);
  }

  createToast(message) {

  }
}

class SuccessToast extends HTMLElement {
  constructor(message) {
    super();
    this.createToast(message)
  }

  createToast(message) {

  }
}

//define space
customElements.define('todo-element', TodoElement);
