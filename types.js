var TodoClass = /** @class */ (function () {
    function TodoClass(text, date, creatorId) {
        this.text = text;
        this.date = date;
        this.creatorId = creatorId;
        this.id = randomId();
    }
    return TodoClass;
}());
var randomId = function () {
    return Math.floor(Math.random() * 999999999).toString(32);
};
function rtrUnnamed() {
    return function () {
        console.log('hi!');
    }();
}
function logTypeTodos() {
    var todos = [];
    var start = performance.now();
    for (var i = 0; i < 10000; i++) {
        var todo = {
            text: 'text',
            date: new Date().toISOString(),
            id: randomId(),
            creatorId: randomId()
        };
        todos.push(todo);
    }
    todos.sort(function (a, b) {
        if (Number(a.id) > Number(b.id))
            return 1;
        if (Number(a.id) < Number(b.id))
            return -1;
        return 0;
    });
    var stop = performance.now();
    console.log(stop - start);
    console.table(todos);
}
var funcVar = logTypeTodos();
console.log(funcVar);
rtrUnnamed();
