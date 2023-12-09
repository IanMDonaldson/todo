
const byId = (id) => document.getElementById(id);
let errorToast = byId('toast-error')
let errorClose = byId('toast-error-close')
let errorMessage = byId('toast-error-message')
let successToast = byId('toast-success')
let successClose = byId('toast-success-close')
let successMessage = byId('toast-success-message')

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
function addClickEventListener(element, myFunction) {
  // for (let element in elems) {
    if (element.getAttribute('clickListener') !== "true") {
      element.addEventListener('click', () => {
        myFunction();
        console.log('element ' + element.toString() + ' event click event has been attached');
      })
      element.setAttribute('clickListener', 'true');
    }
  // }
}

function addChangeEventListener(element, myFunction) {
  // for (let element of elems) {
  if (element.getAttribute('changeListener') !== 'true') {
    element.addEventListener('change', () => {
      myFunction(element)
    })
    element.setAttribute('changeListener', 'true');
  }
// }
}
function addInputEventListener(element, myFunction) {
  if (element.getAttribute('inputListener') !== 'true') {
    element.addEventListener('input', () => {
      myFunction(element)
    })
    element.setAttribute('inputListener', 'true');
  }
}
function addKeyupEventListener(element, myFunction) {
  // for (let element in elems) {
    if (element.getAttribute('keyupListener') !== "true") {
      element.addEventListener('keyup', () => {
        myFunction(element);
        console.log('element ' + element.toString() + ' event click event has been attached');
      })
      element.setAttribute('keyupListener', 'true');
    }
  // }
}

const append = (tag) => document.appendChild(tag);

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

function todaysDate() {
  let date = new Date();
  return ((date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes());
}

function isDateValid(dateElem, timeElem) {
  let date = new Date(dateElem.value + 'T' + timeElem.value);
  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date)) { // d.getTime() or d.valueOf() will also work
      // date object is not valid
      return false;
    } else {
      // date object is valid
      return true
    }
  }
  // not a date object
  return false;

}

function isDateBeforeCutoff(dateElem, timeElem) {

  //cutoff is 5 mins past current time
  try {
    let now = new Date();
    let dateInput = new Date(dateElem.value + 'T' + timeElem.value);
    let cutoffDate = new Date(now.getTime() + 5*60*1000);
    console.log(`
      dateelem value = ${dateElem.value} and TimeElem.value = ${timeElem.value}
      date Input: ${dateInput}
      cutoffDate: ${cutoffDate}
      date - cutoff = ${(dateInput.getTime() - cutoffDate.getTime())}`)
    if ((dateInput.getTime() -cutoffDate.getTime()) <= 0) { 
      console.log('date is before cutoff!')
      return true
    }
    return false
  } catch (error) {
    handleError(error)
    return true //therefore invalid date ;)
  }
}
function addInvalidInput(...elems) {
  try {
    console.log('addInvalidInput activated')
    for (let elem of elems) {
    if (!elem.classList.contains('invalid-input')) {
      elem.classList.add('invalid-input')
    }
    }
  } catch (error) {
    handleError(error)
  }
}

function removeInvalidInput(...elems) {
  try {
    console.log('removeInvalidInput activated')
    for (let elem of elems) {
    if (elem.classList.contains('invalid-input')) {
      elem.classList.remove('invalid-input')
    }
    }
  } catch (error) {
    handleError(error) 
  }
}

function toggleDisplay(elem) {
  console.log('toggledisplay activated');
  try {
    if (elem.classList.contains("display-none")) {
      elem.classList.remove("display-none");
      return true;
    }
    elem.classList.add("display-none");
    return true;
  } catch (err) {
    handleError(err)
    return false; 
  }
}


function toggleDisabled(elem) {
  try {
    if (elem.classList.contains("disabled")) {
      elem.classList.remove("disabled");
      return true;
    }
    elem.classList.add("disabled");
    return true;
  } catch (err) {
    handleError(err)
    return false 
  }
}

function areAllInputsValid(descriptionInput, titleInput, dateInput, timeInput) {
  let valid = true
  try {
    if (!areTextInputsValid(descriptionInput, titleInput)) {
      console.log('nonvalid inputs!')
      addInputEventListener(descriptionInput, handleInvalidInput);
      addInputEventListener(titleInput, handleInvalidInput)
      valid = false 
    }
    if (!areDateInputsValid(dateInput, timeInput)) {
      addChangeEventListener(dateInput, function() {areDateInputsValid(dateInput, timeInput)})
      addChangeEventListener(timeInput, function() {areDateInputsValid(dateInput, timeInput)})
      valid = false
    }
    return valid
  } catch (err) {
    handleError(err)
    return false 
  }
}
function handleNewTodo(descriptionInput, titleInput, dateInput, timeInput) {
  if (!areAllInputsValid(descriptionInput, titleInput, dateInput, timeInput)) {
    return
  }
  try {
    let newtodo = {
      id: generateId(),
      title: newtodoTitle.value,
      description: newtodoDescription.value,
      dueDate: new Date(newtodoDate.value + "," + newtodoTime.value)
    }
    console.log(newtodo)
    pageData.todos.push(newtodo)
    writeToLocalStorage(pageData.todos)
    console.log(pageData.todos)
    handleSuccess('Todo Successfully Saved!')
  } catch (err) {
    handleError(err)
  }
}

function areDateInputsValid(dateInput, timeInput) {
  let valid = true
  let errormessage;
  try {
    if (!dateInput.value) {
      console.log("dateinput no value")
      errormessage += '-- date has no value --\n'
      valid = false
    }
    if (!timeInput.value) {
      console.log("timeinput no value")
      errormessage += '-- time has no value --\n'
      valid = false
    }
    if (valid && !isDateValid(dateInput, timeInput)) {
      console.log('Is date, but invalid date')
      errormessage += '-- Date time is invalid format --'
      valid = false
      
    } else if (isDateBeforeCutoff(dateInput, timeInput)) {
      console.log('input date is BEFORE cutoff and Invalid')
      errormessage += '-- Datetime is too early, due date can be at minimum 5 minutes past the current time.\n'
      valid = false
    }
    if (!valid) {
      console.log('INVALID DATE INPUTS')
      handleError(errormessage)
      addInvalidInput(dateInput)
      addInvalidInput(timeInput)
      return valid
    }
    removeInvalidInput(dateInput)
    removeInvalidInput(timeInput)
    return valid;
  } catch (err) {
    handleError(err)  
    return false
  }
}
function areTextInputsValid(descriptionInput, titleInput) {
  let valid = true
  try {
    if (descriptionInput.value == false) {
      valid = false;
      addInvalidInput(descriptionInput)
    }
    if (titleInput.value == false) {
      valid = false
      addInvalidInput(titleInput)
    }
    if (valid === true) {
      removeInvalidInput(descriptionInput, titleInput)
    }
    return valid
  } catch (err) {
    handleError(err)  
  }
}
function handleInvalidInput(elem) {
  console.log("handleInValidInput")
  if (elem.value == false) {
    addInvalidInput(elem)
    return false;
  }
  removeInvalidInput(elem)
}


function handleError(message) {
  errorMessage.innerText = message;
  if (!successToast.classList.contains('display-none')) toggleDisplay(successToast)
  if (errorToast.classList.contains('display-none')) toggleDisplay(errorToast)

}

function handleSuccess(message) {
  successMessage.innerText = message 
  if (!errorToast.classList.contains('display-none')) toggleDisplay(errorToast)
  if (successToast.classList.contains('display-none')) toggleDisplay(successToast)
}
function handleToast() {}