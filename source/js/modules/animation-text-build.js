export default class AnimationTextBuild {
  constructor(selector, timer, classForActivate, property) {
    this._selector = selector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._timeOffset = 0;

    this._element = document.querySelector(this._selector);
    this._previousTextContent = this._element.innerHTML;
    this.prepareText();
  }

  createLetterElement(letter) {
    const container = document.createElement(`span`);
    container.textContent = letter;
    container.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    this._timeOffset += 50;
    return container;
  }

  prepareText() {
    const text = this._element.textContent.split(` `);
    const content = text.reduce((acc, it) => {
      const lettersList = it.split(``).reduce((fragment, el) => {
        fragment.appendChild(this.createLetterElement(el));
        return fragment;
      }, document.createDocumentFragment());
      const stringContainer = document.createElement(`span`);
      stringContainer.classList.add(`text__string`);
      stringContainer.appendChild(lettersList);
      acc.appendChild(stringContainer);
      return acc;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
    this._element.innerHTML = this._previousTextContent;
    console.log(this._previousTextContent);
  }
}
