//class space
class PersonCard extends HTMLElement {
    constructor(...elems){
        super()
        this.classList.add('person-wrapper')

        for(let e of elems) {
            this.insert(e)
        }
    }
}

class CustomText extends HTMLElement {
    constructor() {
        super()
        
    }
}

//create them first, then insert here
class TodoElement extends HTMLElement {
    constructor(...elems) {
        super()
        for (let e of elems) {
            this.insert(e);
        }
        this.classList.add('new-todo-model');
    }
}

class TodoList {
    
    #todoList

    constructor(todos) {
        this.#todoList = readFromLocalStorage()
    }
}




//define space
customElements.define('person-card', PersonCard)
customElements.define('todo-elem', TodoElement)