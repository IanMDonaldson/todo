
type TodoBase = {
    dbId?: string
    createdAt?: string;
    updatedAt?: string;
}

interface TodoFE extends TodoBase{
    text: string;
    date: string;
    id: string;
    creatorId: string;
}

interface TodoType  {
    phoneNumber?: string;
}

class TodoClass {
    text:string
    date:string
    creatorId:string
    id:string
    constructor(text, date, creatorId) {
        this.text = text
        this.date = date
        this.creatorId = creatorId
        this.id = randomId()
    }
    
} 

const randomId = () => {
    return Math.floor(Math.random() * 999_999_999).toString(32)
}

function rtrUnnamed() {
    return function() {
        console.log('hi!')
    }()
}


function logTypeTodos():void {
    let todos:TodoType[] = []
    let start = performance.now()
    for(let i = 0; i < 10_000; i++) {
        let todo:TodoType = {
            text: 'text',
            date: new Date().toISOString(),
            id: randomId(),
            creatorId: randomId()
        }
        todos.push(todo)
    }
    todos.sort((a, b) => {
       if (Number(a.id) > Number(b.id)) return 1
       if(Number(a.id) < Number(b.id)) return -1
       return 0;
    })
    let stop = performance.now()
    console.log(stop - start)
    console.table(todos)
}

let funcVar = logTypeTodos()

console.log(funcVar)
rtrUnnamed()