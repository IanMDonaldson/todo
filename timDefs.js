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



const useState = (input) => {
  const output = input
  function setOutput(newInput) {
    output = newInput
  }
  return [output, setOutput]
}

const [state, setState] = useState(0)




//define space
customElements.define('person-card', PersonCard)
