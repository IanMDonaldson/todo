/**
 * tagName is string tag, classes is a string array of classes
 *
 * Attributes requires pairs of attributes and their values
 *
 * for instance ["class", "myclassName", "aria-label", "This is an aria-label"]
 * @param {String} tagName
 * @param {Array} classes
 * @param {Array} attributes
 * @param {String} innerText
 * @returns {any}
 */
function create(
  tagName = "DIV",
  classes = [],
  attributes = [],
  innerText = ""
) {
  let output = document.createElement(tagName);
  if (classes) for (let c of classes) output.classList.add(c);
  if (attributes)
    for (let [attrName, attrValue] of attributes)
      output.setAttribute(attrName, attrValue);
  if (innerText) output.innerText = innerText;
  console.log(output);
  return output;
}

// function create(tagName, classes, attributes, innerText) {
//   let output = -1;
//   if (tagName) output = document.createElement(tagName);
//   if (classes) {
//     classes.forEach((e) => {
//       output.classList.add(e);
//     });
//   }
//   if (attributes) {
//     for (let i = 0; i < attributes.length; i += 2) {
//       output.setAttribute(attributes[i], attributes[i + 1]);
//     }
//   }
//   if (innerText) output.innerText = innerText;
//   return output;
// };

const append = (tag) => document.appendChild(tag);

const byId = (id) => document.getElementById(id);
function byIds(...ids) {
  let obj = {}
  for (let id of ids) {
    obj[id] = document.getElementById(id);
  }
  return obj
}
const byTag = (tag) => document.getElementsByTagName(tag);
const byClass = (className) => document.getElementsByClassName(className);

const P = (text, ...classes) => {
  let output = create("p");
  output.innerText = text;
  if (classes)
    classes.forEach((e) => {
      output.classList.add(e);
    });
  return output;
};

HTMLElement.prototype.insert = function (...elems) {
  for (let e of elems) {
    this.insertAdjacentElement("beforeend", e);
  }
};

HTMLElement.prototype.insertAfter = function (...elems) {
  for (let e of elems) {
    this.insertAdjacentElement("afterend", e);
  }
};

HTMLElement.prototype.__defineGetter__("toggleDisplay", function () {
  if (this.classList.contains("display-none")) {
    this.classList.remove("display-none");
    return true;
  }
  this.classList.add("display-none");
  return true;
});

function insertTodo(
  todolist,
  todoElement,
  hiddenId,
  textWrapper,
  titleDueWrapper,
  todoTitle,
  todoTitleInput,
  todoDueDate,
  todoDueDateInput,
  todoDescription,
  todoDescriptionInput,
  iconWrapper,
  trashIcon,
  saveIcon,
  editIcon,
  addIcon
) {
  console.log("insertTodo entered");
  todoElement.insert(hiddenId);
  todoElement.insert(textWrapper);
  textWrapper.insert(titleDueWrapper);
  titleDueWrapper.insert(todoTitle);
  titleDueWrapper.insert(todoTitleInput);
  titleDueWrapper.insert(todoDueDate);
  titleDueWrapper.insert(todoDueDateInput);
  textWrapper.insert(todoDescription);
  textWrapper.insert(todoDescriptionInput);
  todoElement.insert(iconWrapper);
  iconWrapper.insert(trashIcon);
  iconWrapper.insert(saveIcon);
  iconWrapper.insert(editIcon);
  iconWrapper.insert(addIcon);
  //finally add it to the todolist
  todolist.insert(todoElement);
}

function toggleDisplay(elem) {
  if (elem.classList.contains("display-none")) {
    elem.classList.remove("display-none");
    return true;
  }
  elem.classList.add("display-none");
  return true;
}

//function swapWithInputs(...elems) {
function toggleInputs(textwrapper) {
  // elems.forEach((e) => toggleDisplay(e));
  textwrapper.childNodes[0].childNodes.forEach((e) => toggleDisplay(e));
  toggleDisplay(textwrapper.childNodes[1]);
  toggleDisplay(textwrapper.childNodes[2]);
}

function toggleDisabled(elem) {
  if (elem.classList.contains("disabled")) {
    elem.classList.remove("disabled");
    return true;
  }
  elem.classList.add("disabled");
  return true;
}

