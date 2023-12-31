function readFromLocalStorage() { return JSON.parse(localStorage.getItem("todos"))}
const writeToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(sortTodos(todos)));
  location.reload()
}

const generateId = () => {
  return Math.floor(Math.random() * 999_999_999).toString(16);
}

const randomDate = () => {
    start = new Date("August 19, 2023 23:15:30");
    end = new Date("October 19, 2023 00:00:00")
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const generateRandomTodos = () => {
    arr = []
    for (let i = 0; i < 7; i++) {
        let todo = {
            id: i,
            title: i,
            description: "this is todo numba "+i,
            dueDate: randomDate()
        }
        arr.push(todo);
    }
    return arr;
}

const sortTodos = (todos) => {
  return todos.sort((a, b) => {
    if (new Date(a.dueDate) > new Date(b.dueDate) ) return 1
    return -1
  })
}

const stateManager = {
  active: 1,
  inactive: 0,
  addState: (name, value) => {
    this.stateManager[name] = value
  },
}

function checkActiveState(state) {
  if(state === stateManager.active) return true;
  return false;
}