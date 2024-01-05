//class space
class TodoElement extends HTMLElement {
  constructor(todo, parentId, subtasks, subtaskLevel) {
    super()
    this.todo = todo
    this.setTimeTill()
    this.createTodoElement()
    this.insertTodoElement()
    this.addButtonEventListeners()
    this.colorCodeDueDate()
    setStandardizedDate(new Date(this.todo.dueDate), this.todoDateInput, this.todoTimeInput)
    if (this.todo.isComplete) {
      this.handleComplete()
    }
  }

  createTodoElement() {
    try {
      if (this.todo.isSubtask) {
        this.todoWrapper = create('div', ['todo-wrapper', 'subtask'])
        this.subtaskFillerContainer = create('div')
        this.subtaskConnector = create('div', ['subtask-connector'])
        this.todoElement = create('todo', ['todo-model', 'zero-left-margin'])
      } else {
        this.todoWrapper = create('div', ['todo-wrapper'])
        this.todoElement = create("todo", ["todo-model"]);
        this.addIconButton = create('button', ['todo-button', 'add-icon-button'])
        this.addIcon = create("i", ["todo-icon", "add"], [["data-feather", "plus"]]);
      }
  
      this.titleWrapper = create('div', ['title-wrapper'])
  
      if (this.todo.title) {
        this.todoTitle = create("p", ["todo-title"], null, this.todo.title);
        this.todoTitleInput = create("input", ["midtext", "display-none", "title-input"],
          [["type", "text"], ["value", this.todo.title]]);
          
        this.todoDueDate = create("p", ["todo-duedate", "duedate-good"], null, this.formatTodoDate());
        this.todoDateInput = create('input', ['todo-date-input', 'display-none'], [["type", "date"]])
        this.todoTimeInput = create('input', ['todo-date-input', 'display-none'], [["type", "time"]])
        this.saveIconButton = create('button', ['todo-button', 'save-icon-button', 'disabled'])
        this.saveIcon = create("i", ["todo-icon", "save"], [["data-feather", "save"]]);
        this.editIconButton = create('button', ['todo-button', 'edit-icon-button'])
        this.editIcon = create("i", ["todo-icon", "edit"], [["data-feather", "edit-3"]]);
        this.completeIconButton = create('button', ['todo-button', 'complete-icon-button'])
        this.completeIcon = create('i', ['todo-icon', 'complete'], [['data-feather', 'check-circle']])
      } else {
        this.todoTitle = create("p", ["todo-title", "display-none"], null, '');
        this.todoTitleInput = create("input", ["midtext", "title-input"],
          [["type", "text"], ["value", this.todo.title]]);
          
        this.todoDueDate = create("p", ["todo-duedate", "duedate-good", 'display-none'], null, this.formatTodoDate());
        this.todoDateInput = create('input', ['todo-date-input'], [["type", "date"]])
        this.todoTimeInput = create('input', ['todo-date-input'], [["type", "time"]])
        this.saveIconButton = create('button', ['todo-button', 'save-icon-button'])
        this.saveIcon = create("i", ["todo-icon", "save"], [["data-feather", "save"]]);
        this.editIconButton = create('button', ['todo-button', 'edit-icon-button', 'disabled'])
        this.editIcon = create("i", ["todo-icon", "edit"], [["data-feather", "edit-3"]]);
        this.completeIconButton = create('button', ['todo-button', 'complete-icon-button', 'disabled'])
        this.completeIcon = create('i', ['todo-icon', 'complete'], [['data-feather', 'check-circle']])
      }
  
      this.dueDateWrapper = create('div', ['duedate-wrapper'])
      
      this.iconWrapper = create("div", ["icon-wrapper"]);
      this.deleteIconButton = create('button', ['todo-button', 'delete-icon-button'])
      this.deleteIcon = create("i", ["todo-icon", "delete"], [["data-feather", "trash-2"]]);
      
      if (!this.todo.isSubtask && this.todo.isComplete) {
        this.addIconButton = create('button', ['todo-button', 'add-icon-button', 'disabled'])
        this.addIcon = create("i", ["todo-icon", "add"], [["data-feather", "plus"]]);
      }
    } catch (err) {
      handleError(err)
    } 
  }