function handleDelete(hiddenId) {
  let indexOfTodo = pageData.todos
    .map(function (x) {
      return x.id;
    })
    .indexOf(Number.parseInt(hiddenId.value));
  if (indexOfTodo < 0) {
    alert("Thanks for changing that");
    return;
  }
  pageData.todos.splice(indexOfTodo, 1);
  writeToLocalStorage(pageData.todos);
}

function handleTimSave(title, task) {
  let todo = new TodoElement({
    title: title,
    task: task
  })
  pageData.todos.push(todo)
  renderTodos()
}

const handleSave = function (
  textWrapper,
  iconWrapper,
  todoTitleInput,
  todoDateInput,
  todoDescriptionInput,
  hiddenId
) {
  let indexOfTodo = pageData.todos.map(function (x) {return x.id;})
    .indexOf(Number.parseInt(hiddenId.value));
  if (indexOfTodo < 0) {
    alert("Thanks for changing that");
    return;
  }
  pageData.todos[indexOfTodo].title = todoTitleInput.value;
  pageData.todos[indexOfTodo].description = todoDescriptionInput.value;
  pageData.todos[indexOfTodo].dueDate = Date.parse(todoDateInput.value);
  writeToLocalStorage(pageData.todos); //sorts too!
  toggleDisabled(iconWrapper.childNodes[1]);
  toggleDisabled(iconWrapper.childNodes[2]);
  toggleInputs(textWrapper);
};

const handleEdit = function (textwrapper, iconWrapper) {
  toggleDisabled(iconWrapper.childNodes[1]);
  toggleDisabled(iconWrapper.childNodes[2]);
  toggleInputs(textwrapper);
  return true;
};

function handleAddSubtask(iconWrapper, todoElement) {
  console.log("handleAddSubtask clicked");
}
function handleNewTodo() {
  let inputs = byIds('newtodo-title', 'newtodo-date', 'newtodo-description')
  let newtodo = {
    id: generateId(),
    title: inputs["newtodo-title"].value,
    description: inputs["newtodo-description"].value,
    dueDate: inputs["newtodo-date"].value
  }
  console.log(newtodo)
  pageData.todos.push(newtodo)
  writeToLocalStorage(pageData.todos)
  console.log(pageData.todos)
}



function addButtonEventListeners(textWrapper, iconWrapper, hiddenId) {
  let todoTitleInput = textWrapper.childNodes[0].childNodes[1];
  let todoDateInput = textWrapper.childNodes[0].childNodes[3];
  let todoDescriptionInput = textWrapper.childNodes[2];
  let deleteIcon = iconWrapper.childNodes[0];
  let saveIcon = iconWrapper.childNodes[1];
  let editIcon = iconWrapper.childNodes[2];
  let addIcon = iconWrapper.childNodes[3];

  //delete handler
  deleteIcon.addEventListener("click", () => {
    handleDelete(hiddenId);
  });

  saveIcon.addEventListener("click", () => {
    handleSave(
      textWrapper,
      iconWrapper,
      todoTitleInput,
      todoDateInput,
      todoDescriptionInput,
      hiddenId
    );
  });

  editIcon.addEventListener("click", () => {
    handleEdit(textWrapper, iconWrapper);
  });

  //add subtask handler
  addIcon.addEventListener("click", () => {
    handleAddSubtask();
  });
}
function timeTillDue(dueDate) {
  let total = Date.parse(dueDate) - Date.parse(new Date());
  let seconds = Math.floor((total / 1000) % 60);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total: [total],
    days: [days],
    hours: [hours],
    minutes: [minutes],
    seconds: [seconds],
  };
}
function formatTodoDate(timetill) {
  if (timetill.days < 1) {
    return "Due in: " + timetill.hours + ":" + timetill.minutes;
  }
  return "Due in: " + timetill.days + " Days";
}

function colorcodeDueDate(todoDueDate, timetill) {
  //default dueDate has the dueDate-good class on it
  if (timetill.days < 2) {
    todoDueDate.classList.remove("dueDate-good");
    todoDueDate.classList.add("dueDate-alert");
    return;
  }
  if (timetill.days < 5 && timetill.days >= 2) {
    todoDueDate.classList.remove("dueDate-good");
    todoDueDate.classList.add("dueDate-warning");
    return;
  }
}

function handleError() {}
function handleSuccess() {}
function handleToast() {}