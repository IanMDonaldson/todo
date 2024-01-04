class Whatever extends HTMLElement {
  constructor() {
    super();
    init();
  }

  initwhatever() {
    this.fake = document.createElement('div')
    this.fake.innerText = "Yessir Whatever"
    return alternateWhatever();
  }
  alternateWhatever() {
    this.fake.addEventListener('click', () => { console.log('clicked classname')})
  }
}

customElements.define('whatever-yes', Whatever);
let fake = document.getElementById('fake');
function init() {
  fake.innerText = 'Yessir'
  return alternateFunc();
}
function alternateFunc() {
  return addEventListenerToFake();
}
function addEventListenerToFake() {
  fake.addEventListener('click', () => {console.log("clicked me!\n")})
}