  insertTodoElement() {
    if (todolist === undefined) {
      handleError("todoList undefined");
      return;
    }
    try {
      if (this.todo.isSubtask) {
        this.todoWrapper.insert(this.subtaskFillerContainer)
        this.todoWrapper.insert(this.subtaskConnector)
        this.todoWrapper.insert(this.todoElement)
      } else {
        this.todoWrapper.insert(this.todoElement)
      }
      this.todoElement.insert(this.titleWrapper)
      this.titleWrapper.insert(this.todoTitle);
      this.titleWrapper.insert(this.todoTitleInput);

      this.todoElement.insert(this.dueDateWrapper)
      if (!this.todo.isComplete) {
        this.dueDateWrapper.insert(this.todoDueDate);
        this.dueDateWrapper.insert(this.todoDateInput);
        this.dueDateWrapper.insert(this.todoTimeInput)
      }

      this.todoElement.insert(this.iconWrapper);
      this.iconWrapper.insert(this.deleteIconButton)
      this.deleteIconButton.insert(this.deleteIcon);
      this.iconWrapper.insert(this.saveIconButton)
      this.saveIconButton.insert(this.saveIcon);
      this.iconWrapper.insert(this.editIconButton)
      this.editIconButton.insert(this.editIcon);
      if (!this.todo.isSubtask) {
        this.iconWrapper.insert(this.addIconButton)
        this.addIconButton.insert(this.addIcon);
      }
      this.iconWrapper.insert(this.completeIconButton)
      this.completeIconButton.insert(this.completeIcon)
      //finally add it to the todolist
      todolist.insert(this.todoWrapper);
    } catch (e) {
      handleError(e);
    }
  }

  addButtonEventListeners() {
    console.log("addButtonEventListeners activated");

    try {
      this.deleteIconButton.addEventListener("click", () => {
        this.handleDelete();
      });
  
      this.saveIconButton.addEventListener("click", () => {
        this.handleSave();
      });
  
      this.editIconButton.addEventListener("click", () => {
        this.handleEdit();
      });
  
      if (!this.todo.isSubtask) {
        this.addIconButton.addEventListener("click", () => {
          this.handleAddSubtask();
        });
      }
  
      this.completeIconButton.addEventListener('click', () => {
        this.handleComplete();
      })
    } catch (err) {
      handleError(err)
    }
  }

