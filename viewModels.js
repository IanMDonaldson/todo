
class TimTodoElement extends HTMLElement {
  constructor(todo) {
    return createTodoElement(todo)
  }
}

customElements.define('app-todo', TimTodoElement)