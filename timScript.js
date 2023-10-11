const body = byTag("body")[0];
body.insert(
  new PersonCard(Div(P("paragraph 3"), P("paragraph 2"), P("paragraph 3")))
);
const url = "https://jsonplaceholder.typicode.com/users";


const textInput = byId("newtodo-text");
const dateInput = byId("newtodo-date");
const pageData = {
  newTodo: {},
  todoList: [],
};
function handleInput() {
  const text = textInput.value;
  const date = dateInput.value;
  pageData.newTodo = timCreateTodo(text, date);
}

function cleanUpNewTodo() {
  pageData.newTodo = {
    date: new Date(),
    text: "Error: No text Entered.",
  };
  textInput.innerText = "";
  // dateInput.value = new Date().toDateString()
}
function handleCreateTodo() {
  try {
    handleInput();
    pageData.todoList.push(pageData.newTodo);
  } catch (e) {
    throw new Error(e);
  } finally {
    cleanUpNewTodo();
    console.table(pageData.todoList);
  }
}

const timCreateTodo = (text, date) => {
  const createId = () =>
    Math.floor(Math.random() * 999_999_999_999).toString(16)();

  let todo = {
    message: text,
    id: createId,
    date: date,
  };
  return todo;
};

function hydrateTodos() {
  for (let todo of pageData.todoList) {
    todolist.insert(new Todo(P(todo.text), P(todo.date)));
  }
}

function timCreate(
  config = {
    tagName: "",
    elems: [],
    innerElemts: [],
    innerText: [],
  }
) {
  const { elems, tagName, innerElemts, innerText } = config;
  let output = false;

  if (tagName) {
    output = document.createElement(tagName);
  }
  if (elems) {
  }
  if (innerElemts) {
  }
  innerText ? (output.innerText = innerText) : null;
  return output;
}
// async function main() {
//     try {
//         const res = await fetch(url)
//     const data = await res.json()
//     let num = 24
//     for(let d of data) {
//         body.insert(new PersonCard(Div(P(num.toString(18)))))
//     }
//     console.table(data)
//     }
//     catch(e) {
//         console.trace(e)
//     }
// }

// main()

// async function Post(input) {
//     try {
//         let res = await fetch(url, {
//             headers: {},
//             method: "POST",
//             body: JSON.stringify(input, null, 4)
//         })
//         let data = await res.json()
//         return data
//     }
//     catch(error) {
//         console.error(error)
//         return false;
//     }
// }