  handleComplete() {
    try {
      if (this.todo.isComplete) {
        toggleDisplay(this.todoDueDate)
        this.todoElement.classList.add('todo-complete');
        this.completeIconButton.classList.add('disabled')
        this.editIconButton.classList.add('disabled')
        //complete subtasks as well if parent...exceptds
        if (this.todo.parentId === null && this.todo.subtasks.length > 0) {
          let indexOfParent = pageData.todos.findIndex((todo) => {
            return todo["id"] === this.todo["id"]
          })
          for (let i = 0; i < this.todo.subtasks.length; i++) {
            this.todo.subtasks[i].isComplete = true
            pageData.todos[indexOfParent].subtasks[i].isComplete = true
          }
        }
        return
      }
  
      let indexOfParent, indexOfTodo
      if (this.todo.isSubtask) {
        indexOfParent = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["parentId"]
        })
        indexOfTodo = pageData.todos[indexOfParent].subtasks.findIndex((todo) => {
          return todo["id"] === this.todo["id"]
        })
      } else {
        indexOfTodo = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["id"]
        })
      }
      if (indexOfTodo < 0) {
        handleError('Save - index does not exist')
        return false;
      }
  
      (this.todo.isSubtask) ? pageData.todos[indexOfParent].subtasks[indexOfTodo].isComplete = true
        : pageData.todos[indexOfTodo].isComplete = true
      if (!this.todo.isSubtask) {
        this.addIconButton.classList.add('disabled')
      }
    } catch (err) {
      handleError(err)
    }
    writeToLocalStorage(pageData.todos)
  }

  colorCodeDueDate() {
    //default dueDate has the dueDate-good class on it
    try {
      if (this.timeTillDue.total <= 0) {
        this.todoDueDate.innerText = `OVERDUE`;
      }
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
    try {
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
    } catch (err) {
      handleError(err)
    }
  }

  formatTodoDate() {
    try {
      if (this.timeTillDue.days < 0) {
        return `OVERDUE`
      }
      if (this.timeTillDue.days < 1 && this.timeTillDue.hours < 1 && this.timeTillDue.minutes < 1) {
        return `Due in: ${this.timeTillDue.seconds} seconds`;
      }
      if (this.timeTillDue.days < 1 && this.timeTillDue.hours < 1 && this.timeTillDue.minutes < 2) {
        return `Due in: ${this.timeTillDue.minutes} minute and ${this.timeTillDue.seconds} seconds`;
      }
      if (this.timeTillDue.days < 1 && this.timeTillDue.hours < 1) {
        return `Due in: ${this.timeTillDue.minutes} minutes`;
      }
      if (this.timeTillDue.days < 1 && this.timeTillDue.hours > 1) {
        return `Due in: ${this.timeTillDue.hours} hours and ${this.timeTillDue.minutes} minutes`;
      }
      if (this.timeTillDue.days < 1 && this.timeTillDue.hours < 1) {
        return `Due in: ${this.timeTillDue.hours}:${this.timeTillDue.minutes} hour`;
      }
      if (this.timeTillDue.days < 2 && this.timeTillDue.hours > 1) {
        return `Due in: ${this.timeTillDue.days} day and ${this.timeTillDue.hours} hours`
      }
      if (this.timeTillDue.days < 2 && this.timeTillDue.hours <= 1) {
        return `Due in: ${this.timeTillDue.days} day and ${this.timeTillDue.hours} hour`
      }
      return "Due in: " + this.timeTillDue.days + " Days";
    } catch (e) {
      handleError(`formatTodoDateError: ${e}`);
    }
  }

  handleDelete = function () {
    try {
      let indexOfTodo, indexOfParent;
      if (this.todo.isSubtask) {
        indexOfParent = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["parentId"]
        })
        indexOfTodo = pageData.todos[indexOfParent].subtasks.findIndex((todo) => {
          console.log(todo['id'] + "And THEN " + this.todo['id'])
          return todo["id"] === this.todo["id"]
        })
      } else {
        indexOfTodo = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["id"]
        })
      }
      if (indexOfTodo < 0) {
        handleError("Delete - can't find index of selected todo")
        return false;
      }
      (this.todo.isSubtask) ? pageData.todos[indexOfParent].subtasks.splice(indexOfTodo, 1)
        : pageData.todos.splice(indexOfTodo, 1)
      writeToLocalStorage(pageData.todos);
    } catch (err) {
      handleError(`handleDeleteError ${err}`)
      return false;
    }
  }

  handleSave() {
    try {
      if (!areAllInputsValid(this.todoTitleInput,
        this.todoDateInput, this.todoTimeInput)) {
        return
      }
      let indexOfTodo = -1;
      let indexOfParent = -1;
      if (this.todo.isSubtask) {
        indexOfParent = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["parentId"]
        })
        indexOfTodo = pageData.todos[indexOfParent].subtasks.findIndex((todo) => {
          return todo["id"] === this.todo["id"]
        })
      } else {
        indexOfTodo = pageData.todos.findIndex((todo) => {
          return todo["id"] === this.todo["id"]
        })
      }
      if (indexOfTodo < 0) {
        handleError('Save - index does not exist')
        return false;
      }
      let todo = (this.todo.isSubtask) ? pageData.todos[indexOfParent].subtasks[indexOfTodo] : pageData.todos[indexOfTodo];
      todo.title = this.todoTitleInput.value
      todo.dueDate = new Date(`${this.todoDateInput.value}T${this.todoTimeInput.value}`)

      writeToLocalStorage(pageData.todos)
    } catch (err) {
      handleError(err)
    }
  }

  setDateInputs() {
    try {
      let datetime = this.todo["dueDate"].split('T')
      let time = datetime[1].split(":")
      this.todoDateInput.value = datetime[0]
      this.todoTimeInput.value = `${time[0]}:${time[1]}`
    } catch (err) {
      handleError(err)
    }
  }

  handleEdit() {
    console.log(this.todo["dueDate"])
    try {
      toggleDisabled(this.saveIconButton, this.editIconButton);
      toggleDisplay(this.todoTitle, this.todoTitleInput,
        this.todoDueDate, this.todoDateInput,
        this.todoTimeInput)
      return true;
    } catch (err) {
      handleError(err)
    }
  }

  handleAddSubtask() {
    let todaysDate = new Date()
    try {
      let newSubtask = {
        id: generateId(),
        title: '',
        dueDate: new Date(todaysDate.getTime() + (15 * 60 * 1000)),
        subtasks: [],
        isSubtask: true,
        parentId: this.todo.id,
        isComplete: false
      }
      let subtaskElement = new TodoElement(newSubtask);
      this.todo.subtasks.push(newSubtask)
      let indexOfTodo = pageData.todos.findIndex((todo) => {
        return todo["id"] === this.todo["id"]
      })
      pageData.todoElements.push(subtaskElement);
    } catch (err) {
      handleError(err)
      feather.replace()
    }
    feather.replace()
  }
}

//define space
customElements.define('todo-element', TodoElement);
