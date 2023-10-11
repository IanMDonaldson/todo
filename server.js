const readFromLocalStorage = () => JSON.parse(localStorage.getItem("todos"));
const writeToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(sortTodos(todos)));
}
const generateId = () => {
  Math.floor(Math.random() * 999_999_999).toString(16);
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
            message: i,
            date: randomDate()
        }
        arr.push(todo);
    }
    return arr;
}
const sortTodos = (todos) => {
    //mergesort best sort..based on date
    if (todos.length <= 1) return todos;

    let mid = Math.floor(todos.length/2)
    let left = sortTodos(todos.slice(0, mid))
    let right = sortTodos(todos.slice(mid))

    return merge(left, right);
}
const merge = (leftTodos, rightTodos) => {
    let sortedArr = []
    while (leftTodos.length && rightTodos.length) {
        if (Date.parse(leftTodos[0].duedate) < Date.parse(rightTodos[0].duedate)) {
            sortedArr.push(leftTodos.shift());
        } else {
            sortedArr.push(rightTodos.shift())
        }
    }
    return [...sortedArr, ...leftTodos, ...rightTodos]
}

