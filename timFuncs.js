
const create = tag => document.createElement(tag)
const byId = id => document.getElementById(id)
const byTag = tag => document.getElementsByTagName(tag)

const Div = (...elems) => {
    let output = create('div')
    for(let e of elems) {
        output.insertAdjacentElement('beforeend', e)
    }
    return output
}
const P = text => {
    let output = create('P')
    output.innerText = text
    return output
}

HTMLElement.prototype.insert = function(elem) {
    this.insertAdjacentElement('beforeend', elem)
}


Object.prototype.toString = function toString() {
    return JSON.stringify(this, null, 4)
}